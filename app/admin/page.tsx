'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

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

export default function AdminDashboard() {
  const router = useRouter();
  const [jobs, setJobs] = useState<JobUpdate[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    description: '',
    url: '',
    tags: '',
    is_featured: false,
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const res = await fetch('/api/admin/jobs');
    if (res.ok) {
      const data = await res.json();
      setJobs(data);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/admin/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        }),
      });

      if (res.ok) {
        setFormData({
          title: '',
          company: '',
          description: '',
          url: '',
          tags: '',
          is_featured: false,
        });
        fetchJobs();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this job?')) return;
    
    const res = await fetch(`/api/admin/jobs/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      fetchJobs();
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">
            Admin Dashboard <span className="text-gray-500 font-normal">— usekraft.xyz</span>
          </h1>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-600 hover:text-gray-900 underline"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Post New Job</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Apply URL</label>
                <input
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData({...formData, url: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tags <span className="text-gray-500 font-normal">(comma-separated)</span>
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({...formData, tags: e.target.value})}
                  placeholder="Remote, Solidity, DeFi"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.is_featured}
                  onChange={(e) => setFormData({...formData, is_featured: e.target.checked})}
                  className="w-4 h-4 rounded border-gray-300"
                />
                <label htmlFor="featured" className="text-sm text-gray-700">Featured job</label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
              >
                {loading ? 'Publishing...' : 'Publish Job Update'}
              </button>
            </form>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Existing Jobs ({jobs.length})
            </h2>
            
            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-4"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{job.title}</h3>
                      <p className="text-sm text-gray-600">{job.company}</p>
                      
                      {job.tags && job.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {job.tags.map((tag, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      {job.is_featured && (
                        <span className="inline-block mt-2 px-2 py-0.5 bg-amber-100 text-amber-800 text-xs rounded-full">
                          Featured
                        </span>
                      )}
                    </div>
                    
                    <button
                      onClick={() => handleDelete(job.id)}
                      className="text-red-600 hover:text-red-800 text-sm ml-4"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
              
              {jobs.length === 0 && (
                <p className="text-gray-500 text-center py-8">No jobs posted yet</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
