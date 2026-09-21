//components/PageViews.jsx
import React, { useState } from 'react';
import { 
  Building, ShieldAlert, Award, Calendar, Heart, BookOpen, 
  User, Search, Share2, ArrowRight, CheckCircle2, ChevronRight,
  Download, HelpCircle, Star, Users, Phone, Video
} from 'lucide-react';
import { EnquiryForm, AdvisorForm } from './LeadForms';

export function WebsitePosters({ posters = {}, side = 'left' }) {
  const slots =
    side === 'left'
      ? ['leftTop', 'leftBottom']
      : ['rightTop', 'rightBottom'];

  return (
    <div className="space-y-3">
      {slots.map((key) => {
        const p = posters[key];
        const src = contentMediaUrl(p?.url || p?.image);
        if (!src) return null;
        return (
          <div
            key={key}
            className="rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm"
          >
            <img src={src} alt={key} className="w-full h-auto object-cover" />
          </div>
        );
      })}
    </div>
  );
}

const CONTENT_API =
  import.meta.env.VITE_DESKTOP_DEPLOYED_API_URL ||
  import.meta.env.VITE_DESKTOP_API_URL ||
  import.meta.env.VITE_API_URL ||
  'https://aynkaran-backend.onrender.com';

function contentMediaUrl(path) {
  if (!path) return null;
  const s = String(path);
  if (/^https?:\/\//i.test(s) || s.startsWith('blob:') || s.startsWith('data:')) {
    return s;
  }
  return `${CONTENT_API.replace(/\/$/, '')}${s.startsWith('/') ? s : `/${s}`}`;
}

function isVideoPath(path) {
  return /\.(mp4|webm|mov|m4v|ogg)$/i.test(String(path || ''));
}

// ==========================================
// 1. ABOUT US PAGE
// ==========================================
export function AboutUsView({ companies }) {
  const values = [
    { title: 'Absolute Integrity', desc: 'Every policy details, riders, and commissions are disclosed with 100% transparency.', icon: ShieldAlert },
    { title: 'Empathy First', desc: 'Claims represent difficult life transitions; we handle every claim assistance request with utmost speed and compassion.', icon: Heart },
    { title: 'Unbiased Choice', desc: 'Associated with public and private providers to bring you the best market covers without favoritism.', icon: Building }
  ];

  const milestones = [
    { year: '2012', title: 'Foundation', desc: 'Began as a small insurance advisory consultancy.' },
    { year: '2016', title: 'Multi-Brand Link', desc: 'Partnered with SBI Life, HDFC Life, Care Health, and Bajaj General Insurance to extend advisor capabilities.' },
    { year: '2020', title: 'Digital Upgrade', desc: 'Integrated state-of-the-art lead logging and customer renewal databases.' },
    { year: '2024', title: 'Peak Scale', desc: 'Assisted over 12,000 active policies and built a team of 150+ licensed advisors.' }
  ];

  return (
    <div className="space-y-6">
      {/* Introduction */}
      <div className="space-y-2">
        <span className="text-[10px] bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-bold uppercase tracking-widest">WHO WE ARE</span>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Protecting Indian Families Since 2012</h2>
        <p className="text-xs text-slate-500 leading-relaxed max-w-3xl">
          We operate as independent Insurance Business Managers linked with India's premier public and private insurers. We don't just sell policy binders—we craft lifelong financial protection nets tailored to family sizes, mortgage parameters, and wealth milestones.
        </p>
      </div>

      {/* Vision & Mission */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-5 bg-blue-600 rounded-2xl text-white shadow-lg shadow-blue-100">
          <h4 className="font-bold text-base mb-1">Our Mission</h4>
          <p className="text-xs opacity-95 leading-relaxed">
            To simplify complex policy variables and empower over 100,000 middle-income households with budget-friendly, high-sum-assured life and medical security parameters.
          </p>
        </div>
        <div className="p-5 bg-slate-900 rounded-2xl text-white shadow-lg shadow-slate-950/20">
          <h4 className="font-bold text-base mb-1">Our Vision</h4>
          <p className="text-xs opacity-95 leading-relaxed">
            To become India's most trusted digital-first insurance recruitment and consultation portal, bridging the gap between national providers and on-field client assistance.
          </p>
        </div>
      </div>

      {/* Core Values */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-800">Our Pillars of Operations</h3>
        <div className="grid grid-cols-3 gap-4">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <div key={i} className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-2">
                <div className="w-8 h-8 bg-white shadow-sm border border-slate-150 rounded-lg flex items-center justify-center text-blue-600">
                  <Icon className="w-4 h-4" />
                </div>
                <h5 className="font-bold text-xs text-slate-800">{v.title}</h5>
                <p className="text-[11px] text-slate-500 leading-normal">{v.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Business Timeline */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-800">Our Growth Journey</h3>
        <div className="relative border-l border-slate-200 ml-3 pl-6 space-y-4 py-1">
          {milestones.map((m, i) => (
            <div key={i} className="relative">
              <span className="absolute -left-[33px] top-0.5 w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-[9px] shadow border-2 border-white">
                ✓
              </span>
              <span className="text-[10px] font-mono font-bold text-blue-600">{m.year}</span>
              <h5 className="font-bold text-xs text-slate-800 mt-0.5">{m.title}</h5>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements & Certification */}
      <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl grid grid-cols-2 gap-4 items-center">
        <div>
          <h4 className="font-bold text-sm text-slate-800 mb-1">Government Certified Licensing</h4>
          <p className="text-[11px] text-slate-500 leading-relaxed mb-3">
            We are fully registered and certified under IRDAI (Insurance Regulatory and Development Authority of India) protocols. All our 150+ associate advisors undergo official training examinations before handling customer advice portfolios.
          </p>
          <div className="flex gap-3">
            <span className="px-2 py-0.5 bg-white border border-slate-200 rounded text-[9px] font-bold text-slate-500">IRDAI Certified</span>
            <span className="px-2 py-0.5 bg-white border border-slate-200 rounded text-[9px] font-bold text-slate-500">ISO 9001:2015 Support</span>
          </div>
        </div>
        <div className="flex justify-center gap-4">
          <div className="text-center p-3 bg-white shadow-sm border border-slate-100 rounded-xl w-28">
            <Award className="w-6 h-6 text-amber-500 mx-auto mb-1" />
            <span className="block text-lg font-extrabold text-slate-800">15+</span>
            <span className="text-[8px] font-bold text-slate-400 uppercase">Awards Won</span>
          </div>
          <div className="text-center p-3 bg-white shadow-sm border border-slate-100 rounded-xl w-28">
            <Users className="w-6 h-6 text-blue-500 mx-auto mb-1" />
            <span className="block text-lg font-extrabold text-slate-800">12K+</span>
            <span className="text-[8px] font-bold text-slate-400 uppercase">Happy Families</span>
          </div>
        </div>
      </div>

      {/* Meet the Business Manager */}
      <div className="bg-slate-900 text-white p-5 rounded-2xl flex items-center gap-5 shadow-xl shadow-slate-950/10">
        <div className="w-16 h-16 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 text-2xl font-extrabold flex-shrink-0">
          AC
        </div>
        <div className="space-y-1.5 text-left">
          <span className="text-[9px] bg-blue-500/10 border border-blue-500/20 text-blue-400 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
            Lead Business Manager
          </span>
          <h4 className="text-base font-bold">Aynkaran Consultants Team</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            "We believe that insurance shouldn't be a generic box product. Every family has a unique dynamic, a different home loan debt structure, and specific higher-education goals. Our team acts as an advisory shield, matching your needs with premium plans from leading companies."
          </p>
          <div className="flex gap-4 pt-1 text-[9px] font-mono text-slate-400">
            <span>📞 +91 9876543210</span>
            <span>✉️ contact@aynkaran.in</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. INSURANCE COMPANIES PAGE
// ==========================================
export function CompaniesView({ companies, onSelectCompany, onViewProducts }) {
  const DESKTOP_API =
    import.meta.env.VITE_DESKTOP_DEPLOYED_API_URL ||
    import.meta.env.VITE_DESKTOP_API_URL ||
    'https://aynkaran-backend.onrender.com';
  const BACKEND_API = import.meta.env.VITE_API_URL;

  const imageUrl = (path) => {
    if (!path) return null;
    if (path.startsWith('http://') || path.startsWith('https://')) return path;
    const normalized = path.startsWith('/') ? path : `/${path}`;
    const base = (String(normalized).startsWith('/uploads') && DESKTOP_API)
      ? DESKTOP_API
      : BACKEND_API || DESKTOP_API || 'http://localhost:5000';
    return `${String(base).replace(/\/$/, '')}${normalized}`;
  };

  const renderBold = (text) =>
    String(text || '')
      .split(/(\*\*[^*]+\*\*)/g)
      .map((part, j) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <strong key={j}>{part.slice(2, -2)}</strong>
        ) : (
          <span key={j}>{part}</span>
        )
      );

  if (!companies || companies.length === 0) {
    return (
      <div className="space-y-4">
        <div className="space-y-1 text-center max-w-xl mx-auto">
          <span className="text-[10px] bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-bold uppercase tracking-widest">
            PARTNERS
          </span>
          <h2 className="text-xl font-extrabold text-slate-900">
            Associated Insurance Providers
          </h2>
        </div>
        <div className="p-10 text-center text-slate-400 text-sm bg-slate-50 rounded-2xl border border-slate-100">
          No insurance companies found.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-1 text-center max-w-xl mx-auto">
        <span className="text-[10px] bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-bold uppercase tracking-widest">
          PARTNERS
        </span>
        <h2 className="text-xl font-extrabold text-slate-900">
          Associated Insurance Providers
        </h2>
        <p className="text-xs text-slate-500 leading-normal">
          Trusted partners offering clear protection options for your family and
          future.
        </p>
      </div>

      <div className="space-y-4">
        {companies.map((co) => {
          const logoSrc = imageUrl(co.logo);
          const bgSrc = imageUrl(co.backgroundImage);
          const points = Array.isArray(co.descriptionPoints)
            ? [...co.descriptionPoints].sort(
                (a, b) => (a.order ?? 0) - (b.order ?? 0)
              )
            : [];

          return (
            <div
              key={co.id}
              role="button"
              tabIndex={0}
              onClick={() => onViewProducts?.(co.name)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onViewProducts?.(co.name);
                }
              }}
              className="relative border border-slate-200 rounded-2xl bg-white shadow-sm hover:shadow-md overflow-hidden flex flex-col md:flex-row min-h-[160px] cursor-pointer transition"
              style={
                bgSrc
                  ? {
                      backgroundImage: `linear-gradient(rgba(255,255,255,0.88), rgba(255,255,255,0.92)), url(${bgSrc})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }
                  : undefined
              }
            >
              {/* Left — brand */}
              <div className="md:w-2/5 p-5 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-100">
                <div className="space-y-3">
                  <div className="w-14 h-14 bg-white rounded-xl border border-slate-200 flex items-center justify-center overflow-hidden">
                    {logoSrc ? (
                      <img
                        src={logoSrc}
                        alt={co.name}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : (
                      <span className="text-xs font-black text-slate-500">
                        {(co.name || 'INS').slice(0, 3).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-slate-900 text-base">{co.name}</h4>
                  <div className="flex flex-wrap gap-1">
                    {(co.categories || []).map((cat, idx) => (
                      <span
                        key={idx}
                        className="text-[8px] px-1.5 py-0.5 rounded font-semibold uppercase bg-blue-50 text-blue-600 border border-blue-100"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="pt-4">
                  {co.consultationEnabled === true ? (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectCompany?.(co.name);
                      }}
                      className="px-3 py-1.5 bg-slate-900 hover:bg-blue-600 text-white rounded-lg text-xs font-bold inline-flex items-center gap-1"
                    >
                      Request Consultation
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled
                      onClick={(e) => e.stopPropagation()}
                      className="px-3 py-1.5 bg-slate-200 text-slate-400 rounded-lg text-xs font-bold cursor-not-allowed"
                    >
                      Consultation Paused
                    </button>
                  )}
                </div>
              </div>

              {/* Right — description points */}
              <div className="md:w-3/5 p-5 text-left">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  About this partner
                </p>
                {points.length > 0 ? (
                  <ul className="space-y-2">
                    {points.map((pt, i) => (
                      <li
                        key={i}
                        className="text-xs text-slate-600 flex gap-2 leading-relaxed"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 mt-0.5 shrink-0" />
                        <span>{renderBold(pt.text || pt)}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {co.description ||
                      co.shortDescription ||
                      `${co.name} – partner of Aynkaran Consultants.`}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ==========================================
// 3. INSURANCE PRODUCTS PAGE
// ==========================================
const asList = (val) => {
  if (!val) return [];
  if (Array.isArray(val)) {
    return val
      .map((item) => (typeof item === 'string' ? item : item?.text || ''))
      .filter(Boolean);
  }
  if (typeof val === 'string') {
    return val
      .split(/[•\n]| · /)
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
};

export function ProductsView({ products, onSelectProduct, partnerFilter, onClearPartnerFilter }) {
  const [brochure, setBrochure] = useState(null);

  const allProducts = products || [];
  const filteredProducts = partnerFilter
    ? allProducts.filter((p) => {
        const partner = (p.partnerName || p.companyName || p.partner || '').toString().trim().toLowerCase();
        const filter = String(partnerFilter).trim().toLowerCase();
        return partner === filter || partner.includes(filter) || filter.includes(partner);
      })
    : allProducts;

  const DESKTOP_API =
    import.meta.env.VITE_DESKTOP_DEPLOYED_API_URL ||
    import.meta.env.VITE_DESKTOP_API_URL ||
    'https://aynkaran-backend.onrender.com';
  const BACKEND_API = import.meta.env.VITE_API_URL;

  const fileUrl = (path) => {
    if (!path) return null;
    if (/^https?:\/\//i.test(String(path)) || String(path).startsWith('blob:')) {
      return path;
    }
    const normalized = String(path).startsWith('/') ? path : `/${path}`;
    const base = (normalized.startsWith('/uploads') && DESKTOP_API)
      ? DESKTOP_API
      : BACKEND_API || DESKTOP_API || 'http://localhost:5000';
    return `${String(base).replace(/\/$/, '')}${normalized}`;
  };

  const asList = (val) => {
    if (!val) return [];
    if (Array.isArray(val)) {
      return val
        .map((x) => (typeof x === 'string' ? x : x?.text || ''))
        .filter(Boolean);
    }
    if (typeof val === 'string') {
      return val
        .split(/[•\n]| · /)
        .map((s) => s.trim())
        .filter(Boolean);
    }
    return [];
  };

  const renderBold = (text) =>
    String(text || '')
      .split(/(\*\*[^*]+\*\*)/g)
      .map((part, j) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <strong key={j} className="font-bold text-slate-700">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <span key={j}>{part}</span>
        )
      );

  return (
    <div className="space-y-5">
      <div className="space-y-1 text-center max-w-xl mx-auto">
        <span className="text-[10px] bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-bold uppercase tracking-widest">
          SHOWCASE
        </span>
        <h2 className="text-xl font-extrabold text-slate-900">
          {partnerFilter
            ? `Policies from ${partnerFilter}`
            : 'Explore Our Insurance Policies'}
        </h2>
        <p className="text-xs text-slate-500 leading-normal">
          {partnerFilter
            ? `Showing products associated with ${partnerFilter}.`
            : 'Simple plans to protect your health, family, income, and future. Compare features and choose what fits you best.'}
        </p>
        {partnerFilter && (
          <button
            type="button"
            onClick={() => onClearPartnerFilter?.()}
            className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
          >
            ← Show all products
          </button>
        )}
      </div>

      <div className="space-y-3">
        {filteredProducts.length === 0 ? (
          <div className="p-6 text-center text-slate-400 text-sm bg-slate-50 rounded-xl border border-slate-100">
            {partnerFilter
              ? `No products found for ${partnerFilter}.`
              : 'No products available yet.'}
          </div>
        ) : (
filteredProducts.map((p) => {
  const features = asList(p.features || p.keyFeatures);
  const benefits = asList(p.benefits);
  const eligibilityList = asList(p.eligibilityCriteria || p.eligibility);
  const brochureHref = fileUrl(
    p.brochurePath || p.brochure?.path || p.brochureUrl
  );
            return (
              <div
                key={p.id}
                className="p-4 border border-slate-200 rounded-xl bg-white shadow-sm hover:shadow-md transition"
              >
                <div className="grid grid-cols-1 lg:grid-cols-[3.9fr_0.9fr] items-start gap-2">
                  {/* Left column — product details */}
                  <div className="flex flex-col justify-between h-full space-y-5">
                    <div>
                      <span className="text-[10px] bg-blue-50 text-blue-600 border border-blue-100 px-2 py-1 rounded-full font-bold uppercase tracking-widest inline-block">
                        {p.category || 'Insurance'} Category
                      </span>
                      <h3 className="text-lg font-extrabold text-slate-900 mt-3">
                        {p.title}
                      </h3>
                      <p className="text-sm text-slate-500 leading-relaxed mt-2">
                        {p.description}
                      </p>
                      {p.partnerName && (
                        <p className="text-xs text-slate-400 mt-2">
                          Partner:{' '}
                          <span className="font-semibold text-slate-600">{p.partnerName}</span>
                        </p>
                      )}
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-[11px] font-bold uppercase tracking-widest border-l-4 border-blue-600 pl-2 mb-2">
                          Key Policy Features
                        </h4>
                        <ul className="space-y-2">
                          {features.length === 0 ? (
                            <li className="text-sm text-slate-400">—</li>
                          ) : (
                            features.map((f, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-slate-600">{renderBold(f)}</span>
                              </li>
                            ))
                          )}
                        </ul>
                      </div>

                      {benefits.length > 0 && (
                        <div>
                          <h4 className="text-[11px] font-bold uppercase tracking-widest border-l-4 border-blue-600 pl-2 mb-2">
                            Premium Benefits
                          </h4>
                          <ul className="space-y-2">
                            {benefits.map((b, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <Star className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-slate-600">{renderBold(b)}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="pt-1">
                        {p.consultationEnabled === true ? (
                          <button
                            type="button"
                            onClick={() => onSelectProduct?.(p.title)}
                            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-sm hover:shadow-md transition"
                          >
                            Submit Enquiry
                          </button>
                        ) : (
                          <button
                            type="button"
                            disabled
                            className="px-5 py-2.5 bg-slate-200 text-slate-400 rounded-xl text-sm font-bold cursor-not-allowed"
                          >
                            Consultation Paused
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right column — brochure preview (top) + eligibility (bottom) */}
                  <div className="flex flex-col h-full justify-between space-y-4">
                    {brochureHref && (
                      <div className="rounded-xl border border-slate-200 shadow-sm hover:shadow-md overflow-hidden">
                        <button
                          type="button"
                          onClick={() => {
                            setBrochure({
                              url: brochureHref,
                              title: p.title,
                              fileName: p.brochureFileName || p.brochure?.fileName || 'Brochure.pdf',
                            });
                          }}
                          className="block w-full text-left"
                        >
                          <div className="aspect-[4/3] w-full bg-slate-100 relative overflow-hidden">
                            <iframe
                              src={`${brochureHref}#toolbar=0&navpanes=0&scrollbar=0`}
                              title={`${p.title} brochure preview`}
                              className="w-full h-full pointer-events-none"
                              scrolling="no"
                            />
                            {/* invisible overlay ensures clicks anywhere open the modal even if iframe would capture them */}
                            <span className="absolute inset-0 block" aria-hidden />
                          </div>

                          <div className="px-3 py-2 bg-gradient-to-t from-slate-900/80 to-transparent text-white">
                            <div className="text-sm font-semibold">View Brochure</div>
                            <div className="text-xs opacity-80">Click to open document</div>
                          </div>
                        </button>
                      </div>
                    )}

                    <div className="bg-slate-900 rounded-xl text-white p-4">
                      <h4 className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-2">
                        Eligibility criteria
                      </h4>
                      {eligibilityList.length > 0 ? (
                        <ul className="space-y-2">
                          {eligibilityList.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-blue-400 mt-1">•</span>
                              <span className="text-xs text-slate-300 leading-relaxed">{renderBold(item)}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-xs text-slate-300">As per insurer guidelines</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Brochure popup */}
      {brochure && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setBrochure(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-5 py-3 border-b flex justify-between items-center gap-3">
              <div className="min-w-0">
                <p className="font-bold text-slate-900 text-sm">{brochure.title}</p>
                <p className="text-[11px] text-slate-500 truncate">{brochure.fileName}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <a
                  href={brochure.url}
                  download={brochure.fileName}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-600 text-white"
                >
                  Download
                </a>
                <button
                  type="button"
                  onClick={async () => {
                    if (navigator.share) {
                      try {
                        await navigator.share({
                          title: brochure.title,
                          url: brochure.url,
                        });
                      } catch (_) {}
                    } else {
                      try {
                        await navigator.clipboard.writeText(brochure.url);
                        alert('Link copied');
                      } catch (_) {}
                    }
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-700"
                >
                  Share
                </button>
                <button
                  type="button"
                  onClick={() => setBrochure(null)}
                  className="text-slate-500 px-2 text-lg leading-none"
                >
                  ×
                </button>
              </div>
            </div>
            <iframe
              src={brochure.url}
              title="brochure"
              className="w-full h-[70vh] bg-slate-50"
            />
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 4. CLAIMS ASSISTANCE VIEW
// ==========================================
export function ClaimsView() {
  const claimSteps = [
    { step: '01', title: 'Immediate Intimation', desc: 'Call our 24/7 claims desk or the insurance provider within 24 hours of the event.' },
    { step: '02', title: 'Document Audit', desc: 'Our team audits your hospital bills, death certificate, or discharge summary for accuracy.' },
    { step: '03', title: 'Submission Support', desc: 'We handle the physical or digital submission to the insurer\'s claims department.' },
    { step: '04', title: 'Tracking & Payout', desc: 'Active follow-up with the TPA (Third Party Administrator) until the amount is credited.' }
  ];

  const stepByStepGuide = [
    { step: 'A', title: 'Hospitalization', desc: 'Inform the TPA desk at the hospital and provide your policy number.' },
    { step: 'B', title: 'Pre-Auth', desc: 'The hospital sends a pre-authorization request for cashless treatment.' },
    { step: 'C', title: 'Verification', desc: 'The insurer verifies the medical necessity and coverage parameters.' },
    { step: 'D', title: 'Settlement', desc: 'The insurer pays the hospital directly, minus any non-medical deductions.' }
  ];

  return (
    <div className="space-y-6 text-left">
      <div className="space-y-1 text-center max-w-xl mx-auto">
        <span className="text-[10px] bg-rose-50 text-rose-600 px-3 py-1 rounded-full font-bold uppercase tracking-widest">SUPPORT</span>
        <h2 className="text-xl font-extrabold text-slate-900">Claim Assistance & Settlement Guide</h2>
        <p className="text-xs text-slate-500 leading-normal">
          We understand that claims are the most critical moment in your insurance journey. Our dedicated desk ensures zero-hassle documentation.
        </p>
      </div>

      {/* 1. CLAIMS PROCESS */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
          <span className="w-2 h-2 rounded-full bg-blue-600"></span>
          <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wide">1. The Standard Claims Workflow</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {claimSteps.map((s) => (
            <div key={s.step} className="p-4 bg-slate-50 border border-slate-150 rounded-2xl flex gap-4">
              <span className="text-2xl font-black text-blue-200 font-mono">{s.step}</span>
              <div>
                <h4 className="font-bold text-xs text-slate-800">{s.title}</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. DOCUMENT CHECKLIST */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wide">2. Essential Document Checklist</h3>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5 grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Medical / Health Claims</h4>
            <ul className="space-y-1.5">
              {['Original Discharge Summary', 'Final Hospital Bill & Receipts', 'Diagnostic Reports (X-Ray, MRI)', 'Cancelled Cheque for Payout'].map((item, i) => (
                <li key={i} className="text-[11px] text-slate-600 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Life / Death Claims</h4>
            <ul className="space-y-1.5">
              {['Original Policy Document', 'Death Certificate (Municipal)', 'Nominee ID & Address Proof', 'Claimant Statement Form'].map((item, i) => (
                <li key={i} className="text-[11px] text-slate-600 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 3. STEP BY STEP GUIDE */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
          <span className="w-2 h-2 rounded-full bg-amber-500"></span>
          <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wide">3. Step-by-Step Guide</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {stepByStepGuide.map((st) => (
            <div key={st.step} className="p-4 bg-white border border-slate-200 rounded-xl space-y-2 relative shadow-sm">
              <span className="text-2xl font-black font-mono text-slate-100 absolute top-2 right-3 select-none">
                {st.step}
              </span>
              <h4 className="font-bold text-xs text-slate-800 pr-6">{st.title}</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">{st.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. CONTACT SUPPORT */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
          <span className="w-2 h-2 rounded-full bg-purple-600"></span>
          <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wide">4. Contact Support</h3>
        </div>
        <div className="bg-slate-900 text-white p-5 rounded-xl grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <span className="text-[9px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-bold uppercase">
              24/7 Toll-Free Line
            </span>
            <h4 className="font-bold text-sm text-white">Emergency Claims Desk</h4>
            <p className="text-[11px] text-slate-400">Immediate hospital pre-authorization and intimation help available around the clock.</p>
            <p className="text-sm font-bold font-mono text-emerald-400 pt-1">+91 9876543210</p>
          </div>

          <div className="space-y-1.5">
            <span className="text-[9px] bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded font-bold uppercase">
              Email Assistance
            </span>
            <h4 className="font-bold text-sm text-white">Document Audit Desk</h4>
            <p className="text-[11px] text-slate-400">Send scanned copies of medical bills and claims forms for pre-submission audit.</p>
            <p className="text-xs font-bold font-mono text-blue-300 pt-1">claims@aynkaran.in</p>
          </div>

          <div className="space-y-1.5">
            <span className="text-[9px] bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded font-bold uppercase">
              Head Office Support
            </span>
            <h4 className="font-bold text-sm text-white">Walk-in Help Center</h4>
            <p className="text-[11px] text-slate-400">Visit our nearest consultancy desk for physical submission and advocate assistance.</p>
            <p className="text-xs text-slate-300 pt-1">Corporate Tower, Mount Road, Chennai, TN</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 5. SERVICES VIEW
// ==========================================
export function ServicesView({ services }) {
  return (
    <div className="space-y-5 text-left">
      <div className="space-y-1 text-center max-w-xl mx-auto">
        <span className="text-[10px] bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-bold uppercase tracking-widest">WHAT WE DO</span>
        <h2 className="text-xl font-extrabold text-slate-900">Comprehensive Consulting Support</h2>
        <p className="text-xs text-slate-500 leading-normal">
          From human life calculations to active litigation or cashless hospital admissions assistance, our advisory provides standard support.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {services.map((serv) => (
          <div key={serv.id} className="p-4 bg-white border border-slate-150 rounded-xl hover:border-blue-200 transition-all shadow-sm hover:shadow-md space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 font-bold text-xs">
                ★
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-slate-800 text-xs">{serv.title}</h4>
                <p className="text-[11px] text-slate-500 leading-normal">{serv.description}</p>
              </div>
            </div>
            <ul className="space-y-1 pt-2 border-t border-slate-50 mt-2">
              {serv.details.map((det, idx) => (
                <li key={idx} className="text-[10px] text-slate-500 flex items-start gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>{det}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// 6. ADVISOR OPPORTUNITY VIEW
// ==========================================
export function BecomeAdvisorView({ 
  onAddAdvisor, 
  companies 
}) {
  const steps = [
    { num: '1', title: 'Application', desc: 'Submit the registration form on this portal.' },
    { num: '2', title: 'Screening', desc: 'Undergo a brief phone screening with our Lead Advisor.' },
    { num: '3', title: 'IRDAI training', desc: 'Join the mandatory 15-hour training course.' },
    { num: '4', title: 'Certification', desc: 'Pass the IRDAI certification test and receive your official advisory license!' }
  ];

  return (
    <div className="space-y-5 text-left">
      <div className="space-y-1 text-center max-w-xl mx-auto">
        <span className="text-[10px] bg-emerald-50 text-emerald-600 border border-emerald-200 px-3 py-1 rounded-full font-bold uppercase tracking-widest">CAREERS</span>
        <h2 className="text-xl font-extrabold text-slate-900">Become an Insurance Advisor</h2>
        <p className="text-xs text-slate-500 leading-normal">
          Embark on an outstanding professional track with high payouts, zero capital requirements, and complete hours flexibility.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 items-center">
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-800">Unlocking Infinite Earning Parameters</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            As a certified advisor, you earn a high percentage on every initial and renewal premium payment from your clients. Your commissions accumulate decade-after-decade, establishing true passive wealth.
          </p>
          
        </div>
      </div>

      <AdvisorForm onAddAdvisor={onAddAdvisor} companiesList={companies} />
    </div>
  );
}

// ==========================================
// 7. NEWS & POSTS PAGE
// ==========================================
export function NewsPostsView({ posts = [], onSelectPost, onAddEnquiry }) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const CONTENT_API =
    import.meta.env.VITE_DESKTOP_DEPLOYED_API_URL ||
    import.meta.env.VITE_DESKTOP_API_URL ||
    import.meta.env.VITE_API_URL ||
    'https://aynkaran-backend.onrender.com';

  const mediaUrl = (path) => {
    if (!path) return null;
    const s = String(path);
    if (/^https?:\/\//i.test(s) || s.startsWith('blob:') || s.startsWith('data:')) {
      return s;
    }
    return `${CONTENT_API.replace(/\/$/, '')}${s.startsWith('/') ? s : `/${s}`}`;
  };

  const categories = [
    'All',
    'Educational',
    'Industry Updates',
    'Tips & Guide',
    'Recruitment',
  ];

  const list = Array.isArray(posts) ? posts : [];

  const filteredPosts = list.filter((p) => {
    const title = (p.title || '').toLowerCase();
    const desc = (p.description || '').toLowerCase();
    const tags = Array.isArray(p.tags) ? p.tags : [];
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      title.includes(q) ||
      desc.includes(q) ||
      tags.some((t) => String(t).toLowerCase().includes(q));
    const matchesCategory =
      activeCategory === 'All' || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-4 text-left">
      <div className="flex justify-between items-end gap-4 flex-wrap">
        <div className="space-y-1">
          <span className="text-[10px] bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-bold uppercase tracking-widest">
            BLOG
          </span>
          <h2 className="text-xl font-extrabold text-slate-900">
            Insurance Insights & Articles
          </h2>
        </div>
        <div className="relative w-60">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 border border-slate-200 bg-slate-50/50 rounded-lg text-xs outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 border-b border-slate-100 pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`px-2.5 py-0.5 rounded text-xs font-bold transition ${
              activeCategory === cat
                ? 'bg-slate-900 text-white'
                : 'bg-slate-50 text-slate-500 hover:text-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filteredPosts.length === 0 ? (
        <div className="p-8 text-center text-slate-400 text-xs bg-slate-50 rounded-2xl border border-slate-100">
          No articles yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {filteredPosts.map((post) => {
            const cover = mediaUrl(
              post.coverImage || post.image || post.url
            );
            return (
              <article
                key={post.id}
                onClick={() => onSelectPost?.(post)}
                className="group cursor-pointer border border-slate-200 bg-white rounded-2xl overflow-hidden flex flex-col hover:border-blue-300 hover:shadow-md transition"
              >
                {/* Fixed aspect image area — fills card width cleanly */}
                <div className="relative w-full aspect-[21/9] bg-slate-100 overflow-hidden">
                  {cover ? (
                    <img
  src={cover}
  alt={post.title || ''}
  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-500"
/>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-slate-300 text-xs">
                      No image
                    </div>
                  )}
                  {post.category && (
                    <span className="absolute top-2.5 left-2.5 bg-slate-950/80 text-amber-400 border border-amber-500/20 text-[8px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                      {post.category}
                    </span>
                  )}
                </div>

                <div className="p-4 flex flex-col flex-1 space-y-2">
                  <div className="flex justify-between text-[9px] font-semibold text-slate-400 font-mono">
                    <span>{post.publishDate || '—'}</span>
                    <span>{post.readTime || '4 min read'}</span>
                  </div>
                  <h3 className="font-bold text-slate-800 text-sm leading-snug group-hover:text-blue-600 transition line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 flex-1">
                    {post.description}
                  </p>
                  <div className="pt-3 mt-auto border-t border-slate-100 flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase font-mono">
                    <span>By {post.author || 'Aynkaran Team'}</span>
                    <span className="text-blue-600 group-hover:underline flex items-center gap-1">
                      Read Article
                      <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ==========================================
// 8. GALLERY PAGE WITH LIGHTBOX
// ==========================================
export function GalleryView({ gallery = [] }) {
  const [lightboxItem, setLightboxItem] = useState(null);
  const [activeCat, setActiveCat] = useState('All');

  const categories = ['All', 'Events', 'Training', 'Meetings', 'Awards', 'Office'];
  const list = Array.isArray(gallery) ? gallery : [];

  const filteredGallery =
    activeCat === 'All' ? list : list.filter((g) => g.category === activeCat);

  return (
    <div className="space-y-8">
      <div className="space-y-3 text-center max-w-xl mx-auto">
        <span className="text-[10px] bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-bold uppercase tracking-widest">
          GALLERY
        </span>
        <h2 className="text-2xl font-extrabold text-slate-900">
          Life at Our Advisory Office
        </h2>
        <p className="text-xs text-slate-500 leading-relaxed">
          Events, training, meetings, and team moments — updated from our office
          Content Publishing desk.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 border-b border-slate-100 pb-3">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCat(cat)}
            className={`px-3 py-1 text-xs font-bold transition rounded ${
              activeCat === cat
                ? 'bg-slate-900 text-white'
                : 'bg-slate-50 text-slate-500 hover:text-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filteredGallery.length === 0 ? (
        <div className="p-10 text-center text-slate-400 text-xs bg-slate-50 rounded-2xl border border-slate-100">
          No gallery items yet.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {filteredGallery.map((g) => {
            const src = contentMediaUrl(g.url || g.image || g.coverImage);
const video =
  g.type === 'video' ||
  /\.(mp4|webm|mov|m4v|ogg)$/i.test(String(g.url || g.image || ''));

// In the card:
{src && (
  video ? (
    <video
      src={src}
      className="w-full h-full object-cover"
      muted
      playsInline
      preload="metadata"
    />
  ) : (
    <img src={src} alt={g.title || ''} className="w-full h-full object-cover" />
  )
)}

// In lightbox:
{video ? (
  <video src={src} controls autoPlay className="max-w-full max-h-full" />
) : (
  <img src={src} alt="" className="w-full h-full object-contain" />
)}

            return (
              <div
                key={g.id}
                onClick={() => setLightboxItem(g)}
                className="group cursor-pointer border border-slate-150 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col"
              >
                <div className="h-40 bg-slate-100 overflow-hidden relative">
                  {src ? (
                    video ? (
                      <video
                        src={src}
                        className="w-full h-full object-cover"
                        muted
                        playsInline
                      />
                    ) : (
                      <img
                        src={src}
                        alt={g.title || ''}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                    )
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300 text-xs">
                      No media
                    </div>
                  )}
                  {g.category && (
                    <span className="absolute top-2.5 left-2.5 bg-slate-950/75 text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                      {g.category}
                    </span>
                  )}
                  {video && (
                    <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                      VIDEO
                    </span>
                  )}
                </div>
                <div className="p-3 space-y-1">
                  <h4 className="font-bold text-slate-800 text-xs line-clamp-1">
                    {g.title}
                  </h4>
                  {g.description && (
                    <p className="text-[10px] text-slate-400 line-clamp-2">
                      {g.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {lightboxItem && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxItem(null)}
        >
          <div
            className="max-w-3xl w-full bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden p-3 relative flex flex-col space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLightboxItem(null)}
              className="absolute top-4 right-4 z-10 bg-slate-900/50 border border-slate-700 text-white hover:text-rose-400 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm"
            >
              ✕
            </button>
            <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden flex items-center justify-center">
              {(() => {
                const src = contentMediaUrl(
                  lightboxItem.url || lightboxItem.image || lightboxItem.coverImage
                );
                const video =
                  lightboxItem.type === 'video' ||
                  isVideoPath(lightboxItem.url || lightboxItem.image);
                if (!src) return null;
                return video ? (
                  <video src={src} controls autoPlay className="max-w-full max-h-full" />
                ) : (
                  <img
                    src={src}
                    alt={lightboxItem.title || ''}
                    className="w-full h-full object-contain"
                  />
                );
              })()}
            </div>
            <div className="p-4 space-y-1.5 text-slate-100">
              {lightboxItem.category && (
                <span className="text-[10px] text-blue-400 uppercase tracking-widest font-mono font-bold">
                  Category: {lightboxItem.category}
                </span>
              )}
              <h3 className="text-base font-bold text-white tracking-tight">
                {lightboxItem.title}
              </h3>
              {lightboxItem.description && (
                <p className="text-xs text-slate-400 leading-relaxed">
                  {lightboxItem.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 9. TESTIMONIALS VIEW
// ==========================================
export function TestimonialsView({ testimonials }) {
  return (
    <div className="space-y-8">
      <div className="space-y-3 text-center max-w-xl mx-auto">
        <span className="text-[10px] bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-bold uppercase tracking-widest">FEEDBACK</span>
        <h2 className="text-2xl font-extrabold text-slate-900">What Our Insured Clients Say</h2>
        <p className="text-xs text-slate-500 leading-relaxed">
          Browse vetted customer experiences across Life, Health, and Child education plan consulting processes.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {testimonials.map((test) => (
          <div key={test.id} className="p-6 bg-white border border-slate-150 rounded-3xl flex flex-col justify-between space-y-6 shadow-sm">
            <div className="space-y-4">
              <div className="flex gap-1 text-amber-500">
                {Array.from({ length: test.rating }).map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs text-slate-500 italic leading-relaxed">
                "{test.review}"
              </p>
            </div>

            <div className="flex items-center gap-4 pt-4 border-t border-slate-50">
              <img 
                src={test.photo} 
                alt={test.name} 
                className="w-12 h-12 rounded-full object-cover border border-slate-200"
                referrerPolicy="no-referrer"
              />
              <div>
                <h5 className="font-bold text-slate-800 text-sm">{test.name}</h5>
                <p className="text-[10px] text-slate-400 font-medium">{test.role}</p>
                <span className="inline-block mt-1 text-[9px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">
                  Insured: {test.productType}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// 10. FAQ VIEW
// ==========================================
export function FAQsView({ faqs }) {
  const [activeFAQ, setActiveFAQ] = useState(faqs[0]?.id || null);
  const [activeCat, setActiveCat] = useState('All');

  const categories = ['All', 'General', 'Policies', 'Claims', 'Premiums', 'Advisor'];

  const filteredFAQs = activeCat === 'All' 
    ? faqs 
    : faqs.filter(f => f.category === activeCat);

  return (
    <div className="space-y-8">
      <div className="space-y-3 text-center max-w-xl mx-auto">
        <span className="text-[10px] bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-bold uppercase tracking-widest">HELP</span>
        <h2 className="text-2xl font-extrabold text-slate-900">Frequently Asked Questions</h2>
        <p className="text-xs text-slate-500 leading-relaxed">
          Clear-cut details regarding premiums, cancellations, cashless hospitalization network checks, and advisor licenses.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-1.5 border-b border-slate-150 pb-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCat(cat)}
            className={`px-3 py-1 text-xs font-bold transition rounded ${activeCat === cat ? 'bg-slate-900 text-white shadow-sm' : 'bg-slate-50 text-slate-500 hover:text-slate-800'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-3 max-w-2xl mx-auto">
        {filteredFAQs.map((faq) => (
          <div key={faq.id} className="border border-slate-150 bg-white rounded-2xl overflow-hidden">
            <button 
              onClick={() => setActiveFAQ(activeFAQ === faq.id ? null : faq.id)}
              className="w-full text-left p-5 flex justify-between items-center gap-4 text-xs font-bold text-slate-800"
            >
              <span className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
                {faq.question}
              </span>
              <span className="text-slate-400 font-mono text-lg select-none">
                {activeFAQ === faq.id ? '−' : '+'}
              </span>
            </button>
            {activeFAQ === faq.id && (
              <div className="p-5 pt-0 border-t border-slate-50 text-xs text-slate-500 leading-relaxed">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// POSTERS VIEW (from Desktop Content Publishing)
// ==========================================
export function PostersView({ posters = {} }) {
  const CONTENT_API =
    import.meta.env.VITE_DESKTOP_DEPLOYED_API_URL ||
    import.meta.env.VITE_DESKTOP_API_URL ||
    import.meta.env.VITE_API_URL ||
    'https://aynkaran-backend.onrender.com';

  const mediaUrl = (path) => {
    if (!path) return null;
    const s = String(path);
    if (/^https?:\/\//i.test(s) || s.startsWith('blob:') || s.startsWith('data:')) {
      return s;
    }
    return `${CONTENT_API.replace(/\/$/, '')}${s.startsWith('/') ? s : `/${s}`}`;
  };

  const SLOTS = [
    {
      key: 'leftTop',
      side: 'Customers',
      label: 'Left · Top',
      hint: 'Customer sidebar — top',
    },
    {
      key: 'leftBottom',
      side: 'Customers',
      label: 'Left · Bottom',
      hint: 'Customer sidebar — bottom',
    },
    {
      key: 'rightTop',
      side: 'Advisors',
      label: 'Right · Top',
      hint: 'Advisor sidebar — top',
    },
    {
      key: 'rightBottom',
      side: 'Advisors',
      label: 'Right · Bottom',
      hint: 'Advisor sidebar — bottom',
    },
  ];

  const cards = SLOTS.map((slot) => {
    const p = posters[slot.key];
    const src = mediaUrl(p?.url || p?.image);
    return { ...slot, src, meta: p };
  }).filter((c) => c.src);

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center max-w-xl mx-auto">
        <span className="text-[10px] bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-bold uppercase tracking-widest">
          CAMPAIGNS
        </span>
        <h2 className="text-xl font-extrabold text-slate-900">
          Featured Offers & Announcements
        </h2>
        <p className="text-xs text-slate-500 leading-normal">
          Live posters published from our office Content Publishing desk.
        </p>
      </div>

      {cards.length === 0 ? (
        <div className="p-10 text-center text-slate-400 text-xs bg-slate-50 rounded-2xl border border-slate-100">
          No posters published yet. 
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {cards.map((c) => (
            <div
              key={c.key}
              className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition"
            >
              <div className="aspect-[3/4] bg-slate-100 relative">
                <img
                  src={c.src}
                  alt={c.label}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1">
                  <span className="text-[9px] font-bold uppercase tracking-wider bg-slate-950/75 text-white px-2 py-0.5 rounded">
                    {c.side}
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-wider bg-blue-600/90 text-white px-2 py-0.5 rounded">
                    {c.label}
                  </span>
                </div>
              </div>
              <div className="p-3 text-left">
                <p className="text-[11px] text-slate-500">{c.hint}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}