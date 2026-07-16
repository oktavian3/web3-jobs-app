import { Shell, Container, SectionHeading } from '@/components/kraft/Primitives';
import { PostCard } from '@/components/landing/PostCard';
import { createServerClient } from '@/lib/supabase';

type JobUpdate = {
  id: string;
  title: string;
  company: string;
  description: string;
  url: string;
  tags: string[];
  is_featured: boolean;
  created_at: string;
};

export default async function PostsPage() {
  const supabase = createServerClient();

  if (!supabase) {
    return null;
  }

  const { data } = await supabase.from('job_updates').select('*').order('created_at', { ascending: false }).limit(24);
  const posts = (data ?? []) as JobUpdate[];

  return (
    <Shell>
      <Container className="space-y-12 py-12 sm:py-16">
        <SectionHeading eyebrow="Posts" title="All published updates in one place." copy="This archive reuses the same post card as the homepage feed and admin studio." />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {posts.length ? posts.map((post) => (
            <PostCard
              key={post.id}
              title={post.title}
              company={post.company}
              description={post.description}
              url={post.url}
              tags={post.tags ?? []}
              featured={post.is_featured}
            />
          )) : (
            <div className="rounded-[24px] border border-dashed border-black/10 bg-white p-10 text-center text-sm text-slate-500 md:col-span-2 xl:col-span-3">
              No published posts yet.
            </div>
          )}
        </div>
      </Container>
    </Shell>
  );
}
