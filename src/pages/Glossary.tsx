import { useLang } from '../i18n'

const terms: [string, string, string, string, string][] = [
  ['LoC', 'Lines of Code', 'The number of lines of code written. The core resource of the game.', 'Jumlah baris kode yang ditulis. Sumber daya inti game.', 'core'],
  ['Auto LoC/s', 'Lines per second', 'Lines of code written automatically each second. There is no tapping or holding.', 'Baris kode yang ditulis otomatis tiap detik. Tidak ada tap atau tahan.', 'core'],
  ['Total LoC', 'Stored code', 'All code written in the current workplace. It is permanent and never drains.', 'Seluruh kode yang ditulis di tempat kerja saat ini. Permanen dan tidak pernah berkurang.', 'core'],
  ['Server', 'Storage', 'Holds Total LoC. Its tier decides Capacity, Bandwidth and User Growth/s.', 'Menyimpan Total LoC. Tier-nya menentukan Capacity, Bandwidth, dan User Growth/s.', 'server'],
  ['Capacity', 'LoC limit', 'The most LoC the Server can hold. When Total LoC reaches it the Server is Full and writing stops.', 'Batas LoC yang muat di Server. Saat Total LoC mencapainya, Server Penuh dan penulisan berhenti.', 'server'],
  ['Bandwidth', 'User limit', 'The most Users the Server can serve at once. It caps the User ceiling.', 'Jumlah User maksimum yang bisa dilayani Server sekaligus. Membatasi batas atas User.', 'server'],
  ['User Growth/s', 'Arrival rate', 'How fast Users move toward their ceiling each second.', 'Seberapa cepat User bergerak menuju batas atasnya tiap detik.', 'server'],
  ['Users', 'Audience', 'People using your code. They earn Cash continuously and never leave.', 'Orang yang memakai kodemu. Mereka menghasilkan Cash terus-menerus dan tidak pernah pergi.', 'economy'],
  ['Users per LoC', 'Demand', 'How many Users each line of code attracts. User ceiling = min(Total LoC × Users per LoC, Bandwidth).', 'Berapa banyak User yang ditarik tiap baris kode. Batas User = min(Total LoC × User per LoC, Bandwidth).', 'economy'],
  ['Revenue per User', 'Income', 'Cash each User pays per second.', 'Cash yang dibayar tiap User per detik.', 'economy'],
  ['Cash', 'Local currency', 'Earned from Users. Buys upgrades. Resets in every new workplace.', 'Didapat dari User. Dipakai membeli upgrade. Direset di setiap tempat kerja baru.', 'economy'],
  ['ECash', 'Global currency', 'Spendable in the Shop. Comes from Milestones and some Packages.', 'Bisa dipakai di Toko. Didapat dari Milestone dan sebagian Package.', 'economy'],
  ['Fame', 'Reputation', 'Global score from Milestones. Not spendable; unlocks the next workplace.', 'Skor global dari Milestone. Tidak bisa dibelanjakan; membuka tempat kerja berikutnya.', 'economy'],
  ['Stress', 'Strain', 'Rises while code is being written, up to 100%.', 'Naik saat kode ditulis, hingga 100%.', 'stress'],
  ['Burnout', 'Forced pause', 'At 100% Stress, writing stops for a 2s lock, then Stress drains back to 0% (Recovery). Users still earn.', 'Pada Stress 100%, penulisan berhenti 2 detik, lalu Stress turun kembali ke 0% (Recovery). User tetap menghasilkan.', 'stress'],
  ['Recovery', 'Cool-down', 'The 3s drain after the lock. Recovery Speed items shorten it (min 0.5s).', 'Penurunan 3 detik setelah lock. Item Recovery Speed memperpendeknya (min 0,5 detik).', 'stress'],
  ['Server Full', 'Bottleneck', 'Total LoC reached Capacity. Buy a bigger SERVER tier to continue writing.', 'Total LoC mencapai Capacity. Beli tier SERVER lebih besar untuk lanjut menulis.', 'stress'],
  ['ITEM', 'Upgrade tab', 'Upgrades bought with Cash that boost production, Users, income or Stress. Local to each workplace.', 'Upgrade yang dibeli dengan Cash untuk menaikkan produksi, User, pendapatan, atau Stress. Berlaku per tempat kerja.', 'ui'],
  ['SERVER', 'Upgrade tab', 'Buys the next Server tier: bigger Capacity, Bandwidth and User Growth/s.', 'Membeli tier Server berikutnya: Capacity, Bandwidth, dan User Growth/s lebih besar.', 'ui'],
  ['Milestone', 'Goal', 'Reached by earning enough Cash in a workplace. Grants Fame and ECash.', 'Dicapai dengan mengumpulkan cukup Cash di sebuah tempat kerja. Memberi Fame dan ECash.', 'ui'],
  ['Workplace', 'Stage', 'One of 20 careers, played in order. Each starts from scratch.', 'Salah satu dari 20 karier, dimainkan berurutan. Masing-masing mulai dari nol.', 'ui'],
  ['Package', 'Delivery', 'A parcel that arrives every 10 minutes: Cash, or sometimes ECash.', 'Paket yang datang tiap 10 menit: Cash, atau kadang ECash.', 'ui'],
  ['Cat', 'Bonus', 'A cat that visits the room. Tap it for a quick Cash bonus.', 'Kucing yang berkunjung ke ruangan. Tap untuk bonus Cash cepat.', 'ui'],
]

export default function Glossary() {
  const { tr, lang } = useLang()
  const groups: [string, string, string][] = [
    ['core', 'Code', 'Kode'],
    ['server', 'Server', 'Server'],
    ['economy', 'Users & money', 'User & uang'],
    ['stress', 'Stress', 'Stress'],
    ['ui', 'Game terms', 'Istilah game'],
  ]
  return (
    <>
      <h1>{tr('Glossary', 'Glosarium')}</h1>
      <p className="lead">{tr('Every term used in the game and on this wiki.', 'Semua istilah yang dipakai di game dan wiki ini.')}</p>
      {groups.map(([key, en, id]) => (
        <section key={key}>
          <h2>{tr(en, id)}</h2>
          <dl className="glossary">
            {terms.filter((t) => t[4] === key).map(([term, sub, d_en, d_id]) => (
              <div key={term}>
                <dt>{term} <small>{sub}</small></dt>
                <dd>{lang === 'id' ? d_id : d_en}</dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </>
  )
}
