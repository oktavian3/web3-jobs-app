/* eslint-disable @next/next/no-img-element */
export default function CompanyMark({ company, logo, size = "md" }: { company: string; logo?: string; size?: "sm" | "md" | "lg" }) {
  const dim = size === "lg" ? "h-14 w-14 md:h-[72px] md:w-[72px] rounded-[18px] text-[24px] md:text-[28px]" : size === "sm" ? "h-9 w-9 rounded-[10px] text-[13px]" : "h-11 w-11 rounded-[12px] text-[15px]";
  const letter = company.replace(/[^A-Za-z0-9]/g, "").slice(0, 1).toUpperCase() || "•";
  return (
    <span className={`grid shrink-0 place-items-center overflow-hidden border border-border bg-soft font-semibold text-ink ${dim}`} aria-hidden="true">
      {logo ? <img src={logo} alt="" className="h-full w-full object-cover" loading="lazy" /> : letter}
    </span>
  );
}
