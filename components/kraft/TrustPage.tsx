import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Shell, Container, Eyebrow } from "@/components/kraft/Primitives";

export type TrustSection = { title: string; paragraphs: string[] };
export type TrustCta = { label: string; href: string };

// Long-form, readable trust/policy page. Approved public copy only.
export default function TrustPage({
  eyebrow,
  headline,
  supporting,
  sections,
  ctas,
}: {
  eyebrow: string;
  headline: string;
  supporting: string;
  sections: TrustSection[];
  ctas: TrustCta[];
}) {
  return (
    <Shell>
      <Container className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <header>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-5xl">{headline}</h1>
            <p className="mt-4 text-lg leading-8 text-muted">{supporting}</p>
          </header>

          <div className="mt-10 space-y-10">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-xl font-extrabold tracking-tight text-ink sm:text-2xl">{section.title}</h2>
                <div className="mt-3 space-y-4">
                  {section.paragraphs.map((p, i) => (
                    <p key={i} className="text-base leading-7 text-muted">{p}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {ctas.length > 0 && (
            <div className="mt-12 flex flex-wrap gap-3 border-t border-border pt-8">
              {ctas.map((cta, i) => (
                <Link
                  key={cta.href}
                  href={cta.href}
                  className={`${i === 0 ? "btn-primary" : "btn-secondary"} group`}
                >
                  {cta.label}
                  {i === 0 && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
                </Link>
              ))}
            </div>
          )}
        </div>
      </Container>
    </Shell>
  );
}
