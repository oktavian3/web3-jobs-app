import type { Metadata } from "next";
import { roles } from "@/data/roles";
import { getRoleContent, getEmploymentModels } from "@/data/roleContent";
import { Shell, Container } from "@/components/kraft/Primitives";
import PageHeader from "@/components/kraft/PageHeader";
import RolesDirectory, { type DirectoryRole } from "@/components/kraft/RolesDirectory";

export const metadata: Metadata = {
  title: "Web3 Role Directory",
  description:
    "Browse all 42 canonical Web3 roles. Filter by career lane, work style, entry level, and employment model, and search alternative titles.",
};

// Build compact directory records from canonical structured data (server side).
const directoryRoles: DirectoryRole[] = roles.map((role) => {
  const content = getRoleContent(role.slug);
  return {
    slug: role.slug,
    title: role.title,
    lane: role.lane,
    level: role.level,
    mode: role.mode,
    summary: content?.summary ?? role.summary,
    altTitles: role.alternativeTitles,
    employmentModels: getEmploymentModels(role.slug),
    tags: role.tags,
  };
});

export default function RolesPage() {
  return (
    <Shell>
      <Container className="space-y-10 py-12 sm:py-16">
        <PageHeader
          eyebrow="Role directory"
          title="Find the role closest to the work you want to do."
          copy="Browse the full 42-role taxonomy by actual work rather than title familiarity. Filter by lane, work style, entry level, and employment model, then read the boundary notes before choosing."
        />
        <RolesDirectory roles={directoryRoles} />
      </Container>
    </Shell>
  );
}
