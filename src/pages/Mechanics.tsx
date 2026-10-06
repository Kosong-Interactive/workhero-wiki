import { useLang } from '../i18n'

export default function Mechanics() {
  const { tr } = useLang()
  const phases: [string, string][] = [
    [tr('Producing', 'Berproduksi'), tr('Automatic LoC is accepted while the Server has room. Stress rises toward 100%. Users and Cash run as normal.', 'LoC otomatis diterima selama Server masih muat. Stress naik menuju 100%. User dan Cash berjalan normal.')],
    [tr('Burnout lock', 'Kunci Burnout'), tr('Fixed 2.0s. Stress is pinned at 100%, no LoC is produced. Nothing can shorten it. Users still earn.', 'Tetap 2,0 detik. Stress terkunci 100%, tidak ada LoC diproduksi. Tidak ada yang bisa memperpendeknya. User tetap menghasilkan.')],
    [tr('Burnout recovery', 'Pemulihan Burnout'), tr('3.0s linear drain from 100% to 0%. Recovery Speed shortens this part only, down to 0.5s. Production resumes at 0%.', 'Penurunan linear 3,0 detik dari 100% ke 0%. Recovery Speed hanya memperpendek bagian ini, sampai 0,5 detik. Produksi lanjut di 0%.')],
    [tr('Server full', 'Server penuh'), tr('Total LoC reached capacity so LoC production stops. Stress drains to 0% and holds. Users keep growing and earning. Only a bigger Server tier resumes production.', 'Total LoC mencapai kapasitas sehingga produksi LoC berhenti. Stress turun ke 0% dan bertahan. User terus bertambah dan menghasilkan. Hanya tier Server lebih besar yang melanjutkan produksi.')],
  ]
  return (
    <>
      <h1>{tr('How it works', 'Cara Kerja')}</h1>
      <p className="lead">{tr('There is no player input. Everything runs by itself; you decide what to buy.', 'Tidak ada input pemain. Semuanya berjalan otomatis; kamu yang menentukan apa yang dibeli.')}</p>
      <h2>{tr('The loop', 'Alur permainan')}</h2>
      <p className="flow">Auto LoC/s → Total LoC ({tr('in Server', 'di Server')}) → Users → Cash → {tr('Upgrades', 'Upgrade')} → Milestones → Fame → {tr('next Workplace', 'Tempat Kerja berikutnya')}</p>
      <ul className="bullets">
        <li>{tr('Total LoC is permanent and never drains. There is no deploy step.', 'Total LoC permanen dan tidak pernah berkurang. Tidak ada langkah deploy.')}</li>
        <li><b>{tr('User ceiling', 'Batas User')}</b> = min(Total LoC × {tr('Users per LoC', 'User per LoC')}, Bandwidth). {tr('Users grow toward it at User Growth/s and never fall.', 'User bertambah menuju batas itu sebesar User Growth/s dan tidak pernah turun.')}</li>
        <li>{tr('Moving to a new workplace resets Cash, item levels and the Server tier to their start.', 'Pindah ke tempat kerja baru mereset Cash, level item, dan tier Server ke awal.')}</li>
        <li>{tr('Menus (Shop, Upgrades, Milestones, Settings) never pause the simulation.', 'Menu (Toko, Upgrade, Milestone, Pengaturan) tidak pernah menjeda simulasi.')}</li>
      </ul>
      <h2>Stress &amp; Burnout</h2>
      <p className="lead">{tr('Stress only rises while LoC is being produced, toward a fixed 100% ceiling. Freelance and Compas News gain 4 Stress/s (25 productive seconds); later workplaces gain 8/s or the value on their page.', 'Stress hanya naik saat LoC diproduksi, menuju batas tetap 100%. Freelance dan Compas News menambah 4 Stress/detik (25 detik produktif); tempat kerja berikutnya 8/detik atau sesuai nilai di halamannya.')}</p>
      <div className="card-grid shop">
        {phases.map(([n, d]) => (
          <div key={n} className="shop-card"><h3>{n}</h3><p>{d}</p></div>
        ))}
      </div>
      <h2>Bottleneck</h2>
      <ul className="bullets">
        <li><b>Server full</b> — {tr('raise Capacity with a SERVER tier.', 'naikkan Capacity dengan tier SERVER.')}</li>
        <li><b>Bandwidth full</b> — {tr('Users hit the ceiling; Bandwidth items soften it, a SERVER tier raises it.', 'User mencapai batas; item Bandwidth melonggarkannya, tier SERVER menaikkannya.')}</li>
        <li><b>{tr('Demand-limited', 'Dibatasi permintaan')}</b> — {tr('more Auto LoC or Users per LoC.', 'tambah Auto LoC atau User per LoC.')}</li>
      </ul>
    </>
  )
}
