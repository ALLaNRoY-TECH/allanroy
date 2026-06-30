import { CaseStudy } from "@/types/case-study";

export const securescan: CaseStudy = {
  id: "securescan",
  hero: {
    title: "SecureScan",
    subtitle: "AI Website Security Scanner",
    status: "Production",
    completed: "Dec 2024",
    role: "Full-Stack Security Developer",
    duration: "10 Weeks",
    techStack: ["Next.js", "Python", "FastAPI", "Gemini AI", "Tailwind CSS"],
    githubUrl: "https://github.com/ALLaNRoY-TECH/SecureScan",
  },
  engineeringOverview: {
    projectType: "B2B SaaS Security Tool",
    complexity: "High",
    frontend: "Next.js 14, Framer Motion",
    backend: "Python, FastAPI",
    database: "PostgreSQL (Supabase)",
    ai: "Google Gemini 1.5 Pro",
    deployment: "Vercel & Render",
    metrics: [
      { label: "Vulnerability Checks", value: 45, suffix: "+" },
      { label: "REST APIs", value: 12 },
      { label: "Analysis Speed", value: 98, suffix: "%" },
      { label: "AI Models", value: 2 },
    ]
  },
  overview: {
    what: "An AI-powered website vulnerability scanner featuring intelligent security analysis, SSL evaluation, and OWASP recommendations.",
    why: "Existing vulnerability scanners were often expensive, difficult to read for non-experts, and lacked actionable, context-aware remediation advice.",
    who: "Developers, small business owners, and IT admins who need a quick, reliable, and understandable security audit of their web assets.",
    businessValue: "Reduces the time to identify and understand web vulnerabilities by 80%, providing instant, AI-generated remediation steps."
  },
  problemStatement: {
    problem: "Traditional security scanners output massive, jargon-heavy XML or JSON reports that require security expertise to interpret.",
    difficulty: "Aggregating data from multiple scanning tools (Nmap, SSL Labs, Wappalyzer) and translating raw CVEs into actionable advice is computationally heavy and complex to present.",
    limitations: "Most open-source tools require terminal access and manual chaining of commands. Commercial tools are prohibitively expensive.",
    painPoints: [
      "Information overload from raw vulnerability reports",
      "Lack of clear, prioritized remediation steps",
      "Fragmented tools for SSL, headers, and tech stack detection"
    ],
    businessImpact: "Small teams ignore security audits because they don't have the time or expertise to decipher the results."
  },
  solution: {
    architecture: "A Next.js frontend communicating with a Python/FastAPI backend that orchestrates various scanning modules and interfaces with Gemini AI for natural language analysis.",
    workflow: "User inputs URL -> Backend validates & queues -> Scanning modules execute in parallel -> Raw data sent to Gemini -> AI formats report -> Frontend visualizes results.",
    howItFixes: "Unifies multiple security checks into a single, beautiful dashboard and uses AI to translate complex vulnerabilities into plain English.",
    scalability: "Stateless FastAPI backend allows horizontal scaling of scanning workers. Scanning tasks can be offloaded to message queues if load increases.",
    security: "Strict input validation on URLs to prevent SSRF. Rate limiting to prevent abuse of the scanning engine."
  },
  engineeringDecisions: [
    {
      technology: "Next.js",
      why: "Provides server-side rendering for fast initial loads and a robust API route system if we need middle-tier proxying.",
      alternativesConsidered: "React SPA (Vite) + Express.",
      tradeoffs: "Slightly more complex deployment than a pure SPA, but worth it for SEO and performance.",
      benefits: "Built-in routing, API routes, and optimized image/script loading out of the box.",
      lessonsLearned: "Next.js API routes are great for simple endpoints, but heavy processing should be offloaded to a dedicated backend."
    },
    {
      technology: "Python / FastAPI",
      why: "Python has the best ecosystem for security tooling and AI integration. FastAPI provides high performance and automatic OpenAPI docs.",
      alternativesConsidered: "Node.js (Express), Go.",
      tradeoffs: "Requires managing two different codebases (Node/Python) instead of a monolithic Node backend.",
      benefits: "Fast development speed, native async support, and instant access to Python's massive security libraries.",
      lessonsLearned: "FastAPI's dependency injection system drastically simplifies testing and request validation."
    },
    {
      technology: "Gemini AI",
      why: "Excellent reasoning capabilities and high token limits, making it perfect for parsing large amounts of raw security data.",
      alternativesConsidered: "OpenAI GPT-4, Claude 3.",
      tradeoffs: "Introduces latency and dependency on an external API for the final report generation.",
      benefits: "Extremely cost-effective for high-volume text processing with massive context windows.",
      lessonsLearned: "Strict JSON schema enforcement in the prompt is critical to prevent the frontend from crashing on malformed AI output."
    }
  ],
  features: [
    {
      icon: "ShieldAlert",
      title: "OWASP Top 10 Analysis",
      description: "Automatically maps discovered vulnerabilities to the OWASP Top 10 framework.",
      businessValue: "Ensures compliance with industry-standard security baselines."
    },
    {
      icon: "Cpu",
      title: "Technology Profiling",
      description: "Detects frameworks, libraries, and server software running on the target.",
      businessValue: "Identifies outdated software versions instantly."
    },
    {
      icon: "Lock",
      title: "SSL/TLS Evaluation",
      description: "Deep analysis of certificate chains, cipher suites, and protocol support.",
      businessValue: "Prevents man-in-the-middle attacks and ensures data transit security."
    },
    {
      icon: "Brain",
      title: "AI Remediation",
      description: "Gemini AI generates custom, step-by-step fix instructions.",
      businessValue: "Saves hours of research for developers."
    }
  ],
  architecture: {
    frontend: {
      name: "Next.js Application",
      description: "Handles user input, state management, and real-time scanning updates.",
      technologies: "React, Tailwind CSS, Framer Motion, Zustand"
    },
    backend: {
      name: "FastAPI Microservice",
      description: "Orchestrates concurrent scanning scripts and limits rate abuse.",
      technologies: "Python, FastAPI, Uvicorn, Celery (Queue)"
    },
    database: {
      name: "PostgreSQL Database",
      description: "Stores scan history and user profiles.",
      technologies: "Supabase, Prisma ORM"
    },
    ai: {
      name: "Gemini Analysis Engine",
      description: "Parses raw scan results into human-readable insights.",
      technologies: "Google Gemini 1.5 Pro API"
    },
    deployment: {
      name: "Cloud Infrastructure",
      description: "Frontend on Vercel, Backend on Render.",
      technologies: "Vercel Edge Network, Render Web Services"
    },
    communicationFlow: "Client -> Next.js Edge API -> FastAPI Backend <-> Scanning Tools & Gemini API."
  },
  apiDocumentation: [
    {
      name: "Init Scan",
      purpose: "Starts a new security scan.",
      endpoints: "POST /api/scan/start",
      authentication: "API Key (Rate Limited)",
      exampleUsage: "curl -X POST /api/scan/start -d '{\"url\": \"https://example.com\"}'",
      reason: "Triggers the asynchronous scanning process."
    },
    {
      name: "Poll Status",
      purpose: "Checks scan progress.",
      endpoints: "GET /api/scan/{id}/status",
      authentication: "None",
      exampleUsage: "curl /api/scan/123/status",
      reason: "Allows the frontend to show real-time progress bars."
    }
  ],
  databaseDesign: {
    tables: ["Scans", "Vulnerabilities", "Users"],
    relationships: "One User to Many Scans. One Scan to Many Vulnerabilities.",
    indexes: "Indexed by URL and Scan Date for fast historical lookups.",
    constraints: "URL must be well-formed. Timestamps are immutable.",
    optimization: "Raw JSON results stored in a JSONB column to avoid rigid schemas for unpredictable scanner outputs.",
    security: "Row-level security ensures users can only see their own scans."
  },
  security: {
    authentication: "JWT based auth for registered users.",
    authorization: "Role-based access (Free vs Premium scanning tiers).",
    validation: "Strict Regex URL validation to prevent internal network scanning (SSRF protection).",
    sanitization: "All scanner outputs sanitized before rendering to prevent XSS.",
    owasp: ["Injection", "Broken Access Control", "Security Misconfiguration"],
    errorHandling: "Generic error messages to users, detailed stack traces logged to Sentry.",
    rateLimiting: "1 scan per minute per IP for anonymous users.",
    encryption: "Data at rest encrypted by the database provider."
  },
  performance: {
    codeSplitting: "Next.js automatically splits pages. Heavy reporting components loaded dynamically.",
    caching: "Previous scan results for the same URL cached for 24 hours.",
    databaseOptimization: "JSONB columns used efficiently to store unstructured data.",
    imageOptimization: "N/A (Tool is highly text/UI driven).",
    renderOptimization: "React.memo used for complex vulnerability tables.",
    lazyLoading: "AI analysis section lazy-loaded when the scan completes.",
    memoryOptimization: "Python backend streams large scanner outputs instead of loading into memory."
  },
  aiIntegration: {
    model: "gemini-1.5-pro",
    promptEngineering: "Few-shot prompting with examples of how to map Nmap output to OWASP categories.",
    responseParsing: "Structured JSON output enforced via prompt constraints.",
    structuredOutput: "AI returns { score: number, vulnerabilities: array, summary: string }.",
    fallbackLogic: "If AI fails or times out, raw scanner data is displayed with a 'Processing Error' warning.",
    rateLimits: "Implemented exponential backoff when calling Gemini API.",
    errorHandling: "Graceful degradation if the AI service is unreachable.",
    tokenOptimization: "Filtered out noise and duplicate findings before sending to the LLM to save tokens."
  },
  challenges: [
    {
      problem: "SSRF (Server-Side Request Forgery) vulnerabilities.",
      rootCause: "Allowing users to input any URL means they could scan internal AWS metadata endpoints (169.254.169.254).",
      solution: "Implemented strict IP resolution checks. If the resolved IP is private/local, the scan is blocked.",
      outcome: "Secured the backend infrastructure from malicious probes.",
      lessons: "Always validate and resolve user-provided URLs before fetching them on the backend."
    },
    {
      problem: "Long-running scans timing out.",
      rootCause: "Vercel's serverless functions time out after 10 seconds on the hobby tier.",
      solution: "Moved the heavy lifting to a dedicated Python backend and used a polling mechanism.",
      outcome: "Scans can now take up to 5 minutes without breaking the UX.",
      lessons: "Serverless is not suitable for long-running, blocking operations."
    }
  ],
  developmentTimeline: [
    { phase: "Planning", description: "Defined the scope of scanners to include (SSL, Headers, Tech Stack)." },
    { phase: "Backend Dev", description: "Built the Python wrapper for security tools." },
    { phase: "AI Integration", description: "Engineered prompts to get consistent JSON from Gemini." },
    { phase: "Frontend Dev", description: "Built the Next.js dashboard with Framer Motion animations." },
    { phase: "Testing", description: "Tested against known vulnerable applications (e.g., Juice Shop)." }
  ],
  lessonsLearned: [
    "Integrating multiple asynchronous CLI tools into a unified web API is challenging but rewarding.",
    "AI is incredibly powerful for normalizing unstructured data from legacy tools.",
    "UX is just as important as the underlying technology; presenting security data cleanly makes it 10x more useful."
  ],
  futureRoadmap: [
    "Automated scheduled scans",
    "Webhook integrations for CI/CD pipelines",
    "Export to PDF/CSV functionality",
    "Team collaboration features"
  ],
  repository: {
    name: "SecureScan",
    description: "An AI-powered website vulnerability scanner.",
    primaryLanguage: "TypeScript",
    url: "https://github.com/ALLaNRoY-TECH/SecureScan",
    techStack: ["Next.js", "Python", "FastAPI"],
    license: "MIT",
    lastUpdated: "Dec 2024"
  }
};
