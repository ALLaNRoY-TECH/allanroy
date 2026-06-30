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
    what: "Intelligently scan Gmail and PDF statements using Gemini AI to detect subscriptions.",
    why: "[To Be Documented - Original motivation]",
    who: "[To Be Documented - Target users]",
    businessValue: "Analyze savings and visualize spending habits via a secure dashboard."
  },
  problemStatement: {
    problem: "[To Be Documented - Specific tracking problem]",
    difficulty: "[To Be Documented - Why statement extraction is difficult]",
    limitations: "[To Be Documented]",
    painPoints: [
      "[To Be Documented]",
    ],
    businessImpact: "[To Be Documented]"
  },
  solution: {
    architecture: "[To Be Documented]",
    workflow: "Connect via Google OAuth -> Scan Gmail/PDF -> Gemini AI detection -> Dashboard Visualization",
    howItFixes: "[To Be Documented]",
    scalability: "[To Be Documented]",
    security: "[To Be Documented]"
  },
  engineeringDecisions: [
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
  apiDocumentation: [], // To Be Documented
  databaseDesign: {
    tables: ["[To Be Documented]"],
    relationships: "[To Be Documented]",
    indexes: "[To Be Documented]",
    constraints: "[To Be Documented]",
    optimization: "[To Be Documented]",
    security: "[To Be Documented]"
  },
  security: {
    authentication: "Google OAuth",
    authorization: "[To Be Documented]",
    validation: "[To Be Documented]",
    sanitization: "[To Be Documented]",
    owasp: ["[To Be Documented]"],
    errorHandling: "[To Be Documented]",
    rateLimiting: "[To Be Documented]",
    encryption: "[To Be Documented]"
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
      problem: "[To Be Documented - Real technical blocker]",
      rootCause: "[To Be Documented]",
      solution: "[To Be Documented]",
      outcome: "[To Be Documented]",
      lessons: "[To Be Documented]"
    }
  ],
  developmentTimeline: [
    { phase: "Implementation", description: "[To Be Documented]" }
  ],
  lessonsLearned: [
    "[To Be Documented - Real technical lesson]"
  ],
  futureRoadmap: [
    "[To Be Documented]"
  ],
  repository: {
    name: "subsense",
    description: "AI Subscription Intelligence Platform.",
    primaryLanguage: "TypeScript",
    url: "https://github.com/ALLaNRoY-TECH/subsense",
    techStack: ["Next.js", "Supabase", "TypeScript"],
    license: "[To Be Documented]",
    lastUpdated: "[To Be Documented]"
  }
};
