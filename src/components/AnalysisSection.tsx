import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface AnalysisSectionProps {
  title: string;
  icon: LucideIcon;
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function AnalysisSection({ title, icon: Icon, children, className, delay = 0 }: AnalysisSectionProps) {
  return (
    <section 
      className={cn("animate-slide-up", className)}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <h2 className="text-xl font-bold text-foreground">{title}</h2>
      </div>
      {children}
    </section>
  );
}
