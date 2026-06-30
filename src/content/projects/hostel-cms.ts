import { CaseStudy } from "@/types/case-study";

export const hostelCms: CaseStudy = {
  id: "hostel-cms",
  hero: {
    title: "Smart Hostel CMS",
    subtitle: "Comprehensive Hostel Management System",
    status: "Production",
    completed: "[To Be Documented]",
    role: "Full-Stack Developer",
    duration: "[To Be Documented]",
    techStack: ["React", "Node.js", "Analytics"],
    githubUrl: "https://github.com/ALLaNRoY-TECH/smart-hostel-management",
  },
  engineeringOverview: {
    projectType: "Content Management System",
    complexity: "[To Be Documented]",
    frontend: "React",
    backend: "Node.js",
    database: "[To Be Documented]",
    ai: "[To Be Documented]",
    deployment: "[To Be Documented]",
    metrics: [
      { label: "Management Modules", value: 4, suffix: "" },
    ]
  },
  overview: {
    what: "A full-stack web application designed to digitize hostel administration by providing a centralized platform for room allocations, complaints, and overall operations.",
    why: "Built to replace manual, paper-based tracking methods (registers, spreadsheets) that make it difficult to monitor occupancy, track complaint statuses, and maintain accurate records.",
    who: "Hostel administrators, wardens, hostel staff, and resident students.",
    businessValue: "Reduces manual administrative effort by digitizing workflows. It centralizes hostel data, speeds up complaint resolution, improves room allocation management, and provides role-based visibility into daily operations."
  },
  problemStatement: {
    problem: "Hostel operations were handled through disconnected manual processes (paper registers, spreadsheets), leading to synchronization issues, duplicate records, and poor visibility as student numbers grew.",
    difficulty: "The challenge was building a centralized system where multiple users with different roles (students vs admins) could safely interact with the same data simultaneously. Maintaining data consistency during concurrent updates required specific mechanisms, such as complaint locking, to preserve data integrity.",
    limitations: "Manual workflows lacked a single source of truth, offered no real-time transparency into complaint progress, and scaled poorly due to the significant administrative overhead of duplicate data entry.",
    painPoints: [
      "Students had to physically find staff to register complaints and had no visibility into resolution progress.",
      "Administrators wasted time manually updating records across multiple sources.",
      "High risk of multiple administrators unknowingly modifying the same complaint simultaneously.",
      "Lack of centralized tracking for maintenance and room allocations."
    ],
    businessImpact: "By replacing fragmented manual workflows with a structured digital platform, the system dramatically reduces administrative overhead, ensures data integrity, and improves the overall student experience."
  },
  solution: {
    architecture: "The application employs a three-tier architecture. The React frontend handles the UI and role-based routing. The Node.js/Express backend contains the business logic and REST APIs. A MySQL database provides relational persistence for students, admins, complaints, and allocations.",
    workflow: `1. Authentication: User logs in; the backend routes them to either a Student or Admin dashboard based on their credentials.
2. Complaint Submission (Student): Student submits a complaint (title, category, description). It is saved to MySQL with a 'pending' status.
3. Complaint Review (Admin): Admin retrieves all complaints via the admin dashboard.
4. Concurrency Lock: Before an admin can update a complaint, the backend verifies the 'locked_by' field to ensure no other admin is actively editing it.
5. Resolution: The admin updates the status or assigns a worker. The lock is released, and the student's dashboard is updated synchronously upon their next fetch.`,
    howItFixes: "By centralizing operations, the platform eliminates paper trails. The distinct role-based API separation ensures students cannot access administrative data, while the concurrency locking mechanism definitively prevents data corruption from simultaneous administrator edits.",
    scalability: "[To Be Documented]",
    security: "[To Be Documented]"
  },
  engineeringDecisions: [
    {
      technology: "MySQL",
      why: "The application's data is inherently relational. Students, administrators, rooms, allocations, complaints, and activity logs all have well-defined, structured relationships (e.g., a complaint belongs to one student).",
      alternativesConsidered: "MongoDB",
      tradeoffs: "Requires careful, strict schema design and migrations compared to the flexibility of NoSQL.",
      benefits: "Guarantees data consistency through foreign keys and ACID transactions, which is critical for administrative systems.",
      lessonsLearned: "Technology choices must map to data structure. Relational databases are overwhelmingly superior for structured, interrelated entities like those in an administrative CMS."
    },
    {
      technology: "Node.js (Express)",
      why: "The application requires a lightweight backend optimized for high-throughput CRUD operations (registration, complaint state changes, room allocations).",
      alternativesConsidered: "Python (Flask/FastAPI) / Java (Spring Boot)",
      tradeoffs: "Single-threaded nature means it is not ideal for heavy computational workloads, though this CMS is almost entirely database-driven I/O.",
      benefits: "Unified language (JavaScript) across the React frontend and backend, enabling rapid development and a highly maintainable, modular REST API.",
      lessonsLearned: "For I/O-heavy, CRUD-based administrative portals, lightweight frameworks like Express eliminate the unnecessary boilerplate found in enterprise alternatives like Spring Boot."
    }
  ],
  features: [
    {
      icon: "Shield",
      title: "Role-Based Authentication",
      description: "Dedicated login endpoints securely isolate administrative functionality from student operations.",
      businessValue: "Maintains a strict separation of responsibilities and prevents unauthorized access to sensitive hostel management functions."
    },
    {
      icon: "AlertTriangle",
      title: "Complaint Management Workflow",
      description: "Centralized dashboard for students to submit and track issues, while admins can assign workers and update resolution statuses.",
      businessValue: "Replaces inefficient paper records with a transparent, trackable digital workflow that drastically improves response times."
    },
    {
      icon: "Lock",
      title: "Concurrency Locking",
      description: "A `locked_by` mechanism dynamically locks complaints when actively edited by an administrator.",
      businessValue: "Prevents race conditions and data corruption when multiple administrators update the same record simultaneously."
    },
    {
      icon: "Database",
      title: "Automated Schema Migration",
      description: "The `initDB()` startup routine dynamically verifies and injects missing SQL columns and ENUM updates.",
      businessValue: "Eliminates the friction of manual database migrations and ensures local environments remain perfectly synchronized with the application codebase."
    }
  ],
  architecture: {
    frontend: {
      name: "React (Vite)",
      description: "Handles role-based UI rendering, routing, and form state for complaints and allocations.",
      technologies: "React 19, Vite, Tailwind CSS, React Router DOM, Framer Motion"
    },
    backend: {
      name: "Node.js (Express)",
      description: "Serves REST APIs, validates role-based payloads, manages MySQL queries, and handles dynamic schema migrations on startup.",
      technologies: "Node.js, Express, mysql2"
    },
    database: {
      name: "MySQL",
      description: "Relational data store maintaining strict referential integrity for students, complaints, and rooms.",
      technologies: "MySQL"
    },
    deployment: {
      name: "Local Environment",
      description: "Developed and tested entirely on localhost using Vite dev server and Node.",
      technologies: "Localhost"
    },
    communicationFlow: "The React frontend sends JSON payloads via HTTP requests to the Express backend. The backend processes the business logic (including concurrency locking), executes structured SQL queries using mysql2, and returns the serialized JSON response to the client."
  },
  apiDocumentation: [
    {
      endpoint: "POST /api/student/login",
      method: "POST",
      purpose: "Authenticates a student.",
      authRequired: false,
      requestBody: "{ email: string, password: string }",
      response: "{ success: boolean, user: object }",
      errorHandling: "400 Missing fields, 401 Invalid credentials, 500 Server Error"
    },
    {
      endpoint: "POST /api/student/register",
      method: "POST",
      purpose: "Registers a new student.",
      authRequired: false,
      requestBody: "{ name: string, email: string, password: string }",
      response: "{ success: boolean, id: number }",
      errorHandling: "400 Email already exists"
    },
    {
      endpoint: "POST /api/admin/login",
      method: "POST",
      purpose: "Authenticates an administrator.",
      authRequired: false,
      requestBody: "{ email: string, password: string }",
      response: "{ success: boolean, user: object }",
      errorHandling: "401 Invalid credentials"
    },
    {
      endpoint: "GET /api/complaints",
      method: "GET",
      purpose: "Fetches complaints. Admins see all; students see only their own.",
      authRequired: false,
      requestBody: "Query parameter: ?studentId=number (optional)",
      response: "Array of complaint objects with student_name join.",
      errorHandling: "500 Server Error"
    },
    {
      endpoint: "POST /api/complaints",
      method: "POST",
      purpose: "Creates a new complaint.",
      authRequired: false,
      requestBody: "{ student_id: number, title: string, description: string }",
      response: "{ success: boolean, insertId: number }",
      errorHandling: "400 Missing required fields"
    },
    {
      endpoint: "PUT /api/complaints/:id",
      method: "PUT",
      purpose: "Updates complaint status, assigned worker, or lock status.",
      authRequired: false,
      requestBody: "{ status: string, assigned_worker: string, locked_by: number }",
      response: "{ success: boolean, complaint: object }",
      errorHandling: "404 Not Found, 409 Conflict (Locked by another admin), 400 Invalid status"
    }
  ],
  databaseDesign: {
    tables: [
      "students (id, name, email, password)",
      "admins (id, name, email, password)",
      "rooms (id, room_number, capacity, occupied)",
      "complaints (id, student_id, title, category, description, status, assigned_worker, locked_by, created_at)",
      "allocations (id, student_id, room_id)",
      "activity_logs (id, action, user_role, created_at)"
    ],
    relationships: "1-to-Many: students -> complaints. 1-to-Many: rooms -> allocations. 1-to-1: students -> allocations. 1-to-Many: admins -> complaints (locked_by).",
    indexes: "Primary Keys (id) on all tables. UNIQUE constraints on students.email, admins.email, and rooms.room_number.",
    constraints: "FOREIGN KEY constraints map student_id and room_id in allocations, and student_id and locked_by in complaints. ENUM constraints applied to complaint status.",
    optimization: "Relational design avoids data duplication and ensures referential integrity.",
    security: "Basic relational constraints prevent orphaned data."
  },
  security: {
    authentication: "Basic email/password matching against the database.",
    authorization: "Role isolation relies strictly on separate API endpoints.",
    validation: "Basic existence checks (e.g., `if (!email)`) applied before queries are executed.",
    sanitization: "Mitigated exclusively by parameterized queries.",
    owasp: ["Injection (Mitigated via Parameterized Queries provided by mysql2)"],
    errorHandling: "Errors are caught via try/catch blocks and returned as standard JSON payloads.",
    rateLimiting: "Not implemented in the current codebase.",
    encryption: "Not implemented in the current codebase (passwords stored in plain text)."
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
      problem: "Preventing multiple administrators from updating the same complaint simultaneously, which previously caused race conditions and data overwrites.",
      rootCause: "HTTP requests are inherently stateless. The backend initially treated every update request as an independent database operation without verifying if another admin was already editing the complaint. This resulted in a classic 'last-write-wins' race condition.",
      solution: "Implemented an optimistic concurrency control mechanism via a `locked_by` field in the database. When an admin opens a complaint, the backend verifies if a lock exists. If not, the complaint is temporarily assigned to that admin, explicitly blocking others. Once the update completes, the lock is released.",
      outcome: "Simultaneous write conflicts were completely eliminated. Administrators can safely manage complaints without data corruption, drastically improving operational reliability.",
      lessons: "Building CRUD functionality is only part of designing a management system. When multiple users interact with the same data, concurrency becomes a critical architectural concern that must be proactively solved at the application layer."
    }
  ],
  developmentTimeline: [
    { phase: "Implementation", description: "[To Be Documented]" }
  ],
  lessonsLearned: [
    "Building a full-stack application involves much more than implementing CRUD operations. Designing a reliable backend requires anticipating how multiple users interact with the same data, enforcing role separation, and protecting data consistency.",
    "Small architectural decisions made early—like introducing a complaint locking mechanism—significantly impact the stability and scalability of the application later.",
    "If rebuilding for scale, I would replace raw MySQL queries with Prisma ORM for better type safety, implement JWT/bcrypt for secure authentication, introduce Redis for distributed locking and caching, and modularize the backend into dedicated microservices."
  ],
  futureRoadmap: [
    "[To Be Documented]"
  ],
  repository: {
    name: "smart-hostel-management",
    description: "Full-stack hostel management platform built with React, Express, and MySQL, featuring role-based access, complaint management, room allocation, and concurrency-safe administrative workflows.",
    primaryLanguage: "JavaScript",
    url: "https://github.com/ALLaNRoY-TECH/smart-hostel-management",
    techStack: ["React", "Node.js", "MySQL"],
    license: "[To Be Documented]",
    lastUpdated: "[To Be Documented]"
  }
};
