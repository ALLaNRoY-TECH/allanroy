import { CaseStudy } from "@/types/case-study";

export const hostelCms: CaseStudy = {
  id: "hostel-cms",
  hero: {
    title: "Hostel CMS",
    subtitle: "Role-Based Complaint Management System",
    status: "Completed",
    completed: "May 2023",
    role: "Full-Stack Developer",
    duration: "12 Weeks",
    techStack: ["React", "Node.js", "Express", "MySQL", "JWT"],
    githubUrl: "https://github.com/ALLaNRoY-TECH/smart-hostel-management",
  },
  engineeringOverview: {
    projectType: "Enterprise Internal Dashboard",
    complexity: "Medium",
    frontend: "React SPA",
    backend: "Node.js (Express)",
    database: "MySQL",
    ai: "None",
    deployment: "VPS / DigitalOcean",
    metrics: [
      { label: "User Roles", value: 3 },
      { label: "REST APIs", value: 24 },
      { label: "Database Tables", value: 12 },
      { label: "Resolution Time", value: 50, suffix: "% faster" },
    ]
  },
  overview: {
    what: "A comprehensive Role-Based Access Control (RBAC) system for managing university hostels, focusing on digitizing complaint tracking, room allocation, and gate passes.",
    why: "Hostel administration was relying on paper ledgers and WhatsApp groups, leading to lost complaints, unaccountable staff, and frustrated students.",
    who: "University Administration, Hostel Wardens, and Students.",
    businessValue: "Digitized operations reduce administrative overhead by 40% and provide an auditable trail for student complaints and security logs."
  },
  problemStatement: {
    problem: "Paper-based tracking fails at scale. When a student reports a broken fan, there is no SLA (Service Level Agreement), no tracking, and no accountability.",
    difficulty: "Managing state across three distinct user roles (Admin, Warden, Student) where data visibility must be strictly siloed based on permissions.",
    limitations: "Existing generic CMS platforms are too bloated and not tailored to the specific workflows of Indian university hostels.",
    painPoints: [
      "Lost maintenance requests",
      "No real-time visibility into room occupancy",
      "Manual and insecure gate pass issuing"
    ],
    businessImpact: "Poor living conditions lead to student dissatisfaction and administrative chaos."
  },
  solution: {
    architecture: "A classic MERN-stack architecture (replacing Mongo with MySQL for relational integrity). An Express.js REST API serves a React frontend, with JWTs managing role-based sessions.",
    workflow: "Student logs complaint -> Database updates -> Warden dashboard alerts -> Maintenance assigned -> Status updated -> Student notified.",
    howItFixes: "Centralizes all operations into a single, relational database where every action is logged, time-stamped, and assigned an owner.",
    scalability: "Standard horizontally scalable Node.js API with a robust relational database capable of handling thousands of students.",
    security: "Strict JWT verification middleware on every route ensures students cannot access warden APIs, and wardens cannot access super-admin APIs."
  },
  engineeringDecisions: [
    {
      technology: "MySQL",
      why: "Hostel data is inherently relational. A Student belongs to a Room, a Room belongs to a Hostel, a Complaint belongs to a Student.",
      alternativesConsidered: "MongoDB.",
      tradeoffs: "Requires strict schema migrations and planning compared to the flexibility of MongoDB.",
      benefits: "Enforces data integrity at the database level. Prevents orphaned records via CASCADE rules.",
      lessonsLearned: "Always choose SQL when the business entities have strict hierarchical relationships."
    },
    {
      technology: "Express.js",
      why: "Fast, unopinionated backend framework that allowed me to write custom RBAC middleware exactly how the business logic dictated.",
      alternativesConsidered: "NestJS, Django.",
      tradeoffs: "Requires manual setup of architecture (routing, controllers, services) compared to an opinionated framework.",
      benefits: "Total control over the request/response lifecycle.",
      lessonsLearned: "Without an opinionated framework, folder structure can become messy as the app grows."
    },
    {
      technology: "JWT (JSON Web Tokens)",
      why: "Stateless authentication reduces database hits on every request. Role claims are embedded directly in the token payload.",
      alternativesConsidered: "Stateful Session Cookies (Redis).",
      tradeoffs: "Tokens cannot be easily revoked before expiration without implementing a complex token blacklist.",
      benefits: "Extremely fast authentication verification at the edge/middleware level.",
      lessonsLearned: "Always set short expiration times for JWTs and implement a robust refresh token rotation strategy."
    }
  ],
  features: [
    {
      icon: "UserCog",
      title: "Role-Based Dashboards",
      description: "Distinct UIs and feature sets for Students, Wardens, and Admins.",
      businessValue: "Simplifies UX by only showing relevant actions to each user type."
    },
    {
      icon: "TicketCheck",
      title: "Ticketing System",
      description: "Track complaints from 'Open' to 'Resolved' with comment threads.",
      businessValue: "Enforces accountability and SLAs for maintenance staff."
    },
    {
      icon: "DoorOpen",
      title: "Digital Gate Pass",
      description: "Students request leave, wardens approve digitally, guards verify via QR.",
      businessValue: "Enhances campus security and automates attendance."
    },
    {
      icon: "BedDouble",
      title: "Inventory Management",
      description: "Real-time tracking of room occupancy and available beds.",
      businessValue: "Optimizes hostel revenue and space allocation."
    }
  ],
  architecture: {
    frontend: {
      name: "React SPA",
      description: "Single Page Application consuming REST APIs.",
      technologies: "React, Axios, React Router"
    },
    backend: {
      name: "Express.js API",
      description: "RESTful API handling business logic and authorization.",
      technologies: "Node.js, Express, Joi (Validation)"
    },
    database: {
      name: "MySQL Server",
      description: "Relational database maintaining ACID properties.",
      technologies: "MySQL 8.0, Sequelize ORM"
    },
    deployment: {
      name: "Virtual Private Server",
      description: "Standard VPS deployment with PM2 for process management.",
      technologies: "DigitalOcean, PM2, Nginx"
    },
    communicationFlow: "React SPA -> Express API (Auth Middleware) -> MySQL."
  },
  apiDocumentation: [
    {
      name: "Create Complaint",
      purpose: "Allows a student to log a maintenance issue.",
      endpoints: "POST /api/complaints",
      authentication: "JWT (Role: Student)",
      exampleUsage: "POST { title: 'Broken Fan', category: 'Electrical' }",
      reason: "Core workflow entry point."
    },
    {
      name: "Update Status",
      purpose: "Allows a warden to close a ticket.",
      endpoints: "PATCH /api/complaints/:id",
      authentication: "JWT (Role: Warden/Admin)",
      exampleUsage: "PATCH { status: 'Resolved' }",
      reason: "Enforces RBAC; students cannot close their own tickets."
    }
  ],
  databaseDesign: {
    tables: ["Users", "Roles", "Rooms", "Complaints", "GatePasses"],
    relationships: "Highly normalized. Foreign keys link Complaints to Users and Rooms.",
    indexes: "Indexed on UserID, Status, and Date for fast dashboard filtering.",
    constraints: "ON DELETE CASCADE for student records to maintain DB cleanliness.",
    optimization: "Pagination implemented at the database level using LIMIT and OFFSET to handle thousands of complaints.",
    security: "Prepared statements used exclusively to prevent SQL Injection."
  },
  security: {
    authentication: "Bcrypt hashing for passwords. JWT for session management.",
    authorization: "Custom Express middleware checks `req.user.role` against allowed roles for every route.",
    validation: "Joi used for request payload validation before hitting controllers.",
    sanitization: "Express-validator used to escape input.",
    owasp: ["Broken Access Control (Mitigated via strict RBAC)", "SQLi (Mitigated via ORM/Prepared statements)"],
    errorHandling: "Centralized error handling middleware standardizes API responses.",
    rateLimiting: "express-rate-limit applied to login routes to prevent brute force.",
    encryption: "Passwords salted and hashed. TLS for API endpoints."
  },
  performance: {
    codeSplitting: "React Router lazy loading for different dashboards.",
    caching: "N/A (Data is highly dynamic, requiring real-time accuracy).",
    databaseOptimization: "Proper foreign key indexing reduces JOIN query times.",
    imageOptimization: "N/A",
    renderOptimization: "Use of useMemo for heavy data tables.",
    lazyLoading: "N/A",
    memoryOptimization: "Node streams used if exporting large CSV reports."
  },
  challenges: [
    {
      problem: "Authorization leaks.",
      rootCause: "Initially, the frontend hid buttons based on roles, but the backend APIs were unprotected.",
      solution: "Implemented a robust `authorizeRoles(...roles)` middleware on every single Express route.",
      outcome: "Secured the application from malicious API requests.",
      lessons: "Never trust the client. Authorization must always be enforced on the server."
    }
  ],
  developmentTimeline: [
    { phase: "Database Design", description: "Drafted the ER diagram and normalized the schema." },
    { phase: "API & Auth", description: "Built the Express server and JWT RBAC middleware." },
    { phase: "Frontend Logic", description: "Created the React SPA and Axios interceptors for token handling." },
    { phase: "Dashboards", description: "Built distinct views for Students and Wardens." },
    { phase: "Deployment", description: "Hosted the DB and Node server." }
  ],
  lessonsLearned: [
    "Relational databases are vastly superior for structured business applications compared to NoSQL.",
    "RBAC requires careful planning at the routing layer; bolting it on later is a nightmare.",
    "Axios interceptors are essential for silently refreshing or handling expired JWTs."
  ],
  futureRoadmap: [
    "Biometric (Fingerprint) integration for gate passes",
    "Automated fee collection via payment gateways",
    "Mobile app for students (React Native)"
  ],
  repository: {
    name: "smart-hostel-management",
    description: "Role-based access control system for university hostels.",
    primaryLanguage: "JavaScript",
    url: "https://github.com/ALLaNRoY-TECH/smart-hostel-management",
    techStack: ["React", "Node.js", "MySQL"],
    license: "MIT",
    lastUpdated: "May 2023"
  }
};
