import type { CVData } from "@/lib/cv-maker/types";

// The single ATS-safe render target - also what gets printed to PDF via
// window.print() (see #cv-preview targeting in app/globals.css's @media
// print block). Rules that matter here, per the build spec:
//
// - Single column only. No tables, no CSS multi-column, no floated boxes.
// - Exact uppercase section headings (parsers pattern-match on these).
// - No photo, no icons - ever, in this file. Icons belong in the editor
//   chrome (the step forms), never in the exported document.
// - Arial/Helvetica/sans-serif via inline style, not a Tailwind class, so it
//   cannot be silently overridden by the site's own Manrope font rules.
// - A section heading never renders unless at least one field in that
//   section has real content - an empty heading confuses ATS parsers.
// - Section order: Contact → Summary → Experience → Projects → Education →
//   Certifications → Skills → Languages → Awards.

const ATS_FONT = { fontFamily: "Arial, Helvetica, sans-serif" };

function Heading({ children }: { children: string }) {
  return <h2 className="border-b border-black/25 pb-1 text-[13px] font-bold tracking-[0.08em] text-blue-800">{children}</h2>;
}

function hasText(value: string | undefined): boolean {
  return Boolean(value && value.trim().length > 0);
}

export default function CVPreview({ data }: { data: CVData }) {
  const { contact, summary, experience, education, skills, certifications, projects, languages, awards } = data;

  const contactLine = [contact.location, contact.email, contact.phone, contact.linkedin, contact.portfolioUrl]
    .filter(hasText)
    .join("  |  ");

  const visibleExperience = experience.filter(
    (entry) => hasText(entry.title) || hasText(entry.company) || entry.bullets.some(hasText)
  );
  const visibleEducation = education.filter((entry) => hasText(entry.degree) || hasText(entry.school));
  const visibleCertifications = certifications.filter((entry) => hasText(entry.name) || hasText(entry.issuer));
  const visibleProjects = projects.filter((entry) => hasText(entry.name) || hasText(entry.description));
  const visibleLanguages = languages.filter((entry) => hasText(entry.language));
  const visibleAwards = awards.filter((entry) => hasText(entry.title) || hasText(entry.issuer));

  return (
    <div
      id="cv-preview"
      className="mx-auto w-full max-w-[720px] bg-white p-8 text-[13px] leading-6 text-black shadow-soft sm:p-10"
      style={ATS_FONT}
    >
      {/* Contact header */}
      <header className="cv-section border-b border-black/15 pb-3">
        <p className="text-[22px] font-bold leading-tight">{hasText(contact.name) ? contact.name : "Your Name"}</p>
        {hasText(contact.title) && (
          <p className="mt-0.5 text-[13px] font-bold uppercase tracking-[0.04em] text-blue-800">{contact.title}</p>
        )}
        {contactLine && <p className="mt-1.5 text-[11px] text-black/80">{contactLine}</p>}
      </header>

      {hasText(summary) && (
        <section className="cv-section mt-6">
          <Heading>SUMMARY</Heading>
          <p className="mt-2 whitespace-pre-line">{summary}</p>
        </section>
      )}

      {visibleExperience.length > 0 && (
        <section className="cv-section mt-6">
          <Heading>EXPERIENCE</Heading>
          {visibleExperience.map((entry) => {
            const bullets = entry.bullets.filter(hasText);
            return (
              <div key={entry.id} className="cv-experience-entry mt-3">
                <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <p className="font-bold">
                    {entry.title}
                    {hasText(entry.company) ? ` - ${entry.company}` : ""}
                  </p>
                  {(hasText(entry.start) || hasText(entry.end)) && (
                    <p className="whitespace-nowrap text-[12px] text-black/80">
                      {entry.start}
                      {hasText(entry.start) || hasText(entry.end) ? " - " : ""}
                      {entry.end}
                    </p>
                  )}
                </div>
                {hasText(entry.location) && <p className="text-[12px] text-black/80">{entry.location}</p>}
                {bullets.length > 0 && (
                  <ul className="mt-1 list-disc space-y-0.5 pl-5">
                    {bullets.map((bullet, i) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </section>
      )}

      {visibleProjects.length > 0 && (
        <section className="cv-section mt-6">
          <Heading>PROJECTS</Heading>
          {visibleProjects.map((entry) => (
            <div key={entry.id} className="mt-3">
              <p className="font-bold">
                {entry.name}
                {hasText(entry.link) ? ` - ${entry.link}` : ""}
              </p>
              {hasText(entry.description) && <p className="mt-0.5">{entry.description}</p>}
            </div>
          ))}
        </section>
      )}

      {visibleEducation.length > 0 && (
        <section className="cv-section mt-6">
          <Heading>EDUCATION</Heading>
          {visibleEducation.map((entry) => (
            <div key={entry.id} className="cv-education-entry mt-3">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <p className="font-bold">
                  {entry.degree}
                  {hasText(entry.school) ? ` - ${entry.school}` : ""}
                </p>
                {(hasText(entry.start) || hasText(entry.end)) && (
                  <p className="whitespace-nowrap text-[12px] text-black/80">
                    {entry.start}
                    {hasText(entry.start) || hasText(entry.end) ? " - " : ""}
                    {entry.end}
                  </p>
                )}
              </div>
              {hasText(entry.location) && <p className="text-[12px] text-black/80">{entry.location}</p>}
            </div>
          ))}
        </section>
      )}

      {visibleCertifications.length > 0 && (
        <section className="cv-section mt-6">
          <Heading>CERTIFICATIONS</Heading>
          <ul className="mt-2 list-disc space-y-0.5 pl-5">
            {visibleCertifications.map((entry) => (
              <li key={entry.id}>
                {entry.name}
                {hasText(entry.issuer) ? ` - ${entry.issuer}` : ""}
                {hasText(entry.date) ? ` (${entry.date})` : ""}
                {hasText(entry.credentialUrl) ? ` - ${entry.credentialUrl}` : ""}
              </li>
            ))}
          </ul>
        </section>
      )}

      {hasText(skills) && (
        <section className="cv-section mt-6">
          <Heading>SKILLS</Heading>
          <p className="mt-2">{skills}</p>
        </section>
      )}

      {visibleLanguages.length > 0 && (
        <section className="cv-section mt-6">
          <Heading>LANGUAGES</Heading>
          <ul className="mt-2 list-disc space-y-0.5 pl-5">
            {visibleLanguages.map((entry) => (
              <li key={entry.id}>
                {entry.language}
                {hasText(entry.proficiency) ? ` - ${entry.proficiency}` : ""}
              </li>
            ))}
          </ul>
        </section>
      )}

      {visibleAwards.length > 0 && (
        <section className="cv-section mt-6">
          <Heading>AWARDS</Heading>
          <ul className="mt-2 list-disc space-y-0.5 pl-5">
            {visibleAwards.map((entry) => (
              <li key={entry.id}>
                {entry.title}
                {hasText(entry.issuer) ? ` - ${entry.issuer}` : ""}
                {hasText(entry.date) ? ` (${entry.date})` : ""}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
