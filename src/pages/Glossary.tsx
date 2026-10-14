import { useLang } from '../i18n'
import { NumberTable } from '../components/NumberLegend'

const terms = [
  ['LoC', 'Lines of Code', 'Lines of code. Auto LoC/s is damage per second to stage HP.', 'Baris kode. Auto LoC/s menjadi damage per detik ke HP stage.'],
  ['Task / Patch', 'Stage', 'An ordinary stage, such as v0.0.1. Clearing it pays Cash.', 'Stage biasa, misalnya v0.0.1. Menyelesaikannya memberi Cash.'],
  ['HP', 'Health Points', 'The remaining code required to complete a stage. Auto LoC reduces it to zero.', 'Sisa kode yang perlu ditulis untuk menyelesaikan stage. Auto LoC menguranginya sampai nol.'],
  ['Release', 'Mini boss', 'Every tenth stage. More HP, more Cash, and a boss timer.', 'Setiap stage kesepuluh. HP dan Cash lebih besar, serta timer boss.'],
  ['Major Release', 'Boss', 'Every 25th Release (250 stages), shown as v1.0.0, v2.0.0, and onward.', 'Setiap Release ke-25 (250 stage), ditampilkan sebagai v1.0.0, v2.0.0, dan seterusnya.'],
  ['Cash per Task', 'Reward', 'The Cash paid on a stage clear. The HUD Cash/s estimate is not continuous income.', 'Cash yang dibayar saat stage selesai. Estimasi Cash/s di HUD bukan pendapatan terus-menerus.'],
  ['Core Stats', 'Run upgrades', 'Six stats bought with Cash. Levels reset on Ascension.', 'Enam stat yang dibeli dengan Cash. Level direset saat Ascension.'],
  ['Stress', 'Burnout meter', 'Rises while coding. At 100%, coding enters Burnout.', 'Naik saat coding. Pada 100%, coding memasuki Burnout.'],
  ['Burnout', 'Locked pause', 'The fixed 2-second pause before Recovery. No coding damage or stage-clear income.', 'Jeda tetap 2 detik sebelum Recovery. Tidak ada damage coding atau Cash dari clear stage.'],
  ['Recovery', 'Cool-down', 'Stress drains back to zero. Base 3 seconds; minimum 0.5 seconds with upgrades.', 'Stress turun kembali ke nol. Dasar 3 detik; minimum 0,5 detik dengan upgrade.'],
  ['Farming', 'Retry loop', 'Clear the previous stage three times after failure, then retry automatically.', 'Selesaikan stage sebelumnya tiga kali setelah gagal, lalu coba lagi otomatis.'],
  ['Ascension', 'Prestige', 'Restart the run and bank Fame from the highest version reached.', 'Mulai ulang run dan dapatkan Fame dari versi tertinggi yang dicapai.'],
  ['Current Fame', 'Spendable Fame', 'The Fame balance used for offices and permanent upgrades.', 'Saldo Fame untuk membeli office dan upgrade permanen.'],
  ['Total Fame', 'Lifetime record', 'All Fame earned from Ascensions. It only increases and ranks the leaderboard.', 'Seluruh Fame dari Ascension. Hanya naik dan menentukan peringkat leaderboard.'],
  ['ECash', 'Persistent currency', 'Pays for Packages and timed boosts. Missions, boss first clears, Cat, and check-in can grant it.', 'Membeli Package dan boost sementara. Bisa didapat dari misi, clear boss pertama, Cat, dan check-in.'],
  ['Gear', 'Equipment', 'Persistent bonuses in Laptop Setup, Outfit, Chair, and Desk slots.', 'Bonus permanen pada slot Laptop Setup, Outfit, Chair, dan Desk.'],
  ['Bag', 'Inventory', 'Unlimited spare gear stacks, separate from the equipped gear.', 'Stack gear cadangan tanpa batas, terpisah dari gear yang dipakai.'],
  ['Merge', 'Tier upgrade', 'Two gear pieces of the same slot and tier become one next-tier piece.', 'Dua gear dengan slot dan tier yang sama menjadi satu gear tier berikutnya.'],
  ['Package', 'Gear chest', 'An owned chest opened for random gear. Tier odds are shown in the Package guide.', 'Chest yang dimiliki dan dibuka untuk gear acak. Peluang tier ada di panduan Package.'],
  ['Office', 'Career appearance', 'A former workplace look with equipped-only Auto LoC and Cash multipliers. Changing it triggers Ascension.', 'Tampilan tempat kerja lama dengan multiplier Auto LoC dan Cash saat dipakai. Menggantinya memicu Ascension.'],
  ['Mission', 'Lifetime goal', 'A tiered goal whose ECash reward is claimed once per step.', 'Target bertahap dengan reward ECash yang diklaim sekali tiap langkah.'],
  ['Head Start', 'Starting Cash', 'Banks early-stage rewards as starting Cash. It does not skip stages.', 'Memberi reward stage awal sebagai Cash awal. Tidak melewati stage.'],
]
export default function Glossary() {
  const { tr } = useLang()
  return <>
    <h1>{tr('Glossary', 'Glosarium')}</h1>
    <p className="lead">{tr('Terms used in the new WorkHero: Idle RPG mechanics.', 'Istilah dalam mekanik baru WorkHero: Idle RPG.')}</p>
    <dl className="glossary">{terms.map(([term, sub, en, id]) => <div key={term}><dt>{term} <small>{sub}</small></dt><dd>{tr(en, id)}</dd></div>)}</dl>
    <h2>{tr('Number notation (K, M, B…)', 'Notasi angka (K, M, B…)')}</h2>
    <p className="lead">{tr('K = 10³ (1,000), M = 10⁶, B = 10⁹, T = 10¹². Each step is ×1,000. Qa and Qi are different: quadrillion and quintillion. Numbers in tables are rounded; hover a number for its exact value. Beyond Dc, the calculator uses scientific notation.', 'K = 10³ (1.000), M = 10⁶, B = 10⁹, T = 10¹². Tiap langkah dikali 1.000. Qa dan Qi berbeda: kuadriliun dan kuintiliun. Angka di tabel dibulatkan; arahkan kursor ke angka untuk nilai persisnya. Di atas Dc, kalkulator memakai notasi ilmiah.')}</p>
    <NumberTable />
  </>
}
