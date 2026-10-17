import { wiki } from '../data'
import { useLang } from '../i18n'
import Icon from '../components/Icon'
import NumberLegend from '../components/NumberLegend'

export default function Gear() {
  const { tr } = useLang()
  return <>
    <h1>{tr('Gear & Bag', 'Gear & Bag')}</h1>
    <p className="lead">{tr('Gear adds persistent bonuses and changes your room’s equipment. Every slot starts empty. All new gear goes into the Bag, even your first piece or a better piece. Open the Bag, choose a piece, and press Equip to use its bonus.', 'Gear memberi bonus permanen dan mengubah perlengkapan ruangan. Semua slot mulai kosong. Semua gear baru masuk Bag, termasuk gear pertama atau yang lebih bagus. Buka Bag, pilih gear, lalu tekan Equip untuk memakai bonusnya.')}</p>
    <div className="flow">{tr('Common → Uncommon → Rare → Epic → Legendary', 'Common → Uncommon → Rare → Epic → Legendary')}</div>
    <p className="muted">{tr('Merge two pieces of the same slot and tier into one piece of the next tier. Legendary is the top tier. Uncommon shares Common artwork, with a green tier marker.', 'Merge dua gear dengan slot dan tier yang sama menjadi satu gear tier berikutnya. Legendary adalah tier tertinggi. Uncommon memakai gambar Common dengan penanda tier hijau.')}</p>
    <NumberLegend />
    <div className="table-wrap"><table className="gear-table"><thead><tr><th>{tr('Slot & effect', 'Slot & efek')}</th>{wiki.packages.tiers.map(t => <th key={t.name}><span className={'tier tier-' + t.name.toLowerCase()}>{t.name}</span></th>)}</tr></thead>
      <tbody>{wiki.gear.map(g => <tr key={g.id}><td><strong>{tr(g.name, g.nameId)}</strong><small>{tr(g.effect, g.effectId)}</small></td>{g.tiers.map(t => <td key={t.name}><div className={'gear-cell tier-' + t.name.toLowerCase()}><Icon src={t.icon} size={64} /><span>{t.bonus > 0 ? '+' : ''}{t.bonus}%</span></div></td>)}</tr>)}</tbody>
    </table></div>
    <h2>{tr('Equipping, merging, and selling', 'Memakai, merge, dan menjual')}</h2>
    <ul className="bullets">
      <li>{tr('The Bag stores unlimited stacks by slot and tier. Equipped gear is stored separately.', 'Bag menyimpan stack tanpa batas berdasarkan slot dan tier. Gear yang sedang dipakai disimpan terpisah.')}</li>
      <li>{tr('Equipping a Bag item returns the old equipped piece to the Bag, even when both pieces have the same tier. Drops and merge results never replace your equipped gear automatically.', 'Memakai gear dari Bag mengembalikan gear lama ke Bag, termasuk saat kedua gear memiliki tier yang sama. Drop dan hasil merge tidak pernah otomatis mengganti gear yang sedang dipakai.')}</li>
      <li>{tr('Gear survives Promote and office changes. Laptop and Outfit add to the shared bonus pools; Desk adds to the Timer multiplier for every stage, including Tasks.', 'Gear bertahan setelah Promote dan ganti office. Laptop dan Outfit menambah pool bonus bersama; Desk menambah multiplier Timer untuk semua stage, termasuk Task.')}</li>
      <li>{tr('Chair reduces the Stress rate, with a gear floor of', 'Chair menurunkan kenaikan Stress, dengan batas minimum gear')} {wiki.tuning.GearStressFloorPerSecond}%/s. {tr('A Core Stat already below that rate stays below it.', 'Core Stat yang sudah di bawah batas itu tetap dipertahankan.')}</li>
      <li>{tr('Only spare gear in the Bag can be sold. Rare and above ask for confirmation.', 'Hanya gear cadangan di Bag yang bisa dijual. Rare ke atas meminta konfirmasi.')}</li>
    </ul>
    <h2>{tr('Sell value', 'Nilai jual')}</h2>
    <p className="muted">{tr('Cash = the stage’s base clear reward × the tier factor below, before office, stat, or boost bonuses.', 'Cash = reward dasar clear stage × faktor tier berikut, sebelum bonus office, stat, atau boost.')}</p>
    <div className="table-wrap"><table><thead><tr><th>Tier</th><th>{tr('Base clears worth of Cash', 'Cash senilai clear dasar')}</th></tr></thead><tbody>{wiki.gear[0].tiers.map(t => <tr key={t.name}><td>{t.name}</td><td>×{t.sellClears}</td></tr>)}</tbody></table></div>
  </>
}
