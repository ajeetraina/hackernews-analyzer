import { Scale, Handshake, HelpCircle } from 'lucide-react';
import { AnalysisSection } from './AnalysisSection';
import { QuoteCard } from './QuoteCard';
import type { DebateAnalysis, HNThread } from '@/types/analysis';

interface DebateViewProps {
  analysis: DebateAnalysis;
  thread: HNThread;
}

export function DebateView({ analysis, thread }: DebateViewProps) {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="glass rounded-xl p-6 animate-fade-in">
        <h1 className="text-2xl font-bold text-foreground mb-2">{thread.title}</h1>
        <p className="text-muted-foreground">Debate Map Analysis</p>
      </div>

      {/* Debate Sides */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Side A */}
        <AnalysisSection title={analysis.sideA.name} icon={Scale} delay={100}>
          <div className="space-y-4">
            {analysis.sideA.claims.map((item, i) => (
              <div key={i} className="glass rounded-xl p-5 border-l-4 border-info">
                <h4 className="font-semibold text-foreground mb-3">{item.claim}</h4>
                {item.evidence[0] && <QuoteCard quote={item.evidence[0]} />}
              </div>
            ))}
          </div>
        </AnalysisSection>

        {/* Side B */}
        <AnalysisSection title={analysis.sideB.name} icon={Scale} delay={200}>
          <div className="space-y-4">
            {analysis.sideB.claims.map((item, i) => (
              <div key={i} className="glass rounded-xl p-5 border-l-4 border-warning">
                <h4 className="font-semibold text-foreground mb-3">{item.claim}</h4>
                {item.evidence[0] && <QuoteCard quote={item.evidence[0]} />}
              </div>
            ))}
          </div>
        </AnalysisSection>
      </div>

      {/* Points of Agreement */}
      <AnalysisSection title="Points of Agreement" icon={Handshake} delay={300}>
        <div className="glass rounded-xl p-6">
          <ul className="space-y-3">
            {analysis.agreements.map((point, i) => (
              <li key={i} className="flex items-start gap-3 text-foreground/90">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-success/20 text-success shrink-0 mt-0.5">
                  ✓
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </AnalysisSection>

      {/* Settling Evidence */}
      <AnalysisSection title="What Would Settle the Debate" icon={HelpCircle} delay={400}>
        <div className="glass rounded-xl p-6">
          <ul className="space-y-3">
            {analysis.settlingEvidence.map((point, i) => (
              <li key={i} className="flex items-start gap-3 text-foreground/90">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-sm font-bold shrink-0 mt-0.5">
                  {i + 1}
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </AnalysisSection>
    </div>
  );
}
