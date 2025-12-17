import { AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { PainPoint } from '@/types/analysis';

interface PainPointCardProps {
  painPoint: PainPoint;
  rank: number;
}

export function PainPointCard({ painPoint, rank }: PainPointCardProps) {
  const severityConfig = {
    low: { label: 'Low', className: 'bg-info/20 text-info' },
    medium: { label: 'Medium', className: 'bg-warning/20 text-warning' },
    high: { label: 'High', className: 'bg-destructive/20 text-destructive' },
    critical: { label: 'Critical', className: 'bg-destructive text-destructive-foreground' },
  };

  const { label, className } = severityConfig[painPoint.severity];

  return (
    <div className="glass rounded-xl p-5 animate-scale-in" style={{ animationDelay: `${rank * 50}ms` }}>
      <div className="flex items-start gap-4">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-destructive/10 text-destructive shrink-0">
          <AlertTriangle className="w-4 h-4" />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-bold text-muted-foreground">#{rank}</span>
            <h4 className="font-semibold text-foreground">{painPoint.issue}</h4>
          </div>
          
          <div className="flex items-center gap-3 mb-3">
            <span className={cn("px-2 py-0.5 rounded text-xs font-medium", className)}>
              {label}
            </span>
            <span className="text-xs text-muted-foreground">
              Mentioned {painPoint.frequency}x
            </span>
          </div>
          
          {painPoint.evidence.length > 0 && (
            <div className="p-3 rounded-lg bg-muted/30 border-l-2 border-destructive/30">
              <p className="text-sm text-muted-foreground italic">
                "{painPoint.evidence[0].text}"
              </p>
              <span className="text-xs text-muted-foreground/60 mt-1 block">
                — @{painPoint.evidence[0].author}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
