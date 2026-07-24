import { 
  InsuranceCompany, 
  InsuranceProduct, 
  ServiceItem, 
  NewsPost, 
  Testimonial, 
  GalleryItem, 
  FAQItem 
} from './types';

export const companiesData: InsuranceCompany[] = [
  {
    id: 'sbi-life',
    name: 'SBI Life Insurance',
    shortDescription: 'Leveraging the expansive trust of State Bank of India with budget-friendly protective solutions.',
    description: 'SBI Life Insurance is a joint venture between State Bank of India and BNP Paribas Cardif. It offers simple, accessible protective covers across individual, group, life, and pension segments.',
    logo: 'SBI',
    categories: ['Life', 'Child', 'Savings', 'Pension'],
    claimRatio: '97.4%',
    rating: 4.8
  },
  {
    id: 'hdfc-life',
    name: 'HDFC Life Insurance',
    shortDescription: 'A premium private sector insurance provider offering highly innovative life and saving products.',
    description: 'HDFC Life is one of the leading private life insurance companies in India, offering a range of individual and group insurance solutions that meet various customer needs such as Protection, Pension, Savings, Investment, and Health.',
    logo: 'HDFC',
    categories: ['Life', 'ULIP', 'Retirement', 'Investment'],
    claimRatio: '99.5%',
    rating: 4.9
  },
  {
    id: 'care-health',
    name: 'Care Health Insurance',
    shortDescription: 'Specialist health insurer providing extensive, cashless hospitalization covers and critical illness plans.',
    description: 'Care Health Insurance is a specialized health insurer offering products in the retail segment for Health Insurance, Critical Illness, Personal Accident, Top-up Coverage, International Travel Insurance and Maternity.',
    logo: 'CARE',
    categories: ['Health', 'Accident', 'Group'],
    claimRatio: '95.2%',
    rating: 4.7
  },
  {
    id: 'bajaj-general',
    name: 'Bajaj General Insurance',
    shortDescription: 'Leading general insurer offering motor, health, travel, and commercial risk protection across India.',
    description: 'Bajaj Allianz General Insurance is a joint venture between Bajaj Finserv Limited and Allianz SE. It provides comprehensive general insurance solutions including health, motor, travel, home, and commercial insurance with fast digital claims.',
    logo: 'BAJAJ',
    categories: ['General', 'Motor', 'Health', 'Travel'],
    claimRatio: '98.2%',
    rating: 4.8
  }
];

export const productsData: InsuranceProduct[] = [
  {
    id: 'term-life',
    title: 'Term Insurance Plan',
    category: 'Life',
    icon: 'Shield',
    description: 'Pure risk protection cover designed to guarantee high-value financial security for your dependents at extremely affordable premium rates.',
    features: [
      'High cover amount at lower premium prices',
      'Optional critical illness and accidental disability riders',
      'Flexible payout options (lump-sum, monthly income or combination)',
      'Tax benefits under Section 80C'
    ],
    benefits: [
      'Absolute peace of mind for the family',
      'Covers liabilities like home loans and educational expenses in case of unforeseen events',
      'Add-on riders protect against terminal illnesses instantly'
    ],
    eligibility: [
      'Minimum Age: 18 Years',
      'Maximum Age: 65 Years',
      'Income Proof: Compulsory for high coverages',
      'Policy Term: 10 to 40 years or up to age 85'
    ],
    docsRequired: [
      'ID Proof (PAN Card / Aadhaar Card)',
      'Address Proof (Passport / Utility Bill)',
      'Latest 3 Months Salary Slips or IT Return documents',
      'Recent Passport Size Photograph'
    ],
    claimProcess: [
      'Step 1: Inform us or the insurer immediately online or by calling support.',
      'Step 2: Submit the death certificate, original policy document, and claimant ID.',
      'Step 3: Verification is initiated by the claim team.',
      'Step 4: Approved claim amount is directly deposited into the nominee\'s bank account within 3 working days (for eligible claims).'
    ]
  },
  {
    id: 'health-family',
    title: 'Family Health Guard',
    category: 'Health',
    icon: 'Activity',
    description: 'Comprehensive medical insurance covering hospitalization expenses, day-care procedures, pre/post-hospitalization costs, and ICU charges for the entire family.',
    features: [
      'Single policy covers self, spouse, children, and dependent parents',
      'Cashless treatment across 10,000+ network hospitals',
      'No claim bonus (NCB) up to 100% elevation',
      'Free annual health checkups included'
    ],
    benefits: [
      'Protects lifelong family savings from soaring medical inflation',
      'Stress-free cashless claim processing within 2 hours',
      'Covers modern treatments like robotic surgery and organ transplants'
    ],
    eligibility: [
      'Minimum Entry Age: 91 days (for kids), 18 years (for adults)',
      'Maximum Entry Age: No limit (lifetime renewability)',
      'Medical Test: Only required above 50 years based on medical history'
    ],
    docsRequired: [
      'Aadhaar Card and PAN card',
      'Age proof of all members being covered',
      'Pre-existing disease declarations and reports'
    ],
    claimProcess: [
      'For Cashless: Present health card at the insurance desk of a network hospital. Pre-authorization form is sent. Approval is shared in 2 hours.',
      'For Reimbursement: Pay hospital bills directly, collect all original invoices, discharge summary, diagnostic reports, and submit them within 15 days of discharge.'
    ]
  },
  {
    id: 'child-future',
    title: 'Smart Child Education Plan',
    category: 'Child',
    icon: 'GraduationCap',
    description: 'A dual benefit investment-cum-protection plan designed specifically to fund your children\'s premium university fees and milestones even if you aren\'t around.',
    features: [
      'In-built Premium Waiver Benefit (policy continues for the child if parent passes away)',
      'Guaranteed payouts timed exactly with children\'s higher education milestones',
      'Dynamic option of market-linked growth or secure compounding interest'
    ],
    benefits: [
      'Guarantees your child\'s career dreams are unaffected by market dynamics',
      'Tax-free maturity amounts under Section 10(10D)',
      'Maturity payout can be received as a lump sum or in 4 annual installments'
    ],
    eligibility: [
      'Parent Age: 18 to 50 Years',
      'Child Age: 0 to 12 Years',
      'Minimum Premium: ₹2,000 monthly or ₹24,000 annually'
    ],
    docsRequired: [
      'Parent ID and Address Proof',
      'Child Birth Certificate',
      'Parent Income Proof'
    ],
    claimProcess: [
      'In case of parent demise: Premiums are waived instantly. Payout schedules remain exactly intact. Nominee receives immediate family support lumpsum if rider was active.',
      'For Maturity: Submit policy discharge form and child college admission letter (or ID card) for scheduled payout execution.'
    ]
  },
  {
    id: 'retirement-pension',
    title: 'Lifetime Pension & Annuity',
    category: 'Retirement',
    icon: 'TrendingUp',
    description: 'Ensure a regular, guaranteed monthly paycheck throughout your retirement years, preserving your living standards and financial autonomy.',
    features: [
      'Immediate or deferred annuity options available',
      'Guaranteed lifetime income rates locked-in at inception',
      'Option to return the purchase price to the nominee upon retiree passing'
    ],
    benefits: [
      'Total freedom from financial dependency during old age',
      'Protects against longevity risks (outliving your money)',
      'Joint life option continues pension for your spouse after you'
    ],
    eligibility: [
      'Minimum Age: 30 Years',
      'Maximum Age: 85 Years',
      'Purchase Mode: Single lump-sum or systematic accumulations'
    ],
    docsRequired: [
      'Retiree KYC Documents (Aadhaar, PAN)',
      'Age proof verification',
      'Nominee details & relationship proof'
    ],
    claimProcess: [
      'Regular Annuity: Direct credit to registered bank account on the chosen frequency (monthly, quarterly, or yearly) after submitting an annual life certificate.',
      'Upon Demise: Nominee submits death claim. Purchase price is refunded or pension is transferred to spouse as per policy terms.'
    ]
  }
];

export const servicesData: ServiceItem[] = [
  {
    id: 'insurance-consult',
    title: 'Personalized Insurance Consultation',
    icon: 'MessageSquare',
    description: 'We sit down with you to thoroughly analyze your family income, current assets, active loans, and future liabilities to identify the exact protective coverage gap.',
    details: [
      'Scientific human life value (HLV) calculation',
      'Unbiased recommendation across top public and private insurance companies',
      'Deep analysis of existing policies to eliminate overlapping covers'
    ]
  },
  {
    id: 'claim-assist-service',
    title: 'Hassle-Free Claim Support',
    icon: 'HeartHandshake',
    description: 'Claims are the ultimate moment of truth. Our specialized support desk actively handles all documentation and coordination with insurers so you can focus on your family.',
    details: [
      '24/7 dedicated helpline for claim guidance',
      'On-field assistance for hospital claims and paperwork verification',
      'Dedicated legal escalation in case of unwarranted insurer delays'
    ]
  },
  {
    id: 'policy-renewal',
    title: 'Instant Policy Renewal & Management',
    icon: 'RefreshCw',
    description: 'Never let a policy lapse. We manage your comprehensive insurance calendar, providing automated smart notifications and executing swift renewals across different partners.',
    details: [
      'Integrated renewal dashboard for all family policies',
      'Grace period alerts via WhatsApp and SMS',
      'Easy migration or porting advice before execution'
    ]
  }
];

export const faqData: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'General',
    question: 'Are you associated with a single insurance company?',
    answer: 'No, we are independent business managers associated with multiple leading insurance companies in India (including HDFC Life, Care Health, LIC, SBI Life, and others). This allows us to provide fully unbiased recommendations tailored exactly to your budget and coverage requirements.'
  },
  {
    id: 'faq-2',
    category: 'Claims',
    question: 'What is your claim settlement assistance process?',
    answer: 'In case of an event, you can contact our 24/7 helpline immediately. We assign a dedicated claims officer who reviews your documentation, files the claim with the insurance company, manages follow-up queries, and ensures the payout is securely processed in a timely manner.'
  },
  {
    id: 'faq-3',
    category: 'Policies',
    question: 'How do I know how much term cover I need?',
    answer: 'As a general rule of thumb, your term insurance coverage should be at least 10 to 15 times your annual income, plus any outstanding debts like home loans. We use a standardized Human Life Value (HLV) calculator during our consultation to compute this precisely.'
  },
  {
    id: 'faq-4',
    category: 'Advisor',
    question: 'What is the commission structure and training process for advisors?',
    answer: 'Newly registered advisors undergo comprehensive training matching IRDAI guidelines, fully managed by our senior trainers. Commissions are highly competitive and are structured as percentage payouts of premium payments, offering excellent long-term recurring income potentials.'
  }
];

export const testimonialsData: Testimonial[] = [
  {
    id: 't-1',
    name: 'Rajesh Kumar',
    role: 'Business Owner',
    review: 'The claim assistance desk was a lifesaver when my father was hospitalized. They coordinated directly with Care Health and got our cashless request approved in less than two hours. Absolutely remarkable service!',
    rating: 5,
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120',
    productType: 'Health Insurance'
  },
  {
    id: 't-2',
    name: 'Priya Sharma',
    role: 'IT Professional',
    review: 'I was highly confused about which child plan to pick for my daughter\'s future college expenses. Alexander sat down with me, analyzed LIC and HDFC plans side-by-side, and suggested the absolute best plan with built-in premium waivers.',
    rating: 5,
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120',
    productType: 'Child Savings Plan'
  }
];

export const newsPostsData: NewsPost[] = [
  {
    id: 'news-1',
    title: 'Why IRDAI\'s New Claim Settlement Guidelines Benefit Policyholders',
    category: 'Industry Updates',
    publishDate: '2026-07-01',
    description: 'Learn about the latest insurance regulatory updates simplifying terminal claims and promoting absolute transparency.',
    content: 'The Insurance Regulatory and Development Authority of India (IRDAI) has recently rolled out highly consumer-centric guidelines aimed at accelerating claim settlements. Under the new rules, insurers are mandated to settle plain death claims within 15 days or pay interest on any delay. Additionally, the pre-authorization for cashless health claims must now be reviewed within 2 hours of submission. These changes aim to enhance public trust and eliminate unnecessary administrative hurdles during critical family moments.',
    coverImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=600',
    author: 'Alexander Pierce',
    tags: ['IRDAI', 'Regulations', 'Claims Assistance'],
    readTime: '4 min read'
  },
  {
    id: 'news-2',
    title: 'The Essential Guide to Buying Your First Term Insurance Plan',
    category: 'Educational',
    publishDate: '2026-06-15',
    description: 'A comprehensive walkthrough of riders, coverage metrics, and timing factors before locking in your term cover.',
    content: 'Buying term insurance is one of the most critical financial decisions you will make. It acts as an absolute foundation for your family\'s financial pyramid. However, many buyers end up purchasing insufficient covers or overpaying for unnecessary riders. This guide breaks down the concept of Human Life Value (HLV), explains the difference between increasing and flat term plans, and highlights why disclosing existing habits like smoking is vital to prevent claim rejections later on.',
    coverImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=600',
    author: 'Karan Malhotra',
    tags: ['Term Insurance', 'Financial Planning', 'Tips'],
    readTime: '6 min read'
  }
];

export const galleryData: GalleryItem[] = [
  {
    id: 'g-1',
    title: 'Annual Advisory Training Summit',
    category: 'Training',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600',
    description: 'Empowering our network of over 200 advisors with the latest regulatory updates and digital planning tools.'
  },
  {
    id: 'g-2',
    title: 'Top Performers Recognition Ceremony',
    category: 'Awards',
    image: 'https://images.unsplash.com/photo-1531058020387-3be344559be6?auto=format&fit=crop&q=80&w=600',
    description: 'Celebrating our premium advisors for excellence in customer support and high claim resolution assistance.'
  },
  {
    id: 'g-3',
    title: 'Interactive Customer Awareness Session',
    category: 'Events',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=600',
    description: 'Educating families on health insurance covers and cashless settlement protocols.'
  }
];
