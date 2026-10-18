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
    <p className="muted">{tr('Merge two pieces of the same slot and tier into one piece of the next tier. Legendary is the top tier. Every tier has its own gear icons and room models, including Uncommon with its green tier marker.', 'Merge dua gear dengan slot dan tier yang sama menjadi satu gear tier berikutnya. Legendary adalah tier tertinggi. Setiap tier memiliki ikon gear dan model ruangan tersendiri, termasuk Uncommon dengan penanda tier hijau.')}</p>
    <NumberLegend />
    <div className="table-wrap"><table className="gear-table"><thead><tr><th>{tr('Slot & effect', 'Slot & efek')}</th>{wiki.packages.tiers.map(t => <th key={t.name}><span className={'tier tier-' + t.name.toLowerCase()}>{t.name}</span></th>)}</tr></thead>
      <tbody>{wiki.gear.map(g => <tr key={g.id}><td><strong>{tr(g.name, g.nameId)}</strong><small>{tr(g.effect, g.effectId)}</small></td>{g.tiers.map(t => <td key={t.name}><div className={'gear-cell tier-' + t.name.toLowerCase()}><Icon src={t.icon} size={64} /><span>{t.bonus > 0 ? '+' : ''}{t.bonus}%</span></div></td>)}</tr>)}</tbody>
    </table></div>
    <h2>{tr('Equipping, merging, and selling', 'Memakai, merge, dan menjual')}</h2>
    <ul className="bullets">
      <li>{tr('The Bag stores unlimited stacks by slot and tier. Equipped gear is stored separately.', 'Bag menyimpan stack tanpa batas berdasarkan slot dan tier. Gear yang sedang dipakai disimpan terpisah.')}</li>
      <li>{tr('Equip stays available whenever that Bag stack has stock, even for the tier already worn. A same-tier swap returns the worn copy and keeps the Bag count unchanged. Drops and merge results never replace your equipped gear automatically.', 'Equip tetap tersedia selama stack Bag memiliki stok, termasuk tier yang sedang dipakai. Swap tier yang sama mengembalikan gear lama dan tidak mengubah jumlah di Bag. Drop dan hasil merge tidak pernah otomatis mengganti gear yang sedang dipakai.')}</li>
      <li>{tr('Gear survives Promote and office changes. Laptop and Outfit add to the shared bonus pools; Desk adds to the Timer multiplier for every stage, including Tasks.', 'Gear bertahan setelah Promote dan ganti office. Laptop dan Outfit menambah pool bonus bersama; Desk menambah multiplier Timer untuk semua stage, termasuk Task.')}</li>
      <li>{tr('Chair reduces the Stress rate, with a gear floor of', 'Chair menurunkan kenaikan Stress, dengan batas minimum gear')} {wiki.tuning.GearStressFloorPerSecond}%/s. {tr('A Core Stat already below that rate stays below it.', 'Core Stat yang sudah di bawah batas itu tetap dipertahankan.')}</li>
      <li>{tr('Only spare gear in the Bag can be sold. Rare and above ask for confirmation.', 'Hanya gear cadangan di Bag yang bisa dijual. Rare ke atas meminta konfirmasi.')}</li>
    </ul>
    <h2>{tr('Gear looks in the room', 'Tampilan gear di ruangan')}</h2>
    <ul className="bullets">
      <li>{tr('Uncommon Laptop Setup uses a laptop on Stand 01; Rare uses a folding laptop on Stand 02 with light keyboard and mouse. Epic has one wide monitor; Legendary has two.', 'Laptop Setup Uncommon memakai laptop dengan Stand 01; Rare memakai laptop lipat dengan Stand 02 serta keyboard dan mouse terang. Epic memakai satu monitor wide; Legendary dua.')}</li>
      <li>{tr('Uncommon Chair uses the padded armchair, while Rare uses the tan high-back chair. Uncommon Outfit is a charcoal hoodie with teal jeans.', 'Chair Uncommon memakai kursi empuk berlengan, sedangkan Rare memakai kursi tan bersandaran tinggi. Outfit Uncommon berupa hoodie abu gelap dengan jeans teal.')}</li>
      <li>{tr('Uncommon Desk adds a floor plant beside the desk. Rare and Epic share the same desk body, but have different accessories. Desk icons simplify the accessories onto the tabletop; they are not exact room layouts.', 'Desk Uncommon menambah tanaman di lantai samping meja. Rare dan Epic memakai bentuk meja yang sama, tetapi aksesorinya berbeda. Ikon Desk menyederhanakan aksesori di atas meja; bukan penempatan persis di ruangan.')}</li>
    </ul>
    <h2>{tr('Sell value', 'Nilai jual')}</h2>
    <p className="muted">{tr('Cash = the stage’s base clear reward × the tier factor below, before office, stat, or boost bonuses.', 'Cash = reward dasar clear stage × faktor tier berikut, sebelum bonus office, stat, atau boost.')}</p>
    <div className="table-wrap"><table><thead><tr><th>Tier</th><th>{tr('Base clears worth of Cash', 'Cash senilai clear dasar')}</th></tr></thead><tbody>{wiki.gear[0].tiers.map(t => <tr key={t.name}><td>{t.name}</td><td>×{t.sellClears}</td></tr>)}</tbody></table></div>
  </>
}
