import { 
  FileText, 
  TrendingUp, 
  Tags, 
  AlertTriangle, 
  Lightbulb, 
  Lock, 
  Users,
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnalysisSection } from './AnalysisSection';
import { SentimentBadge } from './SentimentBadge';
import { SentimentBar } from './SentimentBar';
import { ThemeCard } from './ThemeCard';
import { PainPointCard } from './PainPointCard';
import { QuoteCard } from './QuoteCard';
import { DecisionMemo } from './DecisionMemo';
import type { ExecutiveAnalysis, HNThread } from '@/types/analysis';

interface ExecutiveViewProps {
  analysis: ExecutiveAnalysis;
  thread: HNThread;
}

export function ExecutiveView({ analysis, thread }: ExecutiveViewProps) {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="glass rounded-xl p-6 animate-fade-in">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-2">{thread.title}</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>@{thread.author}</span>
              <span>•</span>
              <span>{thread.points} points</span>
              <span>•</span>
              <span>{thread.commentCount} comments</span>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <SentimentBadge sentiment={analysis.sentiment} size="lg" />
          <p className="text-sm text-muted-foreground flex-1">
            {analysis.sentiment.reason}
          </p>
        </div>
        
        <SentimentBar distribution={analysis.sentiment.distribution} className="mt-6" />
      </div>

      {/* TL;DR */}
      <AnalysisSection title="Executive TL;DR" icon={FileText} delay={100}>
        <div className="glass rounded-xl p-6">
          <ul className="space-y-4">
            {analysis.tldr.map((point, i) => (
              <li key={i} className="flex items-start gap-3 text-foreground/90">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-bold shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <p>{point}</p>
              </li>
            ))}
          </ul>
        </div>
      </AnalysisSection>

      {/* Themes */}
      <AnalysisSection title="Top Themes" icon={Tags} delay={200}>
        <div className="space-y-4">
          {analysis.themes.map((theme, i) => (
            <ThemeCard key={theme.name} theme={theme} index={i} />
          ))}
        </div>
      </AnalysisSection>

      {/* Pain Points */}
      <AnalysisSection title="Pain Points & Objections" icon={AlertTriangle} delay={300}>
        <div className="grid gap-4 md:grid-cols-2">
          {analysis.painPoints.map((painPoint, i) => (
            <PainPointCard key={i} painPoint={painPoint} rank={i + 1} />
          ))}
        </div>
      </AnalysisSection>

      {/* Feature Requests */}
      <AnalysisSection title="Feature Requests & Jobs to be Done" icon={Lightbulb} delay={400}>
        <div className="glass rounded-xl divide-y divide-border">
          {analysis.featureRequests.map((request, i) => (
            <div key={i} className="p-5">
              <h4 className="font-semibold text-foreground mb-1">{request.description}</h4>
              <p className="text-sm text-muted-foreground mb-3">
                <span className="text-primary font-medium">JTBD:</span> {request.jobToBeDone}
              </p>
              {request.evidence[0] && (
                <QuoteCard quote={request.evidence[0]} />
              )}
            </div>
          ))}
        </div>
      </AnalysisSection>

      {/* Adoption Blockers */}
      <AnalysisSection title="Adoption Blockers" icon={Lock} delay={500}>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {analysis.adoptionBlockers.map((blocker, i) => (
            <div key={i} className="glass rounded-xl p-4">
              <span className="inline-block px-2 py-1 rounded-md bg-warning/20 text-warning text-xs font-medium uppercase mb-2">
                {blocker.type.replace('_', ' ')}
              </span>
              <p className="text-sm text-foreground/90">{blocker.description}</p>
            </div>
          ))}
        </div>
      </AnalysisSection>

      {/* Competitors */}
      {analysis.competitors.length > 0 && (
        <AnalysisSection title="Competitive Mentions" icon={Users} delay={600}>
          <div className="glass rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left p-4 font-semibold text-foreground">Product</th>
                  <th className="text-left p-4 font-semibold text-success">Praised For</th>
                  <th className="text-left p-4 font-semibold text-destructive">Criticized For</th>
                </tr>
              </thead>
              <tbody>
                {analysis.competitors.map((comp, i) => (
                  <tr key={i} className="border-b border-border last:border-0">
                    <td className="p-4 font-medium text-foreground">{comp.name}</td>
                    <td className="p-4">
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {comp.praises.map((p, j) => (
                          <li key={j} className="flex items-start gap-2">
                            <span className="text-success">+</span> {p}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="p-4">
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {comp.criticisms.map((c, j) => (
                          <li key={j} className="flex items-start gap-2">
                            <span className="text-destructive">−</span> {c}
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AnalysisSection>
      )}

      {/* Decision Memo */}
      <AnalysisSection title="Decision Memo" icon={TrendingUp} delay={700}>
        <DecisionMemo memo={analysis.decisionMemo} />
      </AnalysisSection>
    </div>
  );
}
