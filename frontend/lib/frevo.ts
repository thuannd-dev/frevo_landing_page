/* ============================================================
   FREVO — Static content constants.
   Single source of truth for the FREVO landing page.
   Does NOT import from lib/content.ts, lib/agency.ts, or lib/cms.ts.
   ============================================================ */

// ---------------------------------------------------------------------------
// Site identity
// ---------------------------------------------------------------------------
export const FREVO_SITE = {
  name: "FREVO",
  tagline: "Where Freelancers Evolve",
  email: "hello@frevo.co",
} as const;

// ---------------------------------------------------------------------------
// Navigation (desktop + mobile)
// ---------------------------------------------------------------------------
export const FREVO_NAV = [
  { label: "Why FREVO", href: "/#right-fit" },
  { label: "Explore Talent", href: "/#talent" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Platform", href: "/#capabilities" },
  { label: "FAQ", href: "/#faq" },
  { label: "Blog", href: "/blog" },
] as const;

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------
export const FREVO_HERO = {
  eyebrow: "FREVO · Where Freelancers Evolve",
  headline: ["The right creative.", "For the right project."],
  accentWord: "right", // both lines contain "right" — accent by position below
  sub: "For businesses that need specific creative work done. For freelancers ready for projects that fit.",
  ctaPrimary: { label: "Post a Project", href: "/#post-project" },
  ctaSecondary: { label: "Explore Talent", href: "/#talent" },
} as const;

// ---------------------------------------------------------------------------
// Creative Categories (for marquee)
// ---------------------------------------------------------------------------
export const FREVO_CATEGORIES = [
  "Branding & Design",
  "Video & Motion",
  "Photography",
  "Copywriting",
  "Content Creation",
  "Social Creative",
] as const;

// ---------------------------------------------------------------------------
// Creative Freelancer & Pod Profiles (showcasing real Creative Monk work)
// ---------------------------------------------------------------------------
export type TalentProfile = {
  id: string;
  name: string;
  role: string;
  discipline: string;
  avatar: string;
  featuredWork: {
    client: string;
    title: string;
    cover: string;
    metric: { value: string; label: string };
  };
  skills: string[];
};

const avatar = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=200&q=80`;

export const FREVO_PROFILES: TalentProfile[] = [
  {
    id: "p1",
    name: "Elena Rostova",
    role: "Senior Brand Identity Designer",
    discipline: "Brand Designer",
    avatar: avatar("1494790108377-be9c29b29330"),
    featuredWork: {
      client: "Tvisva Jewels",
      title: "A jewellery house, dressed for every surface",
      cover: "/work/tvisva-014.jpg",
      metric: { value: "20+", label: "brand assets" },
    },
    skills: ["Brand Identity", "Art Direction", "Print", "Website"],
  },
  {
    id: "p2",
    name: "Marcus Vance",
    role: "Packaging & 3D Specialist",
    discipline: "Packaging Designer",
    avatar: avatar("1507003211169-0a1dd7228f2d"),
    featuredWork: {
      client: "White Wolf",
      title: "A men's grooming identity with bite",
      cover: "/work/white-wolf-049.jpg",
      metric: { value: "Identity", label: "+ packaging line" },
    },
    skills: ["Packaging", "Brand Systems", "3D Design", "Logo"],
  },
  {
    id: "p3",
    name: "Monk Studio Pod",
    role: "Hospitality & F&B Branding Pod",
    discipline: "Creative Pod",
    avatar: avatar("1522071820081-009f0129c71c"),
    featuredWork: {
      client: "The Avenry",
      title: "Café, kitchen & bar, one identity",
      cover: "/work/avenry-059.jpg",
      metric: { value: "3 menus", label: "+ brand & social" },
    },
    skills: ["Hospitality", "Print Menus", "Social", "Brand"],
  },
  {
    id: "p4",
    name: "Sofia Al-Mansoor",
    role: "Visual Identity & Retail Designer",
    discipline: "Brand & Retail",
    avatar: avatar("1573496359142-b8d87734a5a2"),
    featuredWork: {
      client: "Café Zoya",
      title: "A café brand with a friendly bite",
      cover: "/work/cafe-zoya-076.jpg",
      metric: { value: "Brand", label: "+ menu & packaging" },
    },
    skills: ["Visual Identity", "Packaging", "Collateral", "Menu"],
  },
  {
    id: "p5",
    name: "The Motion Squad",
    role: "Content & Social Media Pod",
    discipline: "Creative Pod",
    avatar: avatar("1556761175-5973dc0f32e7"),
    featuredWork: {
      client: "Best Western Plus Mohali",
      title: "Hospitality, always-on and on-brand",
      cover: "/work/best-western-083.jpg",
      metric: { value: "Always-on", label: "social + collateral" },
    },
    skills: ["Social Campaigns", "Motion", "Content", "Reels"],
  },
  {
    id: "p6",
    name: "David Miller",
    role: "Digital Product & Web Designer",
    discipline: "Web & UI/UX",
    avatar: avatar("1500648767791-00dcc994a43e"),
    featuredWork: {
      client: "Chatha Foods",
      title: "A frozen-food brand, served responsive",
      cover: "/work/chatha-foods-088.jpg",
      metric: { value: "Website", label: "design + system" },
    },
    skills: ["Web Design", "UI/UX", "Design Systems", "Next.js"],
  },
];

// Aliases for compatibility
export const FREVO_FEATURED_WORK = FREVO_PROFILES;
export const FREVO_TALENT = FREVO_PROFILES;

// ---------------------------------------------------------------------------
// Process steps
// ---------------------------------------------------------------------------
export const FREVO_PROCESS = [
  {
    step: "01",
    phase: "Define",
    title: "Define the Project",
    subtitle: "Define what you need before a single message is sent.",
    body: "Use a structured brief to describe your goal, deliverables, budget, and timeline. Clear requirements set the foundation for precision matching.",
    deliverables: [
      "Structured Brief",
      "Scope & Budget",
      "Timeline Targets",
      "Reference Direction",
    ],
    icon: "FileText",
    preview: {
      type: "brief",
      badge: "Brief Builder",
      projectTitle: "Minimalist Brand Identity & Packaging",
      scope: "Logo system, 3D bottle renders, print-ready packaging",
      timeline: "4 Weeks · Fixed Milestones",
      budget: "$2,800 – $4,200",
      status: "Ready for Matching",
    },
  },
  {
    step: "02",
    phase: "Match",
    title: "Match & Shortlist",
    subtitle: "Curated creators matched to your specific aesthetic.",
    body: "Explore curated freelancers and creative pods whose style, portfolio, and availability directly fit your brief — no spam proposals or cheap bidding wars.",
    deliverables: [
      "Curated Talent",
      "Comparable Work",
      "Transparent Rates",
      "Direct Chat",
    ],
    icon: "Search",
    preview: {
      type: "match",
      badge: "AI & Domain Match",
      creatorName: "Monk Studio Pod",
      discipline: "Brand & Packaging Pod",
      matchScore: "98% Aesthetic Fit",
      pastWork: "White Wolf Packaging + The Avenry",
      rate: "$3,200 (Fixed Escrow)",
      status: "Available for Q2",
    },
  },
  {
    step: "03",
    phase: "Collaborate",
    title: "Collaborate with Clarity",
    subtitle: "Milestone escrow keeps progress visible and safe.",
    body: "Agree on milestones and revision cycles before work begins. An integrated workspace with escrow protection keeps progress transparent and funds secure.",
    deliverables: [
      "Milestone Escrow",
      "Progress Checkpoints",
      "Revision Alignment",
      "File Staging",
    ],
    icon: "Layers",
    preview: {
      type: "escrow",
      badge: "Escrow Protection",
      milestones: [
        {
          name: "M1: Brand Identity & Moodboards",
          status: "Approved · $1,200 Released",
          active: false,
        },
        {
          name: "M2: 3D Packaging & Labeling",
          status: "In Progress · $1,500 In Escrow",
          active: true,
        },
        {
          name: "M3: Production Guidelines & Source",
          status: "Upcoming · $800 Locked",
          active: false,
        },
      ],
      protectionNote: "Funds released only upon client milestone sign-off.",
    },
  },
  {
    step: "04",
    phase: "Deliver",
    title: "Complete & Review",
    subtitle: "Instant IP transfer and production-ready source files.",
    body: "Work is reviewed and approved against defined criteria. Payment is released from escrow, and full IP ownership transfers automatically with raw source files.",
    deliverables: [
      "Final Deliverables",
      "Escrow Release",
      "100% IP Ownership",
      "Verified Review",
    ],
    icon: "CheckCircle2",
    preview: {
      type: "deliver",
      badge: "Completion & IP Transfer",
      files: [
        "brand_guidelines_v2.pdf",
        "packaging_dieline.ai",
        "render_scene_4k.blend",
      ],
      ipStatus: "100% Client IP Ownership Assigned",
      escrowStatus: "All Milestones Settled (100%)",
      verifiedBadge: "Verified Project Delivery",
    },
  },
] as const;

// ---------------------------------------------------------------------------
// Platform capabilities — explicit status field
// ---------------------------------------------------------------------------
export type Capability = {
  id: string;
  index: string;
  title: string;
  tagline: string;
  benefit: string;
  pills: string[];
  icon: string; // lucide icon name
  status: "mvp" | "planned";
};

export const FREVO_CAPABILITIES: Capability[] = [
  {
    id: "brief",
    index: "01",
    title: "Standardized Project Brief",
    tagline: "Clear scope before a single message is sent",
    benefit:
      "Define scope, deliverables, budget and timeline in a structured format. Clear briefs reduce ambiguity before a single message is sent.",
    pills: [
      "Project Scope",
      "Deliverables",
      "Budget & Timeline",
      "Reference Direction",
      "Format Requirements",
    ],
    icon: "FileText",
    status: "mvp",
  },
  {
    id: "discovery",
    index: "02",
    title: "Relevant Talent Discovery",
    tagline: "Filtered by discipline, skills and comparable work",
    benefit:
      "Browse freelancers filtered by discipline, skills and comparable project experience — not just keyword search.",
    pills: [
      "Discipline Filtering",
      "Skill Matching",
      "Comparable Portfolio",
      "Individual Freelancers",
      "Creative Pods",
    ],
    icon: "Search",
    status: "mvp",
  },
  {
    id: "workspace",
    index: "03",
    title: "Shared Workspace",
    tagline: "Files, feedback and updates in one common space",
    benefit:
      "A common space where both parties can share files, feedback and updates throughout the project.",
    pills: [
      "File Sharing",
      "Structured Feedback",
      "Progress Updates",
      "Revision Alignment",
      "Deliverable Hand-off",
    ],
    icon: "Layout",
    status: "mvp",
  },
  {
    id: "milestones",
    index: "04",
    title: "Milestone Management",
    tagline: "Agreed checkpoints that keep scope manageable",
    benefit:
      "Break projects into agreed checkpoints so progress is visible and scope creep stays manageable.",
    pills: [
      "Phase Checkpoints",
      "Progress Visibility",
      "Scope Control",
      "Approval Stages",
      "Timeline Tracking",
    ],
    icon: "CheckSquare",
    status: "mvp",
  },
  {
    id: "payment",
    index: "05",
    title: "Structured Payment Workflow",
    tagline: "Milestone-tied payment with clear rules for both sides",
    benefit:
      "Payment tied to agreed milestones, with a clear process for both parties.",
    pills: [
      "Milestone Releases",
      "Transparent Terms",
      "Approval-Linked Payouts",
      "Mutual Protection",
    ],
    icon: "CreditCard",
    status: "mvp",
  },
  {
    id: "reviews",
    index: "06",
    title: "Reviews & Reputation",
    tagline: "Verified track records built on real completed work",
    benefit:
      "After project completion, both parties can leave verified reviews — building a track record tied to real work.",
    pills: [
      "Verified Reviews",
      "Two-Way Feedback",
      "Completed Project Proof",
      "Long-Term Reputation",
    ],
    icon: "Star",
    status: "mvp",
  },
  {
    id: "ai-match",
    index: "07",
    title: "AI Smart Matching",
    tagline: "Automated brief-to-talent alignment",
    benefit:
      "Surface freelancers whose skills and past work align with your specific brief — automatically.",
    pills: [
      "Brief Analysis",
      "Skill Alignment",
      "Portfolio Relevance",
      "Automated Shortlist",
    ],
    icon: "Sparkles",
    status: "mvp",
  },
  {
    id: "ai-fit",
    index: "08",
    title: "AI Candidate Fit Analysis",
    tagline: "Structured comparison against project requirements",
    benefit:
      "Get a structured comparison of how well each applicant's experience fits your project requirements.",
    pills: [
      "Requirement Mapping",
      "Experience Comparison",
      "Strengths & Gaps",
      "Decision Support",
    ],
    icon: "BarChart2",
    status: "mvp",
  },
];

// ---------------------------------------------------------------------------
// Footer nav groups — only verified routes or in-page anchors
// ---------------------------------------------------------------------------
export const FREVO_FOOTER_GROUPS = [
  {
    title: "Explore",
    links: [
      { label: "Post a Project", href: "/#post-project" },
      { label: "Explore Talent", href: "/#talent" },
      { label: "How It Works", href: "/#how-it-works" },
      { label: "Platform", href: "/#capabilities" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About FREVO", href: "/#right-fit" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "mailto:hello@frevo.co" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
] as const;

export const FREVO_SOCIALS = [
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "X / Twitter", href: "https://x.com" },
  { label: "Instagram", href: "https://instagram.com" },
] as const;

// ---------------------------------------------------------------------------
// Section 02: Differentiators (Why FREVO vs Traditional Platforms)
// ---------------------------------------------------------------------------
export const FREVO_DIFFERENTIATORS = [
  {
    index: "01",
    title: "Curated Talent Network",
    body: "No open bid spams or unverified accounts. Every freelancer and pod is reviewed against real client deliveries and verified capabilities.",
  },
  {
    index: "02",
    title: "Project-First Matching",
    body: "Matched directly by domain requirements, visual aesthetics, and comparable past deliverables — never by generic keyword tags.",
  },
  {
    index: "03",
    title: "Scope Before Day One",
    body: "Deliverables, revision cycles, timelines, and acceptance criteria are locked in structured agreements before a single hour of work starts.",
  },
  {
    index: "04",
    title: "No Race to the Bottom",
    body: "No cheap proposal race. Transparent milestone escrow protects client capital while guaranteeing fair, timely compensation for creators.",
  },
] as const;

// ---------------------------------------------------------------------------
// Section 07: Frequently Asked Questions (Structured for FREVO)
// ---------------------------------------------------------------------------
export const FREVO_FAQS = [
  {
    q: "How is FREVO different from Upwork or Fiverr?",
    a: "Unlike open bidding marketplaces where you wade through 50+ cut-and-paste proposals, FREVO curates verified creators and small creative pods. We focus strictly on creative work (branding, visual design, 3D, motion, content), with pre-aligned project scopes and milestone-backed escrow.",
  },
  {
    q: "How does milestone escrow protect both parties?",
    a: "When a contract begins, the client deposits funds for the active milestone into FREVO Escrow. The freelancer works knowing the budget is locked and secure. Funds are only released to the freelancer once the client reviews and signs off on the delivered milestone.",
  },
  {
    q: "Can I hire a multi-disciplinary team or Pod?",
    a: "Yes. In addition to independent specialists, FREVO supports Creative Pods — pre-assembled teams of art directors, designers, copywriters, and 3D artists who collaborate seamlessly under a single project lead and unified contract.",
  },
  {
    q: "Does it cost anything to post a project brief?",
    a: "Posting a project brief and receiving curated matches on FREVO is completely free. Platform fees only apply once a contract is formally accepted and funded into milestone escrow.",
  },
  {
    q: "Who owns the intellectual property (IP) upon completion?",
    a: "You do. Full, unencumbered intellectual property rights and all raw production source files transfer automatically to the client upon final milestone approval and payment release.",
  },
  {
    q: "What happens if a deliverable doesn't meet the agreed scope?",
    a: "Milestones are defined with objective acceptance criteria and fixed revision loops. If an issue cannot be resolved through revisions, FREVO's project mediation team steps in to inspect the brief, review submissions against criteria, and adjust or refund escrow accordingly.",
  },
] as const;
