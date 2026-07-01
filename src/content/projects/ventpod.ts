import { CaseStudy } from "@/types/case-study";

export const ventpod: CaseStudy = {
  id: "ventpod",
  hero: {
    title: "VentPod",
    subtitle: "Anonymous Real-time Chat Platform",
    status: "Production",
    completed: "",
    role: "Full-Stack Developer",
    duration: "",
    techStack: ["Next.js", "WebSockets", "Encryption"],
    githubUrl: "https://github.com/ALLaNRoY-TECH/vent-pod",
  },
  engineeringOverview: {
    projectType: "Real-time Application",
    complexity: "",
    frontend: "Next.js",
    backend: "",
    database: "",
    ai: "",
    deployment: "",
    metrics: [
      { label: "Active Users tracking", value: 1, suffix: "" },
    ]
  },
  overview: {
    what: "An anonymous, privacy-first peer support platform facilitating real-time emotional expression and peer-to-peer conversations without exposing user identities.",
    why: "Built to address the hesitation surrounding discussions of stress and mental health caused by fear of judgment and social validation metrics prevalent in traditional social media.",
    who: "College students, young professionals, and individuals seeking genuine emotional support in a judgment-free, anonymous environment.",
    businessValue: "Demonstrates the architectural implementation of secure, privacy-first communication. It showcases scalable real-time architecture, secure message handling, and a strict decoupling of user interaction from identity tracking."
  },
  problemStatement: {
    problem: "Users often hesitate to share personal struggles or emotional thoughts because traditional communication platforms intrinsically tie interactions to user identity, leading to privacy concerns and a fear of judgment.",
    difficulty: "Engineering a truly anonymous system requires sophisticated session management. The system must reliably route real-time messages, maintain active conversation states, and mitigate abuse without relying on a persistent database of user identities or profiles.",
    limitations: "Existing messaging platforms mandate identity verification, profile creation, or social graphs. Platforms that do allow anonymity often lack robust 1-on-1 real-time messaging capabilities or fail to foster a secure environment for genuine conversations.",
    painPoints: [
      "Users are uncomfortable sharing sensitive emotional thoughts under their real identities.",
      "The fear of social judgment actively discourages honest communication.",
      "Traditional platforms introduce friction by requiring profiles and predefined social connections.",
      "Lack of simple, secure, and purely peer-to-peer anonymous platforms."
    ],
    businessImpact: "By eliminating identity-based friction and prioritizing privacy, VentPod creates a secure environment that facilitates honest, real-time peer support."
  },
  solution: {
    architecture: "VentPod employs a decoupled client-server architecture. The Next.js (React) frontend manages the user interface, ephemeral session state, and chat experience. A Python (Flask) backend handles matchmaking, session creation, active user management, and message routing. A MySQL database stores minimal application metadata, while active chat sessions are maintained strictly in-memory by the backend.",
    workflow: `1. Onboarding: User lands on the homepage; purpose of anonymous peer support is established.
2. Connection Request: Without creating an account, the user starts an anonymous session and requests a match.
3. Matchmaking: The Flask backend searches for another available user in the queue.
4. Session Initialization: A temporary chat session is instantiated, securely connecting both users.
5. Message Flow: Messages are transmitted bidirectionally via WebSockets. The backend validates the session and routes the message to the paired user instantly.
6. Termination: Upon intentional disconnection or browser refresh, the WebSocket is closed, and the temporary session is permanently destroyed.`,
    howItFixes: "By intentionally avoiding user authentication and persistent message storage, VentPod guarantees anonymity. The ephemeral session model prevents identity tracking and ensures messages exist only during the lifetime of the active WebSocket connection.",
    scalability: "",
    security: ""
  },
  engineeringDecisions: [
    {
      technology: "Node.js & Express",
      why: "Node.js provides an event-driven, non-blocking I/O model which is fundamentally designed for handling thousands of concurrent real-time connections, making it the optimal choice for a chat server over traditional synchronous frameworks.",
      alternativesConsidered: "Python (Flask / Django)",
      tradeoffs: "While Node.js excels at concurrency, CPU-intensive tasks must be offloaded to prevent blocking the single event loop.",
      benefits: "Seamless integration with Socket.io, high concurrency support, and unified JavaScript ecosystem across the frontend and backend.",
      lessonsLearned: "For highly concurrent I/O applications like real-time matchmaking, an event-driven architecture heavily outperforms thread-based architectures."
    },
    {
      technology: "Socket.io (WebSockets)",
      why: "The platform required instant two-way communication. Socket.io provides a robust WebSocket implementation with automatic fallback to HTTP Long Polling, built-in room management, and automatic reconnections.",
      alternativesConsidered: "Raw WebSockets / Server-Sent Events (SSE)",
      tradeoffs: "Introduces slight overhead compared to raw WebSockets due to its internal polling mechanisms and custom protocol framing.",
      benefits: "Extremely low latency, instant message delivery, native room abstractions (e.g., `socket.join(roomId)`), and robust disconnect handling.",
      lessonsLearned: "Leveraging robust real-time libraries like Socket.io drastically reduces the boilerplate required to manage volatile network conditions."
    },
    {
      technology: "MongoDB",
      why: "MongoDB's NoSQL document structure aligns perfectly with JSON-based chat messages and unstructured social posts. Furthermore, MongoDB's native Time-To-Live (TTL) indexes allowed for automatic data purging without writing custom cron jobs.",
      alternativesConsidered: "MySQL / PostgreSQL",
      tradeoffs: "Lacks strict relational integrity, which is acceptable since VentPod inherently avoids relational user profiles.",
      benefits: "Flexible schema design, high write throughput, and built-in 24-hour TTL expiration for privacy.",
      lessonsLearned: "Aligning the database paradigm with the data structure (ephemeral JSON messages) drastically simplifies the backend architecture."
    }
  ],
  features: [
    {
      icon: "MessageSquare",
      title: "Anonymous Chat Matchmaking",
      description: "Pairs temporary user sessions into isolated, private chat rooms, routing messages exclusively between connected peers.",
      businessValue: "Fosters honest conversations without fear of judgment by completely abstracting user identity."
    },
    {
      icon: "Keyboard",
      title: "Real-Time Typing Indicators",
      description: "Emits lightweight, ephemeral WebSocket events to synchronize typing state without persisting data.",
      businessValue: "Improves conversational UX by providing immediate, natural feedback during active chats."
    },
    {
      icon: "Lock",
      title: "Encrypted Transport Layer",
      description: "Utilizes strict HTTPS and Secure WebSockets (WSS) to encrypt all communication in-transit via TLS.",
      businessValue: "Protects message integrity and user privacy from network interception without over-engineering custom E2EE."
    },
    {
      icon: "Users",
      title: "Dynamic User Tracking",
      description: "Maintains an in-memory registry of active WebSocket connections, instantly purging stale sessions on disconnect.",
      businessValue: "Ensures accurate, instantaneous matchmaking and robust garbage collection for inactive sessions."
    }
  ],
  architecture: {
    frontend: {
      name: "React (Vite)",
      description: "Responsible for rendering the user interface, managing anonymous chat sessions, and displaying real-time messages. Built with Vite for fast HMR and optimized builds.",
      technologies: "React, Vite, GSAP, Three.js, Socket.io-client"
    },
    backend: {
      name: "Node.js (Express)",
      description: "Manages the core business logic including anonymous session creation, mood-based matchmaking queue, automated OpenAI moderation pipeline, and active connection management.",
      technologies: "Node.js, Express, Socket.io, OpenAI SDK"
    },
    database: {
      name: "MongoDB",
      description: "Stores application metadata, user reports, flagged messages, and ephemeral chat room logs.",
      technologies: "MongoDB, Mongoose"
    },
    deployment: {
      name: "Local / Sandbox",
      description: "Developed utilizing local Node and Vite servers connected to a MongoDB instance.",
      technologies: "Localhost"
    },
    communicationFlow: "The React client establishes a persistent WebSocket connection with the Node.js backend using Socket.io. The backend places the socket into a mood-based queue. Upon matching, both sockets are joined to an isolated room. Messages sent through the room are passed through an OpenAI moderation pipeline before being broadcast to the peer and temporarily stored in MongoDB."
  },
  apiDocumentation: [
    {
      endpoint: "WSS Event: find_match (Client -> Server)",
      method: "WSS",
      purpose: "Adds the user to the matchmaking queue with a specified mood.",
      authRequired: false,
      requestBody: "{ mood: string }",
      response: "None (Wait for match_found)",
      errorHandling: "None"
    },
    {
      endpoint: "WSS Event: match_found (Server -> Client)",
      method: "WSS",
      purpose: "Notifies the client that a peer has been found and a room has been created. Triggers a strict 10-minute session timer.",
      authRequired: false,
      requestBody: "None",
      response: "{ roomId: string, partnerMood: string, role: string }",
      errorHandling: "None"
    },
    {
      endpoint: "WSS Event: send_message (Client -> Server)",
      method: "WSS",
      purpose: "Sends a chat message to the connected peer.",
      authRequired: false,
      requestBody: "{ roomId: string, message: string }",
      response: "None (Broadcasts to peer if moderated safely)",
      errorHandling: "Drops message if user is currently serving an automated ban or if moderation flags it."
    },
    {
      endpoint: "REST POST /api/confessions",
      method: "POST",
      purpose: "Allows users to submit anonymous text confessions or posts.",
      authRequired: false,
      requestBody: "{ content: string (max 1000 chars), song: object }",
      response: "JSON object of created post",
      errorHandling: "500 Internal Server Error"
    }
  ],
  databaseDesign: {
    tables: [
      "Chat: room (String), messages (Array of sender, content, timestamp), createdAt (Date)",
      "Post: content (String), song (Object), reactions (Object), timestamp (Date)",
      "Report: reportedUser (String), reporterUser (String), reason (String), timestamp (Date)",
      "FlaggedMessage: socketId (String), content (String), classification (String)"
    ],
    relationships: "Due to the anonymous NoSQL nature of the platform, strong relational links are avoided. Documents are self-contained (e.g., messages are embedded within the Chat document array).",
    indexes: "A TTL (Time-To-Live) index is applied on Chat.createdAt to automatically delete documents after 24 hours.",
    constraints: "Mongoose schema validations enforce required fields and maximum character limits (e.g., max 1000 chars for Posts).",
    optimization: "Embedded documents (messages inside Chat) prevent expensive $lookup operations during rapid chat ingestion.",
    security: "Data is scrubbed of PII. Identification relies strictly on transient socket IDs."
  },
  security: {
    authentication: "None. Users are completely anonymous and identified only by ephemeral Socket IDs.",
    authorization: "N/A",
    validation: "Messages are routed through an automated OpenAI moderation service before transmission.",
    sanitization: "Input is strictly parsed and moderated.",
    owasp: ["Injection (Mitigated via Mongoose ODMs)", "Abuse (Mitigated via automated strike system)"],
    errorHandling: "Failing moderation triggers automated de-escalation suggestions rather than raw system errors.",
    rateLimiting: "A robust 3-strike memory-mapped tracking system issues progressive warnings and issues timed 30-minute IP/Socket bans for abusive language.",
    encryption: "None implemented at rest for messages (relying on 24h TTL deletion)."
  },
  performance: {
    codeSplitting: "",
    caching: "",
    databaseOptimization: "",
    imageOptimization: "",
    renderOptimization: "",
    lazyLoading: "",
    memoryOptimization: ""
  },
  challenges: [
    {
      problem: "Ensuring reliable real-time communication while managing stateful anonymous matchmaking connections during unexpected client disconnects.",
      rootCause: "Socket connections are inherently stateful. When clients disconnected unexpectedly (e.g., closing tabs, network drops), stale socket references remained in the matchmaking queue and active room trackers because not every edge case triggered a cleanup. This caused the matchmaking engine to attempt to pair new users with orphaned, unresponsive sockets.",
      solution: "Aggressively updated the disconnection lifecycle handling. The `disconnect` event listener was refactored to instantly purge the disconnected socket ID from the matchmaking queue, broadcast `partner_left` to all active rooms associated with the socket, and clear all server-side timeout references (`chatTimers`).",
      outcome: "Matchmaking reliability drastically improved. Users could reconnect or refresh without leaving orphaned sessions, ensuring the matchmaking queue only contained active connections.",
      lessons: "Building real-time systems isn't just about fast message transport—it's primarily about rigorous connection lifecycle management. Proper garbage collection of sockets, sessions, and temporary state is the foundation of a stable real-time application."
    }
  ],
  developmentTimeline: [
    { phase: "Implementation", description: "" }
  ],
  lessonsLearned: [
    "Building a real-time application involves much more than simply transporting messages. Managing connection lifecycles, rigorous garbage collection of disconnected sessions, and maintaining consistent application state during unexpected network drops are the true engineering challenges.",
    "Designing for edge cases (e.g., users disconnecting mid-matchmaking or refreshing the browser) early in development is critical to prevent state corruption and orphaned sockets.",
    "If rebuilding for scale, horizontal scalability must be designed from day one. I would implement Redis Pub/Sub as the Socket.io adapter to sync events across nodes, externalize session state into Redis, and isolate the matchmaking engine into an independent microservice."
  ],
  futureRoadmap: [
    ""
  ],
  repository: {
    name: "vent-pod",
    description: "Anonymous real-time peer support platform built with Node.js, Express, Socket.IO, MongoDB, and OpenAI moderation.",
    primaryLanguage: "JavaScript",
    url: "https://github.com/ALLaNRoY-TECH/vent-pod",
    techStack: ["Node.js", "Socket.IO", "MongoDB", "OpenAI"],
    license: "",
    lastUpdated: ""
  }
};
