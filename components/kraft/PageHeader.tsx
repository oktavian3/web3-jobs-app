import { Eyebrow } from "@/components/kraft/Primitives";

// Page-level header with a semantic <h1>. Use once per page as the top heading;
// use SectionHeading (which renders <h2>) for sections below it.
export default function PageHeader({
  eyebrow,
  title,
  copy,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-[860px]"}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="mt-4 text-[38px] font-medium leading-[1.02] tracking-[-0.045em] text-ink sm:text-[52px] lg:text-[60px]">{title}</h1>
      {copy ? <p className={`mt-5 text-[16.5px] leading-[1.6] text-muted ${align === "center" ? "mx-auto max-w-2xl" : "max-w-[700px]"}`}>{copy}</p> : null}
    </div>
  );
}
