// components/LeadForms.jsx
import React, { useState } from 'react';
import { Check, ClipboardList, Shield, UserCheck, AlertTriangle } from 'lucide-react';

// Desktop software backend (Customers → Enquiries tab)
const DESKTOP_APIS = [
  import.meta.env.VITE_DESKTOP_DEPLOYED_API_URL,
  import.meta.env.VITE_DESKTOP_API_URL,
  import.meta.env.VITE_API_URL,
  'https://aynkaran-backend.onrender.com',
  'http://localhost:7860',
].filter(Boolean);

async function postEnquiryToDesktop(payload) {
  let lastError;

  for (const apiUrl of DESKTOP_APIS) {
    try {
      const res = await fetch(`${apiUrl.replace(/\/$/, '')}/api/enquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) return res.json().catch(() => payload);

      const body = await res.json().catch(() => ({}));
      lastError = new Error(body.error || `Server error (${res.status})`);
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error('Could not reach the office system.');
}

function cacheEnquiryLocally(enquiry) {
  try {
    const key = 'sec_enquiries';
    const prev = JSON.parse(localStorage.getItem(key) || '[]');
    localStorage.setItem(key, JSON.stringify([enquiry, ...prev]));
  } catch (_) {}
}

// ==========================================
// ENQUIRY FORM → Desktop Customers / Enquiries
// ==========================================
export function EnquiryForm({ onAddEnquiry }) {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    gender: 'Male',
    mobile: '',
    whatsApp: '',
    email: '',
    city: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: e.target.checked }));
    } else if (name === 'mobile' || name === 'whatsApp') {
      setFormData((prev) => ({
        ...prev,
        [name]: value.replace(/\D/g, '').slice(0, 10),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    setError('');
  };

  const handleCopyMobile = () => {
    setFormData((prev) => ({ ...prev, whatsApp: prev.mobile }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) return 'Please enter your full name.';
    if (!formData.dob) return 'Please select your Date of Birth.';
    if (!formData.mobile || formData.mobile.length !== 10) {
      return 'Please enter a valid 10-digit mobile number.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return 'Please enter a valid email address.';
    }
    if (!formData.city.trim()) return 'Please enter your city.';
    return '';
  };

  const handlePreSubmit = (e) => {
    e.preventDefault();
    const validationErr = validateForm();
    if (validationErr) {
      setError(validationErr);
      return;
    }
    setShowConfirm(true);
  };

  const handleSubmit = async () => {
    setShowConfirm(false);
    setLoading(true);
    setError('');

    const timestamp =
      new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }) +
      ', ' +
      new Date().toLocaleDateString();

    const newEnquiry = {
      id: `enq-${Date.now()}`,
      name: formData.name.trim(),
      dateOfBirth: formData.dob,
      dob: formData.dob,
      gender: formData.gender,
      mobile: formData.mobile,
      whatsApp: formData.whatsApp || formData.mobile,
      email: formData.email.trim(),
      city: formData.city.trim(),
      message: formData.message.trim(),
      notes: formData.message.trim(),
      source: 'website',
      timestamp,
      createdAt: new Date().toISOString(),
    };

    try {
      const saved = await postEnquiryToDesktop(newEnquiry);
      const record = saved?.data || saved || newEnquiry;

      if (typeof onAddEnquiry === 'function') {
        onAddEnquiry(record);
      }
      cacheEnquiryLocally(record);

      setSuccess(true);
      setFormData({
        name: '',
        dob: '',
        gender: 'Male',
        mobile: '',
        whatsApp: '',
        email: '',
        city: '',
        message: '',
      });
    } catch (err) {
      console.error('[Enquiry submit]', err);
      setError(
        err.message ||
          'Could not reach the office system. Please try again in a moment.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
          <ClipboardList className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-bold text-slate-800 text-lg">
            Instant Insurance Enquiry
          </h3>
          <p className="text-xs text-slate-400">
            Get a tailored plan recommendation directly in your inbox.
          </p>
        </div>
      </div>

      {success ? (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-8 rounded-2xl text-center space-y-4">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <Check className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-lg">Enquiry Logged Successfully!</h4>
          <p className="text-xs leading-relaxed">
            Your details have been sent to our office system. A licensed advisor
            will contact you soon.
          </p>
          <button
            type="button"
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
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">
                Full Name *
              </label>
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
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">
                  Gender
                </label>
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
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  name="dob"
                  required
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full mt-1.5 p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">
                Mobile Number *
              </label>
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
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">
                  WhatsApp Number
                </label>
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
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">
                Email ID *
              </label>
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
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">
                City *
              </label>
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

          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">
              Special Message / Notes
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Send Your Message Here..."
              className="w-full mt-1.5 p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 h-20 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-widest py-4 rounded-xl transition shadow-lg shadow-blue-100 flex items-center justify-center gap-2"
          >
            {loading
              ? 'Syncing with office system...'
              : 'Submit Enquiry & Get Free Consultation'}
          </button>
        </form>
      )}

      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-2xl max-w-sm w-full space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-blue-600 font-bold text-sm">
              <Shield className="w-5 h-5" />
              Secure Form Submission
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Submit enquiry for <strong>{formData.name}</strong>? Form Submitted...
            </p>
            <div className="flex gap-3 justify-end pt-2">
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-xs font-semibold hover:bg-slate-200 transition"
              >
                Go Back
              </button>
              <button
                type="button"
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

// ==========================================
// ADVISOR FORM → Desktop Advisor Enquiries + mobile push notification
// ==========================================
export function AdvisorForm({ onAddAdvisor }) {
  const [formData, setFormData] = useState({
    fullName: '',
    gender: 'Male',
    dob: '',
    mobile: '',
    whatsApp: '',
    email: '',
    city: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: e.target.checked }));
    } else if (name === 'mobile' || name === 'whatsApp') {
      setFormData((prev) => ({
        ...prev,
        [name]: value.replace(/\D/g, '').slice(0, 10),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    setError('');
  };

  const handleCopyMobile = () => {
    setFormData((prev) => ({ ...prev, whatsApp: prev.mobile }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      setError('Full Name is required.');
      return;
    }
    if (!formData.dob) {
      setError('Date of Birth is required.');
      return;
    }
    if (!formData.mobile || formData.mobile.length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email.');
      return;
    }
    if (!formData.city.trim()) {
      setError('City is required.');
      return;
    }
    setLoading(true);
    setError('');

    const timestamp =
      new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }) +
      ', ' +
      new Date().toLocaleDateString();

    const newAdvisorEnquiry = {
        id: `enq-${Date.now()}`,
        // The desktop enquiry contract uses `name`; preserve `fullName` for
        // existing website callbacks that may depend on it.
        name: formData.fullName.trim(),
        fullName: formData.fullName.trim(),
        gender: formData.gender,
        dateOfBirth: formData.dob,
        dob: formData.dob,
        mobile: formData.mobile,
        whatsApp: formData.whatsApp || formData.mobile,
        email: formData.email.trim(),
        city: formData.city.trim(),
        message: formData.message.trim(),
        notes: formData.message.trim(),
        source: 'website-advisor',
        enquiryType: 'advisor',
        timestamp,
        createdAt: new Date().toISOString(),
    };

    try {
      const saved = await postEnquiryToDesktop(newAdvisorEnquiry);
      const record = saved?.data || saved || newAdvisorEnquiry;

      if (typeof onAddAdvisor === 'function') onAddAdvisor(record);
      cacheEnquiryLocally(record);
      setSuccess(true);
      setError('');
      setFormData({
        fullName: '', gender: 'Male', dob: '', mobile: '', whatsApp: '',
        email: '', city: '', message: '',
      });
    } catch (err) {
      console.error('[Advisor enquiry submit]', err);
      setError(err.message || 'Could not reach the office system. Please try again in a moment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
          <UserCheck className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-bold text-slate-800 text-lg">
            Advisor Registration Form
          </h3>
          <p className="text-xs text-slate-400">
            Join our group to unlock recurring financial commissions and
            professional certs.
          </p>
        </div>
      </div>

      {success ? (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-8 rounded-2xl text-center space-y-4">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <Check className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-lg">Application Submitted!</h4>
          <p className="text-xs leading-relaxed">
            Your registration has been received. Our licensing team will contact
            you regarding training schedules.
          </p>
          <button
            type="button"
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
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">
                Full Name *
              </label>
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
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">
                  Gender
                </label>
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
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">
                  Date of Birth *
                </label>
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
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">
                Mobile Number *
              </label>
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
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">
                  WhatsApp Number
                </label>
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
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">
                Email ID *
              </label>
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
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">
                City *
              </label>
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
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">
              Your Inquiries
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about yourself and why you are interested..."
              className="w-full mt-1.5 p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 h-16 resize-none"
            />
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

// ==========================================
// CONTACT FORM
// ==========================================
export function ContactForm({ onAddContact }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      setFormData((prev) => ({
        ...prev,
        phone: value.replace(/\D/g, '').slice(0, 10),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('Name is required');
      return;
    }
    if (!formData.phone || formData.phone.length < 10) {
      setError('Please enter a valid phone number');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }
    if (!formData.message.trim()) {
      setError('Please type your message');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const msg = {
        id: `msg-${Date.now()}`,
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        subject: formData.subject || 'General Enquiry',
        message: formData.message,
        timestamp:
          new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }) +
          ', ' +
          new Date().toLocaleDateString(),
      };

      if (typeof onAddContact === 'function') onAddContact(msg);
      setLoading(false);
      setSuccess(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        subject: '',
        message: '',
      });
    }, 800);
  };

  return (
    <div className="bg-white p-8 border border-slate-150 rounded-3xl shadow-sm">
      <h3 className="font-bold text-slate-800 text-lg mb-4">
        Send Us a Direct Message
      </h3>

      {success ? (
        <div className="bg-blue-50 border border-blue-200 text-blue-900 p-6 rounded-2xl text-center space-y-3">
          <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto">
            <Check className="w-5 h-5" />
          </div>
          <p className="font-bold text-sm">Message Transmitted!</p>
          <p className="text-xs text-slate-500">
            We will contact you soon.
          </p>
          <button
            type="button"
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
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">
              Your Name *
            </label>
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
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">
                Mobile Number *
              </label>
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
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">
                Email Address *
              </label>
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
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">
              Subject / Interest
            </label>
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
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">
              Your Message *
            </label>
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
