import { useEffect, useMemo, useRef, useState } from "react";


const DATA = {
  name: "Charles Vincent Clemente",
  nickname: "Cent",
  roles: ["Full-stack developer", "React & Tailwind builder", "Laravel & Node.js developer"],
  headline: "I build fast, clean web apps, from the database to the last pixel.",
  status: "Open to freelance projects and Virtual Assistant roles",
  email: "clementecharlesvincent@gmail.com",
  location: "Philippines",
  socials: [
    { label: "GitHub", href: "https://github.com/centclemente" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/charles-vincent-clemente-a346953b6/" },
    { label: "Facebook", href: "https://www.facebook.com/vincentyael.clemente.3" },
  ],
  about: [
    "I build full-stack web apps that replace spreadsheets and manual work with clean, reliable systems.",
    "My work so far includes a sales forecasting platform and a pharmacy inventory system, and I want more client sites, dashboards, internal tools, and forecasting apps.",
  ],
  stats: [
    { value: 3, suffix: "", label: "Projects built" },
    { value: 1, suffix: "+", label: "Years coding" },
  ],
  skills: [
    {
      group: "Frontend",
      items: [
        { name: "React", rating: 5 },
        { name: "Tailwind CSS", rating: 5 },
      ],
    },
    {
      group: "Backend",
      items: [
        { name: "Laravel", rating: 5 },
        { name: "Node.js / Express", rating: 4 },
        { name: "Django", rating: 3 },
        { name: "FastAPI", rating: 3 },
        { name: "Supabase", rating: 4 },
      ],
    },
    {
      group: "Database",
      items: [
        { name: "PostgreSQL", rating: 3 },  
        { name: "MySQL", rating: 5 },
        { name: "Prisma", rating: 3 },
      ],
    },
    {
      group: "Other Skills",
      items: [
        { name: "Time series forecasting", rating: 3 },
        { name: "IT troubleshooting", rating: 4 },
        { name: "Network configuration", rating: 4 },
        { name: "Customer support", rating: 5 },
      ],
    },
  ],
  projects: [
    {
      title: "MedCure Pharmacy Inventory Management System",
      year: "2025",
      summary:
        "An inventory management system for MedCure Pharmacy to manage stock and sales in one place.",
      tags: ["React", "Supabase", "PostgreSQL"],
      live: "https://www.medcure-official.me/login",
      code: "https://github.com/centclemente/MedCure-Capstone-Project",
    },
    {
      title: "Beacon",
      year: "2026",
      summary:
        "A project management system that lets developers monitor and manage their projects against precise deadlines.",
      tags: ["Laravel"],
      code: "",
    },
    {
      title: "Jamstart Coffee",
      year: "2026",
      summary:
        "A forecasting web app that lets users predict sales and inventory using time series forecasting.",
      tags: ["Python", "React", "NodeJS", "FastAPI", "PostgreSQL"],
      live: "#",
      code: "https://github.com/creepeepatsa/jamstartcoffee",
    },
  ],
  experience: [
    {
      when: "2026 – Present",
      title: "IT Helpdesk Technician",
      place: "RDF Feed, Livestock & Foods, Inc.",
      note: "Hardware and software troubleshooting, network configuration, and user support for a mid-sized company.",
    },
    {
      when: "July 2026 – August 2026",
      title: "Customer Representative",
      place: "Alorica Clark",
      note: "Provided customer support and assistance to clients, resolving inquiries and issues in a timely manner.",
    },
    {
      when: "2022 – 2026",
      title: "BS Information Technology",
      place: "Bulacan State University",
      note: "MedCure: A Pharmacy Inventory Management System, presented at the University Wide Research Colloquium, 2025.",
    },
  ],
};

const NAV = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];
const SECTION_IDS = ["home", ...NAV.map((n) => n.id)];
const THUMBS = [
  "linear-gradient(135deg,#1d4ed8,#0ea5e9)",
  "linear-gradient(135deg,#312e81,#2563eb)",
  "linear-gradient(135deg,#0369a1,#22d3ee)",
];

/* ------------------------------ helpers ------------------------------ */

const reduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function useTyping(words, speed = 70, pause = 1400) {
  const [text, setText] = useState("");
  useEffect(() => {
    if (reduced()) {
      setText(words[0]);
      return;
    }
    let i = 0,
      j = 0,
      del = false,
      t;
    const tick = () => {
      const w = words[i];
      setText(w.slice(0, j));
      if (!del && j === w.length) {
        del = true;
        t = setTimeout(tick, pause);
        return;
      }
      if (del && j === 0) {
        del = false;
        i = (i + 1) % words.length;
      }
      j += del ? -1 : 1;
      t = setTimeout(tick, del ? 35 : speed);
    };
    tick();
    return () => clearTimeout(t);
  }, [words, speed, pause]);
  return text;
}

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [ids]);
  return active;
}

function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced()) {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        seen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function CountUp({ to, suffix = "" }) {
  const ref = useRef(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced()) {
      setN(to);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const step = (t) => {
          const p = Math.min((t - t0) / 1400, 1);
          setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

/* Glass card: cursor spotlight + optional 3D tilt */
function GlassCard({ children, className = "", tilt = false }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
    if (tilt && !reduced()) {
      const rx = (y / r.height - 0.5) * -12;
      const ry = (x / r.width - 0.5) * 12;
      el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02,1.02,1.02)`;
    }
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`group relative overflow-hidden rounded-3xl border border-white/15 bg-white/[0.06] shadow-[0_8px_40px_rgba(2,6,23,0.45),inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-xl transition-[transform,border-color,background-color] duration-200 ease-out hover:border-sky-300/40 hover:bg-white/[0.09] ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--mx,50%) var(--my,50%), rgba(96,165,250,0.24), transparent 45%)",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}

function Section({ id, title, subtitle, children }) {
  return (
    <section id={id} className="scroll-mt-24 px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="display text-3xl font-bold text-white sm:text-5xl">{title}</h2>
          {subtitle && <p className="mt-3 max-w-xl text-lg text-blue-100/70">{subtitle}</p>}
        </Reveal>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

/* ----------------------------- background ----------------------------- */

function Backdrop() {
  const glow = useRef(null);
  useEffect(() => {
    if (reduced()) return;
    const move = (e) => {
      const g = glow.current;
      if (!g) return;
      g.style.left = `${e.clientX}px`;
      g.style.top = `${e.clientY}px`;
      g.style.opacity = "1";
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ background: "linear-gradient(160deg,#020617 0%,#0a1a44 45%,#0b2b70 100%)" }}
    >
      <div className="float-a absolute -left-32 top-10 h-[520px] w-[520px] rounded-full bg-blue-600/40 blur-3xl" />
      <div className="float-b absolute right-[-120px] top-[30%] h-[560px] w-[560px] rounded-full bg-cyan-500/25 blur-3xl" />
      <div className="float-c absolute bottom-[-160px] left-[25%] h-[520px] w-[520px] rounded-full bg-indigo-600/35 blur-3xl" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)",
          backgroundSize: "56px 56px",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 30%, black 20%, transparent 75%)",
          maskImage: "radial-gradient(ellipse at 50% 30%, black 20%, transparent 75%)",
        }}
      />
      <div
        ref={glow}
        className="absolute hidden h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 transition-opacity duration-500 md:block"
        style={{ background: "radial-gradient(circle, rgba(56,189,248,0.16), transparent 60%)" }}
      />
    </div>
  );
}

/* ------------------------------- sections ------------------------------ */

function Nav({ active }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-4 z-30 px-4">
      <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-6 rounded-full border border-white/15 bg-slate-900/40 px-5 py-2.5 shadow-[0_8px_30px_rgba(2,6,23,0.5)] backdrop-blur-xl md:w-fit">
        <a href="#home" className="display text-lg font-bold text-white">
          {DATA.nickname}
        </a>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-sky-300 ${
                active === n.id ? "bg-white/15 text-white" : "text-blue-100/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              {n.label}
            </a>
          ))}
        </nav>
        <button
          className="rounded-full border border-white/20 px-3.5 py-1 text-sm font-medium text-white md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="mx-auto mt-2 max-w-3xl rounded-3xl border border-white/15 bg-slate-900/70 p-2 backdrop-blur-xl md:hidden"
        >
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              onClick={() => setOpen(false)}
              className={`block rounded-2xl px-4 py-3 text-base font-medium ${
                active === n.id ? "bg-white/15 text-white" : "text-blue-100/80"
              }`}
            >
              {n.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

function Hero() {
  const role = useTyping(DATA.roles);
  const stack = DATA.skills
    .flatMap((g) => g.items)
    .slice(0, 3)
    .map((s) => `"${s.name}"`)
    .join(", ");
  return (
    <section id="home" className="flex min-h-screen items-center px-6 pb-16 pt-32">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-4 py-1.5 text-sm text-blue-50 backdrop-blur-xl">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {DATA.status}
          </p>
          <h1 className="display mt-6 text-5xl font-extrabold leading-[0.98] tracking-tight text-white sm:text-7xl">
            {DATA.name}
          </h1>
          <p className="display mt-5 h-10 text-2xl font-semibold sm:text-3xl">
            <span className="grad-text">{role}</span>
            <span className="caret ml-1 inline-block h-7 w-0.5 translate-y-1 bg-sky-300" aria-hidden="true" />
          </p>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-blue-100/75">{DATA.headline}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="grad-btn rounded-full px-6 py-3 text-sm font-semibold text-white shadow-[0_0_30px_rgba(59,130,246,0.55)] transition-transform hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-sky-200"
            >
              See my projects
            </a>
            <a
              href="#contact"
              className="rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-xl transition-transform hover:scale-105 hover:bg-white/15 active:scale-95 focus-visible:ring-2 focus-visible:ring-sky-200"
            >
              Get in touch
            </a>
          </div>
          <div
            className="mt-10 grid max-w-md gap-3"
            style={{ gridTemplateColumns: `repeat(${DATA.stats.length}, minmax(0, 1fr))` }}
          >
            {DATA.stats.map((s) => (
              <GlassCard key={s.label} className="rounded-2xl p-4 text-center">
                <p className="display text-3xl font-bold text-white">
                  <CountUp to={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-1 text-xs text-blue-100/70">{s.label}</p>
              </GlassCard>
            ))}
          </div>
        </div>

        <div className="relative">
          <span className="bob absolute -left-3 -top-5 z-10 hidden rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-xl sm:block">
            React
          </span>
          <span
            className="bob absolute -right-2 top-1/2 z-10 hidden rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-xl sm:block"
            style={{ animationDelay: "-1.6s" }}
          >
            Tailwind
          </span>
          <span
            className="bob absolute -bottom-5 left-8 z-10 hidden rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-xl sm:block"
            style={{ animationDelay: "-3.2s" }}
          >
            Laravel
          </span>
          <GlassCard tilt className="p-0">
            <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3">
              <span className="h-3 w-3 rounded-full bg-sky-300/80" />
              <span className="h-3 w-3 rounded-full bg-blue-400/80" />
              <span className="h-3 w-3 rounded-full bg-indigo-400/80" />
              <span className="ml-3 text-xs text-blue-100/50">profile.js</span>
            </div>
            <div className="space-y-1 break-words p-6 font-mono text-[13px] leading-6 sm:text-sm">
              <p>
                <span className="text-sky-300">const</span> <span className="text-white">{DATA.nickname.toLowerCase()}</span>{" "}
                <span className="text-blue-200/60">=</span> {"{"}
              </p>
              <p className="pl-5">
                <span className="text-cyan-300">role</span>: <span className="text-blue-200">"{DATA.roles[0]}"</span>,
              </p>
              <p className="pl-5">
                <span className="text-cyan-300">stack</span>: <span className="text-blue-200">[{stack}]</span>,
              </p>
              <p className="pl-5">
                <span className="text-cyan-300">location</span>: <span className="text-blue-200">"{DATA.location}"</span>,
              </p>
              <p className="pl-5">
                <span className="text-cyan-300">available</span>: <span className="text-emerald-300">true</span>,
              </p>
              <p>{"}"};</p>
              <p className="pt-2 text-blue-200/50">// {DATA.status}</p>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}

function About() {
  const facts = [
    { label: "Location", value: DATA.location },
    { label: "Email", value: DATA.email },
    { label: "Focus", value: DATA.roles[0] },
  ];
  return (
    <Section id="about" title="About me">
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <GlassCard className="h-full p-8">
            <div className="max-w-xl space-y-4 text-lg leading-relaxed text-blue-50/90">
              {DATA.about.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </GlassCard>
        </Reveal>
        <div className="grid gap-4">
          {facts.map((f, i) => (
            <Reveal key={f.label} delay={i * 100}>
              <GlassCard className="rounded-2xl p-5">
                <p className="text-sm text-blue-100/60">{f.label}</p>
                <p className="display mt-1 break-words text-xl font-semibold text-white">{f.value}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Skills() {
  const [g, setG] = useState(0);
  const group = DATA.skills[g];
  return (
    <Section id="skills" title="Skills" subtitle="Pick a category to see what I work with.">
      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <div role="tablist" aria-label="Skill groups" className="flex gap-2 overflow-x-auto lg:flex-col">
          {DATA.skills.map((s, i) => (
            <button
              key={s.group}
              role="tab"
              aria-selected={g === i}
              onClick={() => setG(i)}
              className={`shrink-0 rounded-2xl border px-5 py-4 text-left font-semibold backdrop-blur-xl transition-all focus-visible:ring-2 focus-visible:ring-sky-300 ${
                g === i
                  ? "border-sky-300/50 bg-white/15 text-white shadow-[0_0_30px_rgba(56,189,248,0.25)]"
                  : "border-white/10 bg-white/5 text-blue-100/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              {s.group}
              <span className="ml-2 text-sm font-normal text-blue-100/50">{s.items.length}</span>
            </button>
          ))}
        </div>
        <div key={g} role="tabpanel" className="grid content-start gap-3 sm:grid-cols-2">
          {group.items.map((it, i) => (
            <div key={it.name} className="pop" style={{ animationDelay: `${i * 60}ms` }}>
              <GlassCard className="flex h-full items-center justify-between gap-4 rounded-2xl px-5 py-4">
                <span className="font-medium text-white">{it.name}</span>
                {it.rating > 0 && (
                  <span
                    className="flex shrink-0 gap-1"
                    role="img"
                    aria-label={`${it.rating} out of 5`}
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <span
                        key={n}
                        className={`h-2.5 w-2.5 rounded-full ${
                          n <= it.rating ? "grad-btn shadow-[0_0_8px_rgba(56,189,248,0.7)]" : "bg-white/15"
                        }`}
                      />
                    ))}
                  </span>
                )}
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Projects() {
  const tags = useMemo(() => ["All", ...new Set(DATA.projects.flatMap((p) => p.tags))], []);
  const [tag, setTag] = useState("All");
  const list = DATA.projects.filter((p) => tag === "All" || p.tags.includes(tag));
  return (
    <Section id="projects" title="Projects" subtitle="Filter by technology. Hover a card to tilt it.">
      <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter projects">
        {tags.map((t) => (
          <button
            key={t}
            onClick={() => setTag(t)}
            aria-pressed={tag === t}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium backdrop-blur-xl transition-all focus-visible:ring-2 focus-visible:ring-sky-300 ${
              tag === t
                ? "grad-btn border-transparent text-white shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                : "border-white/15 bg-white/5 text-blue-100/75 hover:bg-white/10 hover:text-white"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => {
          const i = DATA.projects.indexOf(p);
          return (
            <li key={p.title} className="pop">
              <GlassCard tilt className="flex h-full flex-col">
                <div
                  className="relative flex h-40 items-center justify-center overflow-hidden"
                  style={{ background: p.image ? undefined : THUMBS[i % THUMBS.length] }}
                >
                  {p.image ? (
                    <img src={p.image} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <span className="display select-none text-8xl font-extrabold text-white/25">
                      {p.title.charAt(0)}
                    </span>
                  )}
                  <span className="absolute right-4 top-4 rounded-full border border-white/25 bg-slate-900/30 px-3 py-1 text-xs text-white backdrop-blur-md">
                    {p.year}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="display text-xl font-bold text-white">{p.title}</h3>
                  <p className="mt-2 flex-1 leading-relaxed text-blue-100/75">{p.summary}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <li
                        key={t}
                        className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-blue-50"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex gap-5 text-sm font-semibold">
                    {p.live && p.live !== "#" && (
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sky-300 underline underline-offset-4 hover:text-white"
                      >
                        Live site
                      </a>
                    )}
                    {p.code && p.code !== "#" && (
                      <a
                        href={p.code}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sky-300 underline underline-offset-4 hover:text-white"
                      >
                        Source code
                      </a>
                    )}
                  </div>
                </div>
              </GlassCard>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}

function Experience() {
  return (
    <Section id="experience" title="Experience & education">
      <ol className="relative space-y-6 pl-8 sm:pl-10">
        <span className="absolute bottom-2 left-[11px] top-2 w-px bg-sky-400/30 sm:left-[15px]" aria-hidden="true" />
        {DATA.experience.map((e, i) => (
          <li key={e.title} className="relative">
            <span
              className="absolute -left-[27px] top-7 h-3.5 w-3.5 rounded-full bg-sky-400 shadow-[0_0_18px_4px_rgba(56,189,248,0.6)] sm:-left-[31px]"
              aria-hidden="true"
            />
            <Reveal delay={i * 120}>
              <GlassCard className="p-6">
                <p className="text-sm tabular-nums text-sky-300">{e.when}</p>
                <h3 className="display mt-1 text-xl font-bold text-white">{e.title}</h3>
                <p className="font-medium text-blue-50/90">{e.place}</p>
                <p className="mt-2 max-w-xl text-blue-100/70">{e.note}</p>
              </GlassCard>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}

function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(DATA.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable: the mailto link still works */
    }
  };
  return (
    <Section id="contact" title="Let's work together">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <GlassCard className="p-8 sm:p-10">
            <p className="display text-3xl font-bold leading-tight text-white sm:text-4xl">
              Have a project in mind? Email me and let's talk.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href={`mailto:${DATA.email}`} className="break-all text-lg font-semibold text-sky-300 hover:text-white">
                {DATA.email}
              </a>
              <button
                onClick={copy}
                className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-sky-300"
              >
                {copied ? "Copied!" : "Copy email"}
              </button>
            </div>
            <ul className="mt-8 flex flex-wrap gap-3">
              {DATA.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold text-white transition-transform hover:scale-105 hover:bg-white/20"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </GlassCard>
        </Reveal>
      </div>
    </Section>
  );
}

/* --------------------------------- app --------------------------------- */

export default function Portfolio() {
  const active = useActiveSection(SECTION_IDS);
  const bar = useRef(null);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const p = h.scrollTop / Math.max(h.scrollHeight - h.clientHeight, 1);
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
      setShowTop(h.scrollTop > 600);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="relative isolate min-h-screen overflow-x-hidden bg-slate-950 text-blue-100/80 antialiased"
      style={{ fontFamily: "'Instrument Sans', system-ui, sans-serif" }}
    >
      {/* Fonts + custom effects. You can move the @import to index.html and the rest to index.css. */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Instrument+Sans:wght@400;500;600&display=swap');
        html { scroll-behavior: smooth; }
        .display { font-family: 'Bricolage Grotesque', system-ui, sans-serif; }
        .grad-text { background-image: linear-gradient(90deg,#7dd3fc,#60a5fa 50%,#22d3ee); -webkit-background-clip: text; background-clip: text; color: transparent; }
        .grad-btn { background-image: linear-gradient(135deg,#38bdf8,#3b82f6 55%,#2563eb); }
        @keyframes float-a { 0%,100% { transform: translate3d(0,0,0); } 50% { transform: translate3d(60px,40px,0); } }
        @keyframes float-b { 0%,100% { transform: translate3d(0,0,0); } 50% { transform: translate3d(-50px,60px,0); } }
        @keyframes float-c { 0%,100% { transform: translate3d(0,0,0); } 50% { transform: translate3d(40px,-50px,0); } }
        .float-a { animation: float-a 18s ease-in-out infinite; }
        .float-b { animation: float-b 22s ease-in-out infinite; }
        .float-c { animation: float-c 20s ease-in-out infinite; }
        @keyframes bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .bob { animation: bob 5s ease-in-out infinite; }
        @keyframes pop { from { opacity: 0; transform: translateY(14px) scale(.98); } to { opacity: 1; transform: none; } }
        .pop { animation: pop .5s ease both; }
        @keyframes blink { 50% { opacity: 0; } }
        .caret { animation: blink 1s steps(1) infinite; }
        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
          .float-a, .float-b, .float-c, .bob, .pop, .caret { animation: none; }
        }
      `}</style>

      <Backdrop />

      <div className="fixed inset-x-0 top-0 z-40 h-1" aria-hidden="true">
        <div ref={bar} className="grad-btn h-full origin-left" style={{ transform: "scaleX(0)" }} />
      </div>

      <Nav active={active} />

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>

      <footer className="px-6 py-10 text-center text-sm text-blue-100/50">
        © {new Date().getFullYear()} {DATA.name}
      </footer>

      <a
        href="#home"
        aria-label="Back to top"
        className={`fixed bottom-6 right-6 z-30 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-xl text-white backdrop-blur-xl transition-all hover:bg-white/20 ${
          showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        ↑
      </a>
    </div>
  );
}