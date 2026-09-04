export default function DoDont({ dos = [], donts = [] }: { dos?: string[]; donts?: string[] }) {
  if (!dos.length && !donts.length) return null;
  return (
    <aside className="my-10 grid gap-6 sm:grid-cols-2" aria-label="Do's and don'ts">
      <div className="border-t-4 border-brand pt-4">
        <p className="eyebrow !text-brand">Do</p>
        <ul className="mt-3 space-y-3">
          {dos.map((d) => (
            <li key={d} className="flex gap-3 text-[1.05rem] leading-snug">
              <span className="mono text-brand shrink-0">+</span>
              <span>{d}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t-4 border-buoy pt-4">
        <p className="eyebrow !text-buoy">Don&apos;t</p>
        <ul className="mt-3 space-y-3">
          {donts.map((d) => (
            <li key={d} className="flex gap-3 text-[1.05rem] leading-snug">
              <span className="mono text-buoy shrink-0">−</span>
              <span>{d}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
