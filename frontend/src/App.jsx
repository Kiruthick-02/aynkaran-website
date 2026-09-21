// src/App.jsx
import React, { useState, useEffect, useCallback } from 'react';
import {
  servicesData,
  faqData,
  testimonialsData,
} from './data';
import MarqueeTicker from './components/MarqueeTicker';
import { EnquiryForm, ContactForm } from './components/LeadForms';
import {
  AboutUsView,
  CompaniesView,
  ProductsView,
  ClaimsView,
  ServicesView,
  BecomeAdvisorView,
  NewsPostsView,
  GalleryView,
  TestimonialsView,
  FAQsView,
  PostersView,
} from './components/PageViews';
import {
  Umbrella,
  Search,
  ArrowUp,
  Send,
  ArrowLeft,
} from 'lucide-react';

const API_URL =
  import.meta.env.VITE_API_DEPLOYED_URL ||
  import.meta.env.VITE_API_URL ||
  'https://aynkaran-backend.onrender.com';
const DESKTOP_API_URL =
  import.meta.env.VITE_DESKTOP_DEPLOYED_API_URL ||
  import.meta.env.VITE_DESKTOP_API_URL ||
  'https://aynkaran-backend.onrender.com';

const PAGE_PATHS = {
  home: '/',
  about: '/about',
  companies: '/companies',
  products: '/products',
  services: '/services',
  claims: '/claims',
  news: '/news',
  faqs: '/faqs',
  gallery: '/gallery',
  testimonials: '/testimonials',
  contact: '/contact',
  advisor: '/advisor',
  enquiry: '/enquiry',
  posters: '/posters',
};

function pathToPage(pathname) {
  const p = (pathname || '/').replace(/\/$/, '') || '/';
  const found = Object.entries(PAGE_PATHS).find(([, path]) => path === p);
  return found ? found[0] : 'home';
}

function contentMediaUrl(path) {
  if (!path) return null;
  const s = String(path);
  if (/^https?:\/\//i.test(s) || s.startsWith('blob:') || s.startsWith('data:')) {
    return s;
  }
  return `${DESKTOP_API_URL.replace(/\/$/, '')}${s.startsWith('/') ? s : `/${s}`}`;
}

async function fetchCatalog() {
  const res = await fetch(`${API_URL}/api/public/catalog`);
  if (!res.ok) throw new Error('Failed to load catalog');
  return res.json();
}

async function fetchContent() {
  // Preferred single endpoint from desktop Content Publishing
  try {
    const res = await fetch(`${DESKTOP_API_URL}/api/content`);
    if (res.ok) return res.json();
  } catch (_) {}

  // Fallback: separate routes
  const empty = { posters: {}, news: [], gallery: [] };
  try {
    const [p, n, g] = await Promise.allSettled([
      fetch(`${DESKTOP_API_URL}/api/content/posters`).then((r) =>
        r.ok ? r.json() : null
      ),
      fetch(`${DESKTOP_API_URL}/api/content/news`).then((r) =>
        r.ok ? r.json() : null
      ),
      fetch(`${DESKTOP_API_URL}/api/content/gallery`).then((r) =>
        r.ok ? r.json() : null
      ),
    ]);
    return {
      posters:
        p.status === 'fulfilled'
          ? p.value?.posters || p.value || {}
          : {},
      news:
        n.status === 'fulfilled'
          ? Array.isArray(n.value)
            ? n.value
            : n.value?.news || n.value?.posts || []
          : [],
      gallery:
        g.status === 'fulfilled'
          ? Array.isArray(g.value)
            ? g.value
            : g.value?.gallery || []
          : [],
    };
  } catch {
    return empty;
  }
}

/** Sidebar posters from Content Publishing */
function WebsitePosters({ posters = {}, side = 'left', onClickPoster }) {
  // New ordered shape
  const list =
    side === 'left'
      ? posters.customers || []
      : posters.advisors || [];

  // Legacy fallback (old slot shape)
  const legacySlots =
    side === 'left' ? ['leftTop', 'leftBottom'] : ['rightTop', 'rightBottom'];
  const legacyItems = legacySlots
    .map((key) => {
      const p = posters[key];
      const src = contentMediaUrl(p?.url || p?.image);
      if (!src) return null;
      return { id: key, url: src, fileName: p?.fileName };
    })
    .filter(Boolean);

  const items =
    list.length > 0
      ? list.map((p) => ({
          id: p.id,
          url: contentMediaUrl(p.url || p.image),
          fileName: p.fileName,
        })).filter((i) => i.url)
      : legacyItems;

  if (items.length === 0) return null;

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div
          key={item.id}
          role="button"
          tabIndex={0}
          onClick={() => onClickPoster?.(side)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onClickPoster?.(side);
            }
          }}
          className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm cursor-pointer hover:ring-2 hover:ring-blue-400 transition"
          title={side === 'left' ? 'Open Enquiry Form' : 'Open Advisor Form'}
        >
          <img
            src={item.url}
            alt={item.fileName || item.id}
            className="w-full h-auto object-cover max-h-64"
          />
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [activePage, setActivePage] = useState(() =>
    pathToPage(window.location.pathname)
  );
  const [selectedPost, setSelectedPost] = useState(null);

  const [globalSearch, setGlobalSearch] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);

  const [enquiries, setEnquiries] = useState([]);
  const [advisors, setAdvisors] = useState([]);
  const [contacts, setContacts] = useState([]);

  // Live content from desktop Content Publishing (fallback to static data)
  const [posters, setPosters] = useState({});
  const [newsPosts, setNewsPosts] = useState([]);
  const [galleryItems, setGalleryItems] = useState([]);
  const [announcements, setAnnouncements] = useState({ customers: [], advisors: [] });
  const [newsCategories, setNewsCategories] = useState([
  'Educational',
  'Industry Updates',
  'Tips & Guide',
  'Recruitment',
]);
const [galleryCategories, setGalleryCategories] = useState([
  'Events',
  'Training',
  'Meetings',
  'Awards',
  'Office',
]);

  const [companies, setCompanies] = useState([]);
  const [products, setProducts] = useState([]);
  const [catalogLoading, setCatalogLoading] = useState(true);

  // Filter products by company when user clicks a company card
  const [partnerFilter, setPartnerFilter] = useState(null);

  const [sidebarName, setSidebarName] = useState('');
  const [sidebarPhone, setSidebarPhone] = useState('');
  const [sidebarSubmitted, setSidebarSubmitted] = useState(false);

  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'bot',
      text: 'Hi! I’m here to help with life, health, and child education plans. What would you like to know?',
    },
  ]);

  // ---------- Content Publishing polling ----------
  useEffect(() => {
    let cancelled = false;
    let intervalId;

    const loadContent = async () => {
      try {
        const res = await fetch(`${DESKTOP_API_URL}/api/content`);
        if (!res.ok) {
          // keep previous state — do NOT clear
          console.warn('[content] HTTP', res.status);
          return;
        }
        const data = await res.json();

        // Reject error payloads like { success: false, error: "..." }
        if (!data || data.success === false || data.error) {
          console.warn('[content] bad payload', data);
          return;
        }

        if (cancelled) return;

        if (cancelled) return;

// --- Posters (new ordered shape) ---
if (data.posters && typeof data.posters === 'object') {
  // New shape: { customers: [], advisors: [] }
  if (
    Array.isArray(data.posters.customers) ||
    Array.isArray(data.posters.advisors)
  ) {
    setPosters(data.posters);
  } else {
    // Legacy slot shape fallback
    setPosters(data.posters);
  }
}

if (data.categories) {
  if (data.categories.news) setNewsCategories(data.categories.news);
  if (data.categories.gallery) setGalleryCategories(data.categories.gallery);
}

// --- News ---
if (Array.isArray(data.news)) {
  setNewsPosts(data.news);
} else if (Array.isArray(data.posts)) {
  setNewsPosts(data.posts);
}

// --- Gallery ---
if (Array.isArray(data.gallery)) {
  setGalleryItems(data.gallery);
}

// --- Announcements (new) ---
if (data.announcements && typeof data.announcements === 'object') {
  setAnnouncements({
    customers: Array.isArray(data.announcements.customers)
      ? data.announcements.customers
      : [],
    advisors: Array.isArray(data.announcements.advisors)
      ? data.announcements.advisors
      : [],
  });
}
        if (Array.isArray(data.news)) {
          setNewsPosts(data.news);
        } else if (Array.isArray(data.posts)) {
          setNewsPosts(data.posts);
        }
        if (Array.isArray(data.gallery)) {
          setGalleryItems(data.gallery);
        }
        // inside the content polling useEffect, after setGalleryItems:
if (data.announcements) {
  setAnnouncements(data.announcements);
}
      } catch (err) {
        // Network error — keep last good data on screen
        console.warn('[content] fetch failed, keeping previous data', err);
      }
    };

    const start = () => {
      loadContent();
      intervalId = setInterval(loadContent, 8000);
    };
    const stop = () => {
      if (intervalId) clearInterval(intervalId);
    };

    start();
    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelled = true;
      stop();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  // Catalog polling (companies + products)
  useEffect(() => {
    let cancelled = false;
    let intervalId;

    const loadCatalog = async () => {
      try {
        setCatalogLoading(true);
        const res = await fetch(`${API_URL}/api/public/catalog`);
        if (!res.ok) {
          console.warn('[catalog] HTTP', res.status);
          return;
        }
        const data = await res.json();
        if (cancelled) return;
        if (data?.companies && Array.isArray(data.companies)) {
          setCompanies(data.companies);
        }
        if (data?.products && Array.isArray(data.products)) {
          setProducts(data.products);
        }
      } catch (err) {
        console.warn('[catalog] fetch failed', err);
      } finally {
        setCatalogLoading(false);
      }
    };

    const start = () => {
      loadCatalog();
      intervalId = setInterval(loadCatalog, 12000);
    };
    const stop = () => {
      if (intervalId) clearInterval(intervalId);
    };

    start();
    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelled = true;
      stop();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  // ---------- Browser history ----------
  useEffect(() => {
    const page = pathToPage(window.location.pathname);
    window.history.replaceState({ page }, '', PAGE_PATHS[page] || '/');
    setActivePage(page);

    const onPopState = (event) => {
      const next = event.state?.page || pathToPage(window.location.pathname);
      setActivePage(next);
      setSelectedPost(null);
      setShowSearchResults(false);
      if (next !== 'products') {
        setPartnerFilter(null);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      const centerEl = document.getElementById('center-scrollable');
      if (centerEl) centerEl.scrollTop = 0;
    };

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const centerEl = document.getElementById('center-scrollable');
    if (centerEl) centerEl.scrollTop = 0;
  };

  const navigateToPage = (pageName, selectedData, options = {}) => {
    const { replace = false } = options;

    setActivePage(pageName);
    setSelectedPost(null);
    setGlobalSearch('');
    setShowSearchResults(false);

    // Clear company→products filter unless staying on / navigating to products
    // (caller may set partnerFilter just before navigateToPage('products'))
    if (pageName !== 'products') {
      setPartnerFilter(null);
    }

    if (selectedData && pageName === 'news') {
      setSelectedPost(selectedData);
    }

    const path = PAGE_PATHS[pageName] || '/';
    const state = { page: pageName };

    if (replace) window.history.replaceState(state, '', path);
    else window.history.pushState(state, '', path);

    setTimeout(() => handleScrollToTop(), 100);
  };

  const saveEnquiries = (data) => {
    setEnquiries(data);
    localStorage.setItem('sec_enquiries', JSON.stringify(data));
  };

  const saveAdvisors = (data) => {
    setAdvisors(data);
    localStorage.setItem('sec_advisors', JSON.stringify(data));
  };

  const saveContacts = (data) => {
    setContacts(data);
    localStorage.setItem('sec_contacts', JSON.stringify(data));
  };

  const handleAddEnquiry = (enq) => saveEnquiries([enq, ...enquiries]);
  const handleAddAdvisor = (adv) => saveAdvisors([adv, ...advisors]);
  const handleAddContact = (con) => saveContacts([con, ...contacts]);

  const handleSidebarCallback = async (e) => {
    e.preventDefault();
    if (!sidebarName || !sidebarPhone) return;

    const newEnq = {
      id: `enq-${Date.now()}`,
      name: sidebarName,
      gender: 'Not Specified',
      mobile: sidebarPhone,
      whatsApp: sidebarPhone,
      email: 'callback@request.com',
      city: 'Not Specified',
      message: 'Callback requested from sidebar.',
      notes: 'Callback requested from sidebar.',
      source: 'website-sidebar',
      timestamp:
        new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) +
        ', ' +
        new Date().toLocaleDateString(),
      createdAt: new Date().toISOString(),
    };

    // Try desktop enquiries API (Customers → Enquiries)
    try {
      await fetch(`${DESKTOP_API_URL}/api/enquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEnq),
      });
    } catch (_) {}

    handleAddEnquiry(newEnq);
    setSidebarSubmitted(true);
    setSidebarName('');
    setSidebarPhone('');
    setTimeout(() => setSidebarSubmitted(false), 4000);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput;
    setChatMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setChatInput('');

    setTimeout(() => {
      let reply =
        'Great question! You can submit a free enquiry and an advisor will guide you.';
      const lower = userMsg.toLowerCase();
      if (lower.includes('health') || lower.includes('medical')) {
        reply =
          'Our health plans can cover hospital treatment across a wide network. See Products or Services for more.';
      } else if (lower.includes('child') || lower.includes('education')) {
        reply =
          'Child education plans help protect future school and college costs. Open Get a Free Quote to start.';
      } else if (lower.includes('term') || lower.includes('life')) {
        reply =
          'Term life plans offer strong family protection at affordable premiums. Ask us for a simple comparison.';
      } else if (
        lower.includes('advisor') ||
        lower.includes('career') ||
        lower.includes('job')
      ) {
        reply =
          'We welcome new advisors. Open Join as Advisor to apply — training support is included.';
      } else if (lower.includes('claim')) {
        reply =
          'We help with claim documents and follow-up. Visit Claims Help or call our support line.';
      }
      setChatMessages((prev) => [...prev, { sender: 'bot', text: reply }]);
    }, 800);
  };

  const performSearch = () => {
    if (!globalSearch.trim()) return [];
    const term = globalSearch.toLowerCase();
    const results = [];

    products.forEach((p) => {
      if (
        (p.title || '').toLowerCase().includes(term) ||
        (p.description || '').toLowerCase().includes(term)
      ) {
        results.push({
          type: 'Product',
          title: p.title,
          desc: p.description,
          targetPage: 'products',
        });
      }
    });

    companies.forEach((c) => {
      if (
        (c.name || '').toLowerCase().includes(term) ||
        (c.description || '').toLowerCase().includes(term) ||
        (c.shortDescription || '').toLowerCase().includes(term)
      ) {
        results.push({
          type: 'Partner',
          title: c.name,
          desc: c.shortDescription || c.description,
          targetPage: 'companies',
        });
      }
    });

    servicesData.forEach((s) => {
      if (
        s.title.toLowerCase().includes(term) ||
        s.description.toLowerCase().includes(term)
      ) {
        results.push({
          type: 'Service',
          title: s.title,
          desc: s.description,
          targetPage: 'services',
        });
      }
    });

    newsPosts.forEach((n) => {
      if (
        (n.title || '').toLowerCase().includes(term) ||
        (n.description || '').toLowerCase().includes(term)
      ) {
        results.push({
          type: 'Article',
          title: n.title,
          desc: n.description,
          targetPage: 'news',
          dataObj: n,
        });
      }
    });

    faqData.forEach((f) => {
      if (
        f.question.toLowerCase().includes(term) ||
        f.answer.toLowerCase().includes(term)
      ) {
        results.push({
          type: 'FAQ',
          title: f.question,
          desc: f.answer,
          targetPage: 'faqs',
        });
      }
    });

    return results;
  };

  const searchResults = performSearch();

  const navBtn = (page, label, extra = '') => (
    <button
      type="button"
      onClick={() => navigateToPage(page)}
      className={`transition-colors pb-0.5 ${extra} ${
        activePage === page
          ? 'text-[#F4B400] border-b-2 border-[#F4B400]'
          : 'text-sky-100 hover:text-white'
      }`}
    >
      {label}
    </button>
  );

  const selectedCover = selectedPost
    ? contentMediaUrl(
        selectedPost.coverImage || selectedPost.image || selectedPost.url
      )
    : null;

  return (
    <div className="min-h-screen flex flex-col bg-slate-100/70 font-sans select-none antialiased">
      {/* HEADER */}
      <header className="bg-[#0F4C81] text-white z-30 shadow-md flex-shrink-0 sticky top-0">
        <div className="py-4 text-center border-b border-[#0F4C81]/15 bg-[#0D4170]/30">
          <div className="max-w-[1600px] mx-auto px-6 flex justify-between items-center">
            <div className="hidden md:flex items-center gap-1.5 text-[10px] font-mono tracking-widest text-sky-200 font-extrabold uppercase">
              <span className="h-1.5 w-1.5 bg-[#F4B400] rounded-full animate-pulse" />
              IRDAI Licensed
            </div>

            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight uppercase text-white flex items-center gap-3.5 mx-auto">
              <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center shadow-inner">
                <Umbrella className="w-6 h-6 text-[#0F4C81] stroke-[2.5]" />
              </div>
              <div className="text-left leading-none">
                <span className="text-lg md:text-2xl font-black tracking-tight block">
                  Aynkaran Consultants
                </span>
                <span className="text-[10px] md:text-xs text-sky-200 font-mono tracking-wider block uppercase pt-0.5">
                  Insurance made simple for your family
                </span>
              </div>
            </h1>

            <div className="relative hidden md:block">
              <Search className="w-3.5 h-3.5 text-sky-200 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search plans, partners, help..."
                value={globalSearch}
                onChange={(e) => {
                  setGlobalSearch(e.target.value);
                  setShowSearchResults(e.target.value.length > 0);
                }}
                className="w-56 bg-[#0D4170] border border-[#3FA9F5]/20 text-white placeholder-sky-200 focus:border-[#F4B400] pl-8 pr-4 py-1.5 rounded-full text-xs outline-none transition"
              />
              {showSearchResults && (
                <div className="absolute right-0 top-10 w-96 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 p-4 max-h-96 overflow-y-auto space-y-3 text-left">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                    <span className="text-[10px] font-extrabold tracking-wider font-mono text-slate-400 uppercase">
                      Results ({searchResults.length})
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowSearchResults(false)}
                      className="text-slate-400 hover:text-slate-900 text-[10px] font-bold"
                    >
                      Close
                    </button>
                  </div>
                  {searchResults.length === 0 ? (
                    <p className="text-xs text-slate-400 py-4 text-center">
                      No matches found.
                    </p>
                  ) : (
                    searchResults.map((res, idx) => (
                      <div
                        key={idx}
                        onClick={() =>
                          navigateToPage(res.targetPage, res.dataObj)
                        }
                        className="p-2.5 rounded-lg hover:bg-blue-50/50 border border-transparent hover:border-blue-100 cursor-pointer space-y-1 text-left"
                      >
                        <span className="text-[8px] font-extrabold bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded uppercase">
                          {res.type}
                        </span>
                        <h5 className="text-xs font-bold text-slate-800">
                          {res.title}
                        </h5>
                        <p className="text-[10px] text-slate-400 line-clamp-1">
                          {res.desc}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <nav className="bg-[#0F4C81] py-3 px-6 flex flex-wrap justify-center gap-5 md:gap-7 text-[11px] md:text-xs font-black uppercase tracking-widest border-b border-white/5">
          {navBtn('home', 'Home')}
          {navBtn('about', 'About Us')}
          {navBtn('companies', 'Insurers')}
          {navBtn('products', 'Products')}
          {navBtn('services', 'Services')}
          {navBtn('claims', 'Claims Help')}
          {navBtn('news', 'News')}
          {navBtn('faqs', 'FAQs')}
          {navBtn('gallery', 'Gallery')}
          {navBtn('testimonials', 'Reviews')}
          {navBtn('posters', 'Offers')}
          {navBtn('contact', 'Contact')}

          <button
            type="button"
            onClick={() => navigateToPage('enquiry')}
            className={`transition-all text-white bg-[#3FA9F5] px-2.5 py-1 rounded font-black uppercase tracking-widest shadow-sm ${
              activePage === 'enquiry' ? 'ring-2 ring-white' : ''
            }`}
          >
            Enquiry Form
          </button>

          <button
            type="button"
            onClick={() => navigateToPage('advisor')}
            className={`ml-2 transition-all text-[#0F4C81] bg-[#F4B400] px-2.5 py-1 rounded font-black uppercase tracking-widest shadow-sm ${
              activePage === 'advisor' ? 'ring-2 ring-white' : ''
            }`}
          >
            Join as Advisor
          </button>
        </nav>

        <MarqueeTicker announcements={announcements} />
      </header>

      <main className="flex-1 p-4 md:p-6 gap-6 max-w-[1920px] mx-auto w-full flex items-start">
        {/* LEFT SIDEBAR */}
<aside className={`hidden xl:flex flex-col gap-4 flex-shrink-0 sticky top-28 self-start transition-all
  ${posters?.customers?.length > 0 || posters?.leftTop ? 'w-52' : 'w-0 overflow-hidden'}`}>
  <WebsitePosters posters={posters} side="left" onClickPoster={() => navigateToPage('enquiry')} />
</aside>

        {/* CENTER */}
        <section className="flex-1 min-w-0 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col overflow-hidden">
          <div
            id="center-scrollable"
            className="p-6 md:p-8 overflow-y-auto max-h-[calc(100vh-220px)] custom-scrollbar"
          >
            {activePage !== 'home' && (
              <div className="mb-4">
                <button
                  type="button"
                  onClick={() => window.history.back()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition"
                  title="Go back"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous
                </button>
              </div>
            )}

            {activePage === 'home' && (
              <div className="space-y-8 text-left">
                <div className="space-y-3">
                  <span className="text-[10px] bg-sky-50 text-[#0F4C81] px-3 py-1 rounded-full font-bold uppercase tracking-widest border border-sky-100">
                    Welcome
                  </span>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                    Clear insurance guidance for every stage of life
                  </h2>
                  <p className="text-sm text-slate-500 max-w-2xl leading-relaxed">
                    Compare trusted partners, understand your options, and get
                    friendly help choosing life, health, and future plans.
                  </p>
                  <div className="flex flex-wrap gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => navigateToPage('enquiry')}
                      className="px-5 py-2.5 bg-[#3FA9F5] hover:bg-[#2d8fd4] text-white rounded-xl text-xs font-bold uppercase tracking-wider"
                    >
                      Enquiry Form
                    </button>
                    <button
                      type="button"
                      onClick={() => navigateToPage('products')}
                      className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider"
                    >
                      Browse products
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { t: '1. Share details', d: 'Tell us what you need' },
                    { t: '2. We review', d: 'Your request reaches our team' },
                    { t: '3. Expert guidance', d: 'An advisor explains options' },
                    { t: '4. Get covered', d: 'Choose and receive your policy' },
                  ].map((s) => (
                    <div
                      key={s.t}
                      className="p-4 rounded-2xl border border-slate-200 bg-slate-50"
                    >
                      <h5 className="font-bold text-xs text-slate-800">{s.t}</h5>
                      <p className="text-[11px] text-slate-500 mt-1">{s.d}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-br from-[#F4B400] to-amber-600 text-white p-6 rounded-3xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h4 className="font-extrabold text-lg">
                      Want a flexible income opportunity?
                    </h4>
                    <p className="text-xs text-white/90 mt-1">
                      Join as an advisor — training support included.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigateToPage('advisor')}
                    className="bg-white text-amber-700 px-5 py-2.5 rounded-xl font-bold text-xs uppercase"
                  >
                    Apply now
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-sm uppercase tracking-wider text-slate-800 border-l-4 border-[#3FA9F5] pl-2">
                      Latest updates
                    </h4>
                    <button
                      type="button"
                      onClick={() => navigateToPage('news')}
                      className="text-xs text-[#0F4C81] font-bold hover:underline"
                    >
                      View all
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {newsPosts.slice(0, 2).map((post) => {
                      const cover = contentMediaUrl(
                        post.coverImage || post.image || post.url
                      );
                      return (
                        <div
                          key={post.id}
                          onClick={() => navigateToPage('news', post)}
                          className="p-5 border border-slate-200 hover:border-[#3FA9F5] bg-white rounded-2xl cursor-pointer"
                        >
                          {cover && (
                            <img
                              src={cover}
                              alt=""
                              className="w-full h-28 object-cover rounded-xl mb-3"
                            />
                          )}
                          <h5 className="font-bold text-sm text-slate-800">
                            {post.title}
                          </h5>
                          <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                            {post.description}
                          </p>
                          <span className="block mt-3 text-[9px] font-bold text-[#3FA9F5] uppercase">
                            Read more →
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="text-center bg-slate-50 p-8 rounded-2xl border border-slate-200">
                  <h4 className="font-bold text-slate-800 text-sm">
                    Have questions?
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Find clear answers about claims, premiums, and policies.
                  </p>
                  <button
                    type="button"
                    onClick={() => navigateToPage('faqs')}
                    className="mt-4 px-5 py-2 bg-[#0F4C81] text-white rounded-lg text-xs font-bold"
                  >
                    Browse FAQs
                  </button>
                </div>
              </div>
            )}

            {activePage === 'about' && <AboutUsView companies={companies} />}
            {activePage === 'companies' && (
              <CompaniesView
                companies={companies}
                onSelectCompany={() => navigateToPage('enquiry')}
                onViewProducts={(companyName) => {
                  setPartnerFilter(companyName);
                  navigateToPage('products');
                }}
              />
            )}
            {activePage === 'products' && (
              <ProductsView
                products={products}
                onSelectProduct={() => navigateToPage('enquiry')}
                partnerFilter={partnerFilter}
                onClearPartnerFilter={() => setPartnerFilter(null)}
              />
            )}
            {activePage === 'services' && (
              <ServicesView services={servicesData} />
            )}
            {activePage === 'claims' && <ClaimsView />}
            {activePage === 'advisor' && (
              <BecomeAdvisorView
                onAddAdvisor={handleAddAdvisor}
                companies={companies}
              />
            )}

            {activePage === 'posters' && <PostersView posters={posters} />}

            {activePage === 'news' && !selectedPost && (
              <NewsPostsView
                posts={newsPosts}
                categories={newsCategories}
                onSelectPost={(post) => setSelectedPost(post)}
                onAddEnquiry={handleAddEnquiry}
              />
            )}

            {activePage === 'news' && selectedPost && (
              <div className="space-y-6 text-left">
                <button
                  type="button"
                  onClick={() => setSelectedPost(null)}
                  className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold"
                >
                  ← Back to articles
                </button>
                {selectedCover && (
                  <div className="w-full aspect-[21/9] rounded-3xl bg-slate-100 overflow-hidden">
                    <img
                      src={selectedCover}
                      alt={selectedPost.title}
                      className="w-full h-full object-contain object-center"
                    />
                  </div>
                )}
                <h2 className="text-2xl font-extrabold text-slate-900">
                  {selectedPost.title}
                </h2>
                <p className="text-xs text-slate-600 whitespace-pre-line leading-relaxed">
                  {selectedPost.content || selectedPost.description}
                </p>
                <button
                  type="button"
                  onClick={() => navigateToPage('enquiry')}
                  className="px-4 py-2 bg-[#0F4C81] text-white rounded-lg text-xs font-bold"
                >
                  Enquiry form
                </button>
              </div>
            )}

            {activePage === 'faqs' && <FAQsView faqs={faqData} />}
            {activePage === 'gallery' && (
              <GalleryView gallery={galleryItems} categories={galleryCategories} />
            )}
            {activePage === 'testimonials' && (
              <TestimonialsView testimonials={testimonialsData} />
            )}
            {activePage === 'contact' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start text-left">
                <div className="space-y-4">
                  <h2 className="text-2xl font-extrabold text-slate-900">
                    Get in touch
                  </h2>
                  <p className="text-xs text-slate-500">
                    We’re happy to help with plans, claims, or advisor
                    opportunities.
                  </p>
                  <p className="text-xs text-slate-600">
                    📞 +91 9876543210
                    <br />
                    ✉️ contact@aynkaran.in
                  </p>
                </div>
                <ContactForm onAddContact={handleAddContact} />
              </div>
            )}
            {activePage === 'enquiry' && (
              <EnquiryForm
                onAddEnquiry={handleAddEnquiry}
                companiesList={companies}
                productsList={products}
              />
            )}
          </div>

          <footer className="mt-auto border-t border-slate-200 p-4 bg-slate-50 text-[10px] font-mono text-slate-400 flex justify-between">
            <span>Simple guidance · Trusted partners · Friendly support</span>
            <span>
              {catalogLoading ? 'Loading partners…' : 'IRDAI aware portal'}
            </span>
          </footer>
        </section>

        {/* RIGHT SIDEBAR */}
<aside className={`hidden xl:flex flex-col gap-4 flex-shrink-0 sticky top-28 self-start transition-all
  ${posters?.advisors?.length > 0 || posters?.rightTop ? 'w-52' : 'w-0 overflow-hidden'}`}>
  <WebsitePosters posters={posters} side="right" onClickPoster={() => navigateToPage('advisor')} />
</aside>
      </main>

      <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-10">
        <div className="max-w-[1920px] mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Umbrella className="w-4 h-4 text-white" />
              <span className="font-extrabold text-white text-sm uppercase">
                Aynkaran Consultants
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Helping families choose the right life, health, and future cover
              since 2012.
            </p>
          </div>
          <div className="text-xs text-slate-400 space-y-1">
            <button
              type="button"
              onClick={() => navigateToPage('products')}
              className="block hover:text-white"
            >
              Products
            </button>
            <button
              type="button"
              onClick={() => navigateToPage('claims')}
              className="block hover:text-white"
            >
              Claims help
            </button>
            <button
              type="button"
              onClick={() => navigateToPage('advisor')}
              className="block hover:text-white"
            >
              Join as advisor
            </button>
          </div>
          <div className="text-xs text-slate-400">
            <p>📞 +91 9876543210</p>
            <p>✉️ contact@aynkaran.in</p>
            <button
              type="button"
              onClick={() => navigateToPage('enquiry')}
              className="mt-2 bg-[#3FA9F5] text-white font-bold text-[11px] px-3 py-1.5 rounded-lg"
            >
              Request callback
            </button>
          </div>
        </div>
        <div className="border-t border-slate-800 py-3 text-center text-[10px] text-slate-500">
          © 2026 Aynkaran Consultants · All rights reserved
        </div>
      </footer>

      <button
        type="button"
        onClick={handleScrollToTop}
        className="fixed bottom-6 right-6 z-40 bg-white border border-slate-200 p-3 rounded-full shadow-lg"
        title="Back to top"
      >
        <ArrowUp className="w-4 h-4 text-slate-600" />
      </button>
    </div>
  );
}
