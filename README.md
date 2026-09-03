# Racing Through Midlife

Jay and Michelle Miller. Honolulu age-group racing journal.

## Add a field note, race, or lesson

Open `src/lib/content.ts` and append an object to `posts`:

```ts
{
  slug: "week-of-september-7",
  kind: "note", // or "race" | "lesson"
  title: "Field note: the title",
  date: "2026-09-07",
  dek: "One sentence.",
  image: "/images/bikes-rack.jpg",
  body: ["Paragraph one.", "Paragraph two."],
}
```

Put images in `public/images/`. Commit. Vercel publishes.

## Local

```
npm install
npm run dev
```
