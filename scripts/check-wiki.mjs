import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { createServer as createHttpServer } from 'node:http'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server.js'
import { createServer } from 'vite'

const root = fileURLToPath(new URL('../', import.meta.url))
const wiki = JSON.parse(readFileSync(resolve(root, 'src/data/idle-rpg.json'), 'utf8'))
// Supply an unbound HTTP server so Vite's SSR loader never opens a listening port.
const server = await createServer({ root, server: { middlewareMode: true, hmr: { server: createHttpServer() } }, appType: 'custom' })
try {
  const { stageInfo, stageTimeLimit, nextCost, coreValue } = await server.ssrLoadModule('/src/rpg.ts')
  assert.deepEqual(wiki.stats.map(stat => stat.baseCost), [10, 10, 60, 60, 120, 120])
  assert.equal(nextCost(wiki.stats[0], 0, false), 10)
  assert.ok(Math.abs(nextCost(wiki.stats[0], 1, false) - 11.1) < 1e-9)
  const autoTotal = Array.from({ length: 10 }, (_, level) => nextCost(wiki.stats[0], level, false)).reduce((a, b) => a + b, 0)
  assert.ok(Math.abs(autoTotal - 10 * (1.11 ** 10 - 1) / (1.11 - 1)) < 1e-9)
  assert.deepEqual([1, 10, 250].map(stage => stageInfo(stage).time), [30, 60, 90])
  assert.equal(stageInfo(1).hp, 10)
  assert.ok(Math.abs(stageInfo(10).hp - 10 * 1.03 ** 9 * 4) < 1e-9)
  assert.ok(Math.abs(stageInfo(250).hp - 10 * 1.03 ** 249 * 6) < 1e-9)
  // This regression used to apply Timer only to bosses.
  assert.deepEqual([1, 10, 250].map(stage => stageTimeLimit(stage, 100)), [45, 90, 135])
  assert.equal(coreValue('BossDamage', 100), 3)
  assert.equal(nextCost(wiki.permanent[0], 1, true), 3)
  assert.equal(wiki.packages.cost, 50)
  assert.equal(wiki.missions.length, 8)
  assert.ok(wiki.missions.every(line => line.steps.length && line.steps.every(step => step.reward === 25)))
  assert.deepEqual(wiki.offices.map(office => office.id), ['freelance', 'compas-news', 'farmhub', 'brexa'])
  assert.deepEqual(wiki.missions.find(line => line.id === 'BuySkins').steps.map(step => step.goal), [1, 3])
  assert.equal(wiki.missions.find(line => line.id === 'Ascend').name, 'Promote')
  assert.ok(wiki.packages.tiers.every(tier => tier.odds.reduce((a, b) => a + b, 0) === 100))
  function checkAssets(value) {
    if (typeof value === 'string' && /^\/(icons|workplaces)\//.test(value)) {
      assert.ok(existsSync(resolve(root, 'public', value.slice(1))), `Missing asset: ${value}`)
    } else if (Array.isArray(value)) value.forEach(checkAssets)
    else if (value && typeof value === 'object') Object.values(value).forEach(checkAssets)
  }
  checkAssets(wiki)

  const { default: App } = await server.ssrLoadModule('/src/App.tsx')
  const { LangProvider } = await server.ssrLoadModule('/src/i18n.tsx')
  const routes = ['/', '/mechanics', '/upgrades', '/gear', '/packages', '/missions', '/offices',
    ...wiki.offices.map(office => '/offices/' + office.id), '/shop', '/calculator', '/economy', '/glossary']
  for (const lang of ['en', 'id']) {
    globalThis.localStorage = { getItem: () => lang }
    for (const route of routes) {
      const html = renderToStaticMarkup(createElement(StaticRouter, { location: route },
        createElement(LangProvider, null, createElement(App))))
      assert.match(html, /<h1[ >]/, `${lang} ${route}: missing title`)
      assert.doesNotMatch(html, /Ascend|Ascension|NaN|Infinity|undefined|Shopedia|OpenEye/, `${lang} ${route}: stale or invalid content`)
      if (route === '/' || route === '/offices') {
        assert.equal((html.match(lang === 'en' ? /Coming soon/g : /Segera hadir/g) ?? []).length, 1, `${route}: one Coming Soon`)
      }
      if (route === '/mechanics') assert.match(html, lang === 'en' ? /There is no automatic retry/ : /Tidak ada retry otomatis/)
      if (route === '/gear') assert.match(html, lang === 'en' ? /All new gear goes into the Bag/ : /Semua gear baru masuk Bag/)
      if (route === '/missions') assert.match(html, lang === 'en' ? /Every step pays the same/ : /Setiap langkah memberi reward yang sama/)
      if (route === '/') assert.match(html, lang === 'en' ? /Your first run/ : /Run pertamamu/)
    }
  }
  delete globalThis.localStorage
  console.log(`Passed: tuning, costs, stage HP/timers, mission rewards, public Office boundary, assets, and ${routes.length * 2} bilingual route renders.`)
} finally {
  await server.close()
}
