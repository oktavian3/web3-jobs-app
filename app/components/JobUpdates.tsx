import { createServerClient } from '@/lib/supabase';
import { PostCard } from '@/components/landing/PostCard';

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

export default async function JobUpdates() {
  const supabase = createServerClient();

  if (!supabase) return null;

  const { data: jobs } = await supabase.from('job_updates').select('*').order('created_at', { ascending: false }).limit(10);

  if (!jobs?.length) return null;

  return (
    <section className="py-12">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">Fresh posts</p>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-900">Latest updates from us</h2>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {jobs.map((job: JobUpdate) => (
          <PostCard
            key={job.id}
            title={job.title}
            company={job.company}
            description={job.description}
            url={job.url}
            tags={job.tags ?? []}
            featured={job.is_featured}
          />
        ))}
      </div>
    </section>
  );
}
