//components/DesktopSyncMonitor.tsx
import React, { useState } from 'react';
import { AdvisorRegistration, InsuranceEnquiry, ContactMessage, NewsPost } from '../types';
import { Database, Laptop, Plus, Trash2, Send, CheckCircle, RefreshCw } from 'lucide-react';

interface DesktopSyncMonitorProps {
  enquiries: InsuranceEnquiry[];
  advisors: AdvisorRegistration[];
  contacts: ContactMessage[];
  newsPosts: NewsPost[];
  onAddNewsPost: (post: NewsPost) => void;
  onClearData: () => void;
  onDeleteEnquiry: (id: string) => void;
  onDeleteAdvisor: (id: string) => void;
}

export default function DesktopSyncMonitor({
  enquiries,
  advisors,
  contacts,
  newsPosts,
  onAddNewsPost,
  onClearData,
  onDeleteEnquiry,
  onDeleteAdvisor
}: DesktopSyncMonitorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'leads' | 'publish' | 'db'>('leads');
  const [syncStatus, setSyncStatus] = useState<'synced' | 'syncing'>('synced');

  // Form state for creating a mock news post
  const [postTitle, setPostTitle] = useState('');
  const [postCategory, setPostCategory] = useState('Educational');
  const [postDesc, setPostDesc] = useState('');
  const [postContent, setPostContent] = useState('');
  const [postTags, setPostTags] = useState('New Launch, Security');
  const [postImg, setPostImg] = useState('https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=600');

  const triggerSync = () => {
    setSyncStatus('syncing');
    setTimeout(() => {
      setSyncStatus('synced');
    }, 1200);
  };

  const handlePublishPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle || !postDesc) {
      alert('Please fill out the Title and Short Description.');
      return;
    }

    const newPost: NewsPost = {
      id: `news-${Date.now()}`,
      title: postTitle,
      category: postCategory,
      publishDate: new Date().toISOString().split('T')[0],
      description: postDesc,
      content: postContent || 'This article was published live from the connected desktop application through our synchronized MongoDB cluster database.',
      coverImage: postImg,
      author: 'Aynkaran Consultants (Desktop App)',
      tags: postTags.split(',').map(t => t.trim()),
      readTime: '3 min read'
    };

    onAddNewsPost(newPost);
    triggerSync();
    
    // Reset fields
    setPostTitle('');
    setPostDesc('');
    setPostContent('');
    alert('🎉 Article published from Desktop Application! Check the "News & Posts" page.');
  };

  const loadPredefinedPost = () => {
    setPostTitle('How to Save Tax with Section 80C and 10(10D)');
    setPostCategory('Financial Planning');
    setPostDesc('Maximize your deductions and shield your payouts using strategic insurance selection guidelines.');
    setPostContent('In the current fiscal landscape, tax planning remains a cornerstone of wealth preservation. Under Section 80C of the Income Tax Act, premiums paid towards life insurance policies qualify for total deductions up to ₹1.5 Lakhs annually. Additionally, Section 10(10D) makes the entire maturity amount completely tax-free, provided the premium is less than 10% of the sum assured. Combining these two shields with a high-yield savings cover or ULIP optimizes both your growth parameters and protection covers.');
    setPostTags('Tax Planning, Savings, Wealth Management');
    setPostImg('https://images.unsplash.com/photo-1589758438368-0ad531db3366?auto=format&fit=crop&q=80&w=600');
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-24 z-50 bg-slate-900 text-white border border-slate-700 hover:border-blue-500 hover:bg-slate-800 transition-all px-4 py-3 rounded-full flex items-center gap-2.5 shadow-2xl group animate-bounce"
        title="MongoDB & Desktop Sync Monitor"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${syncStatus === 'syncing' ? 'bg-amber-400' : 'bg-emerald-400'}`}></span>
          <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${syncStatus === 'syncing' ? 'bg-amber-500' : 'bg-emerald-500'}`}></span>
        </span>
        <Database className="w-4 h-4 text-slate-300 group-hover:rotate-12 transition-transform" />
        <span className="text-[11px] font-bold tracking-wider uppercase font-mono">
          Desktop Sync Drawer
        </span>
      </button>

      {/* Slide-out Panel Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-end" onClick={() => setIsOpen(false)}>
          <div 
            className="w-full max-w-xl bg-slate-950 text-slate-100 h-full shadow-2xl flex flex-col border-l border-slate-800 animate-slide-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                  <Laptop className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-mono text-sm font-bold tracking-tight text-white uppercase flex items-center gap-2">
                    Desktop App Sync Simulator
                  </h3>
                  <p className="text-[10px] text-slate-400 font-mono">
                    MongoDB Network Cluster: <span className="text-emerald-400 font-semibold">online_cluster_0</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded text-[9px] font-bold font-mono uppercase ${syncStatus === 'synced' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/20' : 'bg-amber-950 text-amber-400 border border-amber-500/20'}`}>
                  {syncStatus === 'synced' ? '● Synced' : '⚙ Syncing...'}
                </span>
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="text-slate-400 hover:text-white font-mono text-lg px-2"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-slate-800 bg-slate-900/50">
              <button 
                onClick={() => { setActiveTab('leads'); triggerSync(); }}
                className={`flex-1 py-3 text-[11px] font-bold tracking-wider uppercase font-mono border-b-2 transition ${activeTab === 'leads' ? 'border-blue-500 text-blue-400 bg-slate-950' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
              >
                📥 Leads Received ({enquiries.length + advisors.length})
              </button>
              <button 
                onClick={() => { setActiveTab('publish'); triggerSync(); }}
                className={`flex-1 py-3 text-[11px] font-bold tracking-wider uppercase font-mono border-b-2 transition ${activeTab === 'publish' ? 'border-blue-500 text-blue-400 bg-slate-950' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
              >
                📰 Desktop Publisher
              </button>
              <button 
                onClick={() => { setActiveTab('db'); triggerSync(); }}
                className={`flex-1 py-3 text-[11px] font-bold tracking-wider uppercase font-mono border-b-2 transition ${activeTab === 'db' ? 'border-blue-500 text-blue-400 bg-slate-950' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
              >
                💾 DB Admin
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
              
              {/* TAB 1: LEADS RECEIVED */}
              {activeTab === 'leads' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase border-l-2 border-amber-500 pl-2 mb-4">
                      Insurance Enquiries ({enquiries.length})
                    </h4>
                    {enquiries.length === 0 ? (
                      <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/20 text-center text-xs font-mono text-slate-500">
                        No enquiries submitted yet. Submit the "Insurance Enquiry" form to see live synchronization.
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {enquiries.map((enq) => (
                          <div key={enq.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 relative group">
                            <button 
                              onClick={() => { onDeleteEnquiry(enq.id); triggerSync(); }}
                              className="absolute top-4 right-4 text-slate-500 hover:text-rose-400 p-1"
                              title="Delete from MongoDB"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] bg-blue-950 text-blue-300 px-1.5 py-0.5 rounded border border-blue-500/20 uppercase font-mono">
                                Enquiry
                              </span>
                              <span className="text-[11px] text-slate-400 font-mono font-semibold">
                                {enq.timestamp}
                              </span>
                            </div>
                            <h5 className="font-bold text-sm text-slate-100">{enq.name} ({enq.gender}, Age {enq.age})</h5>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px] font-mono text-slate-400 pt-1">
                              <p><strong className="text-slate-300">Mobile:</strong> {enq.mobile}</p>
                              <p><strong className="text-slate-300">WhatsApp:</strong> {enq.whatsApp}</p>
                              <p><strong className="text-slate-300">Product:</strong> {enq.productType}</p>
                              <p><strong className="text-slate-300">Partner:</strong> {enq.preferredCompany}</p>
                              <p><strong className="text-slate-300">Income:</strong> {enq.income}</p>
                              <p><strong className="text-slate-300">Time to Call:</strong> {enq.preferredTime}</p>
                            </div>
                            {enq.message && (
                              <p className="text-[11px] bg-slate-950/50 p-2 rounded text-slate-300 border border-slate-800 italic mt-2">
                                "{enq.message}"
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <h4 className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase border-l-2 border-emerald-500 pl-2 mb-4">
                      Advisor Registrations ({advisors.length})
                    </h4>
                    {advisors.length === 0 ? (
                      <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/20 text-center text-xs font-mono text-slate-500">
                        No advisor registrants yet. Fill out the "Become an Advisor" form to see live synchronizations.
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {advisors.map((adv) => (
                          <div key={adv.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 relative group">
                            <button 
                              onClick={() => { onDeleteAdvisor(adv.id); triggerSync(); }}
                              className="absolute top-4 right-4 text-slate-500 hover:text-rose-400 p-1"
                              title="Delete from MongoDB"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] bg-emerald-950 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-500/20 uppercase font-mono">
                                Advisor Applicant
                              </span>
                              <span className="text-[11px] text-slate-400 font-mono font-semibold">
                                {adv.timestamp}
                              </span>
                            </div>
                            <h5 className="font-bold text-sm text-slate-100">{adv.fullName} ({adv.gender}, DOB {adv.dob})</h5>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px] font-mono text-slate-400 pt-1">
                              <p><strong className="text-slate-300">Mobile:</strong> {adv.mobile}</p>
                              <p><strong className="text-slate-300">Email:</strong> {adv.email}</p>
                              <p><strong className="text-slate-300">Occupation:</strong> {adv.occupation}</p>
                              <p><strong className="text-slate-300">City:</strong> {adv.city}, {adv.state}</p>
                              <p><strong className="text-slate-300">Education:</strong> {adv.qualification}</p>
                              <p><strong className="text-slate-300">Has Exp:</strong> {adv.experience ? 'Yes' : 'No'}</p>
                            </div>
                            {adv.message && (
                              <p className="text-[11px] bg-slate-950/50 p-2 rounded text-slate-300 border border-slate-800 italic mt-2">
                                "{adv.message}"
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 2: DESKTOP PUBLISHER */}
              {activeTab === 'publish' && (
                <form onSubmit={handlePublishPost} className="space-y-4">
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-white uppercase font-mono">Quick Template Loader</p>
                      <p className="text-[10px] text-slate-400">Pre-fill high-quality regulatory/tax awareness articles</p>
                    </div>
                    <button 
                      type="button" 
                      onClick={loadPredefinedPost}
                      className="px-3 py-1.5 bg-blue-600 text-white rounded text-[10px] font-bold font-mono tracking-wider hover:bg-blue-700 transition"
                    >
                      LOAD TEMPLATE
                    </button>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider font-mono text-slate-400">Article Title</label>
                    <input 
                      type="text" 
                      value={postTitle}
                      onChange={(e) => setPostTitle(e.target.value)}
                      placeholder="e.g. Navigating Insurance Portability in 2026"
                      className="w-full bg-slate-900 border border-slate-800 p-3 rounded-lg text-xs font-mono text-white outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider font-mono text-slate-400">Category</label>
                      <select 
                        value={postCategory}
                        onChange={(e) => setPostCategory(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 p-3 rounded-lg text-xs font-mono text-white outline-none focus:border-blue-500"
                      >
                        <option>Educational</option>
                        <option>Industry Updates</option>
                        <option>Tips & Guide</option>
                        <option>Recruitment</option>
                        <option>Anouncement</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider font-mono text-slate-400">Tags (comma-separated)</label>
                      <input 
                        type="text" 
                        value={postTags}
                        onChange={(e) => setPostTags(e.target.value)}
                        placeholder="Tax, Guidance, Safety"
                        className="w-full bg-slate-900 border border-slate-800 p-3 rounded-lg text-xs font-mono text-white outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider font-mono text-slate-400">Cover Image URL</label>
                    <input 
                      type="text" 
                      value={postImg}
                      onChange={(e) => setPostImg(e.target.value)}
                      placeholder="Image URL"
                      className="w-full bg-slate-900 border border-slate-800 p-3 rounded-lg text-xs font-mono text-white outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider font-mono text-slate-400">Short Description</label>
                    <textarea 
                      value={postDesc}
                      onChange={(e) => setPostDesc(e.target.value)}
                      placeholder="Enter a brief summary that appears on the home feed cards..."
                      className="w-full bg-slate-900 border border-slate-800 p-3 rounded-lg text-xs font-mono text-white outline-none focus:border-blue-500 h-16 resize-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider font-mono text-slate-400">Full Article Content (HTML or plain text)</label>
                    <textarea 
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}
                      placeholder="Write your article here..."
                      className="w-full bg-slate-900 border border-slate-800 p-3 rounded-lg text-xs font-mono text-white outline-none focus:border-blue-500 h-32"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-mono font-bold tracking-widest text-xs py-3.5 rounded-lg flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    PUBLISH POST TO PUBLIC WEBSITE
                  </button>
                </form>
              )}

              {/* TAB 3: DB ADMIN */}
              {activeTab === 'db' && (
                <div className="space-y-6">
                  <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
                    <h5 className="font-mono text-sm font-bold tracking-tight text-white uppercase">
                      Database Statistics
                    </h5>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
                        <span className="block text-2xl font-bold font-mono text-blue-400">{enquiries.length}</span>
                        <span className="text-[10px] uppercase font-mono text-slate-400">Enquiries stored</span>
                      </div>
                      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
                        <span className="block text-2xl font-bold font-mono text-emerald-400">{advisors.length}</span>
                        <span className="text-[10px] uppercase font-mono text-slate-400">Advisors stored</span>
                      </div>
                      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
                        <span className="block text-2xl font-bold font-mono text-amber-400">{contacts.length}</span>
                        <span className="text-[10px] uppercase font-mono text-slate-400">Contact requests</span>
                      </div>
                      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
                        <span className="block text-2xl font-bold font-mono text-purple-400">{newsPosts.length}</span>
                        <span className="text-[10px] uppercase font-mono text-slate-400">Published articles</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-rose-950/20 border border-rose-500/10 p-6 rounded-2xl space-y-4">
                    <h5 className="font-mono text-sm font-bold tracking-tight text-rose-400 uppercase">
                      Hazardous Operations
                    </h5>
                    <p className="text-xs text-slate-400 leading-relaxed font-mono">
                      Wipe all temporary lead captures and published posts in local database to restore initial state metrics.
                    </p>
                    <button 
                      onClick={() => {
                        if (confirm('Are you absolutely sure you want to clear all mock database records? This resets enquiries, registrations, and custom news articles.')) {
                          onClearData();
                          triggerSync();
                          alert('Database reset complete!');
                        }
                      }}
                      className="px-4 py-2 bg-rose-900/50 text-rose-300 hover:bg-rose-900 border border-rose-500/20 rounded font-mono text-xs uppercase font-bold transition"
                    >
                      WIPE DATABASE STATE
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* Footer Status */}
            <div className="p-4 bg-slate-950 border-t border-slate-900 text-center text-[10px] text-slate-500 font-mono">
              Designed as high-fidelity interactive simulation • MongoDB 7.0 Standard Cluster
            </div>
          </div>
        </div>
      )}
    </>
  );
}
