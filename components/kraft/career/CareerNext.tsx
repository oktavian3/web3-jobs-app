import Link from "next/link";
import { ArrowRight } from "lucide-react";

export type CareerNextItem = { title: string; href: string; why: string };

// Contextual "what's next" strip. Each item explains WHY the next step is relevant,
// so the same CTA block is not repeated without context across pages.
export default function CareerNext({ heading, items }: { heading: string; items: CareerNextItem[] }) {
  return (
    <section aria-label={heading}>
      <h2 className="text-xl font-extrabold tracking-tight text-ink sm:text-2xl">{heading}</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Link
            key={item.href + item.title}
            href={item.href}
            className="card-surface card-surface--next-step card-surface--interactive group flex h-full flex-col p-4"
          >
            <span className="flex items-center justify-between gap-2">
              <span className="font-extrabold text-ink">{item.title}</span>
              <ArrowRight className="h-4 w-4 text-blue-600 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </span>
            <span className="mt-2 text-sm leading-6 text-muted">{item.why}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
