# Timelines

A French-language historical timeline rebuilt with Angular standalone components.

## Development

```sh
npm ci
npm start
npm run build
```

The GitHub Actions workflow builds pull requests and deploys the default branch to `gh-pages`. GitHub Pages must serve the root of that branch.

## Features

- Combine three categories: wars, French political regimes, natural disasters.
- Filter by era, search without accent sensitivity, reverse chronology, jump to key years.
- Native accessible detail dialogs, Wikipedia references, previous/next navigation.
- Local favorites and random discovery; responsive layout and reduced-motion support.

## Editorial scope

26 selected records, not an exhaustive or globally representative history. Political regimes currently cover France. Events are ordered by start year, and spacing is not a proportional time scale. Period filters include overlapping events. The Fifth Republic is open-ended; the First Empire record explains the separate Hundred Days episode. Summaries are original editorial introductions, with linked Wikipedia articles for references and further reading. Dataset: `src/app/events.ts`.
