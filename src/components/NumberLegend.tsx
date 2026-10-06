import { NUMBER_SUFFIXES } from '../format'
import { useLang } from '../i18n'

export function NumberTable() {
  const { lang, tr } = useLang()
  return (
    <div className="table-wrap">
      <table className="legend-table">
        <thead>
          <tr><th>{tr('Suffix', 'Singkatan')}</th><th>{tr('Name', 'Nama')}</th><th>{tr('Value', 'Nilai')}</th><th>{tr('Example', 'Contoh')}</th></tr>
        </thead>
        <tbody>
          {NUMBER_SUFFIXES.map((s) => (
            <tr key={s.suffix}>
              <td><b>{s.suffix}</b></td>
              <td>{lang === 'id' ? s.id : s.en}</td>
              <td>10<sup>{s.power}</sup></td>
              <td>1{s.suffix} = {(10n ** BigInt(s.power)).toLocaleString(lang === 'id' ? 'id-ID' : 'en-US')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/** One-line reminder shown above tables, with the full list one click away. */
export default function NumberLegend() {
  const { tr } = useLang()
  return (
    <details className="legend">
      <summary>
        {tr('Numbers use short notation:', 'Angka memakai singkatan:')} <b>K</b> = 10<sup>3</sup>, <b>M</b> = 10<sup>6</sup>, <b>B</b> = 10<sup>9</sup>, <b>T</b> = 10<sup>12</sup>, <b>Qa</b> = 10<sup>15</sup> … {tr('(tap for the full list; hover a number for its exact value)', '(klik untuk daftar lengkap; arahkan ke angka untuk nilai persisnya)')}
      </summary>
      <NumberTable />
    </details>
  )
}
