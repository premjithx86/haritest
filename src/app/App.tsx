import { useState, useEffect } from "react";
import { Menu, X, ArrowRight, ArrowUpRight, Mail, Phone, MapPin, Instagram } from "lucide-react";

const FONT_DISPLAY = "'Playfair Display', Georgia, serif";
const FONT_BODY = "'DM Sans', system-ui, sans-serif";
const FONT_MONO = "'DM Mono', 'Courier New', monospace";

const GALLERY = [
  {
    id: 1, category: "Portraits",
    src: "https://images.unsplash.com/photo-1568038479111-87bf80659645?w=800&h=1100&fit=crop&auto=format",
    title: "Reverie", location: "Amsterdam, NL", year: "2024", tall: true,
  },
  {
    id: 2, category: "Landscapes",
    src: "https://images.unsplash.com/photo-1496614932623-0a3a9743552e?w=1200&h=800&fit=crop&auto=format",
    title: "Dune Light", location: "Zeeland, NL", year: "2024", tall: false,
  },
  {
    id: 3, category: "Street",
    src: "https://images.unsplash.com/photo-1570070998935-17658353efb6?w=700&h=1050&fit=crop&auto=format",
    title: "Rush Hour", location: "New York, US", year: "2023", tall: true,
  },
  {
    id: 4, category: "Wildlife",
    src: "https://images.unsplash.com/photo-1504173010664-32509aeebb62?w=1000&h=700&fit=crop&auto=format",
    title: "Meridian", location: "Serengeti, TZ", year: "2023", tall: false,
  },
  {
    id: 5, category: "Portraits",
    src: "https://images.unsplash.com/photo-1536766768598-e09213fdcf22?w=800&h=1000&fit=crop&auto=format",
    title: "Veil", location: "Marrakech, MA", year: "2023", tall: true,
  },
  {
    id: 6, category: "Street",
    src: "https://images.unsplash.com/photo-1607245795313-b5e84006a85d?w=800&h=1100&fit=crop&auto=format",
    title: "Concrete", location: "Tokyo, JP", year: "2024", tall: true,
  },
  {
    id: 7, category: "Landscapes",
    src: "https://images.unsplash.com/photo-1489493512598-d08130f49bea?w=1200&h=800&fit=crop&auto=format",
    title: "Atlas", location: "Dolomites, IT", year: "2023", tall: false,
  },
  {
    id: 8, category: "Events",
    src: "https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?w=1000&h=700&fit=crop&auto=format",
    title: "Gilded Hall", location: "Vienna, AT", year: "2024", tall: false,
  },
  {
    id: 9, category: "Wildlife",
    src: "https://images.unsplash.com/photo-1503656142023-618e7d1f435a?w=800&h=1000&fit=crop&auto=format",
    title: "Stripes", location: "Amboseli, KE", year: "2022", tall: true,
  },
  {
    id: 10, category: "Portraits",
    src: "https://images.unsplash.com/photo-1606143412458-acc5f86de897?w=800&h=1100&fit=crop&auto=format",
    title: "Noir", location: "Paris, FR", year: "2024", tall: true,
  },
  {
    id: 11, category: "Landscapes",
    src: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=1200&h=800&fit=crop&auto=format",
    title: "Ember", location: "Black Forest, DE", year: "2022", tall: false,
  },
  {
    id: 12, category: "Events",
    src: "https://images.unsplash.com/photo-1542598688-76ad90c5b01e?w=1000&h=700&fit=crop&auto=format",
    title: "First Light", location: "Tuscany, IT", year: "2023", tall: false,
  },
  {
    id: 13, category: "Street",
    src: "https://images.unsplash.com/photo-1629055747366-e09158ba874c?w=700&h=1050&fit=crop&auto=format",
    title: "Crossing", location: "Kolkata, IN", year: "2022", tall: true,
  },
  {
    id: 14, category: "Wildlife",
    src: "https://images.unsplash.com/photo-1606804235853-a2bdff23724b?w=800&h=1100&fit=crop&auto=format",
    title: "Forest Warden", location: "Białowieża, PL", year: "2023", tall: true,
  },
  {
    id: 15, category: "Portraits",
    src: "https://images.unsplash.com/photo-1532170579297-281918c8ae72?w=1000&h=700&fit=crop&auto=format",
    title: "Gaze", location: "Berlin, DE", year: "2024", tall: false,
  },
];

const TESTIMONIALS = [
  {
    quote: "Marcus captured our wedding with a quiet precision that turned fleeting moments into permanent art. Every frame tells the story we lived.",
    name: "Elena & Tobias R.",
    role: "Wedding — Vienna 2024",
  },
  {
    quote: "Working with Marcus on the Vogue editorial was effortless. His instinct for light is almost supernatural — I haven't worked with anyone quite like him.",
    name: "Claire Montagne",
    role: "Art Director, Vogue Paris",
  },
  {
    quote: "The campaign images exceeded every brief we gave him. He doesn't just photograph a subject — he interprets it.",
    name: "Joon-ki Park",
    role: "Creative Director, Maison Séoul",
  },
];

const AWARDS = [
  { year: "2024", title: "World Press Photo — Nature Category Winner", org: "World Press Photo Foundation" },
  { year: "2024", title: "Portrait of the Year", org: "Sony World Photography Awards" },
  { year: "2023", title: "Feature Story — Gold Medal", org: "Pictures of the Year International" },
  { year: "2023", title: "Published: Vogue Paris, March Issue", org: "Condé Nast" },
  { year: "2022", title: "Documentary Series — Finalist", org: "National Geographic" },
  { year: "2022", title: "Published: TIME Magazine Cover Story", org: "TIME" },
  { year: "2021", title: "Emerging Photographer of the Year", org: "British Journal of Photography" },
  { year: "2020", title: "Published: The New Yorker Photo Essay", org: "The New Yorker" },
];

const SERVICES = [
  {
    num: "01",
    title: "Editorial & Magazine",
    desc: "High-concept portrait and fashion photography for print and digital publications. Experienced with complex briefs, international talent, and tight production schedules.",
  },
  {
    num: "02",
    title: "Commercial & Brand",
    desc: "Campaign imagery built to earn attention. From intimate product close-ups to large-scale lifestyle productions across multiple days and locations.",
  },
  {
    num: "03",
    title: "Documentary & Reportage",
    desc: "Long-form visual journalism and brand storytelling. Available for extended travel assignments on six continents. Languages: English, French, Dutch.",
  },
  {
    num: "04",
    title: "Events & Celebrations",
    desc: "Weddings, galas, cultural ceremonies. Discreet, attentive coverage that honors the moment without intruding upon it.",
  },
  {
    num: "05",
    title: "Fine Art Prints",
    desc: "Limited-edition archival pigment prints on Hahnemühle paper, available for private collectors and institutional acquisition. Certificate of authenticity included.",
  },
];

const CATEGORIES = ["All", "Portraits", "Landscapes", "Street", "Wildlife", "Events"];

export default function App() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", email: "", service: "", message: "" });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const filtered = activeCategory === "All"
    ? GALLERY
    : GALLERY.filter(img => img.category === activeCategory);

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
            Marcus Vael
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
            src="https://images.unsplash.com/photo-1568038479111-87bf80659645?w=1800&h=1200&fit=crop&auto=format"
            alt="Dramatic cinematic portrait — hero image"
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
            Photo Generalist — Est. 2014
          </p>
          <h1
            className="font-normal leading-[0.92] mb-10 tracking-tight"
            style={{
              fontFamily: FONT_DISPLAY,
              fontSize: "clamp(3.5rem, 9vw, 8rem)",
            }}
          >
            Light finds
            <br />
            <span className="text-foreground/35">its own</span>
            <br />
            language.
          </h1>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <button
              onClick={() => scrollTo("work")}
              className="group flex items-center gap-3 bg-foreground text-background px-8 py-4 text-sm tracking-[0.12em] uppercase hover:bg-foreground/90 transition-colors"
            >
              View Portfolio
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
            <button
              onClick={() => scrollTo("about")}
              className="text-foreground/50 hover:text-foreground transition-colors text-sm pb-px border-b border-transparent hover:border-foreground/30"
            >
              About Marcus
            </button>
          </div>
        </div>

        <div
          className="absolute bottom-8 right-12 hidden lg:flex flex-col items-end gap-1 text-foreground/25 text-[11px]"
          style={{ fontFamily: FONT_MONO }}
        >
          <span>50° 56′ N</span>
          <span>4° 21′ E</span>
          <span className="mt-2 text-foreground/15">Brussels · 2024</span>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="border-y border-border">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            ["10+", "Years Active"],
            ["847", "Published Images"],
            ["34", "Countries"],
            ["6", "Major Awards"],
          ].map(([num, label]) => (
            <div key={label}>
              <span
                className="block text-4xl font-normal text-foreground leading-none mb-2"
                style={{ fontFamily: FONT_DISPLAY }}
              >
                {num}
              </span>
              <span
                className="text-[10px] text-foreground/35 tracking-[0.25em] uppercase"
                style={{ fontFamily: FONT_MONO }}
              >
                {label}
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
              {CATEGORIES.map(cat => (
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
                key={img.id}
                className="break-inside-avoid mb-3 relative overflow-hidden bg-muted cursor-pointer"
                onMouseEnter={() => setHoveredId(img.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <img
                  src={img.src}
                  alt={`${img.title} — ${img.category} photography, ${img.location}`}
                  className="w-full object-cover block transition-transform duration-700"
                  style={{
                    aspectRatio: img.tall ? "3/4" : "4/3",
                    transform: hoveredId === img.id ? "scale(1.04)" : "scale(1)",
                  }}
                />
                <div
                  className="absolute inset-0 transition-opacity duration-500 flex flex-col justify-end p-5"
                  style={{
                    background: "linear-gradient(to top, rgba(12,11,9,0.92) 0%, rgba(12,11,9,0.2) 50%, transparent 100%)",
                    opacity: hoveredId === img.id ? 1 : 0,
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
                  <p className="text-foreground/50 text-xs">{img.location}</p>
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
            {
              src: "https://images.unsplash.com/photo-1503525443530-339273ca8a86?w=1000&h=700&fit=crop&auto=format",
              alt: "Wedding couple — Tuscany event photography",
            },
            {
              src: "https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?w=1000&h=700&fit=crop&auto=format",
              alt: "Gilded ceremonial hall — Vienna gala photography",
            },
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
                Baroque Reverie
              </h3>
              <p className="text-foreground/55 max-w-lg leading-relaxed text-sm">
                A commission for the Vienna State Opera&apos;s 2024 gala season. Two evenings of ceremony, music,
                and gathered humanity — compressed into 48 frames.
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
                  src="https://images.unsplash.com/photo-1621024994278-e409544f4085?w=800&h=1050&fit=crop&auto=format"
                  alt="Marcus Vael — photographer at work"
                  className="w-full h-full object-cover"
                />
              </div>
              <div
                className="absolute -bottom-3 -right-3 md:bottom-6 md:-right-6 bg-background border border-border p-4 hidden sm:block"
                style={{ fontFamily: FONT_MONO }}
              >
                <p className="text-foreground/35 text-[9px] tracking-[0.3em] uppercase mb-1">Currently based in</p>
                <p className="text-foreground text-sm">Brussels, Belgium</p>
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
                I photograph
                <br />
                <em>the unguarded</em>
                <br />
                <em>moment.</em>
              </h2>
              <div className="space-y-5 text-foreground/60 leading-relaxed text-sm">
                <p>
                  Marcus Vael is a Belgian-born photographer working across editorial, documentary,
                  and commercial disciplines. His practice centers on the tension between stillness
                  and movement — frames that feel inevitable, yet were never planned.
                </p>
                <p>
                  Trained at the Royal Academy of Fine Arts in Ghent, Marcus has spent the last
                  decade photographing on six continents, contributing to Vogue, TIME, National
                  Geographic, and Le Monde Magazine.
                </p>
                <p>
                  He brings the same deliberate attention to a wedding ceremony in Tuscany as to a
                  wildlife assignment in the Serengeti. The subject changes; the commitment does not.
                </p>
              </div>

              <div className="mt-10 pt-8 border-t border-border flex items-center gap-5">
                <a
                  href="#"
                  className="text-foreground/40 hover:text-foreground transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={17} />
                </a>
                <span className="text-border text-lg">·</span>
                <a
                  href="#"
                  className="text-foreground/40 hover:text-foreground transition-colors text-xs tracking-[0.2em] uppercase"
                  style={{ fontFamily: FONT_MONO }}
                >
                  Download Press Kit
                </a>
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
            {SERVICES.map(svc => (
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
                  <p className="text-foreground/55 text-sm leading-relaxed max-w-xl">{svc.desc}</p>
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
            {TESTIMONIALS.map((t, i) => (
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
            Recognition & Publications
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20">
            {[AWARDS.slice(0, 4), AWARDS.slice(4)].map((group, gi) => (
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
                  href="mailto:hello@marcusvael.com"
                  className="flex items-center gap-3 text-foreground/50 hover:text-foreground transition-colors"
                >
                  <Mail size={13} className="shrink-0" />
                  hello@marcusvael.com
                </a>
                <a
                  href="tel:+32491234567"
                  className="flex items-center gap-3 text-foreground/50 hover:text-foreground transition-colors"
                >
                  <Phone size={13} className="shrink-0" />
                  +32 491 23 45 67
                </a>
                <div className="flex items-center gap-3 text-foreground/50">
                  <MapPin size={13} className="shrink-0" />
                  Brussels, Belgium — Available Worldwide
                </div>
              </div>

              <div
                className="text-foreground/25 text-[11px] leading-relaxed"
                style={{ fontFamily: FONT_MONO }}
              >
                <p>Typical response time: 24–48 hours.</p>
                <p>For urgent assignments, please call directly.</p>
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
                  Your message has been received. Marcus will be in touch within 48 hours.
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
                    <option>Editorial &amp; Magazine</option>
                    <option>Commercial &amp; Brand</option>
                    <option>Documentary &amp; Reportage</option>
                    <option>Events &amp; Celebrations</option>
                    <option>Fine Art Prints</option>
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
            © 2024 Marcus Vael Photography. All rights reserved.
          </p>
          <p
            className="text-foreground/15 text-[11px] tracking-[0.15em]"
            style={{ fontFamily: FONT_MONO }}
          >
            Brussels · Available Worldwide
          </p>
        </div>
      </footer>
    </div>
  );
}
