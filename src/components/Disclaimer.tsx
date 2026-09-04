import { SITE } from "@/lib/site";

export default function Disclaimer({ className = "" }: { className?: string }) {
  return (
    <p className={`mono text-xs text-mute leading-relaxed border-t border-line pt-4 ${className}`}>
      {SITE.disclaimer} These are two people’s notes, not a prescription. Talk to your own doctor before you start any of this.
    </p>
  );
}
