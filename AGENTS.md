# Base44 Dev Environment

## Overview
"El Impostor" — a client-side React party word game (Vite + React 18). No backend, no database, no external credentials required.

## Setup
- `docker compose -f docker-compose.base44.yml up -d` starts the Vite dev server on port 3000.
- Node 22 base image; source is bind-mounted; `npm install` runs at container start.
- Live reload is enabled (Vite HMR with polling for bind-mount compatibility).

## Missing generated files (created for standalone run)
The repo was exported from Base44 without two files the Base44 platform normally generates:
- `src/lib/AuthContext.jsx` — provides `AuthProvider` + `useAuth()`. Stubbed to skip auth (no backend configured).
- `src/components/UserNotRegisteredError.jsx` — simple error screen.

If this app is later connected to a real Base44 backend (set `VITE_BASE44_APP_BASE_URL`), replace these stubs with the real Base44-generated versions.

## Vite config
`vite.config.js` has `server.host: true` and `server.allowedHosts: true` so the preview proxy hostname is accepted.

## Verify
- `curl -sf http://localhost:3000/` returns the HTML shell.
- The game setup screen (players/impostors/timer controls) should render in the preview.
