// ─────────────────────────────────────────────────────────────────────────────
// Content Types — mirrors the Decap CMS config.yml field definitions exactly.
// When you add a new field in config.yml, add it here too.
// ─────────────────────────────────────────────────────────────────────────────

// ── Shared ───────────────────────────────────────────────────────────────────

export interface Stat {
  num: string
  label: string
}

// ── Pages ────────────────────────────────────────────────────────────────────

export interface HeroContent {
  tagline: string
  heading_line1: string
  heading_line2: string
  heading_line3: string
  hero_image: string
  cta_primary: string
  cta_secondary: string
  coordinates_lat?: string
  coordinates_lng?: string
  coordinates_label?: string
}

export interface AboutContent {
  photographer_name: string
  photo: string
  heading_line1: string
  heading_line2: string
  heading_line3: string
  bio_1: string
  bio_2: string
  bio_3?: string
  location: string
  instagram_url?: string
  press_kit_url?: string
  stats: Stat[]
}

export interface ContactContent {
  email: string
  phone: string
  location_text: string
  response_note_1: string
  response_note_2: string
  footer_copyright: string
  footer_tagline: string
}

export interface FeaturedContent {
  project_title: string
  project_description: string
  image_1: string
  image_alt_1?: string
  image_2: string
  image_alt_2?: string
}

// ── Data ─────────────────────────────────────────────────────────────────────

export interface ServiceItem {
  num: string
  title: string
  description: string
}

export interface TestimonialItem {
  quote: string
  name: string
  role: string
}

export interface AwardItem {
  year: string
  title: string
  org: string
}

// ── Gallery ──────────────────────────────────────────────────────────────────

export interface GalleryItem {
  // Required
  title: string
  image: string
  category: string
  year: string
  tall: boolean

  // Recommended
  location?: string
  alt_text?: string
  caption?: string
  featured?: boolean
  order?: number

  // Optional metadata
  date_taken?: string
  camera?: string
  lens?: string
  tags?: string[]
}
