export const pujaOptions = [
  ['個人贊普桌', '3,600 元／桌（含金紙，限 9 桌）'],
  ['財水桌', '3,600 元／桌（限 13 桌）'],
  ['藥草桌', '3,600 元／桌（限 1 桌）'],
  ['五色豆桌', '材料實收工本費，依報價'],
  ['五蔬果桌', '材料實收工本費，依報價'],
  ['肉粽桌', '每桌 228 顆，材料實收工本費，限 2 名'],
  ['個人贊助白米', '每份 50 台斤，1,700 元，共 36 名'],
  ['個人普渡供品', '每份 1,700 元，可帶回或再次捐出'],
  ['共同普渡桌', '每人 3,200 元，普渡後統一佈施'],
  ['贊普功德', '金額請由宮方聯絡確認'],
  ['冤親債主', '每份 1,500 元'],
  ['專超嬰靈', '每份 1,500 元，不公開姓名'],
  ['專超亡靈', '每份 1,500 元'],
  ['各姓祖先', '每份 1,500 元'],
  ['地基主', '每份 1,500 元'],
  ['寵物亡靈', '每份 1,500 元'],
  ['當日隨緣贊助功德主', '隨緣贊助'],
  ['志工報名', '8 月 18、19、20 日']
] as const;

export const newsItems = [
  {
    slug: 'zhongyuan-registration',
    date: '2026.07.27',
    category: '活動報名',
    tone: 'gold',
    title: '丙午年中元植福普度福世法會｜線上報名',
    excerpt: '普度、超薦、功德及志工服務現正受理報名。',
    kind: 'registration'
  },
  {
    slug: 'zhongyuan-announcement',
    date: '2026.07.27',
    category: '法會公告',
    tone: 'red',
    title: '中元普度項目、金額與志工招募公告',
    excerpt: '查看各項贊普、供品、超薦與志工日期說明。',
    kind: 'announcement'
  },
  {
    slug: 'zhongyuan-gallery',
    date: '活動後更新',
    category: '活動相簿',
    tone: 'ink',
    title: '中元普度法會紀實相簿',
    excerpt: '活動結束後，將於此頁整理上傳法會照片。',
    kind: 'gallery'
  }
] as const;

export type NewsItem = (typeof newsItems)[number];
