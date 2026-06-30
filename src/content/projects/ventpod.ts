import { CaseStudy } from "@/types/case-study";

export const ventpod: CaseStudy = {
  id: "ventpod",
  hero: {
    title: "VentPod",
    subtitle: "Anonymous Mental Health Platform",
    status: "Production",
    completed: "Oct 2023",
    role: "Backend Architect",
    duration: "6 Weeks",
    techStack: ["Flask", "MySQL", "WebSockets", "Socket.IO", "React"],
    githubUrl: "https://github.com/ALLaNRoY-TECH/vent-pod",
  },
  engineeringOverview: {
    projectType: "Real-time Messaging Web App",
    complexity: "High",
    frontend: "React, CSS Modules",
    backend: "Python (Flask-SocketIO)",
    database: "Redis & MySQL",
    ai: "None",
    deployment: "Docker, AWS EC2",
    metrics: [
      { label: "Active Sessions", value: 100, suffix: "+" },
      { label: "Latency", value: 50, suffix: "ms" },
      { label: "Uptime", value: 99.9, suffix: "%" },
      { label: "Data Retained", value: 0, suffix: " bytes" },
    ]
  },
  overview: {
    what: "A real-time, completely anonymous chat platform designed for people to vent and receive peer support without fear of judgment or data tracking.",
    why: "Many mental health apps require sign-ups, track user data, and monetize sensitive information. There was a need for a truly ephemeral, safe space.",
    who: "Students, professionals, and anyone experiencing temporary stress who needs an immediate, frictionless outlet.",
    businessValue: "Provides a zero-barrier entry to mental health support, prioritizing user privacy above all else."
  },
  problemStatement: {
    problem: "People hesitate to share mental health struggles online because of a lack of true anonymity.",
    difficulty: "Building a real-time system that is both secure from bad actors (trolls, spam) while maintaining absolute anonymity (no accounts) is contradictory.",
    limitations: "Existing forums require accounts. Anonymous apps like YikYak suffered from localized toxicity.",
    painPoints: [
      "Fear of data breaches leaking sensitive conversations",
      "Friction of creating accounts when in distress",
      "Lack of real-time peer connection"
    ],
    businessImpact: "Users abandon platforms if they feel their identity is even slightly compromised."
  },
  solution: {
    architecture: "A React frontend connecting via WebSockets to a Python Flask backend. Messages are broadcasted in real-time and explicitly NOT saved to any persistent database.",
    workflow: "User opens app -> Assigned random avatar/alias -> Connects to WebSocket room -> Chats -> Disconnects -> Room and memory cleared.",
    howItFixes: "By removing the database for chat history, the system is fundamentally incapable of leaking past conversations.",
    scalability: "Socket.IO instances scaled horizontally using Redis as a Pub/Sub adapter to sync messages across multiple server nodes.",
    security: "Ephemeral architecture. What is not stored cannot be stolen."
  },
  engineeringDecisions: [
    {
      technology: "Flask & Socket.IO",
      why: "Flask is lightweight, perfect for an ephemeral app. Socket.IO provides robust WebSocket fallbacks (long polling) for restrictive networks.",
      alternativesConsidered: "Node.js with pure WebSockets or Socket.io.",
      tradeoffs: "Flask is synchronous by default, requiring eventlet/gevent for asynchronous WebSocket handling, which complicates deployment.",
      benefits: "Enabled rapid prototyping of the backend logic in Python.",
      lessonsLearned: "Python is notoriously tricky for scaling WebSockets compared to Node.js; in hindsight, Node.js would have been a better choice for high concurrency."
    },
    {
      technology: "MySQL",
      why: "Used strictly for application metadata (banned IPs, active room counts, moderation logs) but NEVER for message content.",
      alternativesConsidered: "MongoDB, Postgres.",
      tradeoffs: "Relational DB might be overkill for simple metadata, but provides strict schemas for moderation rules.",
      benefits: "Easy to enforce unique constraints on hashed IP addresses.",
      lessonsLearned: "Keep the persistent storage completely isolated from the ephemeral real-time messaging pipeline."
    },
    {
      technology: "Ephemeral State (No Message DB)",
      why: "To guarantee absolute privacy, the best database for messages is no database.",
      alternativesConsidered: "Encrypted SQLite, In-memory Redis logs.",
      tradeoffs: "Users cannot retrieve chat history if they accidentally refresh the page.",
      benefits: "Immune to data breaches because there is no data to breach.",
      lessonsLearned: "Users appreciate the tradeoff when the value proposition (absolute privacy) is clearly communicated."
    }
  ],
  features: [
    {
      icon: "Ghost",
      title: "Zero-Knowledge Architecture",
      description: "Messages exist only in memory and are wiped instantly upon session end.",
      businessValue: "Guarantees absolute privacy and builds immense user trust."
    },
    {
      icon: "Zap",
      title: "Real-time Sockets",
      description: "Sub-50ms latency for chat messages using optimized WebSocket connections.",
      businessValue: "Creates a seamless, engaging conversation experience."
    },
    {
      icon: "ShieldAlert",
      title: "Automated Moderation",
      description: "Real-time profanity and toxicity filtering before messages are broadcasted.",
      businessValue: "Maintains a safe environment without manual moderators."
    },
    {
      icon: "Users",
      title: "Dynamic Avatars",
      description: "Generates unique, non-identifiable avatars per session.",
      businessValue: "Provides identity within a session without compromising anonymity."
    }
  ],
  architecture: {
    frontend: {
      name: "React SPA",
      description: "Manages WebSocket state and renders the chat UI.",
      technologies: "React, Socket.IO-client"
    },
    backend: {
      name: "Flask-SocketIO Server",
      description: "Handles Socket.IO connections and moderation logic.",
      technologies: "Python, Flask, Eventlet"
    },
    database: {
      name: "Redis Broker",
      description: "Redis for Socket Pub/Sub. MySQL for rate-limiting and ban lists.",
      technologies: "Redis, MySQL"
    },
    deployment: {
      name: "AWS Infrastructure",
      description: "Containerized deployment behind an Application Load Balancer.",
      technologies: "Docker, AWS EC2, Nginx"
    },
    communicationFlow: "Client <-> WebSocket <-> Flask Node <-> Redis Pub/Sub <-> Other Flask Nodes."
  },
  apiDocumentation: [
    {
      name: "Connect Room",
      purpose: "Joins a specific chat pool.",
      endpoints: "WSS /socket.io/?room=vent",
      authentication: "None (Session Token)",
      exampleUsage: "socket.emit('join', { room: 'vent' })",
      reason: "Establishes the bi-directional real-time connection."
    }
  ],
  databaseDesign: {
    tables: ["ModerationLogs", "BannedIPs"],
    relationships: "Flat tables. Highly denormalized.",
    indexes: "Indexed by IP hash for rapid ban checking on connection.",
    constraints: "IP hashes must be unique.",
    optimization: "Memory-mapped tables for ultra-fast read access during the connection handshake.",
    security: "IP addresses are one-way hashed before storage; plain IPs are never saved."
  },
  security: {
    authentication: "Completely anonymous. No auth required.",
    authorization: "Session-based WebSocket tokens to prevent cross-room spoofing.",
    validation: "Length limits and XSS sanitization on all incoming socket payloads.",
    sanitization: "Strict HTML escaping before broadcasting messages.",
    owasp: ["XSS (Escaped)", "DDoS (Rate limited via proxy)"],
    errorHandling: "Silent failures for socket drops, with automatic client-side reconnection.",
    rateLimiting: "Nginx limits WebSocket connection attempts to prevent resource exhaustion.",
    encryption: "WSS (WebSocket Secure) used for all transit."
  },
  performance: {
    codeSplitting: "Minimal frontend bundle for fast initial load.",
    caching: "Redis caches active room counts.",
    databaseOptimization: "N/A (Messages are in-memory).",
    imageOptimization: "Avatars generated via SVG, requiring 0 bytes of image transfer.",
    renderOptimization: "Virtual scrolling for the chat window to prevent DOM bloat during long sessions.",
    lazyLoading: "N/A",
    memoryOptimization: "Strict garbage collection for disconnected socket sessions to prevent memory leaks in Python."
  },
  challenges: [
    {
      problem: "WebSocket scaling issues.",
      rootCause: "When deploying multiple Flask instances, a user connected to Instance A couldn't see messages from Instance B.",
      solution: "Implemented Redis as a message broker (Pub/Sub) between the Socket.IO server instances.",
      outcome: "Horizontal scaling achieved without splitting the user base.",
      lessons: "Stateful connections (WebSockets) require a central broker when moving beyond a single server."
    }
  ],
  developmentTimeline: [
    { phase: "Architecture", description: "Decided on the ephemeral, zero-database approach." },
    { phase: "Sockets", description: "Built the Flask-SocketIO backend and tested latency." },
    { phase: "Frontend", description: "Created the React chat interface." },
    { phase: "Moderation", description: "Integrated basic regex-based toxicity filters." },
    { phase: "Deployment", description: "Configured Nginx for WSS proxying." }
  ],
  lessonsLearned: [
    "WebSockets introduce entirely different scaling challenges compared to stateless REST APIs.",
    "Designing for absolute privacy requires sacrificing some user convenience (like chat history), but is highly valued by the target audience.",
    "Nginx requires specific configuration blocks to properly upgrade HTTP requests to WebSockets."
  ],
  futureRoadmap: [
    "End-to-End Encryption (E2EE) using WebCrypto API",
    "Voice channels using WebRTC",
    "AI-based sentiment analysis for better moderation",
    "Dedicated topic rooms"
  ],
  repository: {
    name: "vent-pod",
    description: "An anonymous, zero-knowledge WebSocket chat platform.",
    primaryLanguage: "Python",
    url: "https://github.com/ALLaNRoY-TECH/vent-pod",
    techStack: ["Python", "Flask", "React", "Socket.IO"],
    license: "MIT",
    lastUpdated: "Oct 2023"
  }
};
