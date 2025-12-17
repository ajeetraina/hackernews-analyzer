import { cn } from '@/lib/utils';

interface SentimentBarProps {
  distribution: {
    positive: number;
    neutral: number;
    negative: number;
  };
  className?: string;
}

export function SentimentBar({ distribution, className }: SentimentBarProps) {
  const total = distribution.positive + distribution.neutral + distribution.negative;
  
  const percentages = {
    positive: Math.round((distribution.positive / total) * 100),
    neutral: Math.round((distribution.neutral / total) * 100),
    negative: Math.round((distribution.negative / total) * 100),
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex h-3 rounded-full overflow-hidden bg-muted">
        <div 
          className="bg-success transition-all duration-500"
          style={{ width: `${percentages.positive}%` }}
        />
        <div 
          className="bg-muted-foreground/40 transition-all duration-500"
          style={{ width: `${percentages.neutral}%` }}
        />
        <div 
          className="bg-destructive transition-all duration-500"
          style={{ width: `${percentages.negative}%` }}
        />
      </div>
      
      <div className="flex justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-success" />
          <span>Positive {percentages.positive}%</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-muted-foreground/40" />
          <span>Neutral {percentages.neutral}%</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-destructive" />
          <span>Negative {percentages.negative}%</span>
        </div>
      </div>
    </div>
  );
}
