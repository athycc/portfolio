import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import dashboardOverview from "@/assets/dashboard-overview.jpg";
import dashboardDetail from "@/assets/dashboard-detail.jpg";
import dashboardSkills from "@/assets/dashboard-skills.jpg";
import eskwelabsAnalytics from "@/assets/eskwelabs-analytics.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

const heroContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

function Reveal({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-120px" }}
      variants={fadeUp}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

function VideoFigure({ src, caption, meta, poster }: { src: string; caption: string; meta: string; poster?: string }) {
  return (
    <figure className="border hairline bg-card overflow-hidden rounded-[4px]">
      <video
        src={src}
        poster={poster}
        controls
        preload="metadata"
        playsInline
        className="w-full h-auto block bg-black"
      />
      <figcaption className="border-t hairline px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground flex justify-between">
        <span>{caption}</span><span>{meta}</span>
      </figcaption>
    </figure>
  );
}

function Stat({ k, v, sub }: { k: string; v: string; sub?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="border-l-2 hairline pl-4 py-1"
    >
      <div className="font-display text-[2.5rem] font-light leading-none text-foreground">{v}</div>
      <div className="mt-2 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">{k}</div>
      {sub && <div className="text-xs text-muted-foreground mt-1">{sub}</div>}
    </motion.div>
  );
}

function SectionLabel({ n, t }: { n: string; t: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.6 }}
      className="flex items-baseline gap-3 text-xs uppercase tracking-[0.28em] text-muted-foreground"
    >
      <span className="italic text-accent">{n}</span>
      <span>·</span>
      <span>{t}</span>
    </motion.div>
  );
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldUseDark = stored ? stored === "dark" : prefersDark;
    document.documentElement.classList.toggle("dark", shouldUseDark);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#0d0d0d]/85 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-6 py-4 md:px-12">
          <div className="font-display text-lg font-light tracking-[0.08em] text-foreground">
            Cath<span className="text-accent">.</span>
          </div>
          <nav className="hidden items-center gap-8 text-[13px] uppercase tracking-[0.2em] text-muted-foreground md:flex">
            {[
              { label: "About", href: "#about" },
              { label: "Work", href: "#work" },
              { label: "Experience", href: "#experience" },
              { label: "Contact", href: "#contact" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="border-b-2 border-transparent pb-1 transition-all duration-[250ms] ease-out hover:text-foreground hover:border-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <button
            type="button"
            className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground md:hidden"
            onClick={() => setMenuOpen((value) => !value)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
          >
            Menu
            <span className="h-px w-6 bg-muted-foreground" />
          </button>
        </div>
        {menuOpen && (
          <div id="mobile-nav" className="border-t border-white/10 bg-[#0d0d0d] md:hidden">
            <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-4 px-6 py-6 text-[13px] uppercase tracking-[0.2em] text-muted-foreground">
              {[
                { label: "About", href: "#about" },
                { label: "Work", href: "#work" },
                { label: "Experience", href: "#experience" },
                { label: "Contact", href: "#contact" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="border-b border-white/10 pb-3 transition-colors duration-[250ms] ease-out hover:text-foreground"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      <section
        className="relative flex min-h-screen flex-col justify-end overflow-hidden px-6 py-28 md:px-12"
        style={{
          backgroundImage:
            "radial-gradient(circle at 70% 30%, rgba(200,240,74,0.06), transparent 55%), radial-gradient(circle at 20% 80%, rgba(255,107,53,0.05), transparent 55%)",
        }}
      >
        <div className="mx-auto w-full max-w-[1400px]">
          <motion.div variants={heroContainer} initial="hidden" animate="show" className="space-y-10">
            <motion.div variants={fadeUp} className="flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-accent">
              <span className="h-px w-8 bg-accent" />
              <span>Available for projects · Quezon City, PH</span>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="font-display text-[clamp(2.8rem,7vw,7rem)] font-light leading-[1] text-foreground"
            >
              Hi, I'm <span className="italic text-accent">Cath</span>.
            </motion.h1>
            <motion.div
              variants={fadeUp}
              className="flex flex-col gap-6 border-t border-white/10 pt-10 text-[14px] text-muted-foreground md:flex-row md:items-end md:justify-between"
            >
              <p className="max-w-[380px] leading-relaxed">
                IT student, EIF data analyst intern, and Captain of AWS Learning Club Alpha a student-led tech org. I work
                on the projects where analytics meets product, cleaning the schema, surfacing the metric, and shipping
                dashboards stakeholders actually open.
              </p>
              <div className="flex gap-12" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <motion.section
        id="about"
        className="border-t border-white/10 px-6 py-28 md:px-12"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-120px" }}
        variants={fadeUp}
      >
        <div className="mx-auto w-full max-w-[1400px]">
          <SectionLabel n="01" t="About me" />
          <div className="mt-10 grid gap-20 lg:grid-cols-2">
            <h2 className="font-display text-4xl font-light leading-[1.15] text-foreground md:text-[3.5rem]">
              IT student turning ideas into <span className="italic text-accent">working systems</span>, and occasionally,
              spontaneous side projects that ship.
            </h2>
            <div className="space-y-6 text-sm leading-[1.9] text-muted-foreground">
              <p>
                Experience spans web and app development, data analytics, and operational tooling. Work tends to start with
                the same question: <span className="text-foreground">what decision is this dashboard actually helping someone make?</span>
              </p>
              <p>
                Outside the terminal, chief executive of a student-led tech organization founded to close opportunity and
                resource gaps inside the school. Active across multiple tech communities. And, for full disclosure,
                currently housing twenty-two cats.
              </p>
              <div className="flex flex-wrap gap-2 pt-4">
                {["Power BI", "Looker Studio", "SQL", "Python", "Stakeholder reporting", "Product analytics"].map((skill, index) => (
                  <span
                    key={skill}
                    className={
                      index < 2
                        ? "rounded-[2px] border border-[#c8f04a4d] bg-[#c8f04a14] px-3 py-1.5 text-[12px] text-accent"
                        : "rounded-[2px] border border-white/10 bg-[#1e1e1e] px-3 py-1.5 text-[12px] text-muted-foreground"
                    }
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="border-t border-white/10 px-6 py-28 md:px-12"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-120px" }}
        variants={fadeUp}
      >
        <div className="mx-auto w-full max-w-[1400px]">
          <SectionLabel n="02" t="EIF program" />
          <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div className="space-y-6 lg:self-center">
              <h3 className="font-display text-3xl font-light text-foreground">EIF Journey</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { src: "/AIM.jpg", label: "AIM" },
                  { src: "/GENAI.jpg", label: "GENAI" },
                  { src: "/FEU.jpg", label: "FEU" },
                ].map((item) => (
                  <figure
                    key={item.label}
                    className={
                      item.label === "FEU"
                        ? "group overflow-hidden rounded-[4px] border hairline bg-card transition-transform duration-300 ease-out hover:-translate-y-[3px] sm:col-span-2 sm:mx-auto sm:w-full sm:max-w-[calc(50%-0.5rem)]"
                        : "group overflow-hidden rounded-[4px] border hairline bg-card transition-transform duration-300 ease-out hover:-translate-y-[3px]"
                    }
                  >
                    <div className="aspect-[16/9] w-full overflow-hidden">
                      <img src={item.src} alt={`${item.label} event photo`} className="h-full w-full object-cover object-center" />
                    </div>
                    <figcaption className="border-t hairline px-3 py-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                      {item.label}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <ul className="space-y-4 text-sm leading-relaxed text-muted-foreground">
                <li className="border-b hairline pb-4">
                  Built personal projects from scratch as deliberate learning experiments, picking unfamiliar tools to stress-test fundamentals.
                </li>
                <li className="border-b hairline pb-4">
                  Worked structured datasets end-to-end, focused on deriving insights stakeholders could actually act on.
                </li>
                <li className="border-b hairline pb-4">
                  Volunteered for Eskwelabs events, contributing to event support and coordination.
                </li>
                <li className="border-b hairline pb-4">
                  Built professional connections; learned how cross-discipline teams negotiate priorities and ship together.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        id="work"
        className="border-t border-white/10 px-6 py-28 md:px-12"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-120px" }}
        variants={fadeUp}
      >
        <div className="mx-auto w-full max-w-[1400px]">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <SectionLabel n="03" t="Selected work" />
          </div>

          <div className="mt-12 grid grid-cols-12 gap-10 mb-12">
            <div className="col-span-12 md:col-span-5">
              <div className="text-[10px] uppercase tracking-[0.3em] text-accent mb-4">Capstone · Internal tool</div>
              <h2 className="font-display text-5xl md:text-6xl leading-[0.95] text-balance">
                Product Backlog<br />Dashboard
              </h2>
              <div className="mt-6 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] border hairline px-3 py-1.5">
                Built for · Head of Development
              </div>
            </div>
            <div className="col-span-12 md:col-span-7 md:pl-10 md:border-l hairline">
              <div className="text-[10px] uppercase tracking-[0.3em] text-foreground mb-3">Problem</div>
              <p className="text-base leading-relaxed text-muted-foreground">
                The product team needed a centralized way to track and prioritize
                <span className="text-foreground"> 170+ backlog items</span> spanning multiple initiatives (LXD, OPM, FrontofFunnel,
                Ilog_Eskwelabs) and item types (workflows, tables, memos, financial models). Without visibility into urgency,
                status, and resource allocation, the Head of Development couldn't reliably prioritize, surface blockers,
                or detect stale work.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-4 mb-16">
            <figure className="col-span-12 md:col-span-7 border hairline bg-card overflow-hidden rounded-[4px] transition-transform duration-300 ease-out hover:-translate-y-[3px]">
              <img src={dashboardOverview} alt="Power BI overview page showing Total Backlog 170, Active Items 35, Paused 93, with status pie chart and urgency bars." className="w-full h-auto block" />
              <figcaption className="border-t hairline px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground flex justify-between">
                <span>Fig. 01, Backlog overview</span><span>PBI · Page 1/4</span>
              </figcaption>
            </figure>
            <figure className="col-span-12 md:col-span-5 border hairline bg-card overflow-hidden rounded-[4px] transition-transform duration-300 ease-out hover:-translate-y-[3px]">
              <img src={dashboardDetail} alt="Detail page with metrics broken down by epic, type, urgency, version, and builder." className="w-full h-auto block" />
              <figcaption className="border-t hairline px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground flex justify-between">
                <span>Fig. 02, Initiative detail</span><span>PBI · Page 2/4</span>
              </figcaption>
            </figure>
            <figure className="col-span-12 border hairline bg-card overflow-hidden rounded-[4px] transition-transform duration-300 ease-out hover:-translate-y-[3px]">
              <img src={dashboardSkills} alt="Story-level sprint and builder views with story points and pay breakdown." className="w-full h-auto block" />
              <figcaption className="border-t hairline px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground flex justify-between">
                <span>Fig. 03, Sprint & resource view</span><span>PBI · Page 3-4/4</span>
              </figcaption>
            </figure>
          </div>

          <div className="grid grid-cols-12 gap-4 mb-16">
            <div className="col-span-12">
              <div className="text-[10px] uppercase tracking-[0.3em] text-foreground mb-4">Walkthrough</div>
            </div>
            <div className="col-span-12">
              <VideoFigure src="/videos/looker-backlog.mp4" caption="Demo, Backlog dashboard walkthrough" meta="MP4 · 1:32" />
            </div>
          </div>

          <div className="grid grid-cols-12 gap-10">
            <div className="col-span-12 md:col-span-7">
              <div className="text-[10px] uppercase tracking-[0.3em] text-foreground mb-4">Role & Contributions</div>
              <ul className="space-y-3 text-sm leading-relaxed">
                {[
                  "Owned the analytics workstream end-to-end, from raw backlog export to a stakeholder-ready Power BI + Looker Studio report set.",
                  "Defined the metric set the HOD reviews weekly: Total Backlog, Active, Paused, High Urgency, Blockers, Stale Items, Value Points, and Initiative Completion %.",
                  "Cleaned and modeled raw backlog data, standardized codes, types, epics, urgency, and priority fields into a consistent schema.",
                  "Authored DAX measures for urgency-weighted value, completion %, and stale-item flags; built calculated tables for sprint and resource rollups.",
                  "Designed a multi-page report, backlog overview, initiative & epic tracking, story-level sprint view, and a builder/resource view with pay and task load.",
                  "Replicated the model in Looker Studio for a finance-leaning view, so non-PBI stakeholders could self-serve.",
                  "Ran feedback loops with the Head of Development to iterate on layout, filters, and which numbers earned hero placement.",
                ].map((line, i) => (
                  <li key={i} className="flex gap-4 border-b hairline pb-3">
                    <span className="text-[10px] text-muted-foreground pt-1 w-6">{String(i + 1).padStart(2, "0")}</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-12 md:col-span-5 md:pl-10 md:border-l hairline">
              <div className="text-[10px] uppercase tracking-[0.3em] text-foreground mb-4">Skills demonstrated</div>
              <div className="flex flex-wrap gap-2">
                {[
                  "Data cleaning",
                  "Power BI",
                  "DAX measures",
                  "Multi-page report design",
                  "Slicers & filters",
                  "Product thinking",
                  "Agile / story points",
                  "Stakeholder-led design",
                ].map((s) => (
                  <span key={s} className="text-xs px-3 py-1.5 border hairline bg-card rounded-[2px]">
                    {s}
                  </span>
                ))}
              </div>
              <div className="mt-10 p-6 border-l-2 border-accent bg-secondary/40">
                <div className="text-[10px] uppercase tracking-[0.3em] text-accent mb-2">Design intent</div>
                <p className="text-sm text-foreground leading-relaxed">
                  Surface blockers and high-urgency items <span className="italic">prominently</span> so the first 10 seconds on the page already answer "what should I look at today?"
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="border-t border-white/10 px-6 py-28 md:px-12"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-120px" }}
        variants={fadeUp}
      >
        <div className="mx-auto w-full max-w-[1400px]">
          <SectionLabel n="04" t="Project 02 / Looker Studio" />

          <div className="mt-12 grid grid-cols-12 gap-10 mb-12">
            <div className="col-span-12 md:col-span-5">
              <div className="text-[10px] uppercase tracking-[0.3em] text-accent mb-4">Capstone · Finance dashboard</div>
              <h2 className="font-display text-5xl md:text-6xl leading-[0.95] text-balance">
                Annual Financial<br />Dashboard
              </h2>
              <div className="mt-6 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] border hairline px-3 py-1.5">
                Built for · Chief Finance Officer
              </div>
            </div>
            <div className="col-span-12 md:col-span-7 md:pl-10 md:border-l hairline">
              <div className="text-[10px] uppercase tracking-[0.3em] text-foreground mb-3">Problem</div>
              <p className="text-base leading-relaxed text-muted-foreground">
                The CFO needed a single annual view of program economics, revenue, COGS, gross profit, GM%, and per-student unit economics, sliceable by
                <span className="text-foreground"> year, product, client type, location,</span> and <span className="text-foreground"> topic</span>.
                Without it, finance reviews relied on stitching together exports, and cost drivers behind each program line were hard to isolate.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-6 border-t border-b hairline py-8 mb-12">
            <Stat k="Programs" v="92" />
            <Stat k="Total revenue" v="$39.1m" />
            <Stat k="Total COGS" v="$20.4m" />
            <Stat k="Gross profit" v="$18.7m" />
            <Stat k="GM %" v="42.7%" />
            <Stat k="Students enrolled" v="19,025" />
          </div>

          <div className="grid grid-cols-12 gap-4 mb-16">
            <div className="col-span-12">
              <div className="text-[10px] uppercase tracking-[0.3em] text-foreground mb-4">Walkthrough</div>
            </div>
            <div className="col-span-12">
              <VideoFigure src="/videos/financial-looker.mp4" caption="Demo, Annual Financial dashboard walkthrough" meta="MP4 · 0:56" />
            </div>
          </div>

          <div className="grid grid-cols-12 gap-10">
            <div className="col-span-12 md:col-span-7">
              <div className="text-[10px] uppercase tracking-[0.3em] text-foreground mb-4">Role & Contributions</div>
              <ul className="space-y-3 text-sm leading-relaxed">
                {[
                  "Owned data cleaning and modeling for program revenue and cost data across cohorts.",
                  "Built KPI summaries and unit economics views to compare GM% by segment and program.",
                  "Designed filter architecture for year, product, location, and client type.",
                  "Worked with finance leadership to define which numbers needed immediate visibility.",
                ].map((line, i) => (
                  <li key={i} className="flex gap-4 border-b hairline pb-3">
                    <span className="text-[10px] text-muted-foreground pt-1 w-6">{String(i + 1).padStart(2, "0")}</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-12 md:col-span-5 md:pl-10 md:border-l hairline">
              <div className="text-[10px] uppercase tracking-[0.3em] text-foreground mb-4">Skills demonstrated</div>
              <div className="flex flex-wrap gap-2">
                {[
                  "Looker Studio",
                  "Financial modeling",
                  "Unit economics",
                  "Data QA",
                  "Executive reporting",
                ].map((s) => (
                  <span key={s} className="text-xs px-3 py-1.5 border hairline bg-card rounded-[2px]">
                    {s}
                  </span>
                ))}
              </div>
              <div className="mt-10 p-6 border-l-2 border-accent bg-secondary/40">
                <div className="text-[10px] uppercase tracking-[0.3em] text-accent mb-2">Design intent</div>
                <p className="text-sm text-foreground leading-relaxed">
                  Give leadership a single, clean window into revenue and margin so quarterly decisions never wait on manual spreadsheets.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        id="experience"
        className="border-t border-white/10 px-6 py-28 md:px-12"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-120px" }}
        variants={fadeUp}
      >
        <div className="mx-auto w-full max-w-[1400px]">
          <SectionLabel n="05" t="Project 03 / Web App" />
          <div className="mt-12 grid grid-cols-12 gap-10">
            <div className="col-span-12">
              <div className="text-[10px] uppercase tracking-[0.3em] text-accent mb-4">Website integration</div>
              <h2 className="font-display text-5xl md:text-6xl leading-[0.95] text-balance">
                Eskwelabs
                <br />Dashboard
              </h2>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                Started with an Event Attendance integration, then expanded into the Product Backlog website. Both focus on data analysis, metrics, performance insights, and role-based views.
              </p>
              <div className="mt-8 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] border hairline px-3 py-1.5">
                Stack · React, Vite, Chart.js, Supabase
              </div>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <VideoFigure src="/videos/product-demo.mp4" caption="Demo, Event attendance" meta="MP4" />
            <VideoFigure src="/videos/website-drafts.mp4" caption="Demo, Product backlog website" meta="MP4" />
          </div>
        </div>
      </motion.section>

      <motion.section
        id="contact"
        className="border-t border-white/10 px-6 py-32 md:px-12"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-120px" }}
        variants={fadeUp}
      >
        <div className="mx-auto flex w-full max-w-[1400px] flex-col items-center text-center">
          <div className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">06 · Let's work together</div>
          <h2 className="mt-6 font-display text-[clamp(3rem,7vw,6rem)] font-light leading-[1.05] text-foreground">
            Got a project in <span className="italic text-accent">mind?</span>
          </h2>
          <a
            href="mailto:notadocath@gmail.com"
            className="mt-6 font-display text-[1.1rem] text-muted-foreground transition-colors duration-[250ms] ease-out hover:text-foreground hover:underline"
          >
            notadocath@gmail.com
          </a>
        </div>
      </motion.section>

      <footer className="border-t border-white/10 px-6 py-8 md:px-12">
        <div className="mx-auto flex w-full max-w-[1400px] flex-col justify-between gap-4 text-[12px] text-muted-foreground md:flex-row">
          <div>© 2026 Cath. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
