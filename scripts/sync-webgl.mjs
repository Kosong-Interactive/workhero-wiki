import { cp, readFile, readdir, rm, mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { brotliDecompressSync } from 'node:zlib'

const root = fileURLToPath(new URL('../', import.meta.url))
const source = path.resolve(process.argv[2] ?? path.join(root, '../_build/workhero-html'))
const destination = path.join(root, 'public/workhero-html')
if (source === destination || source.startsWith(destination + path.sep)) throw new Error('Source must be outside the published build folder')
const html = await readFile(path.join(source, 'index.html'), 'utf8')
if (html.includes('{{{')) throw new Error('Use the generated build, not the Unity template')
const files = await readdir(path.join(source, 'Build'))
const framework = files.find(name => name.endsWith('.framework.js.unityweb'))
if (!framework) throw new Error('Expected the Brotli/fallback WorkHero framework')
const code = brotliDecompressSync(await readFile(path.join(source, 'Build', framework))).toString()
if (!code.includes('workhero-browser-input-guard')) throw new Error('Build lacks the runtime iPhone keyboard guard')
await rm(destination, { recursive: true, force: true })
await mkdir(destination, { recursive: true })
await cp(source, destination, { recursive: true })
console.log('Copied WebGL build to public/workhero-html')
