import { Quote as QuoteIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Quote } from '@/types/analysis';

interface QuoteCardProps {
  quote: Quote;
  className?: string;
}

export function QuoteCard({ quote, className }: QuoteCardProps) {
  const sentimentColors = {
    positive: 'border-l-success bg-success/5',
    negative: 'border-l-destructive bg-destructive/5',
    neutral: 'border-l-muted-foreground bg-muted/50',
  };

  return (
    <div className={cn(
      "p-4 rounded-lg border-l-4 transition-all duration-300 hover:translate-x-1",
      sentimentColors[quote.sentiment],
      className
    )}>
      <div className="flex items-start gap-3">
        <QuoteIcon className="w-4 h-4 text-muted-foreground shrink-0 mt-1" />
        <div className="flex-1 min-w-0">
          <p className="text-sm text-foreground/90 leading-relaxed italic">
            "{quote.text}"
          </p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs font-medium text-muted-foreground">
              @{quote.author}
            </span>
            <span className="text-xs text-muted-foreground/60">
              #{quote.id}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
