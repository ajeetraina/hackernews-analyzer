import { CheckCircle, XCircle, ArrowRight, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DecisionMemoProps {
  memo: {
    shouldWeCare: boolean;
    opportunities: string[];
    risks: string[];
    nextSteps: string[];
  };
}

export function DecisionMemo({ memo }: DecisionMemoProps) {
  return (
    <div className="glass rounded-xl overflow-hidden animate-slide-up">
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-4">
          <div className={cn(
            "flex items-center justify-center w-12 h-12 rounded-xl",
            memo.shouldWeCare ? "bg-success/20" : "bg-warning/20"
          )}>
            {memo.shouldWeCare ? (
              <CheckCircle className="w-6 h-6 text-success" />
            ) : (
              <Target className="w-6 h-6 text-warning" />
            )}
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground">Should We Care?</h3>
            <p className={cn(
              "text-sm font-medium",
              memo.shouldWeCare ? "text-success" : "text-warning"
            )}>
              {memo.shouldWeCare ? "Yes — Action recommended" : "Monitor — Low priority"}
            </p>
          </div>
        </div>
      </div>
      
      <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
        <div className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-4 h-4 text-success" />
            <h4 className="font-semibold text-foreground">Opportunities</h4>
          </div>
          <ul className="space-y-2">
            {memo.opportunities.map((item, i) => (
              <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="text-success mt-1">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <XCircle className="w-4 h-4 text-destructive" />
            <h4 className="font-semibold text-foreground">Risks</h4>
          </div>
          <ul className="space-y-2">
            {memo.risks.map((item, i) => (
              <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="text-destructive mt-1">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <ArrowRight className="w-4 h-4 text-primary" />
            <h4 className="font-semibold text-foreground">Next Steps</h4>
          </div>
          <ul className="space-y-2">
            {memo.nextSteps.map((item, i) => (
              <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="text-primary font-bold">{i + 1}.</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
