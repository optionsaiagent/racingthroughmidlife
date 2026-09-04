export default function PageHeader({
  eyebrow,
  title,
  deck,
  children,
}: {
  eyebrow: string;
  title: string;
  deck?: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="mx-auto max-w-6xl px-5 sm:px-8 pt-14 sm:pt-20 pb-10">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="display text-5xl sm:text-7xl mt-3 max-w-4xl">{title}</h1>
      {deck ? <p className="mt-6 max-w-2xl text-xl leading-snug text-ink-soft">{deck}</p> : null}
      {children}
    </header>
  );
}
