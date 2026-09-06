import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';
import type { Lang } from '../i18n/ui';

interface ContentResult {
  frontmatter: Record<string, string>;
  html: string;
}

function parseFrontmatter(raw: string): { frontmatter: Record<string, string>; body: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { frontmatter: {}, body: raw };

  const fm: Record<string, string> = {};
  for (const line of match[1].split('\n')) {
    const idx = line.indexOf(':');
    if (idx > 0) {
      fm[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
    }
  }
  return { frontmatter: fm, body: match[2] };
}

export async function getContent(lang: Lang, slug: string): Promise<ContentResult> {
  const filePath = path.resolve(`content/${lang}/${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return { frontmatter: {}, html: '' };
  }

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { frontmatter, body } = parseFrontmatter(raw);
  const html = await marked(body);
  return { frontmatter, html };
}

export function hasContent(lang: Lang, slug: string): boolean {
  return fs.existsSync(path.resolve(`content/${lang}/${slug}.md`));
}
