# SupplyFlow | Supply Chain Monitor

[العربية](README.ar.md) | **English**

SupplyFlow is a bilingual (Arabic and English) front-end for a connected
commerce and supply-chain platform. It brings merchants, suppliers and
manufacturers, logistics providers, and customers together.

## Features

- Bilingual landing page with an Arabic/English switch and matching RTL/LTR
  layout.
- Login and registration forms with feedback and loading states. Registration
  supports customers, merchants, manufacturers, and logistics providers.
- Account profile at `/profile/[id]`, showing the signed-in user's details,
  allowing account-role updates, and providing logout.
- Dark and light themes, following the system preference until the user chooses
  a theme; the choice is saved in browser storage.
- Custom not-found page and shared accessible form and UI components.
- Component usage and accessibility notes in [app/UI_COMPONENTS.md](app/UI_COMPONENTS.md).

This repository contains the front-end only and requires a compatible backend
for authentication and registration. The current landing-page shipment content
is illustrative: live shipment tracking, order management, and operational
dashboards are not implemented.

## Technology

- Next.js 16 App Router and React 19
- TypeScript
- Tailwind CSS 4
- Axios for backend requests
- IBM Plex Sans Arabic and IBM Plex Mono fonts

## Requirements

- Node.js and npm
- A backend implementing the authentication endpoints below to use account
  registration, login, and role updates

## Run locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create `.env.local` in the project root and set your backend base URL:

   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
   ```

   The frontend appends these paths to the base URL:

   | Method | Endpoint | Purpose |
   | --- | --- | --- |
   | `POST` | `/api/auth/register` | Register with `name`, `email`, `password`, and `role` |
   | `POST` | `/api/auth/login` | Sign in with `email` and `password`; return an auth token and user data |
   | `PATCH` | `/api/auth/updaterole` | Update `role`; requires `Authorization: Bearer <token>` |

   Supported roles are `CUSTOMER`, `MERCHANT`, `MANUFACTURER`, and
   `LOGISTICS_PROVIDER`. The login response must include a `token` or
   `accessToken` and may include the user in a `user` field. The frontend stores
   the token and user data in browser `localStorage` for the profile session.

3. Start the development server on port 3001:

   ```bash
   npm run dev -- --port 3001
   ```

4. Open [http://localhost:3001](http://localhost:3001).

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server (Next.js default port: 3000) |
| `npm run build` | Create a production build |
| `npm run start` | Run the production server |
| `npm run lint` | Run ESLint |

## Main routes

| Route | Description |
| --- | --- |
| `/` | Bilingual product landing page |
| `/login` | Backend-connected login form |
| `/register` | Backend-connected account registration |
| `/profile/[id]` | Signed-in user's profile and account-role editor |
| Other paths | Custom 404 page |
