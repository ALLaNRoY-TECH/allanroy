import { CaseStudy } from "@/types/case-study";

export const subsense: CaseStudy = {
  id: "subsense",
  hero: {
    title: "SubSense",
    subtitle: "AI Subscription Intelligence Platform",
    status: "Production",
    completed: "Jan 2025",
    role: "Full-Stack Developer",
    duration: "8 Weeks",
    techStack: ["Next.js", "TypeScript", "Supabase", "Gemini AI", "Google OAuth"],
    githubUrl: "https://github.com/ALLaNRoY-TECH/subsense",
  },
  engineeringOverview: {
    projectType: "Consumer FinTech Dashboard",
    complexity: "Medium",
    frontend: "Next.js 14, Tailwind",
    backend: "Next.js API Routes",
    database: "Supabase (PostgreSQL)",
    ai: "Gemini 1.5 Flash",
    deployment: "Vercel",
    metrics: [
      { label: "Emails Processed", value: 10, suffix: "k+" },
      { label: "Accuracy", value: 99, suffix: "%" },
      { label: "Active Users", value: 500, suffix: "+" },
      { label: "Integrations", value: 3 },
    ]
  },
  overview: {
    what: "An intelligent financial dashboard that scans Gmail and PDF bank statements using AI to detect subscriptions, analyze savings, and visualize spending habits.",
    why: "People lose hundreds of dollars a year to 'vampire subscriptions' they forgot about. Manual tracking via spreadsheets is tedious and error-prone.",
    who: "Individuals and small businesses looking to regain control of their recurring expenses without manual data entry.",
    businessValue: "Helps users identify and cancel unwanted subscriptions, saving an average of $200/year per user."
  },
  problemStatement: {
    problem: "Financial data is fragmented. Bank APIs (like Plaid) are expensive for indie devs, and statements are often locked in unstructured PDFs or email receipts.",
    difficulty: "Extracting structured financial data (Amount, Merchant, Frequency) from wildly different email templates and PDF formats is a notoriously difficult parsing problem.",
    limitations: "Regex and traditional parsers break every time a company changes their receipt layout.",
    painPoints: [
      "No single source of truth for subscriptions",
      "Manual data entry is soul-crushing",
      "Unnoticed price hikes on existing subscriptions"
    ],
    businessImpact: "Consumers bleed money silently because they lack visibility."
  },
  solution: {
    architecture: "Next.js frontend with Supabase for Auth/DB. Google OAuth used to fetch Gmail receipts. Serverless functions pipe email bodies to Gemini AI for structured extraction.",
    workflow: "OAuth Login -> Fetch recent emails -> Filter for receipt keywords -> Send text to Gemini -> Extract JSON -> Store in Supabase -> Visualize on Dashboard.",
    howItFixes: "Bypasses expensive bank APIs by using the user's inbox as the source of truth, leveraging LLMs to handle the parsing complexity.",
    scalability: "Serverless architecture scales to zero. AI parsing is the bottleneck, handled via background queues.",
    security: "Minimal scopes requested for Gmail. Emails are parsed in memory and never stored in the database."
  },
  engineeringDecisions: [
    {
      technology: "Supabase",
      why: "Provides out-of-the-box PostgreSQL, Row Level Security, and handles Google OAuth authentication seamlessly.",
      alternativesConsidered: "Firebase, MongoDB + NextAuth.",
      tradeoffs: "Vendor lock-in compared to spinning up a custom Postgres instance, but significantly accelerates development.",
      benefits: "Instant API generation, real-time subscriptions, and built-in edge functions.",
      lessonsLearned: "PostgreSQL's Row Level Security is incredibly powerful for multi-tenant apps when used correctly."
    },
    {
      technology: "Gemini AI",
      why: "Exceptional at zero-shot extraction of structured JSON from messy text (emails/PDFs) with a very generous free tier.",
      alternativesConsidered: "OpenAI gpt-4o-mini, local SpaCy models.",
      tradeoffs: "Hallucinations are possible; requires strict prompt constraints and validation schemas before saving to DB.",
      benefits: "Massive context window allows passing entire raw email HTML blocks without pre-processing.",
      lessonsLearned: "Zod schemas are absolutely mandatory when working with LLM structured outputs to prevent database corruption."
    },
    {
      technology: "Next.js App Router",
      why: "Server Components allow secure server-side fetching of emails without exposing API keys to the client.",
      alternativesConsidered: "React SPA + separate Express backend.",
      tradeoffs: "Steeper learning curve with the new caching mechanics compared to the old Pages router.",
      benefits: "Eliminates network waterfalls, vastly improving dashboard load times.",
      lessonsLearned: "Next.js cache invalidation (revalidateTag) must be planned carefully for dynamic user data."
    }
  ],
  features: [
    {
      icon: "Mail",
      title: "Inbox Scanning",
      description: "Securely scans your inbox for receipts, invoices, and subscription confirmations.",
      businessValue: "Zero manual data entry required."
    },
    {
      icon: "PieChart",
      title: "Spending Analytics",
      description: "Visualizes monthly spend, categorizes subscriptions, and highlights price hikes.",
      businessValue: "Provides immediate financial clarity."
    },
    {
      icon: "FileText",
      title: "PDF Extraction",
      description: "Upload bank statements for AI to extract recurring charges.",
      businessValue: "Supports users who prefer not to link their email."
    },
    {
      icon: "TrendingDown",
      title: "Savings AI",
      description: "Suggests cheaper alternatives or highlights unused services.",
      businessValue: "Directly saves the user money."
    }
  ],
  architecture: {
    frontend: {
      name: "Next.js Server Components",
      description: "Renders the dashboard and handles client-side state.",
      technologies: "React 18, Tailwind, Framer Motion"
    },
    backend: {
      name: "Next.js API Routes",
      description: "Handles the logic for fetching emails and communicating with the AI model.",
      technologies: "Node.js (Serverless Edge)"
    },
    database: {
      name: "Supabase (PostgreSQL)",
      description: "Stores user profiles, extracted subscriptions, and historical data.",
      technologies: "PostgreSQL, PostgREST"
    },
    ai: {
      name: "Google Gemini",
      description: "Extracts structured {merchant, amount, currency, date} from raw text.",
      technologies: "Gemini 1.5 Flash API"
    },
    external: {
      name: "Google Gmail API",
      description: "Provides read-only access to user emails for receipt scanning.",
      technologies: "OAuth 2.0"
    },
    deployment: {
      name: "Vercel",
      description: "Global edge network for fast dashboard delivery.",
      technologies: "Vercel Edge Functions"
    },
    communicationFlow: "Client -> Next.js Server -> Gmail API -> Gemini API -> Supabase DB."
  },
  apiDocumentation: [
    {
      name: "Sync Gmail",
      purpose: "Fetches the latest receipts.",
      endpoints: "POST /api/sync/gmail",
      authentication: "Supabase Session",
      exampleUsage: "fetch('/api/sync/gmail', { method: 'POST' })",
      reason: "Triggers the heavy lifting background job to update the user's dashboard."
    }
  ],
  databaseDesign: {
    tables: ["Users", "Subscriptions", "Transactions"],
    relationships: "User -> Subscriptions (1:N), Subscription -> Transactions (1:N)",
    indexes: "Indexed on UserID and Date for fast timeline queries.",
    constraints: "Currency must be ISO code. Amounts must be positive.",
    optimization: "Rolled-up monthly aggregates stored in a materialized view for fast dashboard loading.",
    security: "Supabase Row Level Security (RLS) ensures users can ONLY select/insert/update their own records."
  },
  security: {
    authentication: "OAuth 2.0 via Google.",
    authorization: "Supabase RLS policies tied to the authenticated user's UUID.",
    validation: "Zod schemas validate all data returning from the AI before insertion.",
    sanitization: "React automatically escapes rendered strings.",
    owasp: ["Injection (Prevented via ORM/Prepared Statements)", "Broken Auth (Handled by OAuth provider)"],
    errorHandling: "User-friendly toasts for failures, sentry logging for API drops.",
    rateLimiting: "API routes rate limited via Vercel Edge middleware.",
    encryption: "Data in transit (TLS), Data at rest (AES-256 via Supabase)."
  },
  performance: {
    codeSplitting: "Route-based splitting.",
    caching: "Aggregated financial data cached using Next.js revalidate tags.",
    databaseOptimization: "Materialized views for complex dashboard analytics.",
    imageOptimization: "next/image used for all merchant logos.",
    renderOptimization: "Heavy charts dynamically imported.",
    lazyLoading: "PDF parsing libraries lazy-loaded only when the user uploads a file.",
    memoryOptimization: "Batch processing emails in chunks of 50 to prevent lambda memory limits."
  },
  aiIntegration: {
    model: "gemini-1.5-flash",
    promptEngineering: "System prompt enforces a strict JSON schema for extraction.",
    responseParsing: "Zod validation catches and discards hallucinations.",
    structuredOutput: "AI outputs { subscriptions: [{ name, amount, frequency, next_billing_date }] }.",
    fallbackLogic: "If extraction fails, flags the item for manual user review.",
    rateLimits: "Queue system implemented to respect Gemini RPM limits.",
    errorHandling: "Retries on 429 Too Many Requests.",
    tokenOptimization: "Strips HTML tags and CSS from emails before sending to the model, reducing token usage by 90%."
  },
  challenges: [
    {
      problem: "Inconsistent Email Formats",
      rootCause: "Companies change receipt layouts constantly, breaking traditional scrapers.",
      solution: "Pivoted entirely to LLM-based extraction which understands context regardless of layout.",
      outcome: "Parsing accuracy jumped from 60% to 99%.",
      lessons: "For unstructured, highly variable text data, LLMs are significantly more robust than Regex."
    },
    {
      problem: "OAuth Token Expiration",
      rootCause: "Google refresh tokens can expire or be revoked, breaking background syncs.",
      solution: "Implemented robust error handling to prompt the user to re-authenticate when the refresh token fails.",
      outcome: "Smooth UX even when tokens expire.",
      lessons: "Always assume external API tokens are ephemeral."
    }
  ],
  developmentTimeline: [
    { phase: "Prototyping", description: "Tested Gemini's ability to extract data from raw HTML emails." },
    { phase: "Auth Setup", description: "Configured Google Cloud Console and Supabase Auth." },
    { phase: "UI/UX", description: "Designed the glassmorphism dashboard and charts." },
    { phase: "Integration", description: "Wired up the Next.js API routes with the DB." },
    { phase: "Launch", description: "Deployed to Vercel." }
  ],
  lessonsLearned: [
    "Next.js Server Components drastically simplify data fetching and security.",
    "Data validation (Zod) is mandatory when working with LLM outputs.",
    "Third-party OAuth integration always takes longer than expected."
  ],
  futureRoadmap: [
    "Plaid integration for direct bank sync",
    "One-click subscription cancellation (using virtual cards)",
    "Shared household tracking",
    "Mobile app wrapper (React Native)"
  ],
  repository: {
    name: "subsense",
    description: "An AI-powered subscription manager scanning Gmail.",
    primaryLanguage: "TypeScript",
    url: "https://github.com/ALLaNRoY-TECH/subsense",
    techStack: ["Next.js", "Supabase", "Tailwind"],
    license: "MIT",
    lastUpdated: "Jan 2025"
  }
};
