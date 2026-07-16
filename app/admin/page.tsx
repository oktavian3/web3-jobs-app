'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

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

const emptyForm = {
  title: '',
  company: '',
  description: '',
  url: '',
  tags: '',
  is_featured: false,
};

export default function AdminDashboard() {
  const router = useRouter();
  const [jobs, setJobs] = useState<JobUpdate[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(emptyForm);

  const previewTags = useMemo(() => formData.tags.split(',').map((t) => t.trim()).filter(Boolean), [formData.tags]);

  useEffect(() => {
    void fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const res = await fetch('/api/admin/jobs');
    if (res.ok) setJobs(await res.json());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/admin/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, tags: previewTags }),
      });
      if (res.ok) {
        setFormData(emptyForm);
        await fetchJobs();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this post?')) return;
    const res = await fetch(`/api/admin/jobs/${id}`, { method: 'DELETE' });
    if (res.ok) await fetchJobs();
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#f6f1ea] text-slate-900">
      <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,rgba(247,168,0,0.22),transparent_55%),linear-gradient(180deg,rgba(18,24,38,0.08),transparent)] pointer-events-none" />
      <header className="sticky top-0 z-10 border-b border-black/10 bg-white/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-amber-700">Admin</p>
            <h1 className="text-xl font-black tracking-tight">Content Studio</h1>
          </div>
          <button onClick={handleLogout} className="rounded-full border border-black/10 px-4 py-2 text-sm font-semibold hover:bg-black hover:text-white">Logout</button>
        </div>
      </header>

      <main className="relative mx-auto grid max-w-6xl gap-8 px-6 py-8 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="rounded-[28px] border border-black/10 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">Template</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight">Create a post</h2>
            <p className="mt-2 text-sm text-slate-600">This is the default template for new updates, jobs, or announcements.</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input className="w-full rounded-2xl border border-black/10 bg-[#fbfaf7] px-4 py-3 outline-none ring-0 placeholder:text-slate-400 focus:border-amber-500" placeholder="Post title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
            <input className="w-full rounded-2xl border border-black/10 bg-[#fbfaf7] px-4 py-3 outline-none placeholder:text-slate-400 focus:border-amber-500" placeholder="Company / source" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} required />
            <textarea className="w-full rounded-2xl border border-black/10 bg-[#fbfaf7] px-4 py-3 outline-none placeholder:text-slate-400 focus:border-amber-500" rows={5} placeholder="Post description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />
            <input className="w-full rounded-2xl border border-black/10 bg-[#fbfaf7] px-4 py-3 outline-none placeholder:text-slate-400 focus:border-amber-500" placeholder="Target URL" type="url" value={formData.url} onChange={(e) => setFormData({ ...formData, url: e.target.value })} required />
            <input className="w-full rounded-2xl border border-black/10 bg-[#fbfaf7] px-4 py-3 outline-none placeholder:text-slate-400 focus:border-amber-500" placeholder="Tags, comma-separated" value={formData.tags} onChange={(e) => setFormData({ ...formData, tags: e.target.value })} />
            <label className="flex items-center gap-3 rounded-2xl border border-black/10 bg-[#fbfaf7] px-4 py-3 text-sm font-medium"><input type="checkbox" checked={formData.is_featured} onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })} /> Feature this post</label>
            <button type="submit" disabled={loading} className="w-full rounded-2xl bg-slate-900 px-4 py-3 font-bold text-white transition hover:bg-slate-800 disabled:opacity-50">{loading ? 'Publishing...' : 'Publish post'}</button>
          </form>
        </section>

        <aside className="space-y-8">
          <section className="rounded-[28px] border border-black/10 bg-slate-950 p-6 text-white shadow-[0_20px_60px_rgba(15,23,42,0.16)]">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-300">Preview</p>
            <div className="mt-4 rounded-[24px] border border-white/10 bg-white/5 p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-white/70">{formData.company || 'Source name'}</p>
                  <h3 className="mt-1 text-2xl font-black tracking-tight">{formData.title || 'Your post title here'}</h3>
                </div>
                {formData.is_featured ? <span className="rounded-full bg-amber-300 px-3 py-1 text-xs font-black text-slate-950">Featured</span> : null}
              </div>
              <p className="mt-4 line-clamp-4 text-sm leading-6 text-white/75">{formData.description || 'Write a short, scannable update.'}</p>
              <div className="mt-5 flex flex-wrap gap-2">{previewTags.map((tag) => <span key={tag} className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">{tag}</span>)}</div>
            </div>
          </section>

          <section>
            <div className="mb-4 flex items-end justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">Posts</p>
                <h2 className="mt-2 text-2xl font-black tracking-tight">Live content</h2>
              </div>
              <span className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-slate-600 shadow-sm">{jobs.length} items</span>
            </div>
            <div className="space-y-4 max-h-[620px] overflow-y-auto pr-1">
              {jobs.map((job) => (
                <article key={job.id} className="rounded-[24px] border border-black/10 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-slate-500">{job.company}</p>
                      <h3 className="mt-1 text-lg font-black tracking-tight">{job.title}</h3>
                    </div>
                    <button onClick={() => handleDelete(job.id)} className="rounded-full border border-red-200 px-3 py-1 text-xs font-bold text-red-700 hover:bg-red-50">Delete</button>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600 line-clamp-3">{job.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">{job.tags?.map((tag) => <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">{tag}</span>)}</div>
                </article>
              ))}
              {jobs.length === 0 ? <p className="rounded-[24px] border border-dashed border-black/10 bg-white p-8 text-center text-sm text-slate-500">No posts yet.</p> : null}
            </div>
          </section>
        </aside>
      </main>
    </div>
  );
}
