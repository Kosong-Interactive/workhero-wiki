import { Link } from 'react-router-dom'
import { wiki } from '../data'
import { useLang } from '../i18n'
import Icon from '../components/Icon'
import Num from '../components/Num'
import Currency from '../components/Currency'

export default function Economy() {
  const { tr } = useLang()
  const e = wiki.events
  const currency = [
    ['cash', 'Cash', 'Cash', 'Earned on stage clears and spent on Core Stats. Global to the run; resets on Promote.', 'Didapat saat stage selesai dan dipakai membeli Core Stat. Berlaku untuk satu run; direset saat Promote.'],
    ['fame', 'Current Fame', 'Current Fame', 'Spendable balance earned by Promote. Buys offices and permanent upgrades; survives resets.', 'Saldo yang bisa dibelanjakan, didapat dari Promote. Membeli office dan upgrade permanen; bertahan setelah reset.'],
    ['fame', 'Total Fame', 'Total Fame', 'Lifetime Fame earned. Only rises and is unaffected by purchases or refunds. It orders the Ranking.', 'Total Fame sepanjang permainan. Hanya naik dan tidak terpengaruh pembelian atau refund. Menjadi urutan Ranking.'],
    ['ecash', 'ECash', 'ECash', 'Buys Packages and boost items. Earned from missions, Projects, boss first clears, some Cat visits, daily check-ins, and the ECash ad. Survives Promote.', 'Membeli Package dan item boost. Didapat dari misi, Projects, clear boss pertama, sebagian kunjungan Cat, check-in harian, dan iklan ECash. Bertahan setelah Promote.'],
  ] as const
  return <>
    <h1>{tr('Currencies & rewards', 'Mata uang & reward')}</h1>
    <p className="lead">{tr('One run, one Cash balance. Fame is split into a spendable balance and a lifetime record.', 'Satu run, satu saldo Cash. Fame dibagi menjadi saldo yang bisa dibelanjakan dan rekor sepanjang permainan.')}</p>
    <div className="card-grid shop">{currency.map(([key, en, id, desc, descId]) => <div className="shop-card" key={en}><Icon src={wiki.icons[key]} size={44} /><h3>{tr(en, id)}</h3><p>{tr(desc, descId)}</p></div>)}</div>
    <p className="muted">{tr('Fame is earned only through Promote and is never sold. Cash does not convert into ECash or Fame.', 'Fame hanya didapat melalui Promote dan tidak dijual. Cash tidak bisa ditukar menjadi ECash atau Fame.')}</p>
    <h2>{tr('Boss first clears', 'Clear boss pertama')}</h2><p>{tr('Each Release pays', 'Setiap Release memberi')} <Currency kind="ecash" value={e.releaseReward} />, {tr('each Major Release pays', 'setiap Major Release memberi')} <Currency kind="ecash" value={e.majorReward} />. {tr('Only the first lifetime clear of that boss pays ECash; later runs still earn its Cash.', 'Hanya clear pertama boss itu sepanjang permainan yang memberi ECash; run berikutnya tetap memberi Cash.')}</p>
    <h2>{tr('The Cat', 'Si Kucing')}</h2><p>{tr('A visit is due every', 'Kunjungan datang setiap')} {e.catInterval / 60} {tr('minutes after the last claim. It waits to be clicked. There is a', 'menit setelah klaim terakhir. Cat menunggu diklik. Ada peluang')} {e.catChance}% {tr('chance of', 'mendapat')} <Currency kind="ecash" value={e.catReward} />; {tr('otherwise it gives Cash worth', 'selebihnya memberi Cash senilai')} <Num v={e.catCashClears} /> {tr('clears of the current stage. The reward is rolled once and kept across reloads.', 'clear stage saat ini. Reward diacak sekali dan tetap tersimpan setelah reload.')}</p>
    <h2>{tr('Free room Package', 'Package gratis di ruangan')}</h2><p>{tr('Each first clear of a multiple of', 'Setiap clear pertama kelipatan')} <Num v={wiki.tuning.PackageEveryStages} /> {tr('stages in the run offers a free Package with one Common gear. This is separate from the Shop’s owned Package meter.', 'stage dalam run menawarkan Package gratis berisi satu gear Common. Ini terpisah dari meter Package milikmu di Toko.')}</p>
    <h2>{tr('Daily check-in', 'Check-in harian')}</h2><p className="muted">{tr('One claim per local calendar day. A missed day does not wipe progress; the seven-day cycle waits and then repeats.', 'Satu klaim per hari kalender lokal. Melewatkan satu hari tidak mereset progres; siklus tujuh hari menunggu lalu berulang.')}</p>
    <div className="daily-grid">{[...e.daily, 0].map((reward, i) => <div key={i} className="shop-card"><small>{tr('Day', 'Hari')} {i + 1}</small><Icon src={i === 6 ? wiki.gear[0].tiers[3].icon : wiki.icons.ecash} size={40} />{i === 6 ? <strong>{tr('Random Epic gear', 'Gear Epic acak')}</strong> : <Currency kind="ecash" value={reward} />}</div>)}</div>
    <h2>{tr('Rewarded ad boost', 'Boost iklan reward')}</h2><p>{tr('The intended native ad reward doubles Cash per Task for', 'Reward iklan native yang direncanakan menggandakan Cash per Task selama')} {e.adDuration / 3600} {tr('hour per completed ad, up to', 'jam tiap iklan selesai, hingga')} {e.adLimit} {tr('ads per day. Extra ads extend the time; Shop Double Cash can stack with it for ×4 stage Cash.', 'iklan per hari. Iklan tambahan memperpanjang durasi; Double Cash Toko bisa bertumpuk menjadi Cash stage ×4.')}</p>
    <h2>Projects</h2><p>{tr('Timed side jobs, one at a time, pay ECash or a small boost item and can be repeated without a daily cap.', 'Kerja sampingan berbatas waktu, satu per satu, memberi ECash atau item boost kecil dan bisa diulang tanpa batas harian.')} <Link to="/projects">{tr('See Projects →', 'Lihat Projects →')}</Link></p>
    <h2>{tr('Rewarded ad for ECash', 'Iklan reward untuk ECash')}</h2><p>{tr('A second rewarded ad pays', 'Iklan reward kedua memberi')} <Currency kind="ecash" value={e.ecashPerAd} /> {tr('each time it is watched to the end, up to', 'setiap kali ditonton sampai habis, hingga')} {e.ecashAdLimit} {tr('ads per day. Its daily count resets together with the Cash ad.', 'iklan per hari. Hitungan hariannya direset bersama iklan Cash.')}</p>
    <p className="muted">{tr('Ad SDK integration is still under development. WebGL has no ad SDK; the quota and buff rules exist in the prototype.', 'Integrasi SDK iklan masih dikembangkan. WebGL tidak punya SDK iklan; aturan kuota dan buff sudah ada di prototipe.')}</p>
  </>
}
