/**
 * content.ts — Build-time content layer
 *
 * HOW THIS WORKS
 * ──────────────
 * Vite's `import.meta.glob` with `{ as: 'raw', eager: true }` is resolved
 * ENTIRELY AT BUILD TIME. When `vite build` runs, Vite reads every matched
 * Markdown file, inlines their text as string literals in the JS bundle,
 * and freezes them as a static Record. No fetch(), no network request,
 * no loading state — content is immediately available on the first render,
 * identical in performance to hardcoded data.
 *
 * WORKFLOW
 * ────────
 * 1. Edit content in the CMS at /admin/
 * 2. Publish → Decap CMS commits the .md file to GitHub
 * 3. GitHub push triggers Netlify rebuild
 * 4. Vite re-reads all .md files → bundles updated content
 * 5. Netlify deploys new static build → site is updated
 *
 * ADDING NEW CONTENT TYPES
 * ────────────────────────
 * 1. Add the collection/field to public/admin/config.yml
 * 2. Add the TypeScript interface to src/lib/types.ts
 * 3. Add a glob import + export below
 */

import yaml from 'js-yaml'
import type {
  HeroContent,
  AboutContent,
  ContactContent,
  FeaturedContent,
  ServiceItem,
  TestimonialItem,
  AwardItem,
  GalleryItem,
} from './types'

// ─── Frontmatter Parser ───────────────────────────────────────────────────────
// Extracts the YAML block between the --- delimiters and parses it.
// Uses js-yaml for full YAML spec support (multiline strings, arrays, etc.)

function parseFrontmatter<T>(raw: string): T {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) return {} as T
  return (yaml.load(match[1]) ?? {}) as T
}

// ─── Build-time glob imports ──────────────────────────────────────────────────
// Each of these is resolved at `vite build` time — NOT at runtime.
// The paths are absolute from the project root.

const _hero         = import.meta.glob<string>('/content/pages/hero.md',         { as: 'raw', eager: true })
const _about        = import.meta.glob<string>('/content/pages/about.md',        { as: 'raw', eager: true })
const _contact      = import.meta.glob<string>('/content/pages/contact.md',      { as: 'raw', eager: true })
const _featured     = import.meta.glob<string>('/content/pages/featured.md',     { as: 'raw', eager: true })
const _services     = import.meta.glob<string>('/content/data/services.md',      { as: 'raw', eager: true })
const _testimonials = import.meta.glob<string>('/content/data/testimonials.md',  { as: 'raw', eager: true })
const _awards       = import.meta.glob<string>('/content/data/awards.md',        { as: 'raw', eager: true })
const _gallery      = import.meta.glob<string>('/content/gallery/*.md',          { as: 'raw', eager: true })

// ─── Singleton page exports ───────────────────────────────────────────────────

export const hero     = parseFrontmatter<HeroContent>(Object.values(_hero)[0]     ?? '')
export const about    = parseFrontmatter<AboutContent>(Object.values(_about)[0]   ?? '')
export const contact  = parseFrontmatter<ContactContent>(Object.values(_contact)[0] ?? '')
export const featured = parseFrontmatter<FeaturedContent>(Object.values(_featured)[0] ?? '')

// ─── Data list exports ────────────────────────────────────────────────────────

const _svcData  = parseFrontmatter<{ services: ServiceItem[] }>(Object.values(_services)[0]       ?? '')
const _testData = parseFrontmatter<{ testimonials: TestimonialItem[] }>(Object.values(_testimonials)[0] ?? '')
const _awdData  = parseFrontmatter<{ awards: AwardItem[] }>(Object.values(_awards)[0]             ?? '')

export const services     = _svcData.services       ?? []
export const testimonials = _testData.testimonials   ?? []
export const awards       = _awdData.awards           ?? []

// ─── Gallery exports ──────────────────────────────────────────────────────────
// Sorted by the `order` field (ascending). Items without order default to 0.

export const gallery = Object.values(_gallery)
  .map(raw => parseFrontmatter<GalleryItem>(raw))
  .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

// Gallery filter categories — derived automatically from actual gallery content.
// No hardcoded category list. Add a photo with a new category → it appears
// as a filter button automatically. Remove all photos of a category → button
// disappears automatically.
export const galleryCategories = [
  'All',
  ...Array.from(new Set(gallery.map(g => g.category).filter(Boolean))),
]
