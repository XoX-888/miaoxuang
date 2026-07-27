import { NextResponse } from 'next/server';

const GAS_URL = process.env.GOOGLE_APPS_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycbyP7zUFSAjwHEX38Y-ydjqnTWKLNewpEkg86fZnv4CqiAm36Q8Q2R9PPBcNdHYQ69swow/exec';

const allowedServices = new Set([
  '個人普渡供品',
  '共同普渡桌',
  '贊普功德',
  '冤親債主',
  '專超嬰靈',
  '專超亡靈',
  '各姓祖先',
  '地基主',
  '寵物亡靈',
  '當日隨緣贊助功德主',
  '志工報名'
]);

type SubmittedItem = {
  service: string;
  quantity: number;
  customAmount: number | null;
};

function normalizeItems(value: unknown): SubmittedItem[] {
  if (!Array.isArray(value)) return [];

  const seen = new Set<string>();
  const items: SubmittedItem[] = [];

  for (const item of value) {
    const service = String(item?.service || '').trim();
    if (!allowedServices.has(service) || seen.has(service)) continue;
    seen.add(service);

    const rawQuantity = Number(item?.quantity);
    const rawCustomAmount = Number(item?.customAmount);
    items.push({
      service,
      quantity: Number.isFinite(rawQuantity) ? Math.max(1, Math.min(999, Math.floor(rawQuantity))) : 1,
      customAmount: Number.isFinite(rawCustomAmount) && rawCustomAmount > 0 ? Math.round(rawCustomAmount) : null
    });
  }

  return items;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const items = normalizeItems(body.items);

    if (!String(body.name || '').trim() || !String(body.phone || '').trim() || items.length === 0 || body.consent !== 'yes') {
      return NextResponse.json({ ok: false, message: '請完整填寫必填欄位，並至少選擇一個報名項目。' }, { status: 400 });
    }

    const params = new URLSearchParams({
      __ping: '1',
      表單來源: '卓蘭妙玄宮中元普度報名網站',
      姓名: String(body.name).trim(),
      電話: String(body.phone).trim(),
      地址: String(body.address || '').trim(),
      報名項目JSON: JSON.stringify(items),
      方便聯絡時段: String(body.contactTime || ''),
      填單內容: String(body.details || ''),
      建立時間: new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' })
    });

    const response = await fetch(GAS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
      body: params,
      redirect: 'follow'
    });

    const upstreamText = await response.text();
    const isScriptError = upstreamText.includes('找不到以下指令碼函式') || upstreamText.includes('errorMessage');
    if (!response.ok || isScriptError) throw new Error(`Upstream ${response.status}: ${upstreamText.slice(0, 160)}`);

    let upstreamResult: {
      ok?: boolean;
      message?: string;
      totalNumber?: string;
      systemId?: string;
      itemNumbers?: Array<{ service: string; itemNumber: string }>;
      totalAmount?: number;
      pendingItems?: string[];
    };

    try {
      upstreamResult = JSON.parse(upstreamText);
    } catch {
      throw new Error(`後端未回傳有效資料：${upstreamText.slice(0, 120)}`);
    }

    if (upstreamResult.ok === false) throw new Error(upstreamResult.message || 'Google Apps Script rejected submission');
    if (!upstreamResult.totalNumber || !upstreamResult.systemId || !Array.isArray(upstreamResult.itemNumbers)) {
      throw new Error('後端缺少報名編號資料。');
    }

    return NextResponse.json({
      ok: true,
      totalNumber: upstreamResult.totalNumber,
      systemId: upstreamResult.systemId,
      itemNumbers: upstreamResult.itemNumbers,
      totalAmount: Number(upstreamResult.totalAmount || 0),
      pendingItems: Array.isArray(upstreamResult.pendingItems) ? upstreamResult.pendingItems : []
    });
  } catch (error) {
    console.error('submission_error', error);
    return NextResponse.json(
      { ok: false, message: '系統暫時無法送出，請撥打 04-25896101 或 0977-336880。' },
      { status: 502 }
    );
  }
}

