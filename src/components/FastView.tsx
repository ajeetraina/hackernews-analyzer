import { Zap, Tag, Quote, ListChecks } from 'lucide-react';
import { AnalysisSection } from './AnalysisSection';
import { QuoteCard } from './QuoteCard';
import type { FastAnalysis, HNThread } from '@/types/analysis';

interface FastViewProps {
  analysis: FastAnalysis;
  thread: HNThread;
}

export function FastView({ analysis, thread }: FastViewProps) {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="glass rounded-xl p-6 animate-fade-in">
        <h1 className="text-2xl font-bold text-foreground mb-2">{thread.title}</h1>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <span>@{thread.author}</span>
          <span>•</span>
          <span>{thread.points} points</span>
          <span>•</span>
          <span>{thread.commentCount} comments</span>
        </div>
        
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary font-semibold">
          <Zap className="w-4 h-4" />
          {analysis.sentimentLabel}
        </div>
      </div>

      {/* Sentiment Explanation */}
      <AnalysisSection title="Sentiment Analysis" icon={Zap} delay={100}>
        <div className="glass rounded-xl p-6">
          <p className="text-foreground/90 leading-relaxed">{analysis.sentimentExplanation}</p>
        </div>
      </AnalysisSection>

      {/* Theme Tags */}
      <AnalysisSection title="Theme Tags" icon={Tag} delay={200}>
        <div className="flex flex-wrap gap-3">
          {analysis.themeTags.map((tag, i) => (
            <span
              key={i}
              className="px-4 py-2 rounded-full glass text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary transition-colors cursor-default"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              #{tag}
            </span>
          ))}
        </div>
      </AnalysisSection>

      {/* Best Quotes */}
      <AnalysisSection title="Best Quotes" icon={Quote} delay={300}>
        <div className="space-y-4">
          {analysis.bestQuotes.map((quote) => (
            <QuoteCard key={quote.id} quote={quote} />
          ))}
        </div>
      </AnalysisSection>

      {/* Action Items */}
      <AnalysisSection title="Action Items for PM" icon={ListChecks} delay={400}>
        <div className="glass rounded-xl p-6">
          <ul className="space-y-4">
            {analysis.actionItems.map((item, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/20 text-primary font-bold shrink-0">
                  {i + 1}
                </span>
                <p className="text-foreground/90 pt-1">{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </AnalysisSection>
    </div>
  );
}
