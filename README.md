# React NHL Stats

A React + TypeScript app (Create React App) for browsing NHL player and team stats, built with an MVVM architecture.

## Architecture

```
src/
  api/            axios-based HTTP client, base URLs, and one service per API
  models/         Typed response models
  repositories/   Combine services into app-level data operations
  viewmodels/     React hooks holding view state/logic (MVVM ViewModels)
  App.tsx, ...    Views (UI only; consume ViewModels)
```

Flow: **View → ViewModel (hook) → Repository → Service → HttpClient**

### APIs

| Service | Base URL | Purpose |
|---|---|---|
| `BasicService` | `https://api.nhle.com/` | Stats REST (teams, skater summaries) |
| `StatsService` | `https://api-web.nhle.com/` | Standings, schedule, scores, rosters, club stats, player landing |
| `ScoresService` | `https://nhl-score-api.herokuapp.com/` | Latest scores |

Base URLs live in [`src/api/config.ts`](src/api/config.ts). These are unofficial, undocumented APIs and may change; some may not send CORS headers, in which case a dev proxy or backend may be needed.

## Getting started

```bash
npm install
npm start      # http://localhost:3000
npm test
npm run build
```

## License

MIT, see [LICENSE](LICENSE).
