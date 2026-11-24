/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ArticleCategory =
  | 'Wildlife Photography'
  | 'Safari Guides'
  | 'Conservation & Community'
  | 'Swahili Coast'
  | 'Travel Essentials';

export interface ArticleSection {
  heading: string;
  body: string[];
  proTip?: string;
  photoSettings?: {
    cameraBody: string;
    lens: string;
    aperture: string;
    shutterSpeed: string;
    iso: string;
    lightingNote: string;
  };
}

export interface InsightArticle {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: ArticleCategory;
  author: {
    name: string;
    role: string;
    credentials: string; // e.g. "Silver-Level KPSGA Naturalist", "Award-Winning Wildlife Photographer"
    avatar: string;
  };
  publishedAt: string;
  readTimeMinutes: number;
  heroImage: string;
  tags: string[];
  featured: boolean;
  viewsCount: number;
  excerpt: string;
  sections: ArticleSection[];
  relatedReserveIds: string[];
  relatedSafariIds: string[];
}
