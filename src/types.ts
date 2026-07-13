export interface InsuranceCompany {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  logo: string;
  categories: string[];
  claimRatio: string;
  rating: number;
}

export interface InsuranceProduct {
  id: string;
  title: string;
  category: string;
  icon: string;
  description: string;
  features: string[];
  benefits: string[];
  eligibility: string[];
  docsRequired: string[];
  claimProcess: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  icon: string;
  description: string;
  details: string[];
}

export interface NewsPost {
  id: string;
  title: string;
  category: string;
  publishDate: string;
  description: string;
  content: string;
  coverImage: string;
  author: string;
  tags: string[];
  readTime: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  review: string;
  rating: number;
  photo: string;
  productType: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Events' | 'Training' | 'Meetings' | 'Awards' | 'Office';
  image: string;
  description: string;
}

export interface FAQItem {
  id: string;
  category: 'General' | 'Policies' | 'Claims' | 'Premiums' | 'Advisor';
  question: string;
  answer: string;
}

// Submissions
export interface AdvisorRegistration {
  id: string;
  fullName: string;
  gender: string;
  dob: string;
  mobile: string;
  whatsApp: string;
  email: string;
  address: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
  qualification: string;
  occupation: string;
  experience: boolean;
  preferredCompany: string;
  referral: string;
  hearAboutUs: string;
  message: string;
  timestamp: string;
}

export interface InsuranceEnquiry {
  id: string;
  name: string;
  gender: string;
  age: number;
  mobile: string;
  whatsApp: string;
  email: string;
  address: string;
  city: string;
  occupation: string;
  income: string;
  preferredCompany: string;
  productType: string;
  purpose: string;
  preferredTime: string;
  referral: string;
  message: string;
  timestamp: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}
