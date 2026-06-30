import { CaseStudy } from "@/types/case-study";

export const securescan: CaseStudy = {
  id: "securescan",
  hero: {
    title: "SecureScan",
    subtitle: "AI Website Security Scanner",
    status: "Production",
    completed: "Dec 2024",
    role: "Full-Stack Security Developer",
    duration: "[To Be Documented]",
    techStack: ["Next.js", "Python", "AI Insights", "Security Headers"],
    githubUrl: "https://github.com/ALLaNRoY-TECH/SecureScan",
  },
  engineeringOverview: {
    projectType: "Security Tool",
    complexity: "[To Be Documented]",
    frontend: "Next.js",
    backend: "Python",
    database: "[To Be Documented]",
    ai: "Integrated AI Insights",
    deployment: "[To Be Documented]",
    metrics: [
      { label: "REST APIs", value: 0, prefix: "[TBD] " },
      { label: "AI Models", value: 0, prefix: "[TBD] " },
    ]
  },
  overview: {
    what: "AI-powered website vulnerability scanner with intelligent security analysis.",
    why: "I built SecureScan to make basic web security assessments more accessible for developers, students, freelancers, and small teams who don't have dedicated security expertise.",
    who: "Full-stack developers, student developers, startup founders, freelance developers, small businesses, and security learners.",
    businessValue: "Bridges the gap between raw technical security reports (like Nessus or OWASP ZAP) and developer understanding by combining automated security scanning with AI-powered explanations that clarify risks and remediation steps."
  },
  problemStatement: {
    problem: "Many developers deploy projects without checking for common security issues such as missing HTTP security headers, weak SSL/TLS configurations, or exposed network ports.",
    difficulty: "Designing a scanning pipeline that remained modular while supporting multiple independent scanners returning disparate data structures.",
    limitations: "Existing security tools are often designed for experienced penetration testers and can be overwhelmingly difficult for beginners to interpret or act upon.",
    painPoints: [
      "Developers lack easy-to-use tools for basic security validation.",
      "Traditional security reports generate raw technical data without context.",
      "Security remediation requires specialized knowledge."
    ],
    businessImpact: "Automates security checks and presents results in a clean dashboard with actionable remediation steps, reducing security risks for non-expert developers."
  },
  solution: {
    architecture: "[To Be Documented - Actual architecture implemented]",
    workflow: "[To Be Documented - Actual user workflow]",
    howItFixes: "[To Be Documented]",
    scalability: "[To Be Documented]",
    security: "[To Be Documented]"
  },
  engineeringDecisions: [
    {
      technology: "Python (FastAPI Backend)",
      why: "SecureScan performs backend-heavy security analysis. Python has a significantly stronger ecosystem for networking, cybersecurity, SSL analysis, and security automation than Node.js.",
      alternativesConsidered: "Next.js API Routes / Node.js",
      tradeoffs: "Separating the frontend and backend introduced additional operational complexity (managing independent development servers, API communication, environments, and deployments).",
      benefits: "Provided cleaner separation of concerns, independent scalability, reusable backend APIs, and the ability to extend the scanning engine independently of the frontend.",
      lessonsLearned: "A decoupled architecture ensures long-term maintainability when building domain-heavy services like cybersecurity tools."
    }
  ],
  features: [
    {
      icon: "ShieldAlert",
      title: "OWASP Recommendations",
      description: "Provides recommendations based on OWASP security standards.",
      businessValue: "[To Be Documented]"
    },
    {
      icon: "Cpu",
      title: "Technology Detection",
      description: "Detects the technology stack of the target website.",
      businessValue: "[To Be Documented]"
    },
    {
      icon: "Lock",
      title: "SSL Analysis",
      description: "Analyzes SSL certificate configurations and vulnerabilities.",
      businessValue: "[To Be Documented]"
    },
    {
      icon: "Brain",
      title: "AI Insights",
      description: "Provides intelligent security analysis and risk scoring.",
      businessValue: "[To Be Documented]"
    }
  ],
  architecture: {
    frontend: {
      name: "Next.js",
      description: "[To Be Documented]",
      technologies: "Next.js"
    },
    backend: {
      name: "Python",
      description: "[To Be Documented]",
      technologies: "Python"
    },
    database: {
      name: "[To Be Documented]",
      description: "[To Be Documented]",
      technologies: "[To Be Documented]"
    },
    ai: {
      name: "AI Engine",
      description: "[To Be Documented]",
      technologies: "AI Insights"
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
    authentication: "[To Be Documented]",
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
    model: "AI Insights Engine",
    promptEngineering: "Provided structured security scan results to the AI rather than raw scans.",
    responseParsing: "AI parses the structured data to prioritize issues and generate plain-English remediation.",
    structuredOutput: "Deterministic scan aggregation before AI inference.",
    fallbackLogic: "[To Be Documented]",
    rateLimits: "[To Be Documented]",
    errorHandling: "[To Be Documented]",
    tokenOptimization: "Scanning engine performs deterministic vulnerability discovery; AI is restricted purely to interpretation, saving tokens and preventing hallucinations."
  },
  challenges: [
    {
      problem: "Designing a modular scanning pipeline supporting multiple independent scanners.",
      rootCause: "Different scanners returned different data structures and response formats. As more scanners were added, integrating their outputs into a single cohesive report became increasingly brittle and tightly coupled.",
      solution: "Redesigned the architecture so that every scanner followed a consistent interface and returned standardized, normalized scan objects that could be predictably aggregated.",
      outcome: "Enabled a unified reporting structure and simplified the AI integration since the AI always received predictable structured input regardless of which scanners executed.",
      lessons: "A modular architecture with standardized interfaces makes adding new features significantly easier than continuously patching tightly coupled components."
    }
  ],
  developmentTimeline: [
    { phase: "Implementation", description: "Built decoupled Next.js and Python FastAPI architecture." }
  ],
  lessonsLearned: [
    "Extensibility should be considered from the beginning. Designing around strict contracts and predictable outputs simplifies testing, reporting, and future AI integrations."
  ],
  futureRoadmap: [
    "[To Be Documented]"
  ],
  repository: {
    name: "SecureScan",
    description: "AI-powered website vulnerability scanner.",
    primaryLanguage: "TypeScript/Python",
    url: "https://github.com/ALLaNRoY-TECH/SecureScan",
    techStack: ["Next.js", "Python"],
    license: "[To Be Documented]",
    lastUpdated: "[To Be Documented]"
  }
};
