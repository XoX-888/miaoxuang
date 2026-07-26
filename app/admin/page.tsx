export const metadata = { title: '宮務管理' };

export default function AdminPage() {
  return (
    <main style={{ maxWidth: 760, margin: '80px auto', padding: 24, fontFamily: 'sans-serif' }}>
      <h1>妙玄宮宮務管理</h1>
      <p>信眾填單目前自動同步至既有 Google Sheets。為保護個人資料，公開網站不直接顯示填單名單。</p>
      <h2>建議管理流程</h2>
      <ol>
        <li>於 Google Sheets 查看新填單與報名編號。</li>
        <li>依信眾選擇的方便聯絡時段進行聯絡。</li>
        <li>確認服務項目、日期與費用後更新處理狀態。</li>
      </ol>
      <p><a href="/">返回網站首頁</a></p>
    </main>
  );
}
