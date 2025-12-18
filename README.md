# Hacker News Thread Analyzer

Transform Hacker News discussions into actionable product insights with AI-powered sentiment analysis, theme extraction, and decision memos.

## Features

- **Real Hacker News Integration**: Fetches actual HN threads and comments via the official API
- **Multiple Analysis Modes**:
  - **Executive**: Comprehensive analysis with TLDR, themes, pain points, and decision memos
  - **Fast**: Quick sentiment analysis with key quotes and action items
  - **Submitter**: Feedback analysis for post authors
  - **Debate**: Identify and analyze opposing viewpoints in discussions

- **Modern UI**: Built with React, TypeScript, Tailwind CSS, and shadcn/ui components
- **Responsive Design**: Works seamlessly on desktop and mobile

## Recent Changes

✅ **Fixed Mock Data Issue**: The application now fetches real Hacker News data instead of showing mock data
- Added `hackerNewsApi.ts` for HN API integration
- Created `aiAnalysis.ts` service for AI-powered analysis
- Updated Index.tsx to use real data

## Setup

### Prerequisites

- Node.js 18+ or Bun
- An AI API key (Claude, OpenAI, or similar)

### Installation

```bash
# Clone the repository
git clone https://github.com/ajeetraina/hackernews-analyzer.git
cd hackernews-analyzer

# Install dependencies
npm install
# or with Bun
bun install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
# For Claude API
VITE_ANTHROPIC_API_KEY=your_anthropic_key_here

# Or for OpenAI
VITE_OPENAI_API_KEY=your_openai_key_here
```

### Implement AI Analysis

The application currently uses a placeholder for AI analysis. To complete the integration:

1. Open `src/lib/aiAnalysis.ts`
2. Implement the AI API calls in the analysis functions
3. Example for Claude API:

```typescript
async function analyzeExecutive(context: string): Promise<ExecutiveAnalysis> {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': import.meta.env.VITE_ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 4096,
      messages: [{
        role: 'user',
        content: `Analyze this Hacker News thread and provide a comprehensive executive summary...\n\n${context}`
      }]
    })
  });

  const data = await response.json();
  // Parse and return the analysis
  return parseExecutiveAnalysis(data.content[0].text);
}
```

### Running the Application

```bash
# Development mode
npm run dev
# or
bun run dev

# Build for production
npm run build
# or
bun run build

# Preview production build
npm run preview
# or
bun run preview
```

## Usage

1. Enter a Hacker News thread URL (e.g., `https://news.ycombinator.com/item?id=12345678`)
2. Select an analysis mode
3. Click "Analyze Thread"
4. View the AI-generated insights

### Dev Mode Features

In development mode, you'll see a toggle to switch between real data and mock data for testing purposes.

## Architecture

```
src/
├── components/        # React components
│   ├── ui/           # shadcn/ui components
│   ├── ExecutiveView.tsx
│   ├── FastView.tsx
│   ├── SubmitterView.tsx
│   └── DebateView.tsx
├── lib/              # Utilities and services
│   ├── hackerNewsApi.ts   # HN API integration
│   ├── aiAnalysis.ts      # AI analysis service
│   ├── mockData.ts        # Mock data for testing
│   └── utils.ts           # Utility functions
├── pages/            # Route pages
│   ├── Index.tsx
│   └── NotFound.tsx
└── types/            # TypeScript definitions
    └── analysis.ts
```

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI primitives)
- **State Management**: React hooks
- **Data Fetching**: TanStack Query
- **Routing**: React Router
- **Icons**: Lucide React

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for your own purposes.

## Next Steps

- [ ] Implement AI API integration in `aiAnalysis.ts`
- [ ] Add error boundary components
- [ ] Implement caching for analyzed threads
- [ ] Add export functionality (PDF, Markdown)
- [ ] Create browser extension version
- [ ] Add user authentication for saving analyses
- [ ] Implement batch analysis for multiple threads

## Support

If you encounter any issues:
1. Check that you have a valid HN URL
2. Verify your AI API key is correctly configured
3. Check the browser console for errors
4. Open an issue on GitHub

---

Built by [@ajeetraina](https://github.com/ajeetraina) - Docker Captain & Community Leader
