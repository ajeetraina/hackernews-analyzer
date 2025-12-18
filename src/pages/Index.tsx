import { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { UrlInput } from '@/components/UrlInput';
import { ModeSelector } from '@/components/ModeSelector';
import { LoadingState } from '@/components/LoadingState';
import { ExecutiveView } from '@/components/ExecutiveView';
import { FastView } from '@/components/FastView';
import { SubmitterView } from '@/components/SubmitterView';
import { DebateView } from '@/components/DebateView';
import { fetchHNThread, parseHNUrl } from '@/lib/hackerNewsApi';
import { analyzeThread } from '@/lib/aiAnalysis';
import { generateMockAnalysis } from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';
import type { AnalysisMode, AnalysisResult } from '@/types/analysis';

export default function Index() {
  const [mode, setMode] = useState<AnalysisMode>('executive');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [analyzedUrl, setAnalyzedUrl] = useState('');
  const [useMockData, setUseMockData] = useState(false); // Toggle for testing
  const { toast } = useToast();

  const handleAnalyze = async (url: string) => {
    setIsLoading(true);
    setLoadingStep(0);
    setResult(null);
    setAnalyzedUrl(url);

    try {
      // Parse the HN URL
      const itemId = parseHNUrl(url);
      if (!itemId) {
        throw new Error('Invalid Hacker News URL. Please provide a valid thread URL.');
      }

      // Step 1: Fetch thread data
      setLoadingStep(1);
      const thread = await fetchHNThread(itemId);
      
      await new Promise(r => setTimeout(r, 500)); // Brief pause for UX

      // Step 2: Analyze with AI
      setLoadingStep(2);
      
      let analysisResult: AnalysisResult;
      
      if (useMockData) {
        // Use mock data for testing
        analysisResult = generateMockAnalysis(mode, url);
      } else {
        // Use real AI analysis
        try {
          analysisResult = await analyzeThread(thread, mode);
        } catch (aiError) {
          // If AI analysis fails, fall back to mock data and notify user
          console.error('AI analysis failed:', aiError);
          toast({
            title: 'Using Mock Data',
            description: 'AI analysis is not yet configured. Showing mock data instead.',
            variant: 'default',
          });
          analysisResult = generateMockAnalysis(mode, url);
          analysisResult.thread = thread; // Use real thread data
        }
      }

      setResult(analysisResult);
      
    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: 'Analysis Failed',
        description: error instanceof Error ? error.message : 'An unexpected error occurred',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleModeSwitch = async (newMode: AnalysisMode) => {
    if (!result) return;
    
    setMode(newMode);
    setIsLoading(true);
    
    try {
      let newResult: AnalysisResult;
      
      if (useMockData) {
        newResult = generateMockAnalysis(newMode, analyzedUrl);
      } else {
        try {
          newResult = await analyzeThread(result.thread, newMode);
        } catch (aiError) {
          console.error('AI analysis failed:', aiError);
          newResult = generateMockAnalysis(newMode, analyzedUrl);
          newResult.thread = result.thread;
        }
      }
      
      setResult(newResult);
    } catch (error) {
      console.error('Mode switch error:', error);
      toast({
        title: 'Analysis Failed',
        description: 'Could not switch analysis mode',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
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
          
          {/* Dev toggle for testing */}
          {import.meta.env.DEV && (
            <div className="mt-4">
              <label className="inline-flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={useMockData}
                  onChange={(e) => setUseMockData(e.target.checked)}
                  className="rounded"
                />
                Use mock data (dev only)
              </label>
            </div>
          )}
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
                  onClick={() => handleModeSwitch(m)}
                  disabled={isLoading}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                    mode === m
                      ? 'bg-primary text-primary-foreground'
                      : 'glass hover:bg-secondary'
                  } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
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
