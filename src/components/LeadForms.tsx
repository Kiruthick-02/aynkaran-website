//components/LeadForms.tsx
import React, { useState } from 'react';
import { InsuranceEnquiry, AdvisorRegistration, ContactMessage } from '../types';
import { Check, ClipboardList, Shield, UserCheck, AlertTriangle } from 'lucide-react';

interface LeadFormsProps {
  onAddEnquiry: (enquiry: InsuranceEnquiry) => void;
  onAddAdvisor: (advisor: AdvisorRegistration) => void;
  onAddContact: (contact: ContactMessage) => void;
  companiesList: { id: string; name: string }[];
  productsList: { id: string; title: string }[];
}

export function EnquiryForm({ onAddEnquiry, companiesList, productsList }: LeadFormsProps) {
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    gender: 'Male',
    age: '',
    mobile: '',
    whatsApp: '',
    email: '',
    address: '',
    city: '',
    occupation: '',
    income: '₹25,000 - ₹50,000',
    preferredCompany: 'HDFC Life Insurance',
    productType: 'Term Insurance Plan',
    purpose: 'Family Security',
    preferredTime: 'Morning (10:00 AM - 12:00 PM)',
    referral: '',
    message: '',
    consent: false
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    setError('');
  };

  const handleCopyMobile = () => {
    setFormData(prev => ({ ...prev, whatsApp: prev.mobile }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) return 'Please enter your full name.';
    if (!formData.age || isNaN(Number(formData.age)) || Number(formData.age) < 18 || Number(formData.age) > 100) {
      return 'Please enter a valid age (18 or older).';
    }
    if (!formData.mobile || formData.mobile.length < 10) {
      return 'Please enter a valid 10-digit mobile number.';
    }
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return 'Please enter a valid email address.';
    }
    if (!formData.city.trim()) return 'Please specify your city.';
    if (!formData.consent) return 'You must agree to the privacy policy and consent to be contacted.';
    return '';
  };

  const handlePreSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErr = validateForm();
    if (validationErr) {
      setError(validationErr);
      return;
    }
    setShowConfirm(true);
  };

  const handleSubmit = () => {
    setShowConfirm(false);
    setLoading(true);

    setTimeout(() => {
      const newEnquiry: InsuranceEnquiry = {
        id: `enq-${Date.now()}`,
        name: formData.name,
        gender: formData.gender,
        age: Number(formData.age),
        mobile: formData.mobile,
        whatsApp: formData.whatsApp || formData.mobile,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        occupation: formData.occupation,
        income: formData.income,
        preferredCompany: formData.preferredCompany,
        productType: formData.productType,
        purpose: formData.purpose,
        preferredTime: formData.preferredTime,
        referral: formData.referral,
        message: formData.message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', ' + new Date().toLocaleDateString()
      };

      onAddEnquiry(newEnquiry);
      setLoading(false);
      setSuccess(true);

      // Reset form
      setFormData({
        name: '',
        gender: 'Male',
        age: '',
        mobile: '',
        whatsApp: '',
        email: '',
        address: '',
        city: '',
        occupation: '',
        income: '₹25,000 - ₹50,000',
        preferredCompany: 'HDFC Life Insurance',
        productType: 'Term Insurance Plan',
        purpose: 'Family Security',
        preferredTime: 'Morning (10:00 AM - 12:00 PM)',
        referral: '',
        message: '',
        consent: false
      });
    }, 1500);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
          <ClipboardList className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-bold text-slate-800 text-lg">Instant Insurance Enquiry</h3>
          <p className="text-xs text-slate-400">Get a tailored plan recommendation directly in your inbox.</p>
        </div>
      </div>

      {success ? (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-8 rounded-2xl text-center space-y-4">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <Check className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-lg">Enquiry Logged Successfully!</h4>
          <p className="text-xs leading-relaxed">
            Your lead data has been securely transmitted and synchronized with our <strong>Desktop App database via MongoDB</strong>. A licensed financial advisor will reach out to you within your preferred contact window.
          </p>
          <button 
            onClick={() => setSuccess(false)}
            className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition"
          >
            Submit Another Enquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handlePreSubmit} className="space-y-5">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-150 text-rose-700 rounded-xl text-xs font-medium flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Full Name *</label>
              <input 
                type="text" 
                name="name" 
                required
                value={formData.name} 
                onChange={handleChange}
                placeholder="e.g., John Doe" 
                className="w-full mt-1.5 p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 outline-none transition"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Gender</label>
                <select 
                  name="gender" 
                  value={formData.gender} 
                  onChange={handleChange}
                  className="w-full mt-1.5 p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100"
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Age *</label>
                <input 
                  type="number" 
                  name="age" 
                  required
                  value={formData.age} 
                  onChange={handleChange}
                  placeholder="e.g. 35" 
                  className="w-full mt-1.5 p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Mobile Number *</label>
              <input 
                type="tel" 
                name="mobile" 
                required
                value={formData.mobile} 
                onChange={handleChange}
                placeholder="e.g., 9876543210" 
                className="w-full mt-1.5 p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div>
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">WhatsApp Number</label>
                {formData.mobile && (
                  <button 
                    type="button" 
                    onClick={handleCopyMobile}
                    className="text-[9px] text-blue-600 hover:underline font-bold"
                  >
                    Same as Mobile
                  </button>
                )}
              </div>
              <input 
                type="tel" 
                name="whatsApp" 
                value={formData.whatsApp} 
                onChange={handleChange}
                placeholder="WhatsApp Number" 
                className="w-full mt-1.5 p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Email ID *</label>
              <input 
                type="email" 
                name="email" 
                required
                value={formData.email} 
                onChange={handleChange}
                placeholder="e.g., john@example.com" 
                className="w-full mt-1.5 p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">City *</label>
              <input 
                type="text" 
                name="city" 
                required
                value={formData.city} 
                onChange={handleChange}
                placeholder="e.g., Mumbai" 
                className="w-full mt-1.5 p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Occupation</label>
              <input 
                type="text" 
                name="occupation" 
                value={formData.occupation} 
                onChange={handleChange}
                placeholder="e.g., Salaried Professional" 
                className="w-full mt-1.5 p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Monthly Income Bracket</label>
              <select 
                name="income" 
                value={formData.income} 
                onChange={handleChange}
                className="w-full mt-1.5 p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100"
              >
                <option>Under ₹25,000</option>
                <option>₹25,000 - ₹50,000</option>
                <option>₹50,000 - ₹1,00,000</option>
                <option>₹1,00,000 - ₹2,00,000</option>
                <option>Above ₹2,00,000</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Preferred Company Partner</label>
              <select 
                name="preferredCompany" 
                value={formData.preferredCompany} 
                onChange={handleChange}
                className="w-full mt-1.5 p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100"
              >
                {companiesList.map(c => <option key={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Insurance Product Category</label>
              <select 
                name="productType" 
                value={formData.productType} 
                onChange={handleChange}
                className="w-full mt-1.5 p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100"
              >
                {productsList.map(p => <option key={p.id}>{p.title}</option>)}
                <option>Motor / Vehicle Insurance</option>
                <option>ULIP / Savings Growth Plans</option>
                <option>Accident & Disability Protection</option>
                <option>Retirement & Annuity Plans</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Primary Buying Purpose</label>
              <select 
                name="purpose" 
                value={formData.purpose} 
                onChange={handleChange}
                className="w-full mt-1.5 p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100"
              >
                <option>Family Financial Security</option>
                <option>Wealth Creation & Savings</option>
                <option>Hospitalization Costs Guard</option>
                <option>Child's Future Education Funds</option>
                <option>Old-Age Regular Income Plan</option>
                <option>Income Tax Savings</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Preferred Contact Time</label>
              <select 
                name="preferredTime" 
                value={formData.preferredTime} 
                onChange={handleChange}
                className="w-full mt-1.5 p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100"
              >
                <option>Morning (10:00 AM - 12:00 PM)</option>
                <option>Afternoon (12:00 PM - 03:00 PM)</option>
                <option>Late Afternoon (03:00 PM - 06:00 PM)</option>
                <option>Evening (06:00 PM - 08:00 PM)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Full Postal Address (Optional)</label>
            <input 
              type="text" 
              name="address" 
              value={formData.address} 
              onChange={handleChange}
              placeholder="e.g. Flat 301, Blue Ridge Complex..." 
              className="w-full mt-1.5 p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Referral Code / Name</label>
              <input 
                type="text" 
                name="referral" 
                value={formData.referral} 
                onChange={handleChange}
                placeholder="Referral name (if any)" 
                className="w-full mt-1.5 p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div className="flex flex-col justify-end pb-1 pl-1">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input 
                  type="checkbox" 
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 rounded border-slate-300 accent-blue-600"
                />
                <span className="text-[10px] text-slate-500 font-medium leading-tight">
                  I give consent to be contacted and agree to the Privacy Policy. *
                </span>
              </label>
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Special Message / Notes</label>
            <textarea 
              name="message" 
              value={formData.message} 
              onChange={handleChange}
              placeholder="e.g. I already have a health card but need to buy topups for my spouse." 
              className="w-full mt-1.5 p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 h-20 resize-none"
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-widest py-4 rounded-xl transition shadow-lg shadow-blue-100 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Syncing with Database...
              </>
            ) : 'Submit Enquiry & Get Free Consultation'}
          </button>
        </form>
      )}

      {/* Confirmation Dialog Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-2xl max-w-sm w-full space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-blue-600 font-bold text-sm">
              <Shield className="w-5 h-5" />
              Secure Form Submission
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              You are submitting an insurance enquiry for <strong>{formData.name}</strong>. This record will be instantly transmitted to the Business Manager\'s Desktop dashboard via MongoDB network replication.
            </p>
            <div className="flex gap-3 justify-end pt-2">
              <button 
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-xs font-semibold hover:bg-slate-200 transition"
              >
                Go Back
              </button>
              <button 
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition"
              >
                Confirm & Sync
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function AdvisorForm({ onAddAdvisor, companiesList }: { onAddAdvisor: (advisor: AdvisorRegistration) => void; companiesList: any[] }) {
  const [formData, setFormData] = useState({
    fullName: '',
    gender: 'Male',
    dob: '',
    mobile: '',
    whatsApp: '',
    email: '',
    address: '',
    city: '',
    district: '',
    state: '',
    pincode: '',
    qualification: 'Graduate',
    occupation: '',
    experience: 'No',
    preferredCompany: 'HDFC Life Insurance',
    referral: '',
    hearAboutUs: 'Social Media',
    message: '',
    consent: false
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    setError('');
  };

  const handleCopyMobile = () => {
    setFormData(prev => ({ ...prev, whatsApp: prev.mobile }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim()) { setError('Full Name is required.'); return; }
    if (!formData.dob) { setError('Date of Birth is required.'); return; }
    if (!formData.mobile || formData.mobile.length < 10) { setError('Please enter a valid 10-digit mobile number.'); return; }
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) { setError('Please enter a valid email.'); return; }
    if (!formData.city.trim()) { setError('City is required.'); return; }
    if (!formData.state.trim()) { setError('State is required.'); return; }
    if (!formData.consent) { setError('You must consent to training contact.'); return; }

    setLoading(true);

    setTimeout(() => {
      const newAdvisor: AdvisorRegistration = {
        id: `adv-${Date.now()}`,
        fullName: formData.fullName,
        gender: formData.gender,
        dob: formData.dob,
        mobile: formData.mobile,
        whatsApp: formData.whatsApp || formData.mobile,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        district: formData.district,
        state: formData.state,
        pincode: formData.pincode,
        qualification: formData.qualification,
        occupation: formData.occupation,
        experience: formData.experience === 'Yes',
        preferredCompany: formData.preferredCompany,
        referral: formData.referral,
        hearAboutUs: formData.hearAboutUs,
        message: formData.message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', ' + new Date().toLocaleDateString()
      };

      onAddAdvisor(newAdvisor);
      setLoading(false);
      setSuccess(true);
      setError('');
    }, 1500);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
          <UserCheck className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-bold text-slate-800 text-lg">Advisor Registration Form</h3>
          <p className="text-xs text-slate-400">Join our group to unlock recurring financial commissions and professional certs.</p>
        </div>
      </div>

      {success ? (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-8 rounded-2xl text-center space-y-4">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <Check className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-lg">Application Submitted Live!</h4>
          <p className="text-xs leading-relaxed">
            Congratulations! Your registration has been received on the Business Manager\'s desktop terminal. We have already logged your profile under <strong>Pending Advisor Licensing Reviews</strong> in MongoDB. Our licensing team will contact you regarding upcoming study courses and training schedules.
          </p>
          <button 
            onClick={() => setSuccess(false)}
            className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition"
          >
            Register Another Candidate
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-150 text-rose-700 rounded-xl text-xs font-medium flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Full Name *</label>
              <input 
                type="text" 
                name="fullName" 
                required
                value={formData.fullName} 
                onChange={handleChange}
                placeholder="Full Name" 
                className="w-full mt-1.5 p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Gender</label>
                <select 
                  name="gender" 
                  value={formData.gender} 
                  onChange={handleChange}
                  className="w-full mt-1.5 p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100"
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Date of Birth *</label>
                <input 
                  type="date" 
                  name="dob" 
                  required
                  value={formData.dob} 
                  onChange={handleChange}
                  className="w-full mt-1.5 p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Mobile Number *</label>
              <input 
                type="tel" 
                name="mobile" 
                required
                value={formData.mobile} 
                onChange={handleChange}
                placeholder="Mobile" 
                className="w-full mt-1.5 p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div>
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">WhatsApp Number</label>
                {formData.mobile && (
                  <button 
                    type="button" 
                    onClick={handleCopyMobile}
                    className="text-[9px] text-blue-600 hover:underline font-bold"
                  >
                    Copy Mobile
                  </button>
                )}
              </div>
              <input 
                type="tel" 
                name="whatsApp" 
                value={formData.whatsApp} 
                onChange={handleChange}
                placeholder="WhatsApp Number" 
                className="w-full mt-1.5 p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Email ID *</label>
              <input 
                type="email" 
                name="email" 
                required
                value={formData.email} 
                onChange={handleChange}
                placeholder="john@example.com" 
                className="w-full mt-1.5 p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Highest Educational Qualification</label>
              <select 
                name="qualification" 
                value={formData.qualification} 
                onChange={handleChange}
                className="w-full mt-1.5 p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100"
              >
                <option>10th Pass</option>
                <option>12th Pass (Minimum Eligiblity)</option>
                <option>Graduate</option>
                <option>Post Graduate</option>
                <option>Others</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">City *</label>
              <input 
                type="text" 
                name="city" 
                required
                value={formData.city} 
                onChange={handleChange}
                placeholder="City" 
                className="w-full mt-1.5 p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">District</label>
              <input 
                type="text" 
                name="district" 
                value={formData.district} 
                onChange={handleChange}
                placeholder="District" 
                className="w-full mt-1.5 p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">State *</label>
              <input 
                type="text" 
                name="state" 
                required
                value={formData.state} 
                onChange={handleChange}
                placeholder="e.g. Maharashtra" 
                className="w-full mt-1.5 p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Current Occupation</label>
              <input 
                type="text" 
                name="occupation" 
                value={formData.occupation} 
                onChange={handleChange}
                placeholder="e.g. Student, Retired, Teacher" 
                className="w-full mt-1.5 p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Pincode</label>
              <input 
                type="text" 
                name="pincode" 
                value={formData.pincode} 
                onChange={handleChange}
                placeholder="Pincode" 
                className="w-full mt-1.5 p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Prior Insurance Experience?</label>
              <div className="flex gap-4 mt-2 ml-1 text-xs font-semibold text-slate-600">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="experience" 
                    value="Yes" 
                    checked={formData.experience === 'Yes'}
                    onChange={handleChange} 
                    className="accent-blue-600"
                  /> 
                  Yes
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="experience" 
                    value="No" 
                    checked={formData.experience === 'No'}
                    onChange={handleChange} 
                    className="accent-blue-600"
                  /> 
                  No
                </label>
              </div>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Preferred Insurance Company Focus</label>
              <select 
                name="preferredCompany" 
                value={formData.preferredCompany} 
                onChange={handleChange}
                className="w-full mt-1.5 p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100"
              >
                {companiesList.map(c => <option key={c.id}>{c.name}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Referral Person Name</label>
              <input 
                type="text" 
                name="referral" 
                value={formData.referral} 
                onChange={handleChange}
                placeholder="e.g. Rajesh Kumar" 
                className="w-full mt-1.5 p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">How did you hear about us?</label>
              <select 
                name="hearAboutUs" 
                value={formData.hearAboutUs} 
                onChange={handleChange}
                className="w-full mt-1.5 p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100"
              >
                <option>Social Media</option>
                <option>Newspaper / Announcement</option>
                <option>Friend / Existing Advisor</option>
                <option>Google Search</option>
                <option>Flyer / Poster</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Full Home Address</label>
            <input 
              type="text" 
              name="address" 
              value={formData.address} 
              onChange={handleChange}
              placeholder="House Number, Building Name, Locality..." 
              className="w-full mt-1.5 p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Your Motivation / Inquiries</label>
            <textarea 
              name="message" 
              value={formData.message} 
              onChange={handleChange}
              placeholder="Tell us about yourself and why you are interested..." 
              className="w-full mt-1.5 p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 h-16 resize-none"
            />
          </div>

          <div className="py-2">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input 
                type="checkbox" 
                name="consent" 
                checked={formData.consent}
                onChange={handleChange}
                className="mt-0.5 w-4 h-4 rounded border-slate-300 accent-blue-600"
              />
              <span className="text-[10px] text-slate-500 font-medium leading-normal">
                I hereby declare that all details are true to the best of my knowledge and I consent to be contacted for upcoming advisory study schedules and online licensing courses. *
              </span>
            </label>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-widest py-3.5 rounded-xl transition shadow-lg flex items-center justify-center gap-2"
          >
            {loading ? 'Submitting Application...' : 'Submit Advisor Application'}
          </button>
        </form>
      )}
    </div>
  );
}

export function ContactForm({ onAddContact }: { onAddContact: (contact: ContactMessage) => void }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) { setError('Name is required'); return; }
    if (!formData.phone || formData.phone.length < 10) { setError('Please enter a valid phone number'); return; }
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) { setError('Please enter a valid email address'); return; }
    if (!formData.message.trim()) { setError('Please type your message'); return; }

    setLoading(true);

    setTimeout(() => {
      const msg: ContactMessage = {
        id: `msg-${Date.now()}`,
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        subject: formData.subject || 'General Enquiry',
        message: formData.message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', ' + new Date().toLocaleDateString()
      };

      onAddContact(msg);
      setLoading(false);
      setSuccess(true);
      setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
    }, 1200);
  };

  return (
    <div className="bg-white p-8 border border-slate-150 rounded-3xl shadow-sm">
      <h3 className="font-bold text-slate-800 text-lg mb-4">Send Us a Direct Message</h3>
      
      {success ? (
        <div className="bg-blue-50 border border-blue-200 text-blue-900 p-6 rounded-2xl text-center space-y-3">
          <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto">
            <Check className="w-5 h-5" />
          </div>
          <p className="font-bold text-sm">Message Transmitted!</p>
          <p className="text-xs text-slate-500">Your request has been successfully synced with our desktop portal. We will contact you soon.</p>
          <button 
            onClick={() => setSuccess(false)}
            className="px-4 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-2.5 bg-rose-50 border border-rose-100 text-rose-700 rounded-xl text-[11px] font-medium">
              ⚠️ {error}
            </div>
          )}
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Your Name *</label>
            <input 
              type="text" 
              name="name" 
              required
              value={formData.name} 
              onChange={handleChange}
              placeholder="e.g. John Doe" 
              className="w-full mt-1 border border-slate-200 bg-slate-50/50 p-3 rounded-xl text-sm focus:ring-2 focus:ring-blue-150 outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Mobile Number *</label>
              <input 
                type="tel" 
                name="phone" 
                required
                value={formData.phone} 
                onChange={handleChange}
                placeholder="Mobile number" 
                className="w-full mt-1 border border-slate-200 bg-slate-50/50 p-3 rounded-xl text-sm focus:ring-2 focus:ring-blue-150 outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Email Address *</label>
              <input 
                type="email" 
                name="email" 
                required
                value={formData.email} 
                onChange={handleChange}
                placeholder="Email address" 
                className="w-full mt-1 border border-slate-200 bg-slate-50/50 p-3 rounded-xl text-sm focus:ring-2 focus:ring-blue-150 outline-none"
              />
            </div>
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Subject / Interest</label>
            <input 
              type="text" 
              name="subject" 
              value={formData.subject} 
              onChange={handleChange}
              placeholder="e.g. Life Insurance Rider Guidance" 
              className="w-full mt-1 border border-slate-200 bg-slate-50/50 p-3 rounded-xl text-sm focus:ring-2 focus:ring-blue-150 outline-none"
            />
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Your Message *</label>
            <textarea 
              name="message" 
              required
              value={formData.message} 
              onChange={handleChange}
              placeholder="Please type your message here..." 
              className="w-full mt-1 border border-slate-200 bg-slate-50/50 p-3 rounded-xl text-sm h-28 focus:ring-2 focus:ring-blue-150 outline-none resize-none"
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-blue-700 transition"
          >
            {loading ? 'Transmitting...' : 'Send Message'}
          </button>
        </form>
      )}
    </div>
  );
}
