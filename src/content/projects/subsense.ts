import { CaseStudy } from "@/types/case-study";

export const subsense: CaseStudy = {
  id: "subsense",
  hero: {
    title: "SubSense",
    subtitle: "AI Subscription Intelligence Platform",
    status: "Production",
    completed: "[To Be Documented]",
    role: "Full-Stack Developer",
    duration: "[To Be Documented]",
    techStack: ["Next.js", "TypeScript", "Supabase", "Gemini AI", "Google OAuth"],
    githubUrl: "https://github.com/ALLaNRoY-TECH/subsense",
  },
  engineeringOverview: {
    projectType: "FinTech Platform",
    complexity: "[To Be Documented]",
    frontend: "Next.js",
    backend: "[To Be Documented]",
    database: "Supabase",
    ai: "Gemini AI",
    deployment: "[To Be Documented]",
    metrics: [
      { label: "Supported Auth", value: 1, suffix: " (Google)" },
    ]
  },
  overview: {
    what: "SubSense is an AI-powered subscription intelligence platform that automates the detection of recurring expenses by securely scanning Gmail receipts and parsing bank statements. It aggregates hidden subscriptions into a centralized dashboard and leverages Gemini AI to generate actionable financial insights, helping users regain control over their passive spending.",
    why: "The motivation for SubSense stemmed from a personal realization: I discovered a forgotten ₹129 monthly subscription that had been silently draining funds for nearly a year. Because the charge was small and the receipts were buried in my inbox, it went completely unnoticed. Recognizing that manual expense tracking fails to capture scattered digital receipts, I built SubSense to solve this exact problem for others facing subscription fatigue.",
    who: "Designed for students, working professionals, freelancers, and budget-conscious individuals who want to eliminate the cognitive load of manually tracking recurring expenses.",
    businessValue: "SubSense transforms financial awareness by eliminating manual expense tracking. It instantly highlights forgotten subscriptions, calculates potential yearly savings, and provides intelligent spending insights—ultimately preventing passive financial drain and empowering users to make informed budgeting decisions."
  },
  problemStatement: {
    problem: "Users frequently accumulate unnecessary recurring expenses due to forgotten subscriptions. Because subscription records are fragmented across unstructured email receipts and ambiguous bank statement descriptions, tracking them manually is prone to oversight. Consequently, small continuous charges go unnoticed, resulting in unnecessary long-term expenditure.",
    difficulty: "Building an automated extraction system is complex due to data inconsistency. Subscription data is scattered across disparate Gmail receipt templates and inconsistently formatted bank statements with abbreviated merchant names. Detecting recurring patterns requires moving beyond simple keyword matching and implementing a hybrid approach of structured data parsing and AI-driven contextual understanding.",
    limitations: "Traditional banking applications display raw transactions but lack intelligent pattern recognition for subscriptions. Existing budgeting tools require manual categorization or entry, introducing user friction. No comprehensive solution existed to automatically ingest unstructured data from both emails and PDFs, aggregate the recurring costs, and provide proactive insights into accumulating subscription costs.",
    painPoints: [
      "Small recurring charges continue without triggering user awareness.",
      "Users frequently forget to cancel subscriptions after abandoning a service.",
      "Financial data is scattered across email receipts and bank statements, lacking a centralized view.",
      "Traditional budgeting tools rely heavily on manual data entry or categorization."
    ],
    businessImpact: "The goal was not just to track expenses, but to convert scattered financial data into actionable insights. Instead of displaying a static ledger of transactions, SubSense proactively identifies where subscription money is flowing and highlights immediate opportunities to reduce recurring costs."
  },
  solution: {
    architecture: "[To Be Documented]",
    workflow: `1. Platform Onboarding: User lands on platform; purpose and value proposition established.
2. Authentication Flow: OAuth initiated; user authenticates and grants strict Gmail read permissions.
3. Session Initialization: User profile retrieved; secure session and access tokens generated and securely managed.
4. Gmail Ingestion: Authorized query executes, filtering specifically for known subscription merchant templates.
5. Supplemental PDF Parsing: Optional bank statement upload parsed for secondary, non-email transaction extraction.
6. Data Aggregation: Extracted data processed to identify recurring merchants, billing frequencies, and amounts.
7. AI-Driven Analysis: Structured dataset passed to Gemini AI for insight generation, cost-saving recommendations, and pattern recognition.
8. Persistence Layer: Processed subscription records, AI insights, and relevant metadata stored in Supabase PostgreSQL.
9. Dashboard Rendering: Frontend queries persisted data to visualize active subscriptions and potential yearly savings.
10. Continuous Synchronization: Subsequent scans repeat the ingestion pipeline, dynamically regenerating insights and updating the dashboard.`,
    howItFixes: "[To Be Documented]",
    scalability: "[To Be Documented]",
    security: "[To Be Documented]"
  },
  engineeringDecisions: [
    {
      technology: "Custom Google OAuth Implementation",
      why: "SubSense specifically requires Google authentication paired with precise `gmail.readonly` scopes. Using a generalized framework like NextAuth.js or Clerk would introduce unnecessary abstraction. Implementing OAuth natively provided granular control over the authorization flow, token exchange, and custom session initialization, keeping the system lightweight and tailored to the exact requirements.",
      alternativesConsidered: "NextAuth.js and Clerk.",
      tradeoffs: "The primary tradeoff was increased manual responsibility. Features such as secure HTTP-only cookie configuration, raw token lifecycle management, and strict session validation had to be implemented from scratch. While frameworks abstract this away, natively handling these elements required additional development time and rigorous adherence to security best practices.",
      benefits: "Yielded absolute control over the Google Workspace integration. Direct manipulation of the `googleapis` library allowed for exact management of offline access prompts, refresh token persistence, and API client instantiation without having to adapt to a third-party framework's internal session lifecycle.",
      lessonsLearned: "For deeply integrated single-provider applications (like a dedicated Gmail tool), native OAuth is highly effective and transparent. However, if the architecture were to expand to multi-tenant or multi-provider authentication, the maintenance overhead would immediately outweigh the benefits, making a mature solution like NextAuth.js the preferred choice."
    },
    {
      technology: "Supabase",
      why: "[To Be Documented - Why Supabase was chosen over Firebase/Postgres]",
      alternativesConsidered: "[To Be Documented]",
      tradeoffs: "[To Be Documented]",
      benefits: "[To Be Documented]",
      lessonsLearned: "[To Be Documented]"
    },
    {
      technology: "Gemini AI",
      why: "[To Be Documented - Why Gemini over OpenAI/Claude]",
      alternativesConsidered: "[To Be Documented]",
      tradeoffs: "[To Be Documented]",
      benefits: "[To Be Documented]",
      lessonsLearned: "[To Be Documented]"
    }
  ],
  features: [
    {
      icon: "Mail",
      title: "Gmail Integration",
      description: "Securely scans Gmail for subscription receipts.",
      businessValue: "[To Be Documented]"
    },
    {
      icon: "FileText",
      title: "PDF Parsing",
      description: "Extracts subscription data from uploaded bank statements.",
      businessValue: "[To Be Documented]"
    },
    {
      icon: "TrendingDown",
      title: "Savings Analysis",
      description: "Visualizes spending habits and potential savings.",
      businessValue: "[To Be Documented]"
    }
  ],
  architecture: {
    frontend: {
      name: "Next.js",
      description: "[To Be Documented]",
      technologies: "Next.js, TypeScript"
    },
    backend: {
      name: "[To Be Documented]",
      description: "[To Be Documented]",
      technologies: "[To Be Documented]"
    },
    database: {
      name: "Supabase",
      description: "[To Be Documented]",
      technologies: "Supabase"
    },
    ai: {
      name: "Gemini AI",
      description: "Analyzes text from emails and PDFs to identify recurring charges.",
      technologies: "Gemini API"
    },
    external: {
      name: "Google OAuth API",
      description: "Handles user authentication and Gmail inbox access.",
      technologies: "OAuth 2.0"
    },
    deployment: {
      name: "[To Be Documented]",
      description: "[To Be Documented]",
      technologies: "[To Be Documented]"
    },
    communicationFlow: "[To Be Documented]"
  },
  apiDocumentation: [
    {
      endpoint: "GET /api/auth/google",
      method: "GET",
      purpose: "Initiates Google OAuth 2.0 flow.",
      authRequired: false,
      requestBody: "None",
      response: "Redirects to Google Consent screen",
      errorHandling: "Fallback to Sandbox Demo if GOOGLE_CLIENT_ID is missing"
    },
    {
      endpoint: "GET /api/auth/callback",
      method: "GET",
      purpose: "Exchanges OAuth code for access and refresh tokens, fetches user profile, stores in Supabase, and sets session cookie.",
      authRequired: false,
      requestBody: "?code=authorization_code",
      response: "Redirects to /dashboard with secure subsense_session cookie",
      errorHandling: "Redirects to /?error=token_exchange_failed on invalid code"
    },
    {
      endpoint: "POST /api/scan/gmail",
      method: "POST",
      purpose: "Connects to Gmail API using stored OAuth tokens, filters for receipt keywords over the last 12 months, extracts subscriptions via regex, and upserts them to the database.",
      authRequired: true,
      requestBody: "None",
      response: "JSON object containing scanned count, found count, and an array of extracted subscription objects",
      errorHandling: "Catches API failures, updates scan status to 'failed', and returns 500"
    },
    {
      endpoint: "POST /api/scan/pdf",
      method: "POST",
      purpose: "Extracts text from uploaded PDF bank statements using pdf-parse, matches transactions against vendor rules, and flags items as duplicate or missed.",
      authRequired: true,
      requestBody: "multipart/form-data containing 'file'",
      response: "JSON object with detected transactions array and estimated confidence scores",
      errorHandling: "Returns 400 if no file is uploaded. Returns 500 on parsing failure."
    },
    {
      endpoint: "GET /api/insights",
      method: "GET",
      purpose: "Queries user's active subscriptions and sends a structured JSON payload to Gemini AI to generate spending insights, savings opportunities, and a witty roast.",
      authRequired: true,
      requestBody: "None",
      response: "JSON object with summary, savings, healthScore, roast, and recommendations array",
      errorHandling: "Strips invalid markdown from Gemini response. Falls back to gemini-2.0-flash if gemini-2.5-flash fails. Falls back to local rule-based generation if API key is missing."
    }
  ],
  databaseDesign: {
    tables: [
      "users: id, email, name, google_access_token, google_refresh_token, token_expiry",
      "subscriptions: id, user_id, name, price, currency, category, status, last_used, renewal_date, billing_frequency, logo_url, gmail_message_id",
      "scans: id, user_id, status, scanned_count, found_count",
      "insights: id, user_id, type, content"
    ],
    relationships: "The 'users' table has a 1-to-many relationship with 'subscriptions', 'scans', and 'insights'. All foreign keys reference users(id) with ON DELETE CASCADE.",
    indexes: "Indexes are applied to user_id on subscriptions (idx_subscriptions_user), scans (idx_scans_user), and insights (idx_insights_user) for optimized client querying.",
    constraints: "gmail_message_id on the subscriptions table is UNIQUE to prevent the system from double-counting the same email receipt during subsequent scans.",
    optimization: "Upsert operations (onConflict) are utilized for subscription ingestion to automatically merge or ignore duplicate records natively within Postgres.",
    security: "Row Level Security (RLS) is strictly enabled across all tables. Policies explicitly enforce that operations are only permitted when (user_id = auth.uid()::text) or when using the 'demo-user' account."
  },
  security: {
    authentication: "Custom Google OAuth 2.0 flow using google-auth-library",
    authorization: "Supabase Row Level Security (RLS) policies enforce data isolation per user.",
    validation: "PDF uploads are handled strictly in-memory via Buffer and pdf-parse on the backend, preventing malicious execution.",
    sanitization: "Gemini AI responses undergo strict regex-based markdown stripping before being rendered on the client to prevent injection of malicious links or code blocks.",
    owasp: ["Broken Access Control (Mitigated via RLS and session cookie checks)", "Injection (Mitigated via Supabase parameterized queries and AI output sanitization)", "Security Misconfiguration (Mitigated by hiding error stack traces in production API responses)"],
    errorHandling: "APIs implement graceful degradation. If Gemini fails, it falls back to a secondary model. If OAuth is missing, it falls back to a secure local sandbox demo.",
    rateLimiting: "Dependent on Vercel Edge/Serverless function timeouts and Google/Gemini SDK inherent retry logic.",
    encryption: "Cookies are encrypted/signed implicitly by Next.js and marked httpOnly. Google access and refresh tokens are stored in plain text in Supabase, protected by database-level security."
  },
  performance: {
    codeSplitting: "[To Be Documented]",
    caching: "[To Be Documented]",
    databaseOptimization: "[To Be Documented]",
    imageOptimization: "[To Be Documented]",
    renderOptimization: "[To Be Documented]",
    lazyLoading: "[To Be Documented]",
    memoryOptimization: "[To Be Documented]"
  },
  aiIntegration: {
    model: "Gemini AI",
    promptEngineering: "[To Be Documented]",
    responseParsing: "[To Be Documented]",
    structuredOutput: "[To Be Documented]",
    fallbackLogic: "[To Be Documented]",
    rateLimits: "[To Be Documented]",
    errorHandling: "[To Be Documented]",
    tokenOptimization: "[To Be Documented]"
  },
  challenges: [
    {
      problem: "Integrating Gemini AI reliably into a serverless Next.js application.",
      rootCause: "The integration faced two primary issues: the `gemini-1.5-flash` model returned a 404 (Model Not Found) due to API compatibility, and the Vercel Hobby tier enforced a strict 10-second serverless execution limit, causing unpredictable AI generation times to trigger hard timeouts and crash the endpoint.",
      solution: "Migrated to the supported `gemini-2.5-flash` model with a built-in fallback to `gemini-2.0-flash`. To mitigate serverless crashes, the AI invocation was wrapped in a `Promise.race()` with a strict 8-second timeout. Additionally, the prompt was heavily constrained to force structured JSON output instead of open-ended text, and a graceful local rules-engine fallback was implemented for complete API failures.",
      outcome: "The insights endpoint stabilized, successfully returning parsed financial data within Vercel's execution limits with a 100% graceful degradation rate during API timeouts.",
      lessons: "When orchestrating third-party LLMs in a serverless environment, developers must proactively engineer for maximum latency limits and unpredictable third-party API availability, rather than relying on standard asynchronous promises."
    }
  ],
  developmentTimeline: [
    { phase: "Implementation", description: "[To Be Documented]" }
  ],
  lessonsLearned: [
    "AI should not be responsible for understanding raw application data. Instead, deterministic parsing should first convert unstructured information into structured, validated data before utilizing an LLM for reasoning and insight generation. This approach makes AI outputs significantly more reliable, predictable, and easier to maintain.",
    "Long-running backend operations such as Gmail API extraction, PDF parsing, and AI analysis expose the limitations of serverless environments. If rebuilding the architecture today, transitioning these synchronous API operations into an asynchronous, job-based processing pipeline would drastically improve scalability and eliminate execution timeouts."
  ],
  futureRoadmap: [
    "[To Be Documented]"
  ],
  repository: {
    name: "subsense",
    description: "AI-powered subscription intelligence platform that analyzes Gmail receipts and bank statements to detect recurring subscriptions, generate spending insights, and help users reduce unnecessary recurring expenses.",
    primaryLanguage: "TypeScript",
    url: "https://github.com/ALLaNRoY-TECH/subsense",
    techStack: ["Next.js", "Supabase", "TypeScript"],
    license: "[To Be Documented]",
    lastUpdated: "[To Be Documented]"
  }
};
