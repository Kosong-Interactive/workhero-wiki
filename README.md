# WorkHero Wiki

React + Vite reference for **WorkHero: Idle RPG**. English and Indonesian, with compact numbers,
stage/upgrade calculators, Core Stats, Fame upgrades, gear, Packages, missions, Shop boosts, offices,
currencies, and a glossary. The Play button retains the under-development popup.

- `npm run dev` — start the wiki.
- `npm run extract` — read the checked-out `../Workhero` Idle RPG sources and tuning asset into
  `src/data/idle-rpg.json`, and copy the referenced game icons. Use
  `node scripts/extract.mjs /absolute/path/to/Workhero` for another checkout.
- `npm run build` — typecheck and build the static site.

The extraction source must contain `Assets/Scripts/Gameplay/IdleRpg`. Tuning field defaults from
`IdleRpgTuning.cs` are overridden by the serialized `IdleRpgTuning.asset`. Gear bonuses, Package
odds, mission thresholds/rewards, permanent upgrade costs, daily rewards, office multipliers,
and event constants come from the C# catalogs. Extraction fails if required fields or artwork
are missing; it does not silently use old Career Idle data.

Only the four previously public offices are exported; future offices appear as one Coming Soon card.
Office-purchase mission targets beyond that public catalog are withheld until further Offices are announced.
Their room images remain square reference renders from the earlier EnvironmentPreview gallery,
not proof that per-office rooms/previews have shipped. Office bonuses come from `IdleRpgSkinPrices`,
not old workplace revenue or ITEM catalogs.

The gameplay reference uses the actual prototype code as of 2026-10-14. Balance remains in
development. Design proposals are not presented as implemented rules; in particular Head Start
banks starting Cash and does not skip stages. The calculator excludes gear, boosts, and the
runtime timing/state machine and clearly labels uninterrupted clear-time estimates.

Old `/skins` and `/workplaces` links redirect to `/offices`; `/servers` redirects to `/mechanics`, `/effects`
to `/upgrades`, and `/compare` to `/offices`. The retired Career Idle catalogs are no longer imported.

## Deploy

Open Graph images must be absolute URLs, so build with the public address of the site:

```bash
VITE_SITE_URL=https://your-domain.example npm run build
```

Routes are real paths (`/workplaces`), so the host must serve `index.html` for unknown paths. `vercel.json` already does that; old `/#/…` links are redirected to the path form on load.
