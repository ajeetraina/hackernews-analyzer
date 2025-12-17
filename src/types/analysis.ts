export type AnalysisMode = 'executive' | 'submitter' | 'fast' | 'debate';

export interface Quote {
  id: string;
  text: string;
  author: string;
  sentiment: 'positive' | 'negative' | 'neutral';
}

export interface Theme {
  name: string;
  description: string;
  whoItMatters: string;
  quotes: Quote[];
}

export interface PainPoint {
  issue: string;
  frequency: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  evidence: Quote[];
}

export interface FeatureRequest {
  description: string;
  jobToBeDone: string;
  evidence: Quote[];
}

export interface CompetitorMention {
  name: string;
  praises: string[];
  criticisms: string[];
}

export interface AdoptionBlocker {
  type: 'pricing' | 'trust' | 'integration' | 'ux' | 'compliance' | 'switching_cost' | 'other';
  description: string;
  evidence: Quote[];
}

export interface SentimentAnalysis {
  overall: 'very_positive' | 'positive' | 'mixed' | 'negative' | 'very_negative';
  confidence: number;
  reason: string;
  distribution: {
    positive: number;
    neutral: number;
    negative: number;
  };
}

export interface ExecutiveAnalysis {
  tldr: string[];
  sentiment: SentimentAnalysis;
  themes: Theme[];
  painPoints: PainPoint[];
  featureRequests: FeatureRequest[];
  adoptionBlockers: AdoptionBlocker[];
  competitors: CompetitorMention[];
  decisionMemo: {
    shouldWeCare: boolean;
    opportunities: string[];
    risks: string[];
    nextSteps: string[];
  };
}

export interface SubmitterFeedback {
  resonated: { point: string; evidence: Quote[] }[];
  confused: { point: string; evidence: Quote[] }[];
  negativeReactions: { point: string; evidence: Quote[] }[];
  mostRequestedProof: string;
  suggestedTitle: string;
  suggestedBody: string;
}

export interface FastAnalysis {
  sentimentLabel: string;
  sentimentExplanation: string;
  themeTags: string[];
  bestQuotes: Quote[];
  actionItems: string[];
}

export interface DebateSide {
  name: string;
  claims: { claim: string; evidence: Quote[] }[];
}

export interface DebateAnalysis {
  sideA: DebateSide;
  sideB: DebateSide;
  agreements: string[];
  settlingEvidence: string[];
}

export interface HNThread {
  id: string;
  title: string;
  url?: string;
  text?: string;
  author: string;
  points: number;
  commentCount: number;
  comments: HNComment[];
}

export interface HNComment {
  id: string;
  author: string;
  text: string;
  time: string;
  children: HNComment[];
}

export interface AnalysisResult {
  mode: AnalysisMode;
  thread: HNThread;
  executive?: ExecutiveAnalysis;
  submitter?: SubmitterFeedback;
  fast?: FastAnalysis;
  debate?: DebateAnalysis;
  generatedAt: string;
}
