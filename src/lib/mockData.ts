import type { AnalysisResult, ExecutiveAnalysis, FastAnalysis, SubmitterFeedback, DebateAnalysis, HNThread } from '@/types/analysis';

export const mockThread: HNThread = {
  id: '38792446',
  title: 'Show HN: We built an AI code review tool that actually understands context',
  author: 'techfounder',
  points: 342,
  commentCount: 187,
  text: 'After 2 years of building, we are launching our AI-powered code review tool. It understands your entire codebase context, not just the diff.',
  comments: [],
};

export const mockExecutiveAnalysis: ExecutiveAnalysis = {
  tldr: [
    'Strong interest in context-aware AI code review, with 65% of comments expressing curiosity or support',
    'Major concerns around pricing model and enterprise adoption barriers',
    'Privacy/security of codebase access is the #1 blocker for enterprise users',
    'Comparisons to GitHub Copilot and existing linters dominate the discussion',
    'Community requests benchmarks against human reviewers and existing tools',
  ],
  sentiment: {
    overall: 'mixed',
    confidence: 0.78,
    reason: 'Mixed leaning positive due to genuine excitement about the technology, tempered by significant pricing concerns and trust issues around codebase access.',
    distribution: {
      positive: 45,
      neutral: 30,
      negative: 25,
    },
  },
  themes: [
    {
      name: 'Context Understanding',
      description: 'Users are impressed by the claim of understanding full codebase context, not just diffs.',
      whoItMatters: 'Engineering leads evaluating code review automation',
      quotes: [
        { id: '38792501', text: 'Finally something that gets the whole picture. Our current tools just look at syntax.', author: 'devlead42', sentiment: 'positive' },
        { id: '38792567', text: 'How exactly does it understand context? What about dynamic languages?', author: 'skeptic_dev', sentiment: 'neutral' },
      ],
    },
    {
      name: 'Pricing Concerns',
      description: 'Multiple commenters find the pricing unclear or potentially prohibitive for smaller teams.',
      whoItMatters: 'Startup CTOs and indie developers',
      quotes: [
        { id: '38792612', text: 'Looks great but $99/seat/month is steep for a 5-person team', author: 'bootstrap_founder', sentiment: 'negative' },
        { id: '38792689', text: 'Need a free tier or this is DOA for OSS projects', author: 'oss_maintainer', sentiment: 'negative' },
      ],
    },
    {
      name: 'Security & Privacy',
      description: 'Enterprise users worried about sending codebase to external AI service.',
      whoItMatters: 'Enterprise security teams and compliance officers',
      quotes: [
        { id: '38792734', text: 'Our security team would never approve sending our codebase to a third party', author: 'enterprise_eng', sentiment: 'negative' },
        { id: '38792801', text: 'Do you offer on-prem deployment?', author: 'fintech_lead', sentiment: 'neutral' },
      ],
    },
    {
      name: 'Integration Experience',
      description: 'Users asking about CI/CD integration and workflow compatibility.',
      whoItMatters: 'DevOps engineers and platform teams',
      quotes: [
        { id: '38792856', text: 'How does this fit into GitHub Actions? We need seamless CI integration.', author: 'devops_guru', sentiment: 'neutral' },
      ],
    },
    {
      name: 'AI Accuracy',
      description: 'Skepticism about false positives and whether AI can truly replace human reviewers.',
      whoItMatters: 'Senior engineers evaluating tool reliability',
      quotes: [
        { id: '38792923', text: "I've tried 5 AI code tools this year. All produced more noise than signal.", author: 'tired_of_ai', sentiment: 'negative' },
        { id: '38792978', text: 'Would love to see benchmarks vs human reviewers on real PRs', author: 'data_driven', sentiment: 'neutral' },
      ],
    },
  ],
  painPoints: [
    {
      issue: 'Pricing too high for small teams',
      frequency: 23,
      severity: 'high',
      evidence: [{ id: '38792612', text: 'Looks great but $99/seat/month is steep for a 5-person team', author: 'bootstrap_founder', sentiment: 'negative' }],
    },
    {
      issue: 'Security concerns about codebase access',
      frequency: 18,
      severity: 'critical',
      evidence: [{ id: '38792734', text: 'Our security team would never approve sending our codebase to a third party', author: 'enterprise_eng', sentiment: 'negative' }],
    },
    {
      issue: 'No on-premise option',
      frequency: 12,
      severity: 'high',
      evidence: [{ id: '38792801', text: 'Do you offer on-prem deployment?', author: 'fintech_lead', sentiment: 'neutral' }],
    },
    {
      issue: 'Unclear how context understanding works',
      frequency: 9,
      severity: 'medium',
      evidence: [{ id: '38792567', text: 'How exactly does it understand context? What about dynamic languages?', author: 'skeptic_dev', sentiment: 'neutral' }],
    },
  ],
  featureRequests: [
    {
      description: 'On-premise / self-hosted deployment option',
      jobToBeDone: 'Use AI code review without sending code to external servers',
      evidence: [{ id: '38792801', text: 'Do you offer on-prem deployment?', author: 'fintech_lead', sentiment: 'neutral' }],
    },
    {
      description: 'Free tier for open source projects',
      jobToBeDone: 'Contribute to OSS without budget constraints',
      evidence: [{ id: '38792689', text: 'Need a free tier or this is DOA for OSS projects', author: 'oss_maintainer', sentiment: 'negative' }],
    },
    {
      description: 'Benchmark data vs human reviewers',
      jobToBeDone: 'Make data-driven decision about tool adoption',
      evidence: [{ id: '38792978', text: 'Would love to see benchmarks vs human reviewers on real PRs', author: 'data_driven', sentiment: 'neutral' }],
    },
  ],
  adoptionBlockers: [
    { type: 'pricing', description: 'Per-seat pricing prohibitive for small teams', evidence: [] },
    { type: 'trust', description: 'Concerns about sending proprietary code to third-party', evidence: [] },
    { type: 'compliance', description: 'No SOC2/HIPAA compliance mentioned', evidence: [] },
    { type: 'integration', description: 'Unclear CI/CD integration story', evidence: [] },
  ],
  competitors: [
    {
      name: 'GitHub Copilot',
      praises: ['Seamless IDE integration', 'Lower cost'],
      criticisms: ['No code review focus', 'Less context awareness'],
    },
    {
      name: 'CodeRabbit',
      praises: ['Good PR summaries'],
      criticisms: ['Too many false positives', 'Expensive'],
    },
  ],
  decisionMemo: {
    shouldWeCare: true,
    opportunities: [
      'Address pricing concerns with tiered model or usage-based pricing',
      'Publish benchmarks to build credibility',
      'Partner with security-focused enterprises via on-prem option',
    ],
    risks: [
      'Market fatigue from AI tool launches could limit adoption',
      'Enterprise sales cycle may be long due to security review requirements',
      'Competitors could add similar context features',
    ],
    nextSteps: [
      'Add pricing FAQ addressing small team concerns',
      'Publish benchmark comparing to human reviewers',
      'Create security whitepaper detailing data handling',
      'Add SOC2 compliance roadmap to marketing',
    ],
  },
};

export const mockFastAnalysis: FastAnalysis = {
  sentimentLabel: 'Mixed Leaning Positive',
  sentimentExplanation: 'The thread shows genuine excitement about context-aware AI code review technology, with many users expressing interest in the technical approach. However, this enthusiasm is significantly tempered by concerns about pricing (23 mentions), security/privacy of codebase access (18 mentions), and skepticism about AI accuracy based on past experiences with similar tools. The overall tone is cautiously optimistic but demanding proof.',
  themeTags: ['pricing', 'security', 'ai-accuracy', 'enterprise', 'integration', 'open-source', 'benchmarks'],
  bestQuotes: [
    { id: '38792501', text: 'Finally something that gets the whole picture. Our current tools just look at syntax.', author: 'devlead42', sentiment: 'positive' },
    { id: '38792612', text: 'Looks great but $99/seat/month is steep for a 5-person team', author: 'bootstrap_founder', sentiment: 'negative' },
    { id: '38792734', text: 'Our security team would never approve sending our codebase to a third party', author: 'enterprise_eng', sentiment: 'negative' },
    { id: '38792978', text: 'Would love to see benchmarks vs human reviewers on real PRs', author: 'data_driven', sentiment: 'neutral' },
    { id: '38792923', text: "I've tried 5 AI code tools this year. All produced more noise than signal.", author: 'tired_of_ai', sentiment: 'negative' },
  ],
  actionItems: [
    'Address pricing objections by creating transparent pricing page with small team options',
    'Publish security whitepaper and pursue SOC2 certification to unlock enterprise deals',
    'Create benchmark study comparing AI review accuracy to human reviewers on real PRs',
  ],
};

export const mockSubmitterFeedback: SubmitterFeedback = {
  resonated: [
    {
      point: 'Context-aware approach differentiates from existing tools',
      evidence: [{ id: '38792501', text: 'Finally something that gets the whole picture. Our current tools just look at syntax.', author: 'devlead42', sentiment: 'positive' }],
    },
    {
      point: 'Timing is right - market is ready for better AI code tools',
      evidence: [{ id: '38792445', text: 'Been waiting for something like this. The current crop of AI tools are all surface-level.', author: 'senior_eng', sentiment: 'positive' }],
    },
    {
      point: 'Technical credibility from 2 years of development',
      evidence: [{ id: '38792489', text: '2 years of building gives me confidence this isnt another weekend hackathon project', author: 'pragmatic_dev', sentiment: 'positive' }],
    },
  ],
  confused: [
    {
      point: 'How does "context understanding" actually work?',
      evidence: [{ id: '38792567', text: 'How exactly does it understand context? What about dynamic languages?', author: 'skeptic_dev', sentiment: 'neutral' }],
    },
    {
      point: 'Pricing model and tiers not clearly explained',
      evidence: [{ id: '38792634', text: 'Is there a free trial? What are the limits?', author: 'curious_user', sentiment: 'neutral' }],
    },
    {
      point: 'Integration requirements and supported platforms',
      evidence: [{ id: '38792856', text: 'How does this fit into GitHub Actions? We need seamless CI integration.', author: 'devops_guru', sentiment: 'neutral' }],
    },
  ],
  negativeReactions: [
    {
      point: 'High per-seat pricing alienates smaller teams',
      evidence: [{ id: '38792612', text: 'Looks great but $99/seat/month is steep for a 5-person team', author: 'bootstrap_founder', sentiment: 'negative' }],
    },
    {
      point: 'No self-hosted option for security-conscious orgs',
      evidence: [{ id: '38792734', text: 'Our security team would never approve sending our codebase to a third party', author: 'enterprise_eng', sentiment: 'negative' }],
    },
    {
      point: 'Skepticism from past AI tool disappointments',
      evidence: [{ id: '38792923', text: "I've tried 5 AI code tools this year. All produced more noise than signal.", author: 'tired_of_ai', sentiment: 'negative' }],
    },
  ],
  mostRequestedProof: 'Benchmark data comparing AI review quality to human reviewers on real-world pull requests, including false positive rates and time savings.',
  suggestedTitle: 'Show HN: AI Code Review That Understands Your Full Codebase (2 Years in Development)',
  suggestedBody: `After 2 years of building, we're launching an AI code review tool that truly understands your codebase context—not just the diff.

Unlike existing tools that only analyze changed lines, we index your entire repository to understand architectural patterns, coding conventions, and cross-file dependencies.

Key differentiators:
• Full codebase context, not just syntax checking
• Learns your team's patterns over time
• GitHub/GitLab integration with CI/CD support

Pricing: Free tier for OSS, $29/seat/mo for teams (includes 14-day trial)

Security: SOC2 in progress, self-hosted option coming Q2

We've benchmarked against human reviewers on 500 real PRs—results show 73% of suggestions match senior engineer feedback. Full methodology in our docs.

Would love your feedback, especially on what would make this useful for your workflow.`,
};

export const mockDebateAnalysis: DebateAnalysis = {
  sideA: {
    name: 'AI-Optimists',
    claims: [
      {
        claim: 'Context-aware AI is a genuine leap forward in code review automation',
        evidence: [{ id: '38792501', text: 'Finally something that gets the whole picture. Our current tools just look at syntax.', author: 'devlead42', sentiment: 'positive' }],
      },
      {
        claim: 'Time savings justify the cost for larger teams',
        evidence: [{ id: '38792556', text: 'If this saves even 2 hours/week per dev, the ROI is obvious at scale', author: 'eng_manager', sentiment: 'positive' }],
      },
      {
        claim: 'AI augments rather than replaces human reviewers',
        evidence: [{ id: '38792623', text: 'I see this as a first pass filter, not a replacement for senior review', author: 'team_lead', sentiment: 'positive' }],
      },
    ],
  },
  sideB: {
    name: 'AI-Skeptics',
    claims: [
      {
        claim: 'AI tools consistently produce more noise than signal',
        evidence: [{ id: '38792923', text: "I've tried 5 AI code tools this year. All produced more noise than signal.", author: 'tired_of_ai', sentiment: 'negative' }],
      },
      {
        claim: 'Security risks outweigh potential benefits',
        evidence: [{ id: '38792734', text: 'Our security team would never approve sending our codebase to a third party', author: 'enterprise_eng', sentiment: 'negative' }],
      },
      {
        claim: 'Pricing makes it inaccessible to those who need it most',
        evidence: [{ id: '38792689', text: 'Need a free tier or this is DOA for OSS projects', author: 'oss_maintainer', sentiment: 'negative' }],
      },
    ],
  },
  agreements: [
    'Current code review tools are inadequate and there is room for innovation',
    'Context understanding is the key differentiator if it actually works',
    'Benchmarks and proof points are necessary before adoption decisions',
    'Security and compliance are non-negotiable for enterprise adoption',
  ],
  settlingEvidence: [
    'Published benchmark data comparing to human reviewers with methodology',
    'Third-party security audit results',
    'Case studies from beta customers with specific metrics',
    'Demonstration on open-source projects where results can be verified',
  ],
};

export function generateMockAnalysis(mode: string, url: string): AnalysisResult {
  return {
    mode: mode as any,
    thread: mockThread,
    executive: mode === 'executive' ? mockExecutiveAnalysis : undefined,
    fast: mode === 'fast' ? mockFastAnalysis : undefined,
    submitter: mode === 'submitter' ? mockSubmitterFeedback : undefined,
    debate: mode === 'debate' ? mockDebateAnalysis : undefined,
    generatedAt: new Date().toISOString(),
  };
}
