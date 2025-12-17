import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { SentimentAnalysis } from '@/types/analysis';

interface SentimentBadgeProps {
  sentiment: SentimentAnalysis;
  size?: 'sm' | 'md' | 'lg';
}

export function SentimentBadge({ sentiment, size = 'md' }: SentimentBadgeProps) {
  const config = {
    very_positive: {
      label: 'Very Positive',
      icon: TrendingUp,
      className: 'bg-success/20 text-success border-success/30',
    },
    positive: {
      label: 'Positive',
      icon: TrendingUp,
      className: 'bg-success/15 text-success border-success/20',
    },
    mixed: {
      label: 'Mixed',
      icon: Minus,
      className: 'bg-warning/20 text-warning border-warning/30',
    },
    negative: {
      label: 'Negative',
      icon: TrendingDown,
      className: 'bg-destructive/15 text-destructive border-destructive/20',
    },
    very_negative: {
      label: 'Very Negative',
      icon: TrendingDown,
      className: 'bg-destructive/20 text-destructive border-destructive/30',
    },
  };

  const { label, icon: Icon, className } = config[sentiment.overall];

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  return (
    <div className={cn(
      "inline-flex items-center gap-1.5 rounded-full border font-medium",
      className,
      sizes[size]
    )}>
      <Icon className="w-3.5 h-3.5" />
      <span>{label}</span>
      <span className="opacity-60">({Math.round(sentiment.confidence * 100)}%)</span>
    </div>
  );
}
