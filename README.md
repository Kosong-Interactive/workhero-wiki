# WorkHero Wiki

React + Vite reference for **WorkHero: Idle RPG**. English and Indonesian, with compact numbers,
stage/upgrade calculators, Core Stats, Fame upgrades, gear, Packages, missions, Shop boosts, offices,
currencies, Projects, and a glossary. Both Play buttons navigate to `/play`, where players choose
Unity WebGL or Android. The WebGL card opens `/play/webgl` inside this site; availability
follows `GAME_PLAYABLE` in `src/config.ts`. Android stays disabled with a Coming Soon message until
`ANDROID_APK_URL` is set to the APK Google Drive link.

- `npm run dev` — start the wiki.
- `npm run extract` — read the checked-out `../Workhero` Idle RPG sources and tuning asset into
  `src/data/idle-rpg.json`, and copy the referenced game icons. Use
  `node scripts/extract.mjs /absolute/path/to/Workhero` for another checkout.
- `npm run build` — typecheck and build the static site.
- `npm test` — check tuning, calculator formulas, mission rewards, public Office boundaries,
  asset references, and all current pages in EN/ID without starting a listening server.

The extraction source must contain `Assets/Scripts/Gameplay/Game`. Tuning field defaults from
`GameTuning.cs` are overridden by the serialized `Assets/ScriptableObjects/Game/GameTuning.asset`. Gear bonuses, Package
odds, mission thresholds/rewards, permanent upgrade costs, daily rewards, office multipliers,
and event constants come from the C# catalogs. Extraction fails if required fields or artwork
are missing; it does not silently use old Career Idle data.

Only released offices are exported (currently Freelance and BRexa); future offices appear as one Coming Soon card.
Office-purchase mission targets beyond that public catalog are withheld until further Offices are announced.
Their room images remain square reference renders from the earlier EnvironmentPreview gallery,
not proof that per-office rooms/previews have shipped. Names and ordering come from `Game/Offices.asset`; Office bonuses come from `OfficePrices`,
not old workplace revenue or ITEM catalogs.

The gameplay reference uses the actual prototype code as of 2026-11-04. All four gear slots have five distinct tier icons and room models, including Uncommon; extraction copies all twenty icons directly without Common fallback. Same-tier Equip remains available with Bag stock and conserves the Bag count. Simplified Desk icons represent accessories, not exact room layouts. Balance remains in
development. Design proposals are not presented as implemented rules; in particular Head Start
banks starting Cash and does not skip stages. The calculator excludes gear, boosts, and the
runtime timing/state machine and clearly labels uninterrupted clear-time estimates. Timer applies
to Tasks as well as bosses. New gear always enters the Bag and requires manual Equip; retreat
holds a stage until Next. Offline repeats a reached Task instead of progressing, and offline clears
do not advance missions. Each mission step pays its own reward from `MissionCatalog` (rising along a line).
Boost items come from `BoostItems` (five sizes per family, prices from `GameTuning`), and Projects from `Projects`
(goals, targets, time limits, rewards, rerolls); the Projects page replaces the old Event tab (`/events` redirects there).

Old `/skins` and `/workplaces` links redirect to `/offices`; `/servers` redirects to `/mechanics`, `/effects`
to `/upgrades`, and `/compare` to `/offices`. The retired Career Idle catalogs are no longer imported.

## Deploy

Open Graph images must be absolute URLs, so build with the public address of the site:

```bash
VITE_SITE_URL=https://your-domain.example npm run build
```

Routes are real paths (`/offices`), so the host must serve `index.html` for unknown paths. `vercel.json` already does that; old `/#/…` links are redirected to the path form on load.

## Gameplay sync — 2026-11-04

Source: sibling Workhero `prototype/idle-rpg`, commit `9052dd68`. Merge requires four unequipped pieces matching slot, tier and series; `gearRules.mergeCount` is extracted from `GearLoadout`. Worn set groups match both series and tier. Bag guidance covers individual cards, primary-stat deltas, `MERGE n/4`, repeated merging and the always-visible stats card (Show Stats is retired in the current layout).

Mission steps and rewards are re-extracted from `MissionCatalog`, preserving the released-Office filter. Current endpoints: Tasks150,000, Releases16,000, Majors350, Stats550,000, Fame upgrades122, Shop purchases280, Promote660. Public steps pay6,665 ECash; unreleased Office goals are excluded. No mission-completion date is promised by the wiki.

## Hosted WebGL

`/play/webgl` is a dedicated player page with a transparent floating Back control on the right, without the wiki navigation/footer. Its iframe loads `public/workhero-html/index.html` on this origin. Android remains a placeholder.

To replace the published game after a new Unity build:

```sh
# In Workhero, first run the mandatory generated-output verification.
python3 Docs/Audits/WebGlDelivery20261104/verify_html.py ../_build/workhero-html
# Then in workhero-wiki:
npm run sync:webgl
npm test
npm run build
```

The sync script copies the entire generated folder, preserving relative Build URLs and checking the compiled iPhone keyboard guard. An explicit source is supported with `npm run sync:webgl -- /absolute/path/workhero-html`. The checked-in public copy is used during deployment; Vercel does not need the Unity project. Brotli `.unityweb` files use Unity's decompression fallback: serve as binary, **without Content-Encoding: br**. Build URLs keep their filenames, so the host revalidates `/workhero-html/*` rather than retaining stale cached versions. Keep the SPA fallback for `/play/webgl` refreshes.

Local profiles belong to this website's origin; Unity Play browser storage is separate. Existing players can use Load Profile with their Player ID to fetch their cloud profile.

Local validation: wiki checks pass for32 EN/ID route renders; TypeScript/Vite production build passes. An isolated desktop Chromium smoke test loaded the copied Unity build through `/play/webgl` to Create Profile, verified direct refresh, runtime keyboard guard, portrait/landscape iframe bounds and Back navigation, without creating a profile. Temporary preview servers and browsers were stopped. Evidence: `docs/webgl-hosting/`. Physical iPhone and production hosting have not been tested.

The player loading card listens only to its own same-origin iframe. The Responsive Unity template reports real progress, ready and failed states through `workhero-load` messages; sync rejects HTML missing this bridge. It shows download percentage, starting phase, a slow-first-load hint and a retry action. Browser regression covers controlled42%/95% previews, ignored forged parent messages, viewport fit, failed loader/retry and actual compiled Unity startup. See `docs/webgl-hosting/loader-results.json`; preview percentages are test fixtures. No loading-speed improvement or physical iPhone validation is claimed.

Player layout: no wiki header; game fills the viewport. The floating right-edge Back control appears on hover/keyboard focus, and stays faintly visible on touch screens. App icons and favicon now use a newly illustrated recreation of the user-supplied wallpaper crop: rear-view red-hoodie developer typing on a laptop. Browser icon references are versioned to refresh the previous crop.

Full-viewport browser regression passes: iframe starts at0,0 and matches390×844/1280×720 viewport, no page header, transparent Back becomes visible on hover/keyboard focus, touch control remains discoverable, Back navigation works and real Unity initializes. See `docs/webgl-hosting/fullscreen-results.json` and adjacent captures. Existing icon PNG dimensions32/180/192/512 were verified. No profile created; temporary server stopped after checks.
