# Adin Brkić Portfolio

Personal portfolio for a Software Engineering student at IUS, with a minor in Management, looking for a software development internship.

The English/Bosnian interface highlights Lens Caffe System (in active development), the independently owned gradanski.ba portal, and other GitHub projects. It includes project filters, project detail pages, responsive navigation and a portfolio assistant.

## Development

Use Node.js 22 and npm:

```sh
npm ci --legacy-peer-deps
npm run dev
```

## Validation

```sh
npx tsc --noEmit
npm run build
npm start
```

## Netlify

Production URL: https://adinbrkic.netlify.app

Connect this repository's `main` branch to the existing Netlify project. `netlify.toml` defines the build and Node version. Netlify's Next.js integration handles the server route at `/api/chat`; this is not a plain static HTML upload.

The assistant works without external credentials using English/Bosnian replies based on portfolio facts. An optional `OPENAI_API_KEY` can be set in Netlify's environment for generated replies. Never commit credentials.

The homepage is server-rendered immediately, with no blocking intro or full-page particle canvas. Language preference is saved when browser storage is available; reduced-motion preferences are respected.
