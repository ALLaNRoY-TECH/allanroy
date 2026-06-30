import { CaseStudy } from "@/types/case-study";

export const ventpod: CaseStudy = {
  id: "ventpod",
  hero: {
    title: "VentPod",
    subtitle: "Anonymous Real-time Chat Platform",
    status: "Production",
    completed: "[To Be Documented]",
    role: "Full-Stack Developer",
    duration: "[To Be Documented]",
    techStack: ["Next.js", "WebSockets", "Encryption"],
    githubUrl: "https://github.com/ALLaNRoY-TECH/vent-pod",
  },
  engineeringOverview: {
    projectType: "Real-time Application",
    complexity: "[To Be Documented]",
    frontend: "Next.js",
    backend: "[To Be Documented]",
    database: "[To Be Documented]",
    ai: "[To Be Documented]",
    deployment: "[To Be Documented]",
    metrics: [
      { label: "Active Users tracking", value: 1, suffix: "" },
    ]
  },
  overview: {
    what: "An anonymous, real-time chat application.",
    why: "[To Be Documented]",
    who: "[To Be Documented]",
    businessValue: "[To Be Documented]"
  },
  problemStatement: {
    problem: "[To Be Documented]",
    difficulty: "[To Be Documented - Specific challenges in real-time anonymous comms]",
    limitations: "[To Be Documented]",
    painPoints: [
      "[To Be Documented]",
    ],
    businessImpact: "[To Be Documented]"
  },
  solution: {
    architecture: "[To Be Documented]",
    workflow: "[To Be Documented]",
    howItFixes: "[To Be Documented]",
    scalability: "[To Be Documented]",
    security: "[To Be Documented]"
  },
  engineeringDecisions: [
    {
      technology: "WebSockets",
      why: "[To Be Documented - Why WebSockets vs Long Polling]",
      alternativesConsidered: "[To Be Documented]",
      tradeoffs: "[To Be Documented]",
      benefits: "[To Be Documented]",
      lessonsLearned: "[To Be Documented]"
    },
    {
      technology: "Encryption",
      why: "[To Be Documented - Specific encryption strategy used]",
      alternativesConsidered: "[To Be Documented]",
      tradeoffs: "[To Be Documented]",
      benefits: "[To Be Documented]",
      lessonsLearned: "[To Be Documented]"
    }
  ],
  features: [
    {
      icon: "MessageSquare",
      title: "Anonymous Chat",
      description: "Users can chat completely anonymously.",
      businessValue: "[To Be Documented]"
    },
    {
      icon: "Keyboard",
      title: "Typing Indicator",
      description: "Real-time typing status of the other user.",
      businessValue: "[To Be Documented]"
    },
    {
      icon: "Lock",
      title: "Encryption",
      description: "Secure messaging implementation.",
      businessValue: "[To Be Documented]"
    },
    {
      icon: "Users",
      title: "Active Users Tracking",
      description: "Tracks the number of currently active participants.",
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
      name: "[To Be Documented]",
      description: "Handles WebSocket connections.",
      technologies: "WebSockets"
    },
    database: {
      name: "[To Be Documented]",
      description: "[To Be Documented]",
      technologies: "[To Be Documented]"
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
    name: "vent-pod",
    description: "Anonymous Real-time Chat Platform.",
    primaryLanguage: "TypeScript",
    url: "https://github.com/ALLaNRoY-TECH/vent-pod",
    techStack: ["Next.js", "WebSockets"],
    license: "[To Be Documented]",
    lastUpdated: "[To Be Documented]"
  }
};
