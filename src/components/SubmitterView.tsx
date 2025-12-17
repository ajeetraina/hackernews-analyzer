import { ThumbsUp, HelpCircle, ThumbsDown, Search, FileEdit } from 'lucide-react';
import { AnalysisSection } from './AnalysisSection';
import { QuoteCard } from './QuoteCard';
import type { SubmitterFeedback, HNThread } from '@/types/analysis';

interface SubmitterViewProps {
  analysis: SubmitterFeedback;
  thread: HNThread;
}

export function SubmitterView({ analysis, thread }: SubmitterViewProps) {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="glass rounded-xl p-6 animate-fade-in">
        <h1 className="text-2xl font-bold text-foreground mb-2">{thread.title}</h1>
        <p className="text-muted-foreground">Feedback for @{thread.author}</p>
      </div>

      {/* What Resonated */}
      <AnalysisSection title="What Resonated (Top 3)" icon={ThumbsUp} delay={100}>
        <div className="space-y-4">
          {analysis.resonated.map((item, i) => (
            <div key={i} className="glass rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-success/20 text-success text-sm font-bold">
                  {i + 1}
                </span>
                <h4 className="font-semibold text-foreground">{item.point}</h4>
              </div>
              {item.evidence[0] && <QuoteCard quote={item.evidence[0]} />}
            </div>
          ))}
        </div>
      </AnalysisSection>

      {/* What Confused People */}
      <AnalysisSection title="What Confused People (Top 3)" icon={HelpCircle} delay={200}>
        <div className="space-y-4">
          {analysis.confused.map((item, i) => (
            <div key={i} className="glass rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-warning/20 text-warning text-sm font-bold">
                  {i + 1}
                </span>
                <h4 className="font-semibold text-foreground">{item.point}</h4>
              </div>
              {item.evidence[0] && <QuoteCard quote={item.evidence[0]} />}
            </div>
          ))}
        </div>
      </AnalysisSection>

      {/* Negative Reactions */}
      <AnalysisSection title="What Triggered Negative Reactions (Top 3)" icon={ThumbsDown} delay={300}>
        <div className="space-y-4">
          {analysis.negativeReactions.map((item, i) => (
            <div key={i} className="glass rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-destructive/20 text-destructive text-sm font-bold">
                  {i + 1}
                </span>
                <h4 className="font-semibold text-foreground">{item.point}</h4>
              </div>
              {item.evidence[0] && <QuoteCard quote={item.evidence[0]} />}
            </div>
          ))}
        </div>
      </AnalysisSection>

      {/* Most Requested Proof */}
      <AnalysisSection title="Most Requested Proof" icon={Search} delay={400}>
        <div className="glass rounded-xl p-6 border-l-4 border-primary">
          <p className="text-lg text-foreground/90">{analysis.mostRequestedProof}</p>
        </div>
      </AnalysisSection>

      {/* Suggested Revised Post */}
      <AnalysisSection title="Suggested Revised HN Post" icon={FileEdit} delay={500}>
        <div className="glass rounded-xl overflow-hidden">
          <div className="p-5 border-b border-border bg-primary/5">
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Suggested Title</h4>
            <p className="text-xl font-bold text-primary">{analysis.suggestedTitle}</p>
          </div>
          <div className="p-5">
            <h4 className="text-sm font-medium text-muted-foreground mb-3">Suggested Body</h4>
            <p className="text-foreground/90 leading-relaxed whitespace-pre-wrap">{analysis.suggestedBody}</p>
          </div>
        </div>
      </AnalysisSection>
    </div>
  );
}
