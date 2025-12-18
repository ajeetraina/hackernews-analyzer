import type { HNThread, HNComment } from '@/types/analysis';

const HN_API_BASE = 'https://hacker-news.firebaseio.com/v0';

interface HNApiItem {
  id: number;
  type: string;
  by: string;
  time: number;
  text?: string;
  title?: string;
  url?: string;
  score?: number;
  descendants?: number;
  kids?: number[];
}

export async function fetchHNThread(itemId: number): Promise<HNThread> {
  const response = await fetch(`${HN_API_BASE}/item/${itemId}.json`);
  const item: HNApiItem = await response.json();

  if (!item || item.type !== 'story') {
    throw new Error('Invalid Hacker News item');
  }

  // Fetch all comments
  const comments = await fetchComments(item.kids || []);

  return {
    id: item.id.toString(),
    title: item.title || '',
    url: item.url,
    text: item.text,
    author: item.by,
    points: item.score || 0,
    commentCount: item.descendants || 0,
    comments,
  };
}

async function fetchComments(commentIds: number[]): Promise<HNComment[]> {
  const commentPromises = commentIds.map(async (id) => {
    try {
      const response = await fetch(`${HN_API_BASE}/item/${id}.json`);
      const comment: HNApiItem = await response.json();

      if (!comment || comment.type !== 'comment' || !comment.text) {
        return null;
      }

      const children = comment.kids ? await fetchComments(comment.kids) : [];

      return {
        id: comment.id.toString(),
        author: comment.by,
        text: comment.text,
        time: new Date(comment.time * 1000).toISOString(),
        children,
      };
    } catch (error) {
      console.error(`Error fetching comment ${id}:`, error);
      return null;
    }
  });

  const comments = await Promise.all(commentPromises);
  return comments.filter((c): c is HNComment => c !== null);
}

export function parseHNUrl(url: string): number | null {
  const patterns = [
    /news\.ycombinator\.com\/item\?id=(\d+)/,
    /\/(\d+)$/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return parseInt(match[1], 10);
    }
  }

  return null;
}
