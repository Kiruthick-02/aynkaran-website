import React, { useState, useEffect } from 'react';
import { 
  companiesData, 
  productsData, 
  servicesData, 
  faqData, 
  testimonialsData, 
  newsPostsData, 
  galleryData 
} from './data';
import { 
  InsuranceCompany, 
  InsuranceProduct, 
  ServiceItem, 
  NewsPost, 
  Testimonial, 
  GalleryItem, 
  FAQItem,
  InsuranceEnquiry,
  AdvisorRegistration,
  ContactMessage
} from './types';
import MarqueeTicker from './components/MarqueeTicker';
import DesktopSyncMonitor from './components/DesktopSyncMonitor';
import { EnquiryForm, AdvisorForm, ContactForm } from './components/LeadForms';
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
  FAQsView 
} from './components/PageViews';
import { 
  Umbrella, Shield, Phone, MessageSquare, Menu, X, Search,
  Calendar, Award, Heart, CheckCircle2, Star, Users, ArrowUp,
  Activity, GraduationCap, TrendingUp, Sparkles, Send, Bell
} from 'lucide-react';

export default function App() {
  // Navigation & Page State
  const [activePage, setActivePage] = useState<string>('home');
  const [selectedPost, setSelectedPost] = useState<NewsPost | null>(null);

  // Search State
  const [globalSearch, setGlobalSearch] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Local Database States (Simulated MongoDB Sync)
  const [enquiries, setEnquiries] = useState<InsuranceEnquiry[]>([]);
  const [advisors, setAdvisors] = useState<AdvisorRegistration[]>([]);
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [newsPosts, setNewsPosts] = useState<NewsPost[]>(newsPostsData);

  // Load from LocalStorage if available
  useEffect(() => {
    const savedEnq = localStorage.getItem('sec_enquiries');
    const savedAdv = localStorage.getItem('sec_advisors');
    const savedCon = localStorage.getItem('sec_contacts');
    const savedPosts = localStorage.getItem('sec_posts');

    if (savedEnq) setEnquiries(JSON.parse(savedEnq));
    if (savedAdv) setAdvisors(JSON.parse(savedAdv));
    if (savedCon) setContacts(JSON.parse(savedCon));
    if (savedPosts) {
      setNewsPosts(JSON.parse(savedPosts));
    } else {
      setNewsPosts(newsPostsData);
    }
  }, []);

  // Sync to LocalStorage on changes
  const saveEnquiries = (data: InsuranceEnquiry[]) => {
    setEnquiries(data);
    localStorage.setItem('sec_enquiries', JSON.stringify(data));
  };

  const saveAdvisors = (data: AdvisorRegistration[]) => {
    setAdvisors(data);
    localStorage.setItem('sec_advisors', JSON.stringify(data));
  };

  const saveContacts = (data: ContactMessage[]) => {
    setContacts(data);
    localStorage.setItem('sec_contacts', JSON.stringify(data));
  };

  const savePosts = (data: NewsPost[]) => {
    setNewsPosts(data);
    localStorage.setItem('sec_posts', JSON.stringify(data));
  };

  // Add submissions
  const handleAddEnquiry = (enq: InsuranceEnquiry) => {
    const updated = [enq, ...enquiries];
    saveEnquiries(updated);
  };

  const handleAddAdvisor = (adv: AdvisorRegistration) => {
    const updated = [adv, ...advisors];
    saveAdvisors(updated);
  };

  const handleAddContact = (con: ContactMessage) => {
    const updated = [con, ...contacts];
    saveContacts(updated);
  };

  const handleAddNewsPost = (post: NewsPost) => {
    const updated = [post, ...newsPosts];
    savePosts(updated);
  };

  const handleClearData = () => {
    setEnquiries([]);
    setAdvisors([]);
    setContacts([]);
    setNewsPosts(newsPostsData);
    localStorage.removeItem('sec_enquiries');
    localStorage.removeItem('sec_advisors');
    localStorage.removeItem('sec_contacts');
    localStorage.removeItem('sec_posts');
  };

  const handleDeleteEnquiry = (id: string) => {
    const updated = enquiries.filter(e => e.id !== id);
    saveEnquiries(updated);
  };

  const handleDeleteAdvisor = (id: string) => {
    const updated = advisors.filter(a => a.id !== id);
    saveAdvisors(updated);
  };

  // Quick Sidebar Lead Form
  const [sidebarName, setSidebarName] = useState('');
  const [sidebarPhone, setSidebarPhone] = useState('');
  const [sidebarSubmitted, setSidebarSubmitted] = useState(false);

  const handleSidebarCallback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sidebarName || !sidebarPhone) return;

    const newEnq: InsuranceEnquiry = {
      id: `enq-${Date.now()}`,
      name: sidebarName,
      gender: 'Not Specified',
      age: 30,
      mobile: sidebarPhone,
      whatsApp: sidebarPhone,
      email: 'callback@request.com',
      address: 'Requested from left sidebar banner callback tool',
      city: 'Not Specified',
      occupation: 'Not Specified',
      income: 'Not Specified',
      preferredCompany: 'Any Partner',
      productType: 'Callback Consultation Requested',
      purpose: 'Urgent Consultation Call',
      preferredTime: 'Within 2 hours',
      referral: '',
      message: 'Urgent callback requested from left promotional sidebar.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', ' + new Date().toLocaleDateString()
    };

    handleAddEnquiry(newEnq);
    setSidebarSubmitted(true);
    setSidebarName('');
    setSidebarPhone('');
    setTimeout(() => {
      setSidebarSubmitted(false);
    }, 4000);
  };

  // Chat Assistant State (Simulated Helper Chat)
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string }>>([
    { sender: 'bot', text: 'Hi! I am AynkaranBot. Ask me about our life, health, or child education plans!' }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput;
    setChatMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setChatInput('');

    // Generate intelligent response based on keywords
    setTimeout(() => {
      let reply = "That's an excellent question! Our Lead Business Manager at Aynkaran Consultants can customize a plan for you. Would you like to submit an instant Enquiry form on our center portal?";
      const lower = userMsg.toLowerCase();
      if (lower.includes('health') || lower.includes('medical') || lower.includes('care')) {
        reply = "Our Family Health Guard covers cashless treatment across 10,000+ network hospitals, including ICU and pre/post-hospitalization fees. You can find more details under the 'Services' or 'Insurance Products' tab!";
      } else if (lower.includes('child') || lower.includes('education') || lower.includes('college')) {
        reply = "Our Smart Child Education Plan has an in-built Premium Waiver. If anything happens to the parent, all future premiums are waived, and the child's college fund payouts execute perfectly. Let's fill out an Enquiry form to customize it!";
      } else if (lower.includes('term') || lower.includes('life') || lower.includes('secure')) {
        reply = "Our Term Insurance Plans offer high protective sum-assured covers starting at very low premium brackets. They provide high financial security for your dependents and tax deductions under Section 80C.";
      } else if (lower.includes('recruitment') || lower.includes('advisor') || lower.includes('career') || lower.includes('job')) {
        reply = "We are actively recruiting licensed Advisors! You earn high recurring commissions on flexible work hours. Click the orange 'Become an Advisor' tab to view training schedules and apply!";
      } else if (lower.includes('claim') || lower.includes('settle')) {
        reply = "We have a 24/7 Claim Assistance support desk. We actively assist with document compilation and negotiate with partner insurers. LIC holds a 98.6% settlement ratio and HDFC Life holds 99.5%!";
      }

      setChatMessages(prev => [...prev, { sender: 'bot', text: reply }]);
    }, 1000);
  };

  // Back-to-top feature
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const centerEl = document.getElementById('center-scrollable');
    if (centerEl) centerEl.scrollTop = 0;
  };

  // Global Search logic
  const performSearch = () => {
    if (!globalSearch.trim()) return [];
    const term = globalSearch.toLowerCase();
    
    const results: Array<{ type: string; title: string; desc: string; targetPage: string; dataObj?: any }> = [];

    // Search Products
    productsData.forEach(p => {
      if (p.title.toLowerCase().includes(term) || p.description.toLowerCase().includes(term)) {
        results.push({ type: 'Product', title: p.title, desc: p.description, targetPage: 'products' });
      }
    });

    // Search Companies
    companiesData.forEach(c => {
      if (coNameIncludes(c.name, term) || c.description.toLowerCase().includes(term)) {
        results.push({ type: 'Insurance Partner', title: c.name, desc: c.shortDescription, targetPage: 'companies' });
      }
    });

    // Search Services
    servicesData.forEach(s => {
      if (s.title.toLowerCase().includes(term) || s.description.toLowerCase().includes(term)) {
        results.push({ type: 'Core Service', title: s.title, desc: s.description, targetPage: 'services' });
      }
    });

    // Search News Articles
    newsPosts.forEach(n => {
      if (n.title.toLowerCase().includes(term) || n.description.toLowerCase().includes(term)) {
        results.push({ type: 'Article / Update', title: n.title, desc: n.description, targetPage: 'news', dataObj: n });
      }
    });

    // Search FAQs
    faqData.forEach(f => {
      if (f.question.toLowerCase().includes(term) || f.answer.toLowerCase().includes(term)) {
        results.push({ type: 'Frequently Asked Q', title: f.question, desc: f.answer, targetPage: 'faqs' });
      }
    });

    return results;
  };

  const coNameIncludes = (name: string, term: string) => name.toLowerCase().includes(term);

  const searchResults = performSearch();

  // Navigation click routing helper
  const navigateToPage = (pageName: string, selectedData?: any) => {
    setActivePage(pageName);
    setSelectedPost(null);
    setGlobalSearch('');
    setShowSearchResults(false);
    if (selectedData && pageName === 'news') {
      setSelectedPost(selectedData);
    }
    setTimeout(() => {
      handleScrollToTop();
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100/70 font-sans select-none antialiased">
      
      {/* 1. STICKY / FIXED HEADER AREA */}
      <header className="bg-[#0F4C81] text-white z-30 shadow-md flex-shrink-0 sticky top-0">
        
        {/* Brand Name Panel */}
        <div className="py-4 text-center border-b border-[#0F4C81]/15 bg-[#0D4170]/30">
          <div className="max-w-[1600px] mx-auto px-6 flex justify-between items-center">
            {/* Minimal Left motto */}
            <div className="hidden md:flex items-center gap-1.5 text-[10px] font-mono tracking-widest text-sky-200 font-extrabold uppercase">
              <span className="h-1.5 w-1.5 bg-[#F4B400] rounded-full animate-pulse"></span>
              IRDAI Licensed Portal
            </div>

            {/* Core Title */}
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight uppercase text-white flex items-center gap-3.5 mx-auto">
              <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center shadow-inner">
                <Umbrella className="w-6 h-6 text-[#0F4C81] stroke-[2.5]" />
              </div>
              <div className="text-left leading-none">
                <span className="text-lg md:text-2xl font-black tracking-tight block">Aynkaran Consultants</span>
                <span className="text-[10px] md:text-xs text-sky-200 font-mono tracking-wider block uppercase pt-0.5">Premium Insurance Business Portal</span>
              </div>
            </h1>

            {/* Micro Quick Search Bar */}
            <div className="relative hidden md:block">
              <Search className="w-3.5 h-3.5 text-sky-200 absolute left-3 top-2.5" />
              <input 
                type="text" 
                placeholder="Global portal search..." 
                value={globalSearch}
                onChange={(e) => {
                  setGlobalSearch(e.target.value);
                  setShowSearchResults(e.target.value.length > 0);
                }}
                className="w-56 bg-[#0D4170] border border-[#3FA9F5]/20 text-white placeholder-sky-200 hover:border-[#3FA9F5]/40 focus:border-[#F4B400] pl-8 pr-4 py-1.5 rounded-full text-xs outline-none transition"
              />

              {/* Global Search Results Overlay Panel */}
              {showSearchResults && (
                <div className="absolute right-0 top-10 w-96 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 p-4 max-h-96 overflow-y-auto custom-scrollbar space-y-3 text-left">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                    <span className="text-[10px] font-extrabold tracking-wider font-mono text-slate-400 uppercase">Search Matches ({searchResults.length})</span>
                    <button onClick={() => setShowSearchResults(false)} className="text-slate-400 hover:text-slate-900 text-[10px] font-bold">Close ✕</button>
                  </div>
                  {searchResults.length === 0 ? (
                    <p className="text-xs text-slate-400 py-4 text-center font-mono">No matching records found.</p>
                  ) : (
                    <div className="space-y-2">
                      {searchResults.map((res, idx) => (
                        <div 
                          key={idx} 
                          onClick={() => navigateToPage(res.targetPage, res.dataObj)}
                          className="p-2.5 rounded-lg hover:bg-blue-50/50 border border-transparent hover:border-blue-100 transition cursor-pointer space-y-1 text-left"
                        >
                          <span className="text-[8px] font-extrabold bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded uppercase font-mono">
                            {res.type}
                          </span>
                          <h5 className="text-xs font-bold text-slate-800 leading-tight">{res.title}</h5>
                          <p className="text-[10px] text-slate-400 line-clamp-1 leading-normal">{res.desc}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Mega Sticky navigation menu (Contains Home, About, Partners, Products, Advisor, FAQs, Claims, News) */}
        <nav className="flex flex-wrap justify-center items-center gap-x-8 gap-y-2.5 py-4 bg-[#0F4C81] border-t border-[#0F4C81]/25 font-mono text-xs md:text-sm tracking-wider font-extrabold uppercase">
          <button 
            onClick={() => navigateToPage('home')}
            className={`transition-colors pb-0.5 ${activePage === 'home' ? 'text-[#F4B400] border-b-2 border-[#F4B400]' : 'text-sky-100 hover:text-white'}`}
          >
            Home
          </button>
          <button 
            onClick={() => navigateToPage('about')}
            className={`transition-colors pb-0.5 ${activePage === 'about' ? 'text-[#F4B400] border-b-2 border-[#F4B400]' : 'text-sky-100 hover:text-white'}`}
          >
            About Us
          </button>
          <button 
            onClick={() => navigateToPage('companies')}
            className={`transition-colors pb-0.5 ${activePage === 'companies' ? 'text-[#F4B400] border-b-2 border-[#F4B400]' : 'text-sky-100 hover:text-white'}`}
          >
            Insurers
          </button>
          <button 
            onClick={() => navigateToPage('products')}
            className={`transition-colors pb-0.5 ${activePage === 'products' ? 'text-[#F4B400] border-b-2 border-[#F4B400]' : 'text-sky-100 hover:text-white'}`}
          >
            Products
          </button>
          <button 
            onClick={() => navigateToPage('services')}
            className={`transition-colors pb-0.5 ${activePage === 'services' ? 'text-[#F4B400] border-b-2 border-[#F4B400]' : 'text-sky-100 hover:text-white'}`}
          >
            Services
          </button>
          <button 
            onClick={() => navigateToPage('claims')}
            className={`transition-colors pb-0.5 ${activePage === 'claims' ? 'text-[#F4B400] border-b-2 border-[#F4B400]' : 'text-sky-100 hover:text-white'}`}
          >
            Claims Assist
          </button>
          <button 
            onClick={() => navigateToPage('news')}
            className={`transition-colors pb-0.5 ${activePage === 'news' ? 'text-[#F4B400] border-b-2 border-[#F4B400]' : 'text-sky-100 hover:text-white'}`}
          >
            News & Posts
          </button>
          <button 
            onClick={() => navigateToPage('faqs')}
            className={`transition-colors pb-0.5 ${activePage === 'faqs' ? 'text-[#F4B400] border-b-2 border-[#F4B400]' : 'text-sky-100 hover:text-white'}`}
          >
            FAQs
          </button>
          <button 
            onClick={() => navigateToPage('gallery')}
            className={`transition-colors pb-0.5 ${activePage === 'gallery' ? 'text-[#F4B400] border-b-2 border-[#F4B400]' : 'text-sky-100 hover:text-white'}`}
          >
            Gallery
          </button>
          <button 
            onClick={() => navigateToPage('testimonials')}
            className={`transition-colors pb-0.5 ${activePage === 'testimonials' ? 'text-[#F4B400] border-b-2 border-[#F4B400]' : 'text-sky-100 hover:text-white'}`}
          >
            Reviews
          </button>
          <button 
            onClick={() => navigateToPage('contact')}
            className={`transition-colors pb-0.5 ${activePage === 'contact' ? 'text-[#F4B400] border-b-2 border-[#F4B400]' : 'text-sky-100 hover:text-white'}`}
          >
            Contact Us
          </button>
          <button 
            onClick={() => navigateToPage('advisor')}
            className={`transition-all text-[#0F4C81] hover:bg-[#F4B400]/95 bg-[#F4B400] px-2.5 py-1 rounded font-black uppercase tracking-widest shadow-sm ${activePage === 'advisor' ? 'ring-2 ring-white' : ''}`}
          >
            Advisor Recruits
          </button>
          <button 
            onClick={() => navigateToPage('enquiry')}
            className={`transition-all text-white hover:bg-[#3FA9F5]/95 bg-[#3FA9F5] px-2.5 py-1 rounded font-black uppercase tracking-widest shadow-sm ${activePage === 'enquiry' ? 'ring-2 ring-white' : ''}`}
          >
            Enquiry Form
          </button>
        </nav>

        {/* 2. Horizontally scrolling announcements below the menu */}
        <MarqueeTicker />
        
      </header>

      {/* 3. THREE-COLUMN CENTRAL STAGE WITH LAYOUT ALIGNMENTS */}
      <main className="flex-1 p-4 md:p-6 gap-6 max-w-[1920px] mx-auto w-full flex items-start">
        
        {/* ==========================================
            A. LEFT SIDEBAR (POSTERS & ADS)
            ========================================== */}
        <aside className="w-52 hidden xl:flex flex-col gap-4 flex-shrink-0 sticky top-28 self-start">
          
          {/* Poster 1 - Family Health Guard (Ad Top) */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col group hover:border-blue-300 transition-all text-left">
            <div className="relative aspect-[3/4] bg-slate-100 overflow-hidden">
              <img 
                src="/src/assets/images/aynkaran_ad_top_1783931714310.jpg" 
                alt="Family Health Guard Plan Ad" 
                className="w-full h-full object-cover group-hover:scale-102 transition duration-300"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-2.5 left-2.5 bg-[#0F4C81] text-amber-400 text-[8px] font-bold px-2 py-0.5 rounded uppercase tracking-wider shadow-sm">
                Seasonal Ad
              </span>
            </div>
            <div className="p-4 space-y-2">
              <h4 className="font-extrabold text-xs text-slate-800 uppercase tracking-wide leading-tight">Family Health Guard</h4>
              <p className="text-[11px] text-slate-500 leading-normal">Cashless coverage across 10,000+ top network hospitals nationwide.</p>
              <button 
                onClick={() => navigateToPage('products')}
                className="w-full bg-[#0F4C81] hover:bg-[#0D4170] text-white text-[10px] font-bold uppercase tracking-wider py-2 rounded-lg transition"
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Poster 2 - Secure Pension (Ad Bottom) */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col group hover:border-emerald-300 transition-all text-left">
            <div className="relative aspect-[3/4] bg-slate-100 overflow-hidden">
              <img 
                src="/src/assets/images/aynkaran_ad_bottom_1783931727914.jpg" 
                alt="Secure Pension & Retirement Ad" 
                className="w-full h-full object-cover group-hover:scale-102 transition duration-300"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-2.5 left-2.5 bg-emerald-700 text-white text-[8px] font-bold px-2 py-0.5 rounded uppercase tracking-wider shadow-sm">
                Wealth Builder
              </span>
            </div>
            <div className="p-4 space-y-2">
              <h4 className="font-extrabold text-xs text-slate-800 uppercase tracking-wide leading-tight">Guaranteed Income</h4>
              <p className="text-[11px] text-slate-500 leading-normal">Secure your golden retirement years with up to 100% tax-free pension gains.</p>
              <button 
                onClick={() => navigateToPage('advisor')}
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white text-[10px] font-bold uppercase tracking-wider py-2 rounded-lg transition"
              >
                Become Advisor
              </button>
            </div>
          </div>

        </aside>

        {/* ==========================================
            B. CENTER MAIN STAGE (NATURALLY EXPANDED CONTENT)
            ========================================== */}
        <section 
          id="center-scrollable"
          className="flex-1 min-w-0 bg-white border border-slate-200/80 rounded-2xl shadow-sm flex flex-col relative overflow-hidden"
        >
          {/* Inner sticky banner head matching original wireframe */}
          <div className="p-5 border-b flex justify-between items-center sticky top-0 bg-white/95 backdrop-blur-md z-20">
            <div className="flex items-center gap-3">
              <div className="bg-[#0F4C81] text-white px-4 py-2 font-mono font-black text-xs rounded tracking-widest">
                LOGO
              </div>
              <span className="text-xs md:text-sm text-slate-500 font-mono font-bold">Aynkaran Consultants</span>
            </div>
            <div className="text-[11px] md:text-xs font-bold text-[#3FA9F5] tracking-widest font-mono uppercase">
              Secure Future • Trusted Partner
            </div>
          </div>

          {/* PAGE ROUTING ENGINES */}
          <div className="p-4 md:p-6 flex-1">
            
            {/* ==================== HOME PAGE VIEW ==================== */}
            {activePage === 'home' && (
              <div className="space-y-6 animate-slide-in">
                
                {/* 1. Large Hero Slider Banner */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0F4C81] via-[#0D4170] to-[#3FA9F5] p-8 md:p-12 text-white shadow-xl">
                  <div className="relative z-10 max-w-xl space-y-4 text-left">
                    <span className="text-xs bg-white/10 border border-white/20 text-[#F4B400] px-3 py-1 rounded-full font-black uppercase tracking-widest">
                      Welcome to Aynkaran Consultants
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black leading-tight tracking-tight text-white">
                      Securing Your Future With <span className="text-[#F4B400]">Expert Guidance</span>
                    </h2>
                    <p className="text-sm text-sky-50 leading-relaxed max-w-lg">
                      Your one-stop destination for Life, Health, and General Insurance from India's leading providers. Trusted by 25,000+ families nationwide.
                    </p>
                    <div className="flex gap-3 pt-2">
                      <button 
                        onClick={() => navigateToPage('enquiry')}
                        className="px-6 py-2.5 bg-white text-[#0F4C81] font-bold rounded shadow-lg text-sm hover:bg-slate-50 transition"
                      >
                        Free Consultation
                      </button>
                      <button 
                        onClick={() => navigateToPage('advisor')}
                        className="px-6 py-2.5 bg-[#F4B400] text-[#0F4C81] font-bold rounded shadow-lg text-sm hover:bg-[#F4B400]/90 transition"
                      >
                        Become an Advisor
                      </button>
                    </div>
                  </div>
                  <div className="absolute right-0 bottom-0 w-1/3 h-full opacity-15 pointer-events-none">
                    <svg viewBox="0 0 200 200" className="w-full h-full text-white fill-current">
                      <circle cx="150" cy="150" r="100" />
                    </svg>
                  </div>
                </div>

                {/* 2. Interactive Quick Statistics Counter */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                  <div className="text-center p-2">
                    <span className="block text-2xl md:text-3xl font-black text-[#0F4C81]">12+ Years</span>
                    <span className="text-xs text-slate-500 uppercase tracking-wider font-extrabold">Of Industry Experience</span>
                  </div>
                  <div className="text-center p-2 border-l border-slate-200">
                    <span className="block text-2xl md:text-3xl font-black text-[#0F4C81]">150+</span>
                    <span className="text-xs text-slate-500 uppercase tracking-wider font-extrabold">Licensed Advisors</span>
                  </div>
                  <div className="text-center p-2 border-l border-slate-200">
                    <span className="block text-2xl md:text-3xl font-black text-[#0F4C81]">12,000+</span>
                    <span className="text-xs text-slate-500 uppercase tracking-wider font-extrabold">Active Policies Issued</span>
                  </div>
                  <div className="text-center p-2 border-l border-slate-200">
                    <span className="block text-2xl md:text-3xl font-black text-[#0F4C81]">99.5%</span>
                    <span className="text-xs text-slate-500 uppercase tracking-wider font-extrabold">Claim Assistance Rate</span>
                  </div>
                </div>

                {/* 3. Insurance Categories Showcases */}
                <div className="space-y-6">
                  <h3 className="text-sm font-bold text-slate-800 border-l-4 border-[#3FA9F5] pl-2 text-left">Our Insurance Categories</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div 
                      onClick={() => navigateToPage('products')}
                      className="p-5 border border-slate-200 bg-white rounded-xl text-center hover:shadow-md hover:border-[#3FA9F5] transition cursor-pointer group"
                    >
                      <Activity className="w-8 h-8 mx-auto text-[#3FA9F5] mb-3 group-hover:scale-110 transition" />
                      <h4 className="font-bold text-xs text-slate-800">Health Guard</h4>
                      <p className="text-[9px] text-slate-400 mt-1 leading-normal">Cashless hospital covers</p>
                    </div>
                    <div 
                      onClick={() => navigateToPage('products')}
                      className="p-5 border border-slate-200 bg-white rounded-xl text-center hover:shadow-md hover:border-[#3FA9F5] transition cursor-pointer group"
                    >
                      <Shield className="w-8 h-8 mx-auto text-red-500 mb-3 group-hover:scale-110 transition" />
                      <h4 className="font-bold text-xs text-slate-800">Term Insurance</h4>
                      <p className="text-[9px] text-slate-400 mt-1 leading-normal">Pure life covers</p>
                    </div>
                    <div 
                      onClick={() => navigateToPage('products')}
                      className="p-5 border border-slate-200 bg-white rounded-xl text-center hover:shadow-md hover:border-[#3FA9F5] transition cursor-pointer group"
                    >
                      <GraduationCap className="w-8 h-8 mx-auto text-amber-500 mb-3 group-hover:scale-110 transition" />
                      <h4 className="font-bold text-xs text-slate-800">Child Future</h4>
                      <p className="text-[9px] text-slate-400 mt-1 leading-normal">University fee savers</p>
                    </div>
                    <div 
                      onClick={() => navigateToPage('products')}
                      className="p-5 border border-slate-200 bg-white rounded-xl text-center hover:shadow-md hover:border-[#3FA9F5] transition cursor-pointer group"
                    >
                      <TrendingUp className="w-8 h-8 mx-auto text-emerald-500 mb-3 group-hover:scale-110 transition" />
                      <h4 className="font-bold text-xs text-slate-800">Pension & Saving</h4>
                      <p className="text-[9px] text-slate-400 mt-1 leading-normal">Compounding lifetime annuity</p>
                    </div>
                  </div>
                </div>

                {/* 4. Split Core Value & Partners list */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-left">
                  <div className="space-y-4">
                    <h4 className="font-bold text-sm uppercase tracking-wider text-slate-800 border-l-4 border-[#3FA9F5] pl-3">Why Aynkaran Consultants?</h4>
                    <ul className="space-y-3 text-xs text-slate-500">
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4.5 h-4.5 text-[#3FA9F5] mt-0.5 flex-shrink-0" />
                        <span><strong>Expert Unbiased Advice:</strong> We don't prioritize specific brands. We recommend options matching your budget.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4.5 h-4.5 text-[#3FA9F5] mt-0.5 flex-shrink-0" />
                        <span><strong>Direct Claims Escalation:</strong> Our dedicated claim support handles all insurer filing queries for you.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4.5 h-4.5 text-[#3FA9F5] mt-0.5 flex-shrink-0" />
                        <span><strong>100% Digital Processing:</strong> Instant policy delivery and secure database updates using premium systems.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-bold text-sm uppercase tracking-wider text-slate-800 border-l-4 border-[#0F4C81] pl-3">Our Premium Insurance Companies</h4>
                    <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono font-bold text-slate-600">
                      <div className="p-3 border border-slate-200 bg-white rounded-lg hover:border-[#3FA9F5] transition">LIC of India</div>
                      <div className="p-3 border border-slate-200 bg-white rounded-lg hover:border-[#3FA9F5] transition">HDFC Life</div>
                      <div className="p-3 border border-slate-200 bg-white rounded-lg hover:border-[#3FA9F5] transition">Care Health</div>
                      <div className="p-3 border border-slate-200 bg-white rounded-lg hover:border-[#3FA9F5] transition">SBI Life</div>
                      <div className="p-3 border border-slate-200 bg-white rounded-lg hover:border-[#3FA9F5] transition">ICICI Prudential</div>
                      <div className="p-3 border border-slate-200 bg-white rounded-lg hover:border-[#3FA9F5] transition">Tata AIA</div>
                    </div>
                  </div>
                </div>

                {/* 5. How It Works Timeline banner */}
                <div className="bg-slate-50 border border-slate-200 p-8 rounded-2xl space-y-6">
                  <h4 className="text-center font-bold text-slate-800 text-sm">How Our Integration Consult Works</h4>
                  <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center">
                    <div className="space-y-1">
                      <div className="w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center mx-auto text-[#0F4C81] font-bold text-xs shadow-sm">1</div>
                      <h5 className="font-bold text-xs text-slate-800">Submit Enquiry</h5>
                      <p className="text-[10px] text-slate-400">Provide age, term, budget</p>
                    </div>
                    <div className="hidden md:block h-px bg-slate-200 flex-1"></div>
                    <div className="space-y-1">
                      <div className="w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center mx-auto text-[#0F4C81] font-bold text-xs shadow-sm">2</div>
                      <h5 className="font-bold text-xs text-slate-800">Database Sync</h5>
                      <p className="text-[10px] text-slate-400">MongoDB replicator triggers</p>
                    </div>
                    <div className="hidden md:block h-px bg-slate-200 flex-1"></div>
                    <div className="space-y-1">
                      <div className="w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center mx-auto text-[#0F4C81] font-bold text-xs shadow-sm">3</div>
                      <h5 className="font-bold text-xs text-slate-800">Advisor Consultation</h5>
                      <p className="text-[10px] text-slate-400">Alexander evaluates plans</p>
                    </div>
                    <div className="hidden md:block h-px bg-slate-200 flex-1"></div>
                    <div className="space-y-1">
                      <div className="w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center mx-auto text-[#0F4C81] font-bold text-xs shadow-sm">4</div>
                      <h5 className="font-bold text-xs text-slate-800">Secure Binding</h5>
                      <p className="text-[10px] text-slate-400">Policy releases to mailbox</p>
                    </div>
                  </div>
                </div>

                {/* 6. Advisor Opportunity Section */}
                <div className="bg-gradient-to-br from-[#F4B400] to-amber-600 text-white p-8 rounded-3xl flex justify-between items-center gap-6">
                  <div className="space-y-2 max-w-md text-left">
                    <span className="text-[9px] bg-white/20 border border-white/25 text-white px-2 py-0.5 rounded font-bold uppercase tracking-wider">RECRUITING</span>
                    <h4 className="font-extrabold text-lg">Looking for an Independent Income Option?</h4>
                    <p className="text-xs text-white opacity-90 leading-relaxed">
                      Register as an insurance advisor. All training courseware is coordinated directly under Alexander Pierce.
                    </p>
                  </div>
                  <button 
                    onClick={() => navigateToPage('advisor')}
                    className="bg-white text-amber-700 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-slate-50 transition shadow-md"
                  >
                    Apply Now
                  </button>
                </div>

                {/* 7. Quick Articles Section */}
                <div className="space-y-6 text-left">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-sm uppercase tracking-wider text-slate-800 border-l-4 border-[#3FA9F5] pl-2">Latest Regulatory News</h4>
                    <button onClick={() => navigateToPage('news')} className="text-xs text-[#0F4C81] font-bold hover:underline">View All Posts</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {newsPosts.slice(0, 2).map((post) => (
                      <div 
                        key={post.id} 
                        onClick={() => navigateToPage('news', post)}
                        className="p-5 border border-slate-200 hover:border-[#3FA9F5] bg-white rounded-2xl cursor-pointer transition flex flex-col justify-between shadow-sm"
                      >
                        <div className="space-y-2">
                          <span className="text-[8px] bg-sky-50 text-[#0F4C81] px-1.5 py-0.5 rounded uppercase font-mono font-bold border border-sky-100">{post.category}</span>
                          <h5 className="font-bold text-sm text-slate-800 leading-snug">{post.title}</h5>
                          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{post.description}</p>
                        </div>
                        <span className="block mt-4 text-[9px] font-bold text-[#3FA9F5] uppercase font-mono">Read More →</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 8. FAQ Teaser */}
                <div className="text-center bg-slate-50 p-8 rounded-2xl border border-slate-200">
                  <h4 className="font-bold text-slate-800 text-sm">Have Specific Inquiries?</h4>
                  <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">Explore full claim intimation, waiting period conditions, or premium parameters in our FAQ directory.</p>
                  <button 
                    onClick={() => navigateToPage('faqs')}
                    className="mt-4 px-5 py-2 bg-[#0F4C81] hover:bg-[#0D4170] text-white rounded-lg text-xs font-bold shadow-sm"
                  >
                    Open FAQ Center
                  </button>
                </div>

              </div>
            )}

            {/* ==================== ACTIVE PAGE COMPONENT DIRECTORY ==================== */}
            {activePage === 'about' && <AboutUsView companies={companiesData} />}
            
            {activePage === 'companies' && (
              <CompaniesView 
                companies={companiesData} 
                onSelectCompany={(coName) => {
                  navigateToPage('enquiry');
                }} 
              />
            )}

            {activePage === 'products' && (
              <ProductsView 
                products={productsData} 
                onSelectProduct={(pTitle) => {
                  navigateToPage('enquiry');
                }} 
              />
            )}

            {activePage === 'services' && <ServicesView services={servicesData} />}

            {activePage === 'claims' && <ClaimsView />}

            {activePage === 'advisor' && (
              <BecomeAdvisorView 
                onAddAdvisor={handleAddAdvisor} 
                companies={companiesData} 
              />
            )}

            {activePage === 'news' && !selectedPost && (
              <NewsPostsView 
                posts={newsPosts} 
                onSelectPost={(post) => setSelectedPost(post)}
                onAddEnquiry={handleAddEnquiry}
              />
            )}

            {/* SINGLE ARTICLE READER PAGE */}
            {activePage === 'news' && selectedPost && (
              <div className="space-y-6 text-left">
                <button 
                  onClick={() => setSelectedPost(null)}
                  className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition flex items-center gap-1"
                >
                  ← Return to Articles Feed
                </button>
                <div className="h-64 rounded-3xl bg-slate-100 overflow-hidden">
                  <img 
                    src={selectedPost.coverImage} 
                    alt={selectedPost.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-3">
                  <span className="text-[9px] bg-sky-50 text-[#0F4C81] border border-sky-100 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                    {selectedPost.category}
                  </span>
                  <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-tight">
                    {selectedPost.title}
                  </h2>
                  <div className="flex gap-4 text-[10px] text-slate-400 font-mono font-bold pb-2 border-b border-slate-100 uppercase">
                    <span>Published: {selectedPost.publishDate}</span>
                    <span>By {selectedPost.author}</span>
                    <span>Read Time: {selectedPost.readTime}</span>
                  </div>
                </div>
                <div className="text-xs text-slate-600 leading-relaxed font-normal whitespace-pre-line space-y-4 max-w-3xl">
                  {selectedPost.content}
                </div>
                
                {/* Related tags */}
                <div className="flex gap-1.5 pt-4">
                  {selectedPost.tags.map((tg, i) => (
                    <span key={i} className="px-2.5 py-1 bg-slate-100 rounded text-[9px] font-bold text-slate-500 font-mono">
                      #{tg}
                    </span>
                  ))}
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex justify-between items-center mt-8">
                  <div>
                    <h5 className="font-bold text-slate-800 text-xs">Need specific plan recommendations based on this article?</h5>
                    <p className="text-[10px] text-slate-400 mt-0.5">Alexander will calculate your Human Life Value factors instantly.</p>
                  </div>
                  <button 
                    onClick={() => navigateToPage('enquiry')}
                    className="px-4 py-2 bg-[#0F4C81] text-white rounded-lg text-xs font-bold hover:bg-[#0D4170] transition"
                  >
                    Launch Enquiry Setup
                  </button>
                </div>
              </div>
            )}

            {activePage === 'faqs' && <FAQsView faqs={faqData} />}

            {activePage === 'gallery' && <GalleryView gallery={galleryData} />}

            {activePage === 'testimonials' && <TestimonialsView testimonials={testimonialsData} />}

            {activePage === 'contact' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start text-left">
                <div className="space-y-6">
                  <div>
                    <span className="text-[10px] bg-sky-50 text-[#0F4C81] px-3 py-1 rounded-full font-bold uppercase tracking-widest border border-sky-100">OFFICES</span>
                    <h2 className="text-2xl font-extrabold text-slate-900 mt-2">Get In Touch</h2>
                    <p className="text-xs text-slate-500 mt-1">We operate direct advisory hubs in central tech locations. Drop in during operational timings.</p>
                  </div>

                  <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
                    <p><strong>📍 Corporate Office:</strong> 123, Business Tower, Insurance Street, Global Tech Park, Sector-5, City - 400001</p>
                    <p><strong>📞 Licensed Support Line:</strong> +91 9876543210 (10:00 AM - 06:00 PM)</p>
                    <p><strong>✉️ General Portal Enquiries:</strong> alex.pierce@securelife.in</p>
                  </div>

                  {/* Mock Map Panel */}
                  <div className="w-full h-48 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col justify-center items-center text-center p-4">
                    <span className="text-3xl">🗺️</span>
                    <h5 className="font-bold text-xs text-slate-800 mt-2">Interactive Geographic Hub</h5>
                    <p className="text-[9px] text-slate-400">Interactive Map loading is optimized for desktop presentation screens.</p>
                  </div>
                </div>

                <ContactForm onAddContact={handleAddContact} />
              </div>
            )}

            {activePage === 'enquiry' && (
              <EnquiryForm 
                onAddEnquiry={handleAddEnquiry} 
                onAddAdvisor={handleAddAdvisor}
                onAddContact={handleAddContact}
                companiesList={companiesData} 
                productsList={productsData} 
              />
            )}

          </div>

          {/* INNER PAGE FOOTER */}
          <footer className="mt-auto border-t border-slate-200 p-6 bg-slate-50 flex justify-between items-center text-[10px] font-mono font-bold text-slate-400">
            <div className="flex gap-6 uppercase tracking-wider">
              <span className="cursor-pointer hover:text-[#0F4C81] transition">Privacy Protocols</span>
              <span className="cursor-pointer hover:text-[#0F4C81] transition">Terms of Use</span>
              <span className="cursor-pointer hover:text-[#0F4C81] transition">IRDAI Disclaimer</span>
            </div>
            <div className="flex gap-3 items-center">
              <span>IRDAI Portal ID: #SEC-990-MDB</span>
            </div>
          </footer>
        </section>

        {/* ==========================================
            C. RIGHT SIDEBAR (METRICS & CHAT COMPANION)
            ========================================== */}
        <aside className="w-52 hidden xl:flex flex-col gap-4 flex-shrink-0 sticky top-28 self-start">
          
          {/* Claim Settlement Performance Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col justify-between shadow-sm relative text-left">
            <div>
              <span className="text-[9px] font-mono font-extrabold text-emerald-600 uppercase tracking-wider block">★ Verified Statistics</span>
              <h4 className="font-extrabold text-xs text-slate-800 uppercase tracking-wide mt-3">24/7 Claim Support</h4>
              <p className="text-[10px] text-slate-400 leading-normal mt-1">Our specialized claims coordinators handle dispute resolution. Average cashless dispatch takes under 2 hours.</p>
            </div>
            <div className="border-t border-slate-100 pt-3 text-[9px] text-slate-400 font-mono mt-4 flex items-center justify-between">
              <span>Resolution Rate: 99.5%</span>
              <span className="text-emerald-500 font-bold">● Active</span>
            </div>
          </div>

          {/* Simulated Help Chat Bubble Area */}
          <div className="bg-[#0F4C81] border border-[#0D4170] rounded-2xl p-4 flex flex-col justify-between text-white shadow-lg relative text-left">
            <div className="flex flex-col space-y-3">
              <div className="space-y-1 pb-2 border-b border-white/10">
                <span className="text-[10px] font-mono font-extrabold text-sky-200 uppercase tracking-widest block">Aynkaran AI Companion</span>
                <h4 className="font-extrabold text-xs uppercase tracking-wider">Interactive Assistant</h4>
              </div>

              {/* Chat Feed */}
              <div className="overflow-y-auto max-h-48 text-[10px] space-y-2.5 custom-scrollbar pr-1">
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={`p-2 rounded-lg leading-normal ${msg.sender === 'user' ? 'bg-[#3FA9F5] text-white ml-6 text-right' : 'bg-[#0D4170] text-sky-50 mr-6'}`}>
                    {msg.text}
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendMessage} className="flex gap-1 pt-2 border-t border-white/10">
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask AynkaranBot..." 
                  className="w-full bg-[#0D4170] border border-[#3FA9F5]/20 rounded p-1.5 text-[10px] outline-none focus:border-[#F4B400] text-white placeholder-sky-200"
                />
                <button type="submit" className="p-1.5 bg-[#3FA9F5] text-white rounded hover:bg-[#3FA9F5]/90 transition">
                  <Send className="w-3 h-3" />
                </button>
              </form>
            </div>
          </div>
        </aside>

      </main>

      {/* 4. GLOBAL BOTTOM FOOTER */}
      <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 flex-shrink-0 z-20 mt-10 text-left">
        <div className="max-w-[1920px] mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand & Bio */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-inner">
                <Umbrella className="w-4 h-4 text-[#0F4C81] stroke-[2.5]" />
              </div>
              <span className="font-extrabold text-white text-sm tracking-wide uppercase">Aynkaran Consultants</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              India's premier independent insurance consultancy and recruiting partner. Providing tailored life, health, and retirement security since 2012.
            </p>
            <div className="text-[10px] font-mono text-slate-400 space-y-0.5">
              <p>IRDAI Registration No. 1290-A</p>
              <p>ISO 9001:2015 Certified Operations</p>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-l-2 border-[#3FA9F5] pl-2.5">
              Quick Portals
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400 font-medium">
              <li><button onClick={() => navigateToPage('home')} className="hover:text-white transition">Home Dashboard</button></li>
              <li><button onClick={() => navigateToPage('about')} className="hover:text-white transition">About Our Firm</button></li>
              <li><button onClick={() => navigateToPage('companies')} className="hover:text-white transition">Partner Insurers</button></li>
              <li><button onClick={() => navigateToPage('products')} className="hover:text-white transition">Insurance Plans</button></li>
              <li><button onClick={() => navigateToPage('services')} className="hover:text-white transition">Consulting Services</button></li>
              <li><button onClick={() => navigateToPage('advisor')} className="hover:text-white transition">Become an Advisor</button></li>
            </ul>
          </div>

          {/* Col 3: Policy Categories */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-l-2 border-emerald-500 pl-2.5">
              Insurance Solutions
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400 font-medium">
              <li><button onClick={() => navigateToPage('products')} className="hover:text-white transition">Term Life Protection</button></li>
              <li><button onClick={() => navigateToPage('products')} className="hover:text-white transition">Comprehensive Health Guard</button></li>
              <li><button onClick={() => navigateToPage('products')} className="hover:text-white transition">Child Higher Education Fund</button></li>
              <li><button onClick={() => navigateToPage('products')} className="hover:text-white transition">Guaranteed Pension & Retirement</button></li>
              <li><button onClick={() => navigateToPage('claims')} className="hover:text-white transition">24/7 Cashless Claim Desk</button></li>
            </ul>
          </div>

          {/* Col 4: Contact & Support */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-l-2 border-[#F4B400] pl-2.5">
              Connect With Us
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <p className="flex items-center gap-2">
                <span className="text-[#F4B400] font-bold">📞 Phone:</span> +91 9876543210
              </p>
              <p className="flex items-center gap-2">
                <span className="text-[#3FA9F5] font-bold">✉️ Email:</span> contact@aynkaran.in
              </p>
              <p className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">📍 Head Office:</span> Corporate Tower, Mount Road, Chennai, TN
              </p>
              <div className="pt-1">
                <button 
                  onClick={() => navigateToPage('enquiry')}
                  className="bg-[#3FA9F5] hover:bg-[#3FA9F5]/90 text-white font-bold text-[11px] px-3.5 py-1.5 rounded-lg transition uppercase tracking-wider"
                >
                  Request Call Back
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Sub-footer Disclaimer Bar */}
        <div className="border-t border-slate-800 bg-slate-950 py-3 px-6 text-[10px] font-mono text-slate-500">
          <div className="max-w-[1920px] mx-auto flex flex-col md:flex-row justify-between items-center gap-2 text-center md:text-left">
            <p>© 2026 Aynkaran Consultants Private Limited • All Rights Reserved</p>
            <div className="flex flex-wrap justify-center gap-5">
              <span className="hover:text-slate-300 cursor-pointer">Privacy Protocols</span>
              <span className="hover:text-slate-300 cursor-pointer">Terms of Use</span>
              <span className="hover:text-slate-300 cursor-pointer">IRDAI Disclaimer</span>
              <span>Portal ID: #SEC-990-MDB</span>
            </div>
          </div>
        </div>
      </footer>

      {/* 5. FLOATING COMPANION BUTTONS */}
      {/* Scroll to Top */}
      <button 
        onClick={handleScrollToTop}
        className="fixed bottom-6 right-6 z-40 bg-white border border-slate-200 hover:border-slate-300 p-3 rounded-full shadow-lg hover:shadow-xl transition"
        title="Back to Top"
      >
        <ArrowUp className="w-4 h-4 text-slate-600" />
      </button>

    </div>
  );
}
