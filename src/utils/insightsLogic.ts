/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { InsightArticle, ArticleCategory } from '../types/insights';

export function filterArticles(
  articles: InsightArticle[],
  category: string,
  searchQuery: string
): InsightArticle[] {
  const q = searchQuery.trim().toLowerCase();
  return articles.filter((art) => {
    const matchesCategory = category === 'All' || art.category === category;
    if (!matchesCategory) return false;

    if (!q) return true;

    const matchesTitle = art.title.toLowerCase().includes(q);
    const matchesSubtitle = art.subtitle.toLowerCase().includes(q);
    const matchesExcerpt = art.excerpt.toLowerCase().includes(q);
    const matchesAuthor = art.author.name.toLowerCase().includes(q);
    const matchesTags = art.tags.some((tag) => tag.toLowerCase().includes(q));

    return matchesTitle || matchesSubtitle || matchesExcerpt || matchesAuthor || matchesTags;
  });
}

export function calculateEstimatedReadTime(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const wordsPerMinute = 200;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}
