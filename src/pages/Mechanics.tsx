import { Link } from 'react-router-dom'
import { wiki } from '../data'
import { stageInfo } from '../rpg'
import { useLang } from '../i18n'
import Num from '../components/Num'
import Currency from '../components/Currency'
import NumberLegend from '../components/NumberLegend'

export default function Mechanics() {
  const { tr } = useLang()
  const t = wiki.tuning
  const stages = [1, t.StepsPerRelease, t.StepsPerRelease * t.ReleasesPerMajor]
  return <>
    <h1>{tr('How it works', 'Cara kerja')}</h1>
    <p className="lead">{tr('WorkHero is now an idle RPG built around tasks, releases, and repeatable runs. Coding is automatic; you choose upgrades, gear, and when to Ascend.', 'WorkHero kini idle RPG dengan task, release, dan run yang bisa diulang. Coding otomatis; kamu memilih upgrade, gear, dan kapan Ascend.')}</p>
    <div className="flow">{tr('Auto LoC/s → stage HP falls → clear → Cash → Core Stats → deeper versions → Ascension → Fame', 'Auto LoC/s → HP stage turun → selesai → Cash → Core Stat → versi lebih tinggi → Ascension → Fame')}</div>
    <h2>{tr('Tasks and the version ladder', 'Task dan tangga versi')}</h2>
    <p>{tr('Each stage has HP: the amount of code needed to finish it. Auto LoC/s is damage per second. Clear a stage to receive Cash and advance. Every', 'Setiap stage punya HP: jumlah kode yang diperlukan untuk menyelesaikannya. Auto LoC/s adalah damage per detik. Selesaikan stage untuk mendapat Cash dan lanjut. Setiap')} <Num v={t.StepsPerRelease} /> {tr('stages is a Release mini boss; every', 'stage ada mini boss Release; setiap')} <Num v={t.ReleasesPerMajor} /> {tr('Releases is a Major Release boss.', 'Release ada boss Major Release.')}</p>
    <NumberLegend />
    <div className="table-wrap"><table><thead><tr><th>{tr('Stage', 'Stage')}</th><th>{tr('Version', 'Versi')}</th><th>{tr('Kind', 'Jenis')}</th><th>{tr('Base HP', 'HP dasar')}</th><th>{tr('Base Cash', 'Cash dasar')}</th><th>{tr('Time limit', 'Batas waktu')}</th><th>{tr('First-clear ECash', 'ECash clear pertama')}</th></tr></thead><tbody>{stages.map(n => { const s = stageInfo(n); return <tr key={n}><td><Num v={n} /></td><td>{s.version}</td><td>{s.kind}</td><td><Num v={s.hp} /></td><td><Currency kind="cash" value={s.cash} /></td><td>{s.time}s</td><td>{s.ecash ? <Currency kind="ecash" value={s.ecash} /> : '—'}</td></tr> })}</tbody></table></div>
    <p className="muted">{tr('Base patch HP =', 'HP dasar patch =')} <code>{t.HpBase} × {t.HpGrowth}^(stage − 1)</code> · {tr('base patch Cash =', 'Cash dasar patch =')} <code>{t.CashBase} × {t.CashGrowth}^(stage − 1)</code>. Release: HP ×{t.ReleaseHpMultiplier}, Cash ×{t.ReleaseCashMultiplier}; Major Release: HP ×{t.MajorHpMultiplier}, Cash ×{t.MajorCashMultiplier}.</p>
    <h2>{tr('Retreat and farming', 'Mundur dan farming')}</h2>
    <p>{tr('If the time limit expires, retreat one stage and farm it. After three farm clears, retry the failed stage automatically. Only time is lost. Boss timers keep running through Burnout.', 'Jika waktu habis, mundur satu stage dan farming di sana. Setelah tiga clear farming, stage yang gagal otomatis dicoba lagi. Hanya waktu yang hilang. Timer boss terus berjalan selama Burnout.')}</p>
    <h2>Stress & Burnout</h2>
    <div className="card-grid shop">
      <div className="shop-card"><h3>{tr('Producing', 'Berproduksi')}</h3><p>{tr('Stress rises while coding. At the base', 'Stress naik selama coding. Dengan rate dasar')} {t.StressPerSecond}%/s, {tr('a fresh run produces for', 'run baru berproduksi selama')} {t.MaxStress / t.StressPerSecond}s {tr('before reaching 100%.', 'sebelum mencapai 100%.')}</p></div>
      <div className="shop-card"><h3>Burnout</h3><p>{tr('A fixed lock lasts', 'Lock tetap berlangsung')} {t.BurnoutLockSeconds}s. {tr('Damage stops, so stages cannot clear and no stage Cash is paid.', 'Damage berhenti, sehingga stage tidak bisa selesai dan tidak ada Cash dari clear stage.')}</p></div>
      <div className="shop-card"><h3>Recovery</h3><p>{tr('Stress drains to 0% over a base', 'Stress turun ke 0% selama durasi dasar')} {t.RecoveryBaseSeconds}s. {tr('Recovery Speed shortens this part only, to a minimum of', 'Recovery Speed hanya memperpendek bagian ini, dengan minimum')} {t.RecoveryFloorSeconds}s.</p></div>
    </div>
    <h2>Ascension</h2>
    <p>{tr('Ascend banks Fame from the highest stage reached this run, then starts again. You can Ascend once the reward is above zero. Each run pays its full reward, even if you reached that version in an earlier run.', 'Ascend memberikan Fame dari stage tertinggi yang dicapai dalam run ini, lalu memulai lagi. Ascend tersedia saat reward lebih dari nol. Setiap run memberi reward penuh, walau versi itu sudah dicapai pada run sebelumnya.')}</p>
    <p><code>Fame = floor((best stage / {t.FameStageScale})^{t.FameExponent})</code></p>
    <div className="table-wrap"><table><thead><tr><th>{tr('Resets', 'Direset')}</th><th>{tr('Keeps', 'Tetap dimiliki')}</th></tr></thead><tbody><tr><td>{tr('Cash, Core Stat levels, stage progress, Stress', 'Cash, level Core Stat, progres stage, Stress')}</td><td>{tr('Current/Total Fame, ECash, permanent upgrades, owned offices, gear, Bag, mission progress, best-version record', 'Current/Total Fame, ECash, upgrade permanen, office milikmu, gear, Bag, progres misi, rekor versi tertinggi')}</td></tr></tbody></table></div>
    <h2>Offline</h2><p>{tr('Offline play clears patch stages but never starts a boss. At a boss, it farms the previous stage for the rest of the absence. The base credited cap is 4 hours, extendable to 12 hours with Fame. The return receipt shows the credited progress.', 'Saat offline, patch stage bisa selesai tetapi boss tidak dimulai. Saat mencapai boss, game farming stage sebelumnya selama sisa waktu offline. Batas waktu yang dihitung mulai 4 jam, bisa diperpanjang sampai 12 jam dengan Fame. Ringkasan saat kembali menunjukkan progres yang dihitung.')}</p>
    <div className="callout"><h2>{tr('The Career Idle loop has changed', 'Alur Career Idle sudah berubah')}</h2><p>{tr('Servers, Users, Capacity, Bandwidth, workplace ITEM catalogs, and Milestones are retired. Workplaces are now offices, Missions reward ECash, and Ascension is the source of Fame.', 'Server, User, Capacity, Bandwidth, katalog ITEM per tempat kerja, dan Milestone sudah diganti. Tempat kerja kini menjadi office, Misi memberi ECash, dan Ascension menjadi sumber Fame.')}</p><Link to="/upgrades">{tr('Explore the new upgrades →', 'Lihat upgrade baru →')}</Link></div>
  </>
}
