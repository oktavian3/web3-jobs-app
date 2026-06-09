import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Container, FooterColumn } from '@/components/landing/Primitives';

const exploreLinks = [
  { href: '/roles', label: 'Roles' },
  { href: '/glossary', label: 'Glossary' },
  { href: '/jobs', label: 'Job boards' },
  { href: '/get-hired', label: 'Get hired' },
];

const careerToolLinks = [
  { href: '/skill-check', label: 'Skill check' },
  { href: '/roadmap', label: 'Roadmap' },
  { href: '/interview', label: 'Interview prep' },
  { href: '/portfolio', label: 'Portfolio builder' },
  { href: '/salary', label: 'Salary explorer' },
];

const kraftLinks = [
  { href: '/faq', label: 'FAQ' },
  { href: '/disclaimers', label: 'Disclaimers' },
  { href: 'https://t.me/satyaxbt', label: 'Telegram ↗', external: true },
];

export default function Footer() {
  return (
    <footer className="bg-[#f7f7f8] py-6 sm:py-8">
      <Container>
        <div className="rounded-[28px] border border-black/[0.06] bg-white px-6 py-9 shadow-[0_16px_50px_rgba(24,21,38,0.05)] sm:px-8 lg:px-10">
          <div className="grid gap-10 md:grid-cols-[1.45fr_1fr_1fr_0.8fr] lg:gap-14">
            <div>
              <Link href="/" className="inline-flex">
                <Image
                  src="/images/kraft-logo.png"
                  alt="KRAFT"
                  width={150}
                  height={35}
                  className="h-auto w-[140px] object-contain"
                />
              </Link>
              <p className="mt-5 max-w-xs text-sm leading-6 text-muted">
                Know what the work takes, prove what you can do, and apply with confidence.
              </p>
              <a
                href="https://usekraft.xyz"
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-purple-700"
              >
                usekraft.xyz
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>

            <FooterColumn title="Explore" links={exploreLinks} />
            <FooterColumn title="Career tools" links={careerToolLinks} />
            <FooterColumn title="KRAFT" links={kraftLinks} />
          </div>

          <div className="mt-10 flex flex-col gap-2 border-t border-black/[0.06] pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} KRAFT. Built for Web3 career readiness.</p>
            <p>Educational content, not financial advice.</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
