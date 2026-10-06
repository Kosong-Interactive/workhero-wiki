import { wiki } from '../data'
import { full } from '../format'
import { useLang } from '../i18n'
import Icon from '../components/Icon'
import { isComingSoon } from '../components/WorkplaceImage'

export default function Economy() {
  const { tr } = useLang()
  const e = wiki.events
  const released = wiki.workplaces.filter((w) => !isComingSoon(w))
  const totalFame = released.reduce((n, w) => n + w.milestones.reduce((m, x) => m + x.fameReward, 0), 0)
  const totalEcash = released.reduce((n, w) => n + w.milestones.reduce((m, x) => m + x.ecashReward, 0), 0)
  return (
    <>
      <h1>{tr('Currencies & events', 'Mata Uang & Event')}</h1>
      <div className="card-grid shop">
        <div className="shop-card">
          <Icon src={wiki.icons.cash} size={48} />
          <h3>Cash</h3><span className="badge">{tr('Local · spendable', 'Lokal · bisa dibelanjakan')}</span>
          <p>{tr('Earned continuously from Users. Buys ITEM and SERVER upgrades. Rebuilt from zero in every workplace.', 'Didapat terus-menerus dari User. Membeli upgrade ITEM dan SERVER. Mulai dari nol di setiap tempat kerja.')}</p>
        </div>
        <div className="shop-card">
          <Icon src={wiki.icons.ecash} size={48} />
          <h3>ECash</h3><span className="badge">{tr('Global · spendable', 'Global · bisa dibelanjakan')}</span>
          <p>{tr(`Granted by Milestones and some Packages. Buys one-minute Shop consumables. Never converts from Cash. All Milestones together pay ${full(totalEcash)} ECash.`, `Didapat dari Milestone dan sebagian Package. Membeli item Toko satu menit. Tidak bisa ditukar dari Cash. Seluruh Milestone memberi total ${full(totalEcash)} ECash.`)}</p>
        </div>
        <div className="shop-card">
          <Icon src={wiki.icons.fame} size={48} />
          <h3>Fame</h3><span className="badge">{tr('Global · not spendable', 'Global · tidak bisa dibelanjakan')}</span>
          <p>{tr(`Granted by Milestones and unlocks the next workplace. All Milestones together pay ${full(totalFame)} Fame.`, `Didapat dari Milestone dan membuka tempat kerja berikutnya. Seluruh Milestone memberi total ${full(totalFame)} Fame.`)}</p>
        </div>
      </div>

      <h2>{tr('Secondary events', 'Event sampingan')}</h2>
      <div className="card-grid shop">
        <div className="shop-card">
          <Icon src={wiki.icons.cash} size={40} />
          <h3>{tr('The Cat', 'Si Kucing')}</h3>
          <p>{tr(`Wanders the room every ${e.catMinimumIntervalSeconds}–${e.catMaximumIntervalSeconds}s and stays for ${e.catVisibleSeconds}s. Tap it to claim ${e.catEarningsSeconds}s of current Cash/s (minimum ${e.catMinimumCash} Cash).`, `Berkeliling ruangan tiap ${e.catMinimumIntervalSeconds}–${e.catMaximumIntervalSeconds} detik dan bertahan ${e.catVisibleSeconds} detik. Tap untuk mengambil ${e.catEarningsSeconds} detik Cash/s saat ini (minimum ${e.catMinimumCash} Cash).`)}</p>
        </div>
        <div className="shop-card">
          <Icon src={wiki.icons.ecash} size={40} />
          <h3>{tr('The Package', 'Si Paket')}</h3>
          <p>{tr(`One arrives every ${e.packageIntervalMinutes} minutes, counted from the last claim. ${Math.round(e.packageECashChance * 100)}% of the time it pays ${e.packageECash} ECash; otherwise ${e.packageEarningsSeconds}s of Cash/s (minimum ${e.packageMinimumCash} Cash). It persists across reloads.`, `Satu paket datang tiap ${e.packageIntervalMinutes} menit, dihitung dari klaim terakhir. ${Math.round(e.packageECashChance * 100)}% kemungkinan memberi ${e.packageECash} ECash; selebihnya ${e.packageEarningsSeconds} detik Cash/s (minimum ${e.packageMinimumCash} Cash). Tetap ada setelah reload.`)}</p>
        </div>
      </div>

      <h2>Offline</h2>
      <p className="lead">{tr('While you are away the game simulates the same state machine, capped at four hours. A welcome-back receipt appears after at least 60 credited seconds.', 'Saat kamu pergi, game mensimulasikan mesin state yang sama, dibatasi empat jam. Ringkasan selamat datang muncul setelah minimal 60 detik terkredit.')}</p>
    </>
  )
}
