import type { LucideIcon } from 'lucide-react';

export default function ToolPageHeader({ eyebrow, title, description, icon: Icon }: { eyebrow: string; title: string; description: string; icon: LucideIcon }) {
  return (
    <header className="mb-10 text-center">
      <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-purple-700"><Icon className="h-6 w-6" /></div>
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-purple-700">{eyebrow}</p>
      <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-medium tracking-tight sm:text-5xl">{title}</h1>
      <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted sm:text-lg">{description}</p>
    </header>
  );
}
