import { useLang } from '../i18n'
import { NumberTable } from '../components/NumberLegend'

const terms = [
  ['LoC', 'Lines of Code', 'Lines of code. Auto LoC/s is damage per second to stage HP.', 'Baris kode. Auto LoC/s menjadi damage per detik ke HP stage.'],
  ['Task / Patch', 'Stage', 'An ordinary stage, such as v0.0.1. Clearing it pays Cash.', 'Stage biasa, misalnya v0.0.1. Menyelesaikannya memberi Cash.'],
  ['HP', 'Health Points', 'The remaining code required to complete a stage. Auto LoC reduces it to zero.', 'Sisa kode yang perlu ditulis untuk menyelesaikan stage. Auto LoC menguranginya sampai nol.'],
  ['Release', 'Mini boss', 'Every tenth stage, except a Major Release. More HP and Cash, with its own base time limit.', 'Setiap stage kesepuluh, kecuali Major Release. HP dan Cash lebih besar, dengan batas waktu dasar tersendiri.'],
  ['Major Release', 'Boss', 'Every 25th Release (250 stages), shown as v1.0.0, v2.0.0, and onward.', 'Setiap Release ke-25 (250 stage), ditampilkan sebagai v1.0.0, v2.0.0, dan seterusnya.'],
  ['Cash per Task', 'Reward', 'The Cash paid on a stage clear. The HUD Cash/s estimate is not continuous income.', 'Cash yang dibayar saat stage selesai. Estimasi Cash/s di HUD bukan pendapatan terus-menerus.'],
  ['Core Stats', 'Run upgrades', 'Seven stats bought with Cash. Levels reset on Promote.', 'Tujuh stat yang dibeli dengan Cash. Level direset saat Promote.'],
  ['Timer', 'All-stage time limit', 'Extends the time available for Tasks and both boss types. It is the only time bonus.', 'Memperpanjang waktu untuk Task dan kedua jenis boss. Ini satu-satunya bonus waktu.'],
  ['Crit', 'Critical hit', 'Auto LoC lands as one hit per second of coding; each hit has a chance to deal extra damage (crit damage). Base rate 1%, base damage +40%.', 'Auto LoC masuk sebagai satu pukulan per detik coding; tiap pukulan punya peluang memberi damage tambahan (crit damage). Peluang dasar 1%, damage dasar +40%.'],
  ['Stress', 'Burnout meter', 'Rises while coding. At 100%, coding enters Burnout.', 'Naik saat coding. Pada 100%, coding memasuki Burnout.'],
  ['Burnout', 'Locked pause', 'The fixed 2-second pause before Recovery. No coding damage or stage-clear income.', 'Jeda tetap 2 detik sebelum Recovery. Tidak ada damage coding atau Cash dari clear stage.'],
  ['Recovery', 'Cool-down', 'Stress drains back to zero. Base 3 seconds; minimum 0.5 seconds with upgrades.', 'Stress turun kembali ke nol. Dasar 3 detik; minimum 0,5 detik dengan upgrade.'],
  ['Farming', 'Held stage', 'Repeat a reached stage for Cash. Failure or Back holds the stage; it does not retry automatically. Press Next to move forward again.', 'Ulangi stage yang pernah dicapai untuk Cash. Gagal atau Back menahan stage; tidak ada retry otomatis. Tekan Next untuk maju lagi.'],
  ['Back / Next', 'Stage navigation', 'Back steps down one stage; Next steps up one reached stage. Automatic progression resumes at the best stage reached in the current run.', 'Back mundur satu stage; Next maju satu stage yang pernah dicapai. Progres otomatis berlanjut di stage tertinggi yang dicapai dalam run saat ini.'],
  ['Offline', 'Away-time farming', 'Repeat the Task you left without unlocking new stages. At a boss, farm the previous stage instead. Offline clears do not count for missions.', 'Ulangi Task yang ditinggalkan tanpa membuka stage baru. Pada boss, farming stage sebelumnya. Clear offline tidak dihitung untuk misi.'],
  ['Promote', 'Prestige', 'Restart the run and bank Fame from the highest version reached.', 'Mulai ulang run dan dapatkan Fame dari versi tertinggi yang dicapai.'],
  ['Current Fame', 'Spendable Fame', 'The Fame balance used for offices and permanent upgrades.', 'Saldo Fame untuk membeli office dan upgrade permanen.'],
  ['Total Fame', 'Lifetime record', 'All Fame earned from Promote actions. It only increases and orders the Ranking.', 'Seluruh Fame dari Promote. Hanya naik dan menjadi urutan Ranking.'],
  ['ECash', 'Persistent currency', 'Pays for Packages and boost items. Missions, Projects, boss first clears, Cat, and check-in can grant it.', 'Membeli Package dan item boost. Bisa didapat dari misi, Projects, clear boss pertama, Cat, dan check-in.'],
  ['Boost item', 'Stored boost', 'Coffee, Double Cash, Overclock, or Rapid Fire in one of five sizes. Kept in Bag → Items until you press USE.', 'Coffee, Double Cash, Overclock, atau Rapid Fire dalam salah satu dari lima ukuran. Disimpan di Bag → Items sampai kamu menekan USE.'],
  ['Project', 'Side job', 'A timed goal from the Projects board that pays ECash or a boost item. One runs at a time; a finished one waits for CLAIM.', 'Target berbatas waktu dari papan Projects yang memberi ECash atau item boost. Hanya satu yang berjalan; yang selesai menunggu CLAIM.'],
  ['Gear', 'Equipment', 'Persistent bonuses in Laptop Setup, Outfit, Chair, and Desk slots.', 'Bonus permanen pada slot Laptop Setup, Outfit, Chair, dan Desk.'],
  ['Series', 'Hustler / Grinder', 'Every gear piece belongs to one series, shown by its emblem. Wearing 2, 3 or 4 pieces of one series adds set bonuses.', 'Setiap gear termasuk satu seri, terlihat dari emblemnya. Memakai 2, 3, atau 4 gear satu seri memberi bonus set.'],
  ['Bag', 'Inventory', 'All new gear enters the Bag. Choose a piece and press Equip manually. Unlimited spare stacks are separate from equipped gear.', 'Semua gear baru masuk Bag. Pilih gear dan tekan Equip secara manual. Stack cadangan tanpa batas disimpan terpisah dari gear yang dipakai.'],
  ['Merge', 'Tier upgrade', 'Two gear pieces of the same slot, tier, and series become one next-tier piece.', 'Dua gear dengan slot, tier, dan seri yang sama menjadi satu gear tier berikutnya.'],
  ['Package', 'Gear chest', 'An owned chest opened for random gear. Tier odds are shown in the Package guide.', 'Chest yang dimiliki dan dibuka untuk gear acak. Peluang tier ada di panduan Package.'],
  ['Office', 'Career appearance', 'A former workplace look with equipped-only Auto LoC and Cash multipliers. Changing it triggers Promote.', 'Tampilan tempat kerja lama dengan multiplier Auto LoC dan Cash saat dipakai. Menggantinya memicu Promote.'],
  ['Mission', 'Lifetime goal', 'A tiered goal paying ECash once per step, more on later steps. Progress survives Promote; offline clears do not count.', 'Target bertahap yang memberi ECash sekali tiap langkah, lebih banyak di langkah berikutnya. Progres bertahan setelah Promote; clear offline tidak dihitung.'],
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
