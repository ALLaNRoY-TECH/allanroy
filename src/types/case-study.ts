
export type ProjectId = 'securescan' | 'subsense' | 'ventpod' | 'hostel-cms';

export interface CaseStudyHero {
  title: string;
  subtitle: string;
  status: string;
  completed: string;
  role: string;
  duration: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
}

export interface Metric {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
}

export interface EngineeringOverview {
  projectType: string;
  complexity: string;
  frontend: string;
  backend: string;
  database: string;
  ai: string;
  deployment: string;
  metrics: Metric[];
}

export interface Overview {
  what: string;
  why: string;
  who: string;
  businessValue: string;
}

export interface ProblemStatement {
  problem: string;
  difficulty: string;
  limitations: string;
  painPoints: string[];
  businessImpact: string;
}

export interface Solution {
  architecture: string;
  workflow: string;
  howItFixes: string;
  scalability: string;
  security: string;
}

export interface EngineeringDecision {
  technology: string;
  why: string;
  alternativesConsidered: string;
  tradeoffs: string;
  benefits: string;
  lessonsLearned: string;
}

export interface Feature {
  icon: string; // lucide-react icon name
  title: string;
  description: string;
  businessValue: string;
}

export interface ArchitectureComponent {
  name: string;
  description: string;
  technologies: string;
}

export interface Architecture {
  frontend: ArchitectureComponent;
  backend: ArchitectureComponent;
  database: ArchitectureComponent;
  ai?: ArchitectureComponent;
  external?: ArchitectureComponent;
  deployment: ArchitectureComponent;
  communicationFlow: string;
}

export interface ApiEndpoint {
  name?: string;
  endpoints?: string;
  exampleUsage?: string;
  reason?: string;
  
  // Swagger style fields
  endpoint?: string;
  method?: string;
  purpose?: string;
  authRequired?: boolean;
  authentication?: string; // backwards compat
  requestBody?: string;
  response?: string;
  errorHandling?: string;
  validation?: string;
}

export interface DatabaseDesign {
  tables: string[];
  relationships: string;
  indexes: string;
  constraints: string;
  optimization: string;
  security: string;
}

export interface SecurityInfo {
  authentication: string;
  authorization: string;
  validation: string;
  sanitization: string;
  owasp: string[];
  errorHandling: string;
  rateLimiting: string;
  encryption: string;
}

export interface PerformanceInfo {
  codeSplitting: string;
  caching: string;
  databaseOptimization: string;
  imageOptimization: string;
  renderOptimization: string;
  lazyLoading: string;
  memoryOptimization: string;
}

export interface AiIntegration {
  model: string;
  promptEngineering: string;
  responseParsing: string;
  structuredOutput: string;
  fallbackLogic: string;
  rateLimits: string;
  errorHandling: string;
  tokenOptimization: string;
}

export interface Challenge {
  problem: string;
  rootCause: string;
  solution: string;
  outcome: string;
  lessons: string;
}

export interface TimelinePhase {
  phase: string;
  description: string;
}

export interface RepositoryInfo {
  name: string;
  url: string;
  description: string;
  primaryLanguage: string;
  techStack: string[];
  license: string;
  lastUpdated: string;
}

export interface CaseStudy {
  id: ProjectId;
  hero: CaseStudyHero;
  engineeringOverview: EngineeringOverview;
  overview: Overview;
  problemStatement: ProblemStatement;
  solution: Solution;
  engineeringDecisions: EngineeringDecision[];
  features: Feature[];
  architecture: Architecture;
  apiDocumentation: ApiEndpoint[];
  databaseDesign: DatabaseDesign;
  security: SecurityInfo;
  performance: PerformanceInfo;
  aiIntegration?: AiIntegration;
  challenges: Challenge[];
  developmentTimeline: TimelinePhase[];
  lessonsLearned: string[];
  futureRoadmap: string[];
  repository: RepositoryInfo;
}

export interface ProjectIndexItem {
  id: ProjectId;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  color: string;
}
