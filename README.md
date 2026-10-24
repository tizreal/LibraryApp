# Library Management System — Frontend

React frontend for a small library management system: browse, add, edit and delete books
and library members. It is built against the Spring Boot API; an Express backend exposes
the same endpoints.

**Live demo:** [library-app-hazel-psi.vercel.app](https://library-app-hazel-psi.vercel.app)
(a shared public sandbox running on the Spring Boot API) · **Backends:**
[Spring Boot](https://github.com/tizreal/LibraryAppBackend) ·
[Express](https://github.com/tizreal/LibraryAppExpressBackend)

## Tech stack

React 19 · Vite · React Router 7 · Axios · Tailwind CSS · ESLint · Vercel

## Features

- Books and members pages with create, edit and delete forms.
- Shared state in a React context (`LibraryContext`), with loading and error states for
  each collection.
- A single Axios client configured from `VITE_API_URL`.
- A status banner while the free-tier backend wakes up, which clears once the API responds.

## Running locally

Requirements: Node.js and one of the backends running locally.

```bash
npm install
echo "VITE_API_URL=http://localhost:8080" > .env.local   # Spring Boot API
npm run dev                                             # http://localhost:5173
```

Other scripts: `npm run lint`, `npm run build`, `npm run preview`.

## Project structure

```
src/
├── api/          Axios client, book and member API calls
├── components/   cards, forms, navbar, server status banner
├── context/      shared library state
├── hooks/        backend warm-up check
└── pages/        home, books, members
```
