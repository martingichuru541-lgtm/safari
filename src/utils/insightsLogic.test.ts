/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { filterArticles, calculateEstimatedReadTime } from './insightsLogic';
import { INITIAL_INSIGHTS } from '../data/insights';

test('filterArticles returns all articles when category is All and query is empty', () => {
  const result = filterArticles(INITIAL_INSIGHTS, 'All', '');
  assert.equal(result.length, INITIAL_INSIGHTS.length);
});

test('filterArticles filters accurately by category', () => {
  const photographyArticles = filterArticles(INITIAL_INSIGHTS, 'Wildlife Photography', '');
  assert.ok(photographyArticles.length > 0);
  for (const art of photographyArticles) {
    assert.equal(art.category, 'Wildlife Photography');
  }
});

test('filterArticles searches by keyword in title and tags', () => {
  const wildebeestArticles = filterArticles(INITIAL_INSIGHTS, 'All', 'wildebeest');
  assert.ok(wildebeestArticles.length > 0);
  assert.ok(wildebeestArticles.some((a) => a.slug.includes('great-migration')));

  const cameraArticles = filterArticles(INITIAL_INSIGHTS, 'All', 'Camera Gear');
  assert.ok(cameraArticles.length > 0);
});

test('calculateEstimatedReadTime computes expected minutes accurately', () => {
  assert.equal(calculateEstimatedReadTime('Hello world'), 1);

  // 400 words should be 2 minutes
  const words400 = new Array(400).fill('safari').join(' ');
  assert.equal(calculateEstimatedReadTime(words400), 2);
});
