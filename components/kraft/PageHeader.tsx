import { Eyebrow } from "@/components/kraft/Primitives";

// Page-level header with a semantic <h1>. Use once per page as the top heading;
// use SectionHeading (which renders <h2>) for sections below it.
export default function PageHeader({
  eyebrow,
  title,
  copy,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-5xl">{title}</h1>
      {copy ? <p className="mt-4 text-base leading-7 text-muted sm:text-lg">{copy}</p> : null}
    </div>
  );
}
