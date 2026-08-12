import { useState, useEffect } from "react";
import { Menu, X, ArrowRight, ArrowUpRight, Mail, Phone, MapPin, Instagram } from "lucide-react";
import { gallery, galleryCategories, hero, about, contact, featured, services, testimonials, awards } from "../lib/content";

// ─── Typography constants (design tokens — not content) ───────────────────────
const FONT_DISPLAY = "'Playfair Display', Georgia, serif";
const FONT_BODY    = "'DM Sans', system-ui, sans-serif";
const FONT_MONO    = "'DM Mono', 'Courier New', monospace";

export default function App() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", service: "", message: "" });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const filtered = activeCategory === "All"
    ? gallery
    : gallery.filter(img => img.category === activeCategory);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div
      className="min-h-screen bg-background text-foreground overflow-x-hidden"
      style={{ fontFamily: FONT_BODY }}
    >
      {/* ── NAV ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(12,11,9,0.96)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid #201f1c" : "1px solid transparent",
        }}
      >
        <nav className="max-w-screen-xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          <button
            onClick={() => scrollTo("hero")}
            className="text-foreground hover:text-foreground/70 transition-colors text-xs tracking-[0.3em] uppercase"
            style={{ fontFamily: FONT_MONO }}
          >
            {about.photographer_name}
          </button>

          <ul className="hidden md:flex items-center gap-10">
            {[["work", "Work"], ["about", "About"], ["services", "Services"], ["contact", "Contact"]].map(([id, label]) => (
              <li key={id}>
                <button
                  onClick={() => scrollTo(id)}
                  className="text-foreground/50 hover:text-foreground transition-colors text-sm"
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={() => scrollTo("contact")}
            className="hidden md:flex items-center gap-2 text-xs tracking-[0.15em] uppercase border border-foreground/20 hover:border-foreground/60 hover:text-foreground text-foreground/60 px-5 py-2.5 transition-all"
          >
            Inquire
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-foreground p-1"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        {menuOpen && (
          <div
            className="md:hidden border-t border-border px-6 py-10 flex flex-col gap-7"
            style={{ background: "#0c0b09" }}
          >
            {[["work", "Work"], ["about", "About"], ["services", "Services"], ["contact", "Contact"]].map(([id, label]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-left text-3xl text-foreground/80 hover:text-foreground transition-colors font-normal"
                style={{ fontFamily: FONT_DISPLAY }}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section id="hero" className="relative flex items-end overflow-hidden" style={{ minHeight: "100svh" }}>
        <div className="absolute inset-0 bg-background">
          <img
            src={hero.hero_image}
            alt={`${about.photographer_name} — hero image`}
            className="w-full h-full object-cover"
            style={{ opacity: 0.55, mixBlendMode: "luminosity" }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, #0c0b09 0%, rgba(12,11,9,0.3) 50%, transparent 100%)" }}
          />
        </div>

        <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-12 pb-20 md:pb-28 w-full">
          <p
            className="text-foreground/40 text-xs tracking-[0.4em] uppercase mb-8"
            style={{ fontFamily: FONT_MONO }}
          >
            {hero.tagline}
          </p>
          <h1
            className="font-normal leading-[0.92] mb-10 tracking-tight"
            style={{
              fontFamily: FONT_DISPLAY,
              fontSize: "clamp(3.5rem, 9vw, 8rem)",
            }}
          >
            {hero.heading_line1}
            <br />
            <span className="text-foreground/35">{hero.heading_line2}</span>
            <br />
            {hero.heading_line3}
          </h1>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <button
              onClick={() => scrollTo("work")}
              className="group flex items-center gap-3 bg-foreground text-background px-8 py-4 text-sm tracking-[0.12em] uppercase hover:bg-foreground/90 transition-colors"
            >
              {hero.cta_primary}
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
            <button
              onClick={() => scrollTo("about")}
              className="text-foreground/50 hover:text-foreground transition-colors text-sm pb-px border-b border-transparent hover:border-foreground/30"
            >
              {hero.cta_secondary}
            </button>
          </div>
        </div>

        {(hero.coordinates_lat || hero.coordinates_lng) && (
          <div
            className="absolute bottom-8 right-12 hidden lg:flex flex-col items-end gap-1 text-foreground/25 text-[11px]"
            style={{ fontFamily: FONT_MONO }}
          >
            {hero.coordinates_lat && <span>{hero.coordinates_lat}</span>}
            {hero.coordinates_lng && <span>{hero.coordinates_lng}</span>}
            {hero.coordinates_label && (
              <span className="mt-2 text-foreground/15">{hero.coordinates_label}</span>
            )}
          </div>
        )}
      </section>

      {/* ── STATS BAR ── */}
      <section className="border-y border-border">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {(about.stats ?? []).map((stat) => (
            <div key={stat.label}>
              <span
                className="block text-4xl font-normal text-foreground leading-none mb-2"
                style={{ fontFamily: FONT_DISPLAY }}
              >
                {stat.num}
              </span>
              <span
                className="text-[10px] text-foreground/35 tracking-[0.25em] uppercase"
                style={{ fontFamily: FONT_MONO }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section id="work" className="py-24 md:py-32">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
            <div>
              <p
                className="text-foreground/35 text-[10px] tracking-[0.35em] uppercase mb-4"
                style={{ fontFamily: FONT_MONO }}
              >
                Selected Work
              </p>
              <h2
                className="font-normal leading-tight"
                style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
              >
                The Portfolio
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {galleryCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="px-4 py-1.5 text-[11px] tracking-[0.18em] uppercase transition-all border"
                  style={{
                    fontFamily: FONT_MONO,
                    borderColor: activeCategory === cat ? "#f2ede6" : "#201f1c",
                    background: activeCategory === cat ? "#f2ede6" : "transparent",
                    color: activeCategory === cat ? "#0c0b09" : "#6b6860",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-3">
            {filtered.map(img => (
              <div
                key={img.title}
                className="break-inside-avoid mb-3 relative overflow-hidden bg-muted cursor-pointer"
                onMouseEnter={() => setHoveredId(img.title)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <img
                  src={img.image}
                  alt={img.alt_text || `${img.title} — ${img.category} photography${img.location ? `, ${img.location}` : ""}`}
                  className="w-full object-cover block transition-transform duration-700"
                  style={{
                    aspectRatio: img.tall ? "3/4" : "4/3",
                    transform: hoveredId === img.title ? "scale(1.04)" : "scale(1)",
                  }}
                />
                <div
                  className="absolute inset-0 transition-opacity duration-500 flex flex-col justify-end p-5"
                  style={{
                    background: "linear-gradient(to top, rgba(12,11,9,0.92) 0%, rgba(12,11,9,0.2) 50%, transparent 100%)",
                    opacity: hoveredId === img.title ? 1 : 0,
                  }}
                >
                  <p
                    className="text-foreground/45 text-[10px] tracking-[0.25em] uppercase mb-1"
                    style={{ fontFamily: FONT_MONO }}
                  >
                    {img.category} — {img.year}
                  </p>
                  <h3
                    className="text-foreground text-xl font-normal mb-0.5"
                    style={{ fontFamily: FONT_DISPLAY }}
                  >
                    {img.title}
                  </h3>
                  <p className="text-foreground/50 text-xs">{img.caption || img.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PROJECT ── */}
      <section className="py-0 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 pt-24 md:pt-32">
          <p
            className="text-foreground/35 text-[10px] tracking-[0.35em] uppercase mb-14"
            style={{ fontFamily: FONT_MONO }}
          >
            Featured Project
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-border">
          {[
            { src: featured.image_1, alt: featured.image_alt_1 || featured.project_title },
            { src: featured.image_2, alt: featured.image_alt_2 || featured.project_title },
          ].map((item, i) => (
            <div key={i} className="overflow-hidden bg-muted group" style={{ aspectRatio: "4/3" }}>
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          ))}
        </div>

        <div className="max-w-screen-xl mx-auto px-6 md:px-12 pb-24 md:pb-32">
          <div className="mt-8 flex flex-col md:flex-row md:items-end justify-between gap-5">
            <div>
              <h3
                className="font-normal mb-3"
                style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(1.75rem, 3.5vw, 3rem)" }}
              >
                {featured.project_title}
              </h3>
              <p className="text-foreground/55 max-w-lg leading-relaxed text-sm">
                {featured.project_description}
              </p>
            </div>
            <button className="group shrink-0 flex items-center gap-2 text-sm text-foreground/50 hover:text-foreground transition-colors pb-px border-b border-transparent hover:border-foreground/30">
              View Full Series
              <ArrowUpRight
                size={13}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </button>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-24 md:py-32 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="relative">
              <div className="overflow-hidden bg-muted" style={{ aspectRatio: "4/5" }}>
                <img
                  src={about.photo}
                  alt={`${about.photographer_name} — photographer at work`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div
                className="absolute -bottom-3 -right-3 md:bottom-6 md:-right-6 bg-background border border-border p-4 hidden sm:block"
                style={{ fontFamily: FONT_MONO }}
              >
                <p className="text-foreground/35 text-[9px] tracking-[0.3em] uppercase mb-1">Currently based in</p>
                <p className="text-foreground text-sm">{about.location}</p>
              </div>
            </div>

            <div>
              <p
                className="text-foreground/35 text-[10px] tracking-[0.35em] uppercase mb-6"
                style={{ fontFamily: FONT_MONO }}
              >
                About
              </p>
              <h2
                className="font-normal leading-[1.05] mb-9"
                style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(2rem, 4vw, 3.25rem)" }}
              >
                {about.heading_line1}
                <br />
                <em>{about.heading_line2}</em>
                <br />
                <em>{about.heading_line3}</em>
              </h2>
              <div className="space-y-5 text-foreground/60 leading-relaxed text-sm">
                <p>{about.bio_1}</p>
                <p>{about.bio_2}</p>
                {about.bio_3 && <p>{about.bio_3}</p>}
              </div>

              <div className="mt-10 pt-8 border-t border-border flex items-center gap-5">
                {about.instagram_url && about.instagram_url !== "#" && (
                  <a
                    href={about.instagram_url}
                    className="text-foreground/40 hover:text-foreground transition-colors"
                    aria-label="Instagram"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Instagram size={17} />
                  </a>
                )}
                {about.instagram_url && about.instagram_url !== "#" && about.press_kit_url && about.press_kit_url !== "#" && (
                  <span className="text-border text-lg">·</span>
                )}
                {about.press_kit_url && about.press_kit_url !== "#" && (
                  <a
                    href={about.press_kit_url}
                    className="text-foreground/40 hover:text-foreground transition-colors text-xs tracking-[0.2em] uppercase"
                    style={{ fontFamily: FONT_MONO }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download Press Kit
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-24 md:py-32 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div>
              <p
                className="text-foreground/35 text-[10px] tracking-[0.35em] uppercase mb-4"
                style={{ fontFamily: FONT_MONO }}
              >
                What I Offer
              </p>
              <h2
                className="font-normal leading-tight"
                style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
              >
                Services
              </h2>
            </div>
          </div>

          <div className="divide-y divide-border">
            {services.map(svc => (
              <div
                key={svc.num}
                className="group grid grid-cols-1 md:grid-cols-[72px_1fr_32px] gap-4 md:gap-8 py-8 -mx-4 px-4 transition-colors hover:bg-foreground/[0.025]"
              >
                <span
                  className="text-foreground/20 text-xs tracking-[0.2em] pt-0.5"
                  style={{ fontFamily: FONT_MONO }}
                >
                  {svc.num}
                </span>
                <div>
                  <h3
                    className="font-normal text-xl mb-2"
                    style={{ fontFamily: FONT_DISPLAY }}
                  >
                    {svc.title}
                  </h3>
                  <p className="text-foreground/55 text-sm leading-relaxed max-w-xl">{svc.description}</p>
                </div>
                <div className="hidden md:flex items-center justify-end">
                  <ArrowUpRight
                    size={15}
                    className="text-foreground/15 group-hover:text-foreground/50 transition-colors"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 md:py-32 border-t border-border bg-card">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12">
          <p
            className="text-foreground/35 text-[10px] tracking-[0.35em] uppercase mb-16 text-center"
            style={{ fontFamily: FONT_MONO }}
          >
            Client Words
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
            {testimonials.map((t, i) => (
              <div key={i} className="flex flex-col">
                <span
                  className="text-5xl text-foreground/20 leading-none mb-5 block"
                  style={{ fontFamily: FONT_DISPLAY }}
                >
                  &ldquo;
                </span>
                <blockquote
                  className="text-foreground/70 leading-relaxed flex-1 italic text-[15px]"
                  style={{ fontFamily: FONT_DISPLAY }}
                >
                  {t.quote}
                </blockquote>
                <div className="mt-8 pt-6 border-t border-border">
                  <p className="text-foreground text-sm font-medium">{t.name}</p>
                  <p
                    className="text-foreground/35 text-[10px] tracking-[0.2em] uppercase mt-1"
                    style={{ fontFamily: FONT_MONO }}
                  >
                    {t.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AWARDS ── */}
      <section className="py-24 md:py-32 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12">
          <p
            className="text-foreground/35 text-[10px] tracking-[0.35em] uppercase mb-16"
            style={{ fontFamily: FONT_MONO }}
          >
            Recognition &amp; Publications
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20">
            {[awards.slice(0, Math.ceil(awards.length / 2)), awards.slice(Math.ceil(awards.length / 2))].map((group, gi) => (
              <div key={gi} className="divide-y divide-border">
                {group.map((a, i) => (
                  <div key={i} className="py-5 flex items-start gap-6">
                    <span
                      className="text-foreground/25 text-[11px] w-10 shrink-0 pt-0.5 tabular-nums"
                      style={{ fontFamily: FONT_MONO }}
                    >
                      {a.year}
                    </span>
                    <div>
                      <p className="text-foreground text-sm leading-snug">{a.title}</p>
                      <p
                        className="text-foreground/40 text-[11px] mt-1"
                        style={{ fontFamily: FONT_MONO }}
                      >
                        {a.org}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-24 md:py-32 border-t border-border bg-card">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <p
                className="text-foreground/35 text-[10px] tracking-[0.35em] uppercase mb-6"
                style={{ fontFamily: FONT_MONO }}
              >
                Get in Touch
              </p>
              <h2
                className="font-normal leading-[1.05] mb-10"
                style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(2rem, 4vw, 3.25rem)" }}
              >
                Let&apos;s make
                <br />
                something
                <br />
                <em>remarkable.</em>
              </h2>

              <div className="space-y-4 text-sm mb-12">
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-3 text-foreground/50 hover:text-foreground transition-colors"
                >
                  <Mail size={13} className="shrink-0" />
                  {contact.email}
                </a>
                <a
                  href={`tel:${contact.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 text-foreground/50 hover:text-foreground transition-colors"
                >
                  <Phone size={13} className="shrink-0" />
                  {contact.phone}
                </a>
                <div className="flex items-center gap-3 text-foreground/50">
                  <MapPin size={13} className="shrink-0" />
                  {contact.location_text}
                </div>
              </div>

              <div
                className="text-foreground/25 text-[11px] leading-relaxed"
                style={{ fontFamily: FONT_MONO }}
              >
                <p>{contact.response_note_1}</p>
                <p>{contact.response_note_2}</p>
              </div>
            </div>

            {sent ? (
              <div className="flex flex-col items-start justify-center">
                <span
                  className="text-5xl font-normal text-foreground mb-4 block"
                  style={{ fontFamily: FONT_DISPLAY }}
                >
                  Thank you.
                </span>
                <p className="text-foreground/55 text-sm leading-relaxed max-w-sm">
                  Your message has been received. {about.photographer_name} will be in touch within 48 hours.
                </p>
              </div>
            ) : (
              <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { key: "name", label: "Name", type: "text", placeholder: "Your name" },
                    { key: "email", label: "Email", type: "email", placeholder: "your@email.com" },
                  ].map(field => (
                    <div key={field.key}>
                      <label
                        className="block text-[10px] text-foreground/35 tracking-[0.25em] uppercase mb-2"
                        style={{ fontFamily: FONT_MONO }}
                      >
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        required={field.key === "email"}
                        value={form[field.key as keyof typeof form]}
                        onChange={e => setForm(p => ({ ...p, [field.key]: e.target.value }))}
                        className="w-full bg-transparent border border-border focus:border-foreground/40 px-4 py-3 text-sm text-foreground placeholder:text-foreground/20 outline-none transition-colors"
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label
                    className="block text-[10px] text-foreground/35 tracking-[0.25em] uppercase mb-2"
                    style={{ fontFamily: FONT_MONO }}
                  >
                    Service
                  </label>
                  <select
                    value={form.service}
                    onChange={e => setForm(p => ({ ...p, service: e.target.value }))}
                    className="w-full bg-background border border-border focus:border-foreground/40 px-4 py-3 text-sm text-foreground outline-none transition-colors appearance-none"
                  >
                    <option value="">Select a service…</option>
                    {services.map(svc => (
                      <option key={svc.num}>{svc.title}</option>
                    ))}
                    <option>Other Inquiry</option>
                  </select>
                </div>

                <div>
                  <label
                    className="block text-[10px] text-foreground/35 tracking-[0.25em] uppercase mb-2"
                    style={{ fontFamily: FONT_MONO }}
                  >
                    Message
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Tell me about your project, timeline, and vision…"
                    required
                    value={form.message}
                    onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    className="w-full bg-transparent border border-border focus:border-foreground/40 px-4 py-3 text-sm text-foreground placeholder:text-foreground/20 outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="group flex items-center justify-center gap-2.5 bg-foreground text-background px-8 py-4 text-[11px] tracking-[0.18em] uppercase hover:bg-foreground/90 transition-colors mt-1"
                >
                  Send Inquiry
                  <ArrowRight
                    size={13}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-8 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p
            className="text-foreground/25 text-[11px] tracking-[0.2em]"
            style={{ fontFamily: FONT_MONO }}
          >
            {contact.footer_copyright}
          </p>
          <p
            className="text-foreground/15 text-[11px] tracking-[0.15em]"
            style={{ fontFamily: FONT_MONO }}
          >
            {contact.footer_tagline}
          </p>
        </div>
      </footer>
    </div>
  );
}
