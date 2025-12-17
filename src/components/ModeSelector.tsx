import { FileText, User, Zap, Scale } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { AnalysisMode } from '@/types/analysis';

interface ModeSelectorProps {
  selected: AnalysisMode;
  onSelect: (mode: AnalysisMode) => void;
}

const modes = [
  {
    id: 'executive' as AnalysisMode,
    label: 'Executive',
    description: 'Full analysis with TL;DR, themes, and decision memo',
    icon: FileText,
  },
  {
    id: 'submitter' as AnalysisMode,
    label: 'Submitter',
    description: 'Feedback for the person who posted',
    icon: User,
  },
  {
    id: 'fast' as AnalysisMode,
    label: 'Fast',
    description: 'Quick sentiment + themes analysis',
    icon: Zap,
  },
  {
    id: 'debate' as AnalysisMode,
    label: 'Debate',
    description: 'Map polarized discussions',
    icon: Scale,
  },
];

export function ModeSelector({ selected, onSelect }: ModeSelectorProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 w-full max-w-4xl mx-auto">
      {modes.map((mode) => {
        const Icon = mode.icon;
        const isSelected = selected === mode.id;
        
        return (
          <button
            key={mode.id}
            onClick={() => onSelect(mode.id)}
            className={cn(
              "group relative p-4 rounded-xl text-left transition-all duration-300",
              "glass glass-hover",
              isSelected && "border-primary/50 bg-primary/5"
            )}
          >
            <div className={cn(
              "flex items-center justify-center w-10 h-10 rounded-lg mb-3 transition-colors duration-300",
              isSelected ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground group-hover:text-foreground"
            )}>
              <Icon className="w-5 h-5" />
            </div>
            
            <h3 className={cn(
              "font-semibold mb-1 transition-colors duration-300",
              isSelected ? "text-primary" : "text-foreground"
            )}>
              {mode.label}
            </h3>
            
            <p className="text-xs text-muted-foreground leading-relaxed">
              {mode.description}
            </p>
            
            {isSelected && (
              <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-primary animate-pulse-subtle" />
            )}
          </button>
        );
      })}
    </div>
  );
}
