import { ArrowUpRight, CheckCircle2, Languages } from "lucide-react";
import { creatorGuide } from "@/data/creatorGuide";
import { Shell, Container, SectionHeading, Card, FinalCTA } from "@/components/kraft/Primitives";

export const metadata = {
  title: "Panduan Jadi Web3 Creator",
};

export default function CreatorGuidePage() {
  return (
    <Shell>
      <Container className="space-y-12 py-12 sm:py-16">
        <SectionHeading eyebrow="Creator" title={creatorGuide.title} copy={creatorGuide.subtitle} />

        <Card className="grid gap-5 p-5 sm:p-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-[28px] bg-[linear-gradient(145deg,#146bff,#75caff)] p-6 text-white shadow-blue">
            <Languages className="h-8 w-8" />
            <p className="mt-5 text-sm font-extrabold uppercase tracking-[0.14em] text-blue-50">{creatorGuide.language}</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight">Creator path, bukan papan iklan.</h2>
            <p className="mt-3 text-sm leading-6 text-white/92">
              Fokus guide ini adalah membangun positioning, output, trust, dan income path yang realistis tanpa mengorbankan kualitas akun.
            </p>
          </div>
          <div className="rounded-[28px] border border-blue-100 bg-soft p-5">
            <span className="tag">Featured source</span>
            <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-ink">{creatorGuide.source.title}</h2>
            <p className="mt-3 text-sm leading-6 text-muted">{creatorGuide.source.description}</p>
            <a href={creatorGuide.source.url} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-blue-700">
              Read the original post <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </Card>

        <section className="grid gap-5 lg:grid-cols-2">
          {creatorGuide.sections.map((section) => (
            <Card key={section.title} className="reveal-card p-5 sm:p-6">
              <h2 className="text-2xl font-extrabold tracking-tight text-ink">{section.title}</h2>
              <div className="mt-5 grid gap-3">
                {section.points.map((point) => (
                  <div key={point} className="flex gap-3 rounded-2xl border border-blue-100 bg-soft p-4">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                    <p className="text-sm font-bold leading-6 text-ink">{point}</p>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </section>

        <Card className="p-5 sm:p-6">
          <span className="tag">30-day starter checklist</span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink">Mulai dengan ritme yang bisa dipertahankan.</h2>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {creatorGuide.checklist30Days.map((item) => (
              <div key={item} className="rounded-2xl border border-blue-100 bg-[linear-gradient(180deg,#ffffff,#eef6ff)] p-4 text-sm font-bold leading-6 text-ink">
                {item}
              </div>
            ))}
          </div>
        </Card>

        <FinalCTA title="Ubah belajar jadi proof-of-work." copy="Pilih satu format, publish dengan sumber yang jelas, lalu simpan hasilnya sebagai portfolio creator." primary={{ href: "/portfolio", label: "Open Portfolio" }} secondary={{ href: "/learn-web3", label: "Back to Learn Web3" }} />
      </Container>
    </Shell>
  );
}
