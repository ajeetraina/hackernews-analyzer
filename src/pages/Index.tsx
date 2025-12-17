import { useState } from 'react';
import { MessageSquare, Sparkles } from 'lucide-react';
import { UrlInput } from '@/components/UrlInput';
import { ModeSelector } from '@/components/ModeSelector';
import { LoadingState } from '@/components/LoadingState';
import { ExecutiveView } from '@/components/ExecutiveView';
import { FastView } from '@/components/FastView';
import { SubmitterView } from '@/components/SubmitterView';
import { DebateView } from '@/components/DebateView';
import { generateMockAnalysis } from '@/lib/mockData';
import type { AnalysisMode, AnalysisResult } from '@/types/analysis';

export default function Index() {
  const [mode, setMode] = useState<AnalysisMode>('executive');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = async (url: string) => {
    setIsLoading(true);
    setLoadingStep(0);
    setResult(null);

    // Simulate analysis steps
    await new Promise(r => setTimeout(r, 1000));
    setLoadingStep(1);
    await new Promise(r => setTimeout(r, 1500));
    setLoadingStep(2);
    await new Promise(r => setTimeout(r, 1000));

    // Generate mock result
    const analysisResult = generateMockAnalysis(mode, url);
    setResult(analysisResult);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Ambient background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-info/5 rounded-full blur-3xl" />
      </div>

      <div className="container max-w-6xl mx-auto px-4 py-8 md:py-16">
        {/* Header */}
        <header className="text-center mb-12 md:mb-16 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/20 glow">
              <MessageSquare className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              HN Thread <span className="text-gradient">Analyzer</span>
            </h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Transform Hacker News discussions into actionable product insights. 
            AI-powered sentiment analysis, theme extraction, and decision memos.
          </p>
        </header>

        {/* Input Section */}
        {!result && !isLoading && (
          <div className="space-y-8 animate-slide-up">
            <UrlInput onSubmit={handleAnalyze} isLoading={isLoading} />
            
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">Select analysis mode</p>
              <ModeSelector selected={mode} onSelect={setMode} />
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && <LoadingState currentStep={loadingStep} />}

        {/* Results */}
        {result && !isLoading && (
          <div className="space-y-8">
            {/* Back button */}
            <button
              onClick={() => setResult(null)}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Analyze another thread
            </button>

            {/* Mode tabs for switching */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {(['executive', 'fast', 'submitter', 'debate'] as AnalysisMode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => {
                    setMode(m);
                    setResult(generateMockAnalysis(m, ''));
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                    mode === m
                      ? 'bg-primary text-primary-foreground'
                      : 'glass hover:bg-secondary'
                  }`}
                >
                  {m.charAt(0).toUpperCase() + m.slice(1)}
                </button>
              ))}
            </div>

            {/* Analysis Views */}
            {result.executive && mode === 'executive' && (
              <ExecutiveView analysis={result.executive} thread={result.thread} />
            )}
            {result.fast && mode === 'fast' && (
              <FastView analysis={result.fast} thread={result.thread} />
            )}
            {result.submitter && mode === 'submitter' && (
              <SubmitterView analysis={result.submitter} thread={result.thread} />
            )}
            {result.debate && mode === 'debate' && (
              <DebateView analysis={result.debate} thread={result.thread} />
            )}
          </div>
        )}

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            Built for product leaders who want signal, not noise.
          </p>
        </footer>
      </div>
    </div>
  );
}
