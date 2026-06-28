import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1220px] px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

export function Shell({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className="site-frame">
      <div className={`site-canvas aurora-surface ${className}`}>{children}</div>
    </div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex w-fit items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-blue-700">
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  copy,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  copy?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-5xl">{title}</h2>
      {copy ? <p className="mt-4 text-base leading-7 text-muted sm:text-lg">{copy}</p> : null}
    </div>
  );
}

export function PrimaryLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="btn-primary group">
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}

export function SecondaryLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="btn-secondary group">
      {children}
    </Link>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`card-surface ${className}`}>{children}</div>;
}

export function BluePanel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`blue-panel ${className}`}>{children}</section>;
}

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
    <BluePanel className="px-5 py-14 text-center sm:px-10 sm:py-16">
      <div className="relative z-10 mx-auto max-w-3xl">
        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-blue-50">{copy}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href={primary.href} className="btn-white group">
            {primary.label}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link href={secondary.href} className="btn-ghost-white">
            {secondary.label}
          </Link>
        </div>
      </div>
    </BluePanel>
  );
}
