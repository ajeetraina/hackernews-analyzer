import { useState } from 'react';
import { Link, Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface UrlInputProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

export function UrlInput({ onSubmit, isLoading }: UrlInputProps) {
  const [url, setUrl] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim() && !isLoading) {
      onSubmit(url.trim());
    }
  };

  const isValidHNUrl = url.includes('news.ycombinator.com') || url.includes('hn.algolia.com');

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div
        className={cn(
          "relative rounded-2xl transition-all duration-300",
          isFocused && "glow"
        )}
      >
        <div className={cn(
          "flex items-center gap-3 p-2 rounded-2xl glass border-2 transition-all duration-300",
          isFocused ? "border-primary/50" : "border-transparent",
          isValidHNUrl && url && "border-success/30"
        )}>
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-secondary">
            <Link className="w-5 h-5 text-muted-foreground" />
          </div>
          
          <Input
            type="text"
            placeholder="Paste a Hacker News thread URL..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                if (url.trim() && !isLoading) {
                  onSubmit(url.trim());
                }
              }
            }}
            className="flex-1 h-12 text-lg bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/50"
            disabled={isLoading}
          />
          
          <Button
            type="submit"
            size="lg"
            variant="glow"
            disabled={!url.trim() || isLoading}
            className="h-12 px-6 rounded-xl"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Analyzing
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Analyze
              </>
            )}
          </Button>
        </div>
      </div>
      
      <p className="mt-3 text-sm text-center text-muted-foreground">
        Supports threads from news.ycombinator.com
      </p>
    </form>
  );
}
