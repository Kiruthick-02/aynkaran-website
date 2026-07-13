import React, { useState } from 'react';
import { 
  InsuranceCompany, 
  InsuranceProduct, 
  ServiceItem, 
  NewsPost, 
  Testimonial, 
  GalleryItem, 
  FAQItem,
  AdvisorRegistration
} from '../types';
import { 
  Building, ShieldAlert, Award, Calendar, Heart, BookOpen, 
  User, Search, Share2, ArrowRight, CheckCircle2, ChevronRight,
  Download, HelpCircle, Star, Users, Phone, Video
} from 'lucide-react';
import { EnquiryForm, AdvisorForm } from './LeadForms';

// ==========================================
// 1. ABOUT US PAGE
// ==========================================
export function AboutUsView({ companies }: { companies: InsuranceCompany[] }) {
  const values = [
    { title: 'Absolute Integrity', desc: 'Every policy details, riders, and commissions are disclosed with 100% transparency.', icon: ShieldAlert },
    { title: 'Empathy First', desc: 'Claims represent difficult life transitions; we handle every claim assistance request with utmost speed and compassion.', icon: Heart },
    { title: 'Unbiased Choice', desc: 'Associated with public and private providers to bring you the best market covers without favoritism.', icon: Building }
  ];

  const milestones = [
    { year: '2012', title: 'Foundation', desc: 'Began as a small insurance advisory consultancy.' },
    { year: '2016', title: 'Multi-Brand Link', desc: 'Partnered with LIC, HDFC Life, and Care Health to extend advisor capabilities.' },
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
export function CompaniesView({ 
  companies, 
  onSelectCompany 
}: { 
  companies: InsuranceCompany[], 
  onSelectCompany: (coName: string) => void 
}) {
  return (
    <div className="space-y-4">
      <div className="space-y-1 text-center max-w-xl mx-auto">
        <span className="text-[10px] bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-bold uppercase tracking-widest">PARTNERS</span>
        <h2 className="text-xl font-extrabold text-slate-900">Associated Insurance Providers</h2>
        <p className="text-xs text-slate-500 leading-normal">
          We bring you exclusive protective policies across major state-owned and premium private insurance brands, guaranteeing optimal pricing matrices.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {companies.map((co) => (
          <div key={co.id} className="p-4 border border-slate-150 rounded-2xl bg-white hover:border-blue-300 transition-all shadow-sm hover:shadow-md flex flex-col justify-between">
            <div className="space-y-2.5">
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center font-black text-xs text-slate-600 shadow-inner">
                  {co.logo}
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 justify-end text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="text-xs font-bold text-slate-700">{co.rating}</span>
                  </div>
                  <span className="text-[9px] text-slate-400 uppercase font-bold">Sum Rating</span>
                </div>
              </div>

              <div className="space-y-1">
                <h4 className="font-bold text-slate-800 text-sm leading-tight">{co.name}</h4>
                <div className="flex flex-wrap gap-1 pt-0.5">
                  {co.categories.map((cat, idx) => (
                    <span key={idx} className="text-[8px] bg-blue-50 text-blue-600 border border-blue-100 px-1.5 py-0.5 rounded font-semibold uppercase">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-[11px] text-slate-500 leading-relaxed">
                {co.description}
              </p>
            </div>

            <div className="pt-3.5 border-t border-slate-50 mt-3.5 flex items-center justify-between">
              <div>
                <span className="block text-emerald-600 font-extrabold text-xs">{co.claimRatio}</span>
                <span className="text-[8px] text-slate-400 uppercase font-bold tracking-wider">Claim Settled</span>
              </div>
              <button 
                onClick={() => onSelectCompany(co.name)}
                className="px-3 py-1.5 bg-slate-900 hover:bg-blue-600 text-white rounded-lg text-xs font-bold transition flex items-center gap-1"
              >
                Request Consultation
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// 3. INSURANCE PRODUCTS PAGE
// ==========================================
export function ProductsView({ 
  products, 
  onSelectProduct 
}: { 
  products: InsuranceProduct[], 
  onSelectProduct: (pTitle: string) => void 
}) {
  const [activeTab, setActiveTab] = useState<string>('All');
  const categories = ['All', 'Life', 'Health', 'Child', 'Retirement'];

  const filteredProducts = activeTab === 'All' 
    ? products 
    : products.filter(p => p.category === activeTab);

  return (
    <div className="space-y-5">
      <div className="space-y-1 text-center max-w-xl mx-auto">
        <span className="text-[10px] bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-bold uppercase tracking-widest">SHOWCASE</span>
        <h2 className="text-xl font-extrabold text-slate-900">Custom Styled Insurance Products</h2>
        <p className="text-xs text-slate-500 leading-normal">
          Examine comprehensive coverages, rider options, required KYC folders, and eligibility standards in our product categories.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex justify-center gap-1.5 border-b border-slate-100 pb-1.5">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition ${activeTab === cat ? 'bg-blue-600 text-white shadow-md shadow-blue-100' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product List */}
      <div className="space-y-5">
        {filteredProducts.map((p) => (
          <div key={p.id} className="p-5 border border-slate-150 rounded-2xl bg-white space-y-4 shadow-sm hover:shadow-md transition">
            <div className="flex items-start justify-between">
              <div className="space-y-1 text-left">
                <span className="text-[9px] bg-blue-50 text-blue-600 border border-blue-100 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  {p.category} Category
                </span>
                <h3 className="text-base font-extrabold text-slate-800 tracking-tight">{p.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed max-w-2xl">{p.description}</p>
              </div>
              <button 
                onClick={() => onSelectProduct(p.title)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-md shadow-blue-50 flex-shrink-0"
              >
                Submit Enquiry
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-3.5 border-t border-slate-100 text-left">
              {/* Features & Benefits */}
              <div className="space-y-3">
                <div>
                  <h4 className="text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-1 border-l-2 border-blue-600 pl-1.5">Key Policy Features</h4>
                  <ul className="space-y-1">
                    {p.features.map((f, idx) => (
                      <li key={idx} className="text-[11px] text-slate-500 flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-1 border-l-2 border-emerald-500 pl-1.5">Client Benefits</h4>
                  <ul className="space-y-1">
                    {p.benefits.map((b, idx) => (
                      <li key={idx} className="text-[11px] text-slate-500 flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Eligibility & Documents */}
              <div className="space-y-3 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                <div>
                  <h4 className="text-[10px] font-bold text-slate-700 uppercase tracking-widest mb-1">Age & Financial Eligibility</h4>
                  <ul className="space-y-0.5 text-[11px] text-slate-500 list-disc list-inside">
                    {p.eligibility.map((el, idx) => (
                      <li key={idx} className="leading-relaxed">{el}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-slate-700 uppercase tracking-widest mb-1">KYC Folders Required</h4>
                  <ul className="space-y-0.5 text-[11px] text-slate-500 list-disc list-inside">
                    {p.docsRequired.map((doc, idx) => (
                      <li key={idx} className="leading-relaxed">{doc}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Claim Process Steps */}
            <div className="bg-slate-900 text-slate-200 p-4 rounded-xl space-y-2 text-left">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Claim Reimbursement Process</h4>
              <div className="grid grid-cols-4 gap-3 text-[10px] font-medium text-slate-400 leading-normal">
                {p.claimProcess.map((step, idx) => (
                  <div key={idx} className="space-y-0.5 border-l border-slate-800 pl-2">
                    <span className="block text-white font-extrabold font-mono text-xs">0{idx + 1}</span>
                    <p>{step.split(':')[1] || step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// 4. CLAIMS ASSISTANCE VIEW
// ==========================================
export function ClaimsView() {
  const claimSteps = [
    { num: '01', title: 'Intimation', desc: 'Notify our support line or register online on our claims portal immediately during hospital admission or event.' },
    { num: '02', title: 'KYC & Bill Compilation', desc: 'Scan original hospital receipts, discharge certificates, and diagnosis paperwork.' },
    { num: '03', title: 'File Review', desc: 'Our specialized field officer audits the documentation and coordinates directly with the underwriting team.' },
    { num: '04', title: 'Direct Credit Payout', desc: 'Approved claims are released instantly to your bank account via NEFT replication.' }
  ];

  return (
    <div className="space-y-5 text-left">
      <div className="space-y-1 text-center max-w-xl mx-auto">
        <span className="text-[10px] bg-rose-50 text-rose-600 px-3 py-1 rounded-full font-bold uppercase tracking-widest">CLAIM DESK</span>
        <h2 className="text-xl font-extrabold text-slate-900">Claim Settlement Support Portal</h2>
        <p className="text-xs text-slate-500 leading-normal">
          The ultimate moment of trust in an insurance lifecycle is the claim. We stand by you with end-to-end documentation support.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {claimSteps.map((step) => (
          <div key={step.num} className="p-4 bg-white border border-slate-150 rounded-xl relative space-y-1.5">
            <span className="text-2xl font-black font-mono text-slate-100 block absolute top-2 right-3 select-none">{step.num}</span>
            <h4 className="font-bold text-xs text-slate-800">{step.title}</h4>
            <p className="text-[11px] text-slate-500 leading-normal">{step.desc}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 items-center bg-slate-900 text-white p-5 rounded-2xl">
        <div className="space-y-3">
          <span className="text-[9px] bg-blue-500/10 border border-blue-500/20 text-blue-400 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
            24/7 HELPLINE
          </span>
          <h3 className="text-base font-extrabold tracking-tight">Need On-Field Cashless Support?</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Our claims assistance unit operates throughout the night to ensure cashless approvals across India. Call us or connect via video consultation.
          </p>
          <div className="flex gap-3 pt-1">
            <div className="flex items-center gap-2 bg-slate-800 p-2.5 rounded-xl border border-slate-700">
              <Phone className="w-4 h-4 text-emerald-400" />
              <div>
                <span className="block text-[8px] text-slate-400 uppercase font-bold">Call Now</span>
                <span className="text-xs font-bold font-mono">+91 9876543210</span>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-slate-800 p-2.5 rounded-xl border border-slate-700">
              <Video className="w-4 h-4 text-blue-400" />
              <div>
                <span className="block text-[8px] text-slate-400 uppercase font-bold">Video Help</span>
                <span className="text-xs font-bold font-mono">Book Zoom Intimation</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3 bg-slate-800 p-4 rounded-xl border border-slate-700">
          <h4 className="font-bold text-xs text-amber-400">Required Claims Checklists</h4>
          <ul className="space-y-1.5 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Original Policy Schedule Certificate document</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Death Certificate issued by municipality (for Life covers)</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Detailed Hospital discharge summary cards & pre-auth forms</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Cancelled cheque containing nominee's printed name for NEFT</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 5. SERVICES VIEW
// ==========================================
export function ServicesView({ services }: { services: ServiceItem[] }) {
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
}: { 
  onAddAdvisor: (advisor: AdvisorRegistration) => void, 
  companies: InsuranceCompany[] 
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
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
              <span className="block text-lg font-extrabold text-emerald-600">₹45,000+</span>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">Avg. Monthly Commission</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
              <span className="block text-lg font-extrabold text-blue-600">Flexible</span>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">Work Hours</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 text-white p-4 rounded-xl space-y-3">
          <h4 className="font-bold text-xs text-emerald-400 border-l-2 border-emerald-400 pl-2.5">Advisor Growth Path</h4>
          <div className="space-y-2">
            {steps.map(st => (
              <div key={st.num} className="flex gap-3">
                <span className="w-5 h-5 bg-emerald-500 text-slate-900 rounded-full flex items-center justify-center font-bold font-mono text-[10px] flex-shrink-0">
                  {st.num}
                </span>
                <div>
                  <h5 className="font-bold text-xs text-white">{st.title}</h5>
                  <p className="text-[10px] text-slate-400 mt-0.5 leading-normal">{st.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AdvisorForm onAddAdvisor={onAddAdvisor} companiesList={companies} />
    </div>
  );
}

// ==========================================
// 7. NEWS & POSTS PAGE
// ==========================================
export function NewsPostsView({ 
  posts, 
  onSelectPost,
  onAddEnquiry 
}: { 
  posts: NewsPost[], 
  onSelectPost: (post: NewsPost) => void,
  onAddEnquiry: (enquiry: any) => void
}) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Educational', 'Industry Updates', 'Tips & Guide', 'Recruitment'];

  const filteredPosts = posts.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                          p.description.toLowerCase().includes(search.toLowerCase()) ||
                          p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-4 text-left">
      <div className="flex justify-between items-end gap-4">
        <div className="space-y-1">
          <span className="text-[10px] bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-bold uppercase tracking-widest">BLOG</span>
          <h2 className="text-xl font-extrabold text-slate-900">Insurance Insights & Articles</h2>
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

      {/* Category filters */}
      <div className="flex flex-wrap gap-1.5 border-b border-slate-100 pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-2.5 py-0.5 rounded text-xs font-bold transition ${activeCategory === cat ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-500 hover:text-slate-800'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of articles */}
      {filteredPosts.length === 0 ? (
        <div className="p-8 text-center text-slate-400 text-xs bg-slate-50 rounded-2xl border border-slate-100 font-mono">
          No articles match your search params. Add a post from the Desktop Sync Monitor panel.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {filteredPosts.map((post) => (
            <div 
              key={post.id} 
              onClick={() => onSelectPost(post)}
              className="group cursor-pointer border border-slate-150 bg-white rounded-2xl overflow-hidden flex flex-col justify-between hover:border-blue-300 hover:shadow-md transition"
            >
              <div>
                <div className="h-32 bg-slate-100 overflow-hidden relative">
                  <img 
                    src={post.coverImage} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-2.5 left-2.5 bg-slate-950/75 text-amber-400 border border-amber-500/20 text-[8px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                    {post.category}
                  </span>
                </div>
                <div className="p-4 space-y-1.5">
                  <div className="flex justify-between text-[9px] font-semibold text-slate-400 font-mono">
                    <span>{post.publishDate}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="font-bold text-slate-800 text-sm leading-snug group-hover:text-blue-600 transition">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                    {post.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-50 mt-4 flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase font-mono">
                <span>By {post.author}</span>
                <span className="text-blue-600 group-hover:underline flex items-center gap-1">
                  Read Article
                  <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ==========================================
// 8. GALLERY PAGE WITH LIGHTBOX
// ==========================================
export function GalleryView({ gallery }: { gallery: GalleryItem[] }) {
  const [lightboxImg, setLightboxImg] = useState<GalleryItem | null>(null);
  const [activeCat, setActiveCat] = useState<'All' | 'Events' | 'Training' | 'Meetings' | 'Awards' | 'Office'>('All');

  const categories: ('All' | 'Events' | 'Training' | 'Meetings' | 'Awards' | 'Office')[] = ['All', 'Events', 'Training', 'Meetings', 'Awards', 'Office'];

  const filteredGallery = activeCat === 'All' 
    ? gallery 
    : gallery.filter(g => g.category === activeCat);

  return (
    <div className="space-y-8">
      <div className="space-y-3 text-center max-w-xl mx-auto">
        <span className="text-[10px] bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-bold uppercase tracking-widest">GALLERY</span>
        <h2 className="text-2xl font-extrabold text-slate-900">Life at Our Advisory Office</h2>
        <p className="text-xs text-slate-500 leading-relaxed">
          Take a look at our award functions, intensive advisor coaching summits, team gatherings, and customer education camps.
        </p>
      </div>

      {/* Category selector */}
      <div className="flex justify-center gap-2 border-b border-slate-100 pb-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCat(cat)}
            className={`px-3 py-1 text-xs font-bold transition rounded ${activeCat === cat ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-500 hover:text-slate-800'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {filteredGallery.map((g) => (
          <div 
            key={g.id} 
            onClick={() => setLightboxImg(g)}
            className="group cursor-pointer border border-slate-150 bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
          >
            <div className="h-44 bg-slate-100 overflow-hidden relative">
              <img 
                src={g.image} 
                alt={g.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-2.5 left-2.5 bg-slate-950/75 text-white text-[9px] font-bold px-2 py-0.5 rounded font-mono uppercase tracking-wider border border-slate-800">
                {g.category}
              </span>
            </div>
            <div className="p-4 space-y-1">
              <h4 className="font-bold text-slate-800 text-xs tracking-tight line-clamp-1">{g.title}</h4>
              <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed">{g.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Overlay */}
      {lightboxImg && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxImg(null)}
        >
          <div 
            className="max-w-3xl w-full bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden p-3 relative flex flex-col space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setLightboxImg(null)}
              className="absolute top-4 right-4 bg-slate-900/50 border border-slate-700 text-white hover:text-rose-400 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm"
            >
              ✕
            </button>
            <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden">
              <img 
                src={lightboxImg.image} 
                alt={lightboxImg.title} 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-4 space-y-1.5 text-slate-100">
              <span className="text-[10px] text-blue-400 uppercase tracking-widest font-mono font-bold">
                Category: {lightboxImg.category}
              </span>
              <h3 className="text-base font-bold text-white tracking-tight">{lightboxImg.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{lightboxImg.description}</p>
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
export function TestimonialsView({ testimonials }: { testimonials: Testimonial[] }) {
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
export function FAQsView({ faqs }: { faqs: FAQItem[] }) {
  const [activeFAQ, setActiveFAQ] = useState<string | null>(faqs[0]?.id || null);
  const [activeCat, setActiveCat] = useState<'All' | 'General' | 'Policies' | 'Claims' | 'Premiums' | 'Advisor'>('All');

  const categories: ('All' | 'General' | 'Policies' | 'Claims' | 'Premiums' | 'Advisor')[] = ['All', 'General', 'Policies', 'Claims', 'Premiums', 'Advisor'];

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
