# Workhero Wiki

React + Vite reference site for WorkHero: Career Idle.

- `npm run dev` — start the site
- `npm run extract` — re-read `../Workhero` ScriptableObjects into `src/data/wiki.json` and copy the icons used
- Workplace images in `public/workplaces/` are square renders of the `EnvironmentPreview` scene (512×512)

## Deploy

Open Graph images must be absolute URLs, so build with the public address of the site:

```bash
VITE_SITE_URL=https://your-domain.example npm run build
```

Routes are real paths (`/workplaces`), so the host must serve `index.html` for unknown paths. `vercel.json` already does that; old `/#/…` links are redirected to the path form on load.
