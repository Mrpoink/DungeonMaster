This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Run Dev Server Externally (questweave.servequake.com)

- The dev server is configured to bind on `0.0.0.0:3000`.
- Requests to `http://<host>:3000/api/*` are proxied to the Python backend (default `http://127.0.0.1:1068`).

Steps:

1. Ensure the Python backend is running and reachable at `http://127.0.0.1:1068` (or set `BACKEND_TARGET` in `.env.local`).
2. Start the Next.js dev server:

```bash
npm run dev
```

3. With port forwarding and DNS set, open `http://questweave.servequake.com:3000` from any device.

Optional env file:

```bash
cp .env.local.example .env.local
# Edit BACKEND_TARGET if your backend is on another host/port
```

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) locally, or your public domain if configured.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
