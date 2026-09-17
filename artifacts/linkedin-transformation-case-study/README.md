# LinkedIn Profile Transformation — Concept Case Study

A polished, single-page portfolio case study for **OLAONIPEKUN DOLAPO**: AI Copywriter, LinkedIn Profile Strategist, and Frontend Developer.

## Project overview

This speculative case study documents a before-and-after transformation for Maya Reynolds, a fictional Executive Leadership Coach. The page demonstrates how audience positioning, conversion copywriting, AI-assisted ideation, and frontend craft can turn a broad professional profile into a clearer invitation to the right conversation.

## Business challenge

Maya’s original profile was credible but too broad. It described coaching activities without making the audience, leadership problems, differentiation, or next step immediately clear. The redesign focuses on newly promoted managers and technically strong professionals transitioning into leadership.

## Copywriting approach

- Narrow the audience to make the specialization immediately understandable.
- Lead with the reader’s lived leadership transition instead of credentials.
- Translate abstract services into tangible workplace outcomes.
- Use a low-friction call to action: message the word “LEAD.”
- Keep every claim specific, credible, and defensible.

## AI’s role in the workflow

AI supported audience and pain-point exploration, alternative headline generation, copy variations, structural ideas, clarity edits, frontend scaffolding, and code review. Human judgment selected the positioning, removed generic language, protected a natural voice, verified claims, and avoided fabricated results or testimonials.

## Technology used

- Plain HTML5
- CSS3 with responsive layout, custom properties, motion, and reduced-motion support
- Vanilla JavaScript
- Google Fonts (DM Sans, Fraunces, Space Mono)
- Lucide icons via CDN
- Vite only as a static development/build server

There is no React, TypeScript, backend, analytics, or client data in this page.

## How to run

From the repository root, use the workspace's existing Vite workflow. The artifact serves `index.html` as the entry point. For a local standalone preview:

```bash
cd artifacts/linkedin-transformation-case-study
npm run dev
```

The Vite config expects the workspace environment's `PORT` and `BASE_PATH` values. In a normal Vite shell these can be supplied manually:

```bash
PORT=5173 BASE_PATH=/ npm run dev
```

## How to customize

- Set `PORTFOLIO_EMAIL` and `PORTFOLIO_LINKEDIN_URL` in `script.js` before publishing.
- Update the Maya Reynolds profile copy in the Before/After comparison cards.
- Update the footer name, role labels, social links, and page metadata if using the case study as a personal portfolio template.
- Keep the “Concept Project” label and disclosure when the work is still speculative.

## Ethical note

Maya Reynolds and the profile are fictional. This is an independent concept project and does not claim real client results, revenue, leads, conversion rates, testimonials, engagement metrics, or deployment outcomes. The strategic improvements are qualitative intentions only.