# SupplyFlow | Supply Chain Monitor

[العربية](README.ar.md) | **English**

SupplyFlow is a bilingual (Arabic and English) front-end for a supply-chain
platform concept. It brings merchants, suppliers/manufacturers, logistics
providers, and customers together around a connected commerce and delivery
journey.

### What’s included

- A public landing page with an Arabic/English language switch and automatic
  right-to-left or left-to-right layout.
- A feature overview for merchants, manufacturers, logistics providers, and
  customers.
- Login and account-registration pages.
- A registration form that sends the user’s name, email, password, and role to
  the backend registration endpoint.

The current repository contains the front-end only. The login page is currently
a user interface and is not connected to an authentication endpoint. Live
shipment tracking, order management, and operational dashboards are not
implemented here.

### Technology

- Next.js 16 (App Router) and React 19
- TypeScript
- Tailwind CSS 4
- Axios for registration API requests

### Requirements

- Node.js and npm
- A backend service that implements `POST /api/auth/register` to use account
  registration

### Run locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. To enable registration, create `.env.local` in the project root and set the
   base URL of the backend:

   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
   ```

   Use the URL for your backend environment. The registration page appends
   `/api/auth/register` to this base URL. The backend should accept `name`,
   `email`, `password`, and one of these roles: `CUSTOMER`, `MERCHANT`,
   `MANUFACTURER`, or `LOGISTICS_PROVIDER`.

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000).

### Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Create a production build |
| `npm run start` | Run the production server |
| `npm run lint` | Run ESLint |

### Main routes

| Route | Description |
| --- | --- |
| `/` | Bilingual product landing page |
| `/login` | Login page UI |
| `/register` | Account-registration form |
