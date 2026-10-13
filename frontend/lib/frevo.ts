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
  { label: "Explore Talent", href: "#talent" },
  { label: "For Businesses", href: "#right-fit" },
  { label: "For Freelancers", href: "#right-fit" },
  { label: "How It Works", href: "#how-it-works" },
] as const;

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------
export const FREVO_HERO = {
  eyebrow: "FREVO · Where Freelancers Evolve",
  headline: ["The right creative.", "For the right project."],
  accentWord: "right", // both lines contain "right" — accent by position below
  sub: "For businesses that need specific creative work done. For freelancers ready for projects that fit.",
  ctaPrimary: { label: "Post a Project", href: "#post-project" },
  ctaSecondary: { label: "Explore Talent", href: "#talent" },
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
// Talent cards — explicit per card, no index-based cycling
// ---------------------------------------------------------------------------
export type TalentCard = {
  id: string;
  name: string;
  discipline: string;
  skills: string[];
  description: string;
  /** Creative / project output image — not an avatar. Unsplash, not CM portfolio. */
  projectImage: string;
  /** Small avatar image — secondary only (32px). Unsplash. */
  avatar: string;
  isDemo: true;
};

const U = (id: string, w = 900) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const FREVO_TALENT: TalentCard[] = [
  {
    id: "t1",
    name: "Demo Profile",
    discipline: "Brand Designer",
    skills: ["Brand Identity", "Packaging", "Art Direction"],
    description: "Creates visual systems for consumer and lifestyle brands.",
    projectImage: U("1626785774573-4b799315345d"),
    avatar: U("1494790108377-be9c29b29330", 200),
    isDemo: true,
  },
  {
    id: "t2",
    name: "Demo Profile",
    discipline: "Video Editor",
    skills: ["Short-form Video", "Motion Graphics", "Reels"],
    description: "Specialises in scroll-stopping content for social platforms.",
    projectImage: U("1492691527719-9d1e07e534b4"),
    avatar: U("1500648767791-00dcc994a43e", 200),
    isDemo: true,
  },
  {
    id: "t3",
    name: "Demo Profile",
    discipline: "Photographer",
    skills: ["Product Photography", "Lifestyle", "Retouching"],
    description: "Product and lifestyle photographer with e-commerce experience.",
    projectImage: U("1620712943543-bcc4688e7485"),
    avatar: U("1507003211169-0a1dd7228f2d", 200),
    isDemo: true,
  },
  {
    id: "t4",
    name: "Demo Profile",
    discipline: "Copywriter",
    skills: ["Brand Voice", "UX Copy", "Campaigns"],
    description: "Writes copy that connects brand intent with audience language.",
    projectImage: U("1611162617474-5b21e879e113"),
    avatar: U("1438761681033-6461ffad8d80", 200),
    isDemo: true,
  },
  {
    id: "t5",
    name: "Demo Profile",
    discipline: "Content Creator",
    skills: ["Social Content", "Storytelling", "Strategy"],
    description: "Builds always-on content engines for growing brands.",
    projectImage: U("1558655146-9f40138edfeb"),
    avatar: U("1472099645785-5658abf4ff4e", 200),
    isDemo: true,
  },
  {
    id: "t6",
    name: "Demo Pod",
    discipline: "Creative Pod · Brand + Video",
    skills: ["Branding", "Video Production", "Social"],
    description: "A small complementary team that covers brand and motion together.",
    projectImage: U("1574717024653-61fd2cf4d44d"),
    avatar: U("1438761681033-6461ffad8d80", 200),
    isDemo: true,
  },
];

// ---------------------------------------------------------------------------
// Process steps
// ---------------------------------------------------------------------------
export const FREVO_PROCESS = [
  {
    step: "01",
    title: "Define the Project",
    body: "Use a structured brief to describe your goal, deliverables, budget and timeline. Clear requirements set the foundation for a good match.",
  },
  {
    step: "02",
    title: "Find the Right Fit",
    body: "Explore freelancers whose skills, portfolio and availability match your project — not just the most available option.",
  },
  {
    step: "03",
    title: "Collaborate with Clarity",
    body: "Agree on scope, milestones and responsibilities before work begins. A shared workspace keeps progress visible to both parties. *(planned)*",
  },
  {
    step: "04",
    title: "Complete & Review",
    body: "Work is reviewed on completion. Payment follows the agreed arrangement. Both parties build reputation through verified project reviews. *(planned)*",
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
    status: "planned",
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
    status: "planned",
  },
];

// ---------------------------------------------------------------------------
// Footer nav groups — only verified routes or in-page anchors
// ---------------------------------------------------------------------------
export const FREVO_FOOTER_GROUPS = [
  {
    title: "Explore",
    links: [
      { label: "Explore Talent", href: "#talent" },
      { label: "Post a Project", href: "#post-project" },
      { label: "How It Works", href: "#how-it-works" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "mailto:hello@frevo.co" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
] as const;

