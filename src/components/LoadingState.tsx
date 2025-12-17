import { Loader2, FileSearch, Brain, Sparkles } from 'lucide-react';

const steps = [
  { icon: FileSearch, label: 'Fetching thread data...' },
  { icon: Brain, label: 'Analyzing sentiment & themes...' },
  { icon: Sparkles, label: 'Generating insights...' },
];

interface LoadingStateProps {
  currentStep?: number;
}

export function LoadingState({ currentStep = 0 }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
      <div className="relative mb-8">
        <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center glow">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
        </div>
        <div className="absolute -inset-4 rounded-3xl border border-primary/20 animate-pulse" />
      </div>
      
      <div className="space-y-4 text-center">
        {steps.map((step, i) => {
          const Icon = step.icon;
          const isActive = i === currentStep;
          const isDone = i < currentStep;
          
          return (
            <div
              key={i}
              className={`flex items-center gap-3 transition-all duration-300 ${
                isActive ? 'text-primary' : isDone ? 'text-success' : 'text-muted-foreground/50'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive && 'animate-pulse'}`} />
              <span className="text-sm font-medium">{step.label}</span>
              {isDone && <span className="text-success">✓</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
