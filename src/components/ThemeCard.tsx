import { useState } from 'react';
import { ChevronDown, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { QuoteCard } from './QuoteCard';
import type { Theme } from '@/types/analysis';

interface ThemeCardProps {
  theme: Theme;
  index: number;
}

export function ThemeCard({ theme, index }: ThemeCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className="glass rounded-xl overflow-hidden transition-all duration-300 animate-slide-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-5 text-left hover:bg-secondary/30 transition-colors duration-200"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary/20 text-primary text-sm font-bold">
                {index + 1}
              </span>
              <h3 className="text-lg font-semibold text-foreground">{theme.name}</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              {theme.description}
            </p>
            <div className="flex items-center gap-2 text-xs text-primary">
              <Users className="w-3.5 h-3.5" />
              <span>{theme.whoItMatters}</span>
            </div>
          </div>
          <ChevronDown className={cn(
            "w-5 h-5 text-muted-foreground transition-transform duration-200",
            isExpanded && "rotate-180"
          )} />
        </div>
      </button>
      
      {isExpanded && (
        <div className="px-5 pb-5 space-y-3 animate-fade-in">
          <div className="h-px bg-border" />
          <h4 className="text-sm font-medium text-muted-foreground">Key Quotes</h4>
          {theme.quotes.map((quote) => (
            <QuoteCard key={quote.id} quote={quote} />
          ))}
        </div>
      )}
    </div>
  );
}
