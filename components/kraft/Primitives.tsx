import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

export function Container({
  children,
  className = "",
  width = "default",
}: {
  children: ReactNode;
  className?: string;
  /** "wide" = 1280px marketing measure; default = 1180px reading measure. */
  width?: "default" | "wide";
}) {
  const measure = width === "wide" ? "max-w-[1280px]" : "max-w-[1180px]";
  return <div className={`mx-auto w-full ${measure} px-5 sm:px-6 lg:px-10 ${className}`}>{children}</div>;
}

export function Shell({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className="site-frame">
      <div className={`site-canvas ${className}`}>{children}</div>
    </div>
  );
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`eyebrow inline-flex w-fit items-center ${className}`}>{children}</span>;
}

export function SectionHeading({
  eyebrow,
  title,
  copy,
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  copy?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-[760px]"}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className={`${eyebrow ? "mt-4" : ""} text-[32px] font-medium leading-[1.04] tracking-[-0.04em] text-ink sm:text-[40px] lg:text-[48px]`}>{title}</h2>
      {copy ? <p className={`mt-4 text-[16px] leading-[1.6] text-muted ${align === "center" ? "mx-auto max-w-2xl" : "max-w-[620px]"}`}>{copy}</p> : null}
    </div>
  );
}

export function PrimaryLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="btn-primary group">
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
    </Link>
  );
}

export function SecondaryLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="btn-secondary group">
      {children}
      <ArrowRight className="h-4 w-4 text-muted transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
    </Link>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`card-surface ${className}`}>{children}</div>;
}

export function BluePanel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`blue-panel ${className}`}>{children}</section>;
}

/** Closing call to action used at the bottom of most pages. */
export function FinalCTA({
  title,
  copy,
  primary,
  secondary,
}: {
  title: string;
  copy: string;
  primary: { href: string; label: string };
  secondary: { href: string; label: string };
}) {
  return (
    <BluePanel>
      <div className="relative grid items-end gap-8 px-7 py-14 sm:px-12 md:grid-cols-[1.25fr_1fr] md:py-20 lg:px-16">
        <h2 className="text-[40px] font-medium leading-[0.98] tracking-[-0.045em] text-white sm:text-[56px] lg:text-[68px]">{title}</h2>
        <div>
          <p className="max-w-md text-[16px] leading-[1.6] text-white/85">{copy}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href={primary.href} className="btn-white group">
              {primary.label}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
            <Link href={secondary.href} className="btn-ghost-white">
              {secondary.label}
            </Link>
          </div>
        </div>
      </div>
    </BluePanel>
  );
}
