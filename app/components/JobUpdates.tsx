import { supabase } from '@/lib/supabase';

interface JobUpdate {
  id: string;
  title: string;
  company: string;
  description: string;
  url: string;
  tags: string[];
  is_featured: boolean;
  created_at: string;
}

export default async function JobUpdates() {
  const { data: jobs } = await supabase
    .from('job_updates')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10);

  if (!jobs || jobs.length === 0) {
    return null;
  }

  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Latest Updates from Us
      </h2>
      
      <div className="grid md:grid-cols-2 gap-4">
        {jobs.map((job: JobUpdate) => (
          <div
            key={job.id}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-gray-900">{job.title}</h3>
                <p className="text-sm text-gray-600">{job.company}</p>
              </div>
              {job.is_featured && (
                <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">
                  Featured
                </span>
              )}
            </div>
            
            <p className="text-gray-700 text-sm mb-4 line-clamp-2">
              {job.description}
            </p>
            
            {job.tags && job.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-4">
                {job.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            
            <a
              href={job.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-gray-900 hover:underline"
            >
              Apply
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
