// Indonesian text for game data that the wiki shows. Item names and flavour text stay in English because that is
// how the game itself ships them.
export const effectId: Record<string, { name: string; description: string }> = {
  'Auto LoC (flat)': { name: 'Auto LoC (tetap)', description: 'Menambah sejumlah tetap baris kode otomatis per detik.' },
  'Auto LoC (percent)': { name: 'Auto LoC (persen)', description: 'Mengalikan produksi LoC otomatis.' },
  'Users per LoC': { name: 'User per LoC', description: 'Setiap baris kode menarik lebih banyak User.' },
  'Revenue per User': { name: 'Pendapatan per User', description: 'Setiap User membayar lebih banyak Cash.' },
  'User Growth': { name: 'Pertumbuhan User', description: 'User mendekati batas atasnya lebih cepat.' },
  Bandwidth: { name: 'Bandwidth', description: 'Menaikkan batas User yang ditentukan tier Server.' },
  'Stress Resistance': { name: 'Ketahanan Stress', description: 'Bisa bekerja lebih lama sebelum Burnout.' },
  'Recovery Speed': { name: 'Kecepatan Pemulihan', description: 'Pemulihan Burnout menurun lebih cepat.' },
}

export const familyId: Record<string, string> = { Product: 'Produk', Reach: 'Jangkauan', Audience: 'Audiens' }

export const shopId: Record<string, { description: string; badge: string }> = {
  Kopi: { description: 'Stress turun ke 0% sesuai kecepatan Recovery, lalu tetap tenang selama kerja berlanjut.', badge: 'TENANG 1 MENIT' },
  'Bonus Sprint': { description: 'Menggandakan semua Cash yang didapat selama sprint aktif.', badge: 'CASH x2 · 1 MENIT' },
  Overclock: { description: 'Menggandakan produksi LoC otomatis selama satu menit penuh fokus.', badge: 'AUTO LoC x2 · 1 MENIT' },
}

export const familyKey = (f: string) => familyId[f] ?? f
