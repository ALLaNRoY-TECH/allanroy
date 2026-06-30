import { ProjectIndexItem } from "@/types/case-study";

export const projects: ProjectIndexItem[] = [
  {
    id: "securescan",
    title: "SecureScan",
    subtitle: "AI Website Security Scanner",
    description: "AI-powered website vulnerability scanner with intelligent security analysis, featuring SSL Analysis, Technology Detection, OWASP Recommendations, and Risk Scoring.",
    tags: ["Next.js", "Python", "AI Insights", "Security Headers"],
    color: "from-blue-500/20 to-purple-500/20"
  },
  {
    id: "subsense",
    title: "SubSense",
    subtitle: "AI Subscription Intelligence Platform",
    description: "Intelligently scan Gmail and PDF statements using Gemini AI to detect subscriptions, analyze savings, and visualize spending habits via a secure dashboard.",
    tags: ["Next.js", "TypeScript", "Supabase", "Gemini AI", "Google OAuth"],
    color: "from-green-500/20 to-emerald-500/20"
  },
  {
    id: "ventpod",
    title: "VentPod",
    subtitle: "Anonymous Mental Health Platform",
    description: "Privacy-first architecture ensuring secure, real-time anonymous messaging with a highly secure backend.",
    tags: ["Flask", "MySQL", "WebSockets", "Privacy-first"],
    color: "from-indigo-500/20 to-blue-500/20"
  },
  {
    id: "hostel-cms",
    title: "Hostel CMS",
    subtitle: "Role-Based Complaint Management System",
    description: "Streamlined system with distinct dashboards for Students, Wardens, and Admins. Features complaint tracking and robust REST APIs.",
    tags: ["REST API", "RBAC", "MySQL", "Authentication"],
    color: "from-yellow-500/20 to-orange-500/20"
  }
];
