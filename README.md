# Legal Desk — Advocate Case Management System

A React + Vite + Tailwind project scaffold matching the enclosed spec doc, built with a proper multi-file structure (components / pages / context / layouts).

## Run locally
```
npm install
npm run dev
```
Open http://localhost:5173 — you'll land on the Login page. Enter any email + password and pick a role to sign in (demo auth, no backend).

## Structure
- `src/pages` — Login, Dashboard, Advocates, AdvocateDetail, Clients, ClientDetail, Cases, Documents, Payments, BareActs
- `src/components` — Sidebar, Topbar, GlassCard, StatCard, Avatar, Modal, form modals (AddAdvocateModal, AddClientModal, AddCaseModal, AddDocumentModal), EmptyState, Toast
- `src/context/AppContext.jsx` — global state: auth, advocates, clients, cases, documents
- `src/layouts/AppLayout.jsx` — sidebar + topbar shell for all authenticated routes
- `src/data/mockData.js` — seed data & constants

## Color system (Tailwind config)
primary #1E3A8A · secondary #2563EB · purple #7C3AED · gold #FBBF24 · emerald #10B981 · cyan #06B6D4 · orange #F97316 · pink #EC4899 · danger #EF4444 · bgsoft #F4F7FE
