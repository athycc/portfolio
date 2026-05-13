import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import eskwelabsThumb from "../assets/eskwelabs-analytics.jpg";
import powerBiThumb from "../assets/dashboard-overview.jpg";
import skillsThumb from "../assets/dashboard-skills.jpg";
import detailThumb from "../assets/dashboard-detail.jpg";

const appconThumb = "/GENAI.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

type Project = {
  title: string;
  role: string;
  period: string;
  summary: string;
  tech: string[];
  media:
    | {
        type: "image";
        src: string;
      }
    | {
        type: "video";
        id: string;
        poster?: string;
      };
};

type Highlight = {
  label: string;
  value: string;
  note: string;
};

type ResumeItem = {
  title: string;
  meta: string;
  summary: string;
  tags: string[];
};

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

const featuredProjects: Project[] = [
  {
    title: "APPCON - CapyCademy",
    role: "AI learning platform",
    period: "2024 - Present",
    summary: "An AI-powered learning platform for students, framed around accessible study support and smarter learning workflows with intelligent tutoring and resource curation.",
    tech: ["React", "Python", "AI/ML", "Firebase", "Tailwind CSS"],
    media: {
      type: "video",
      id: "1PRYsDeffIIBvqUPual322HVbgf4calIz",
      poster: appconThumb,
    },
  },
  {
    title: "Power BI Analytics Dashboard",
    role: "Data visualization & analytics",
    period: "EIF Capstone 2026",
    summary: "Interactive data analytics feature for surfacing trends, reporting patterns, and presentation-ready insights from the capstone dataset.",
    tech: ["Power BI", "SQL", "Excel", "Data Analysis", "Business Intelligence"],
    media: {
      type: "video",
      id: "1IBFZoYrIVJipFDFd38E_Z2P-UVzDjmHJ",
      poster: powerBiThumb,
    },
  },
  {
    title: "Eskwelabs Analytics Web App",
    role: "Full-stack data platform",
    period: "2025 - 2026",
    summary: "End-to-end analytics solution for student performance tracking, course enrollment analysis, and learning outcome prediction with interactive visualizations.",
    tech: ["React", "Node.js", "MySQL", "Tailwind CSS", "Recharts"],
    media: {
      type: "video",
      id: "16996zaO9BTqfBi2X-ChuoAlcRRaBuwRs",
      poster: eskwelabsThumb,
    },
  },
];

const resumeExperience: ResumeItem[] = [
  {
    title: "Marketing Intern — Edukasyon.ph",
    meta: "Hybrid | March 2026 - Present",
    summary: "Managed social media monitoring, community engagement, and strategic content execution to support marketing targets and objectives.",
    tags: ["Marketing", "Content", "Community"],
  },
  {
    title: "Data Analyst Intern — Eskwelabs",
    meta: "Hybrid | February 2026 - Present",
    summary: "Building a Product Development Backlog Dashboard using Microsoft Power BI and transforming synthetic data into actionable insights for decision-making.",
    tags: ["Power BI", "Data Analysis", "Dashboards"],
  },
  {
    title: "Captain — Amazon Web Services",
    meta: "Onsite | November 2025 - Present",
    summary: "Recognized as AWS Cloud Club Captain, organized technical events for students, and earned the Gold Badge Captain Award from AWS.",
    tags: ["AWS", "Leadership", "Cloud"],
  },
  {
    title: "Research Intern — Heartful Hospitality",
    meta: "Remote | June - October 2025",
    summary: "Researched senior health issues and created accessible, evidence-based content with accurate citations while helping develop wellness programs and recommendations.",
    tags: ["Research", "Writing", "Accessibility"],
  },
  {
    title: "Speaker Coordinator — DEVCON Manila",
    meta: "Hybrid | April 2025 - Present",
    summary: "Managed technical presentations, handled speaker communications, organized schedules, and facilitated seamless programming.",
    tags: ["Events", "Operations", "Public Speaking"],
  },
  {
    title: "Speaker Coordinator — Arduino Day Philippines",
    meta: "Hybrid | January - March 2025",
    summary: "Coordinated technical presentations and managed speaker communications for community events.",
    tags: ["Events", "Coordination", "Community"],
  },
  {
    title: "IT Support & Data Management — Philippine National Police (QCPD)",
    meta: "Onsite | January - May 2022",
    summary: "Managed digital documentation workflows for departmental efficiency and developed and deployed the official website for the QCPD sector.",
    tags: ["IT Support", "Documentation", "Web"],
  },
];

const volunteeringEvents: ResumeItem[] = [
  {
    title: "Host — CaffeineAI",
    meta: "Onsite | October 2025",
    summary: "Interviewed guests, mentors, participants, and volunteers in the hackathon.",
    tags: ["Host", "Events", "Communication"],
  },
  {
    title: "Stage Manager and Usher — UNLEASH Philippines",
    meta: "Onsite | September 2025",
    summary: "Coordinated stage flow, performers, and technical cues.",
    tags: ["Stage Management", "Logistics", "Events"],
  },
  {
    title: "Secretariat and Usher — IoT Conference of the Philippines",
    meta: "Onsite | September 2025",
    summary: "Managed documentation, communication, and scheduling while assisting attendees.",
    tags: ["Documentation", "Scheduling", "Support"],
  },
  {
    title: "Program Manager — DEVCON Manila (Game On Game Jam)",
    meta: "Onsite | August 2025",
    summary: "Handled the event facilities, staff, and speakers, and oversaw the timeline, resources, and activities.",
    tags: ["Program Management", "Operations", "Leadership"],
  },
];

const projectParticipations: ResumeItem[] = [
  {
    title: "OTIS Japan Incorporation — Appcon 2024",
    meta: "Qualified Rank 75/178 Teams | April 21, 2025",
    summary: "Team leader who developed an application that lessens skill gap issues.",
    tags: ["React", "ShadCN", "Tailwind CSS", "Zustand", "TanStack Query", "FastAPI", "Supabase", "OpenAI API", "DeepSeek", "Gemini"],
  },
  {
    title: "GDG PUP X CyberPH — SEEN 2025 Capture the Flag",
    meta: "Ranked 11th | August 20, 2025",
    summary: "Captured flags by solving problems related to network analysis, digital forensics, and related security tasks.",
    tags: ["CTF", "Network Analysis", "Digital Forensics"],
  },
  {
    title: "Trend Micro — Trend University CTF",
    meta: "Ranked 116th/199 Teams | August 22, 2025",
    summary: "Participated in the university capture the flag preliminary round, focusing on reverse engineering, OSINT, and related challenges.",
    tags: ["CTF", "Reverse Engineering", "OSINT"],
  },
  {
    title: "KadaKareer — Home Credit Hackada Competition",
    meta: "3rd Runner-Up | November 18, 2024",
    summary: "Lead programmer who built a customer engagement platform with a loyalty system for Home Credit Philippines.",
    tags: ["React.js", "JavaScript", "TailwindCSS", "TypeScript", "Figma"],
  },
  {
    title: "Trend Micro — Trend University CTF",
    meta: "Ranked 100/199 Teams | August 20, 2024",
    summary: "Participated in the online competition and solved cybersecurity challenges.",
    tags: ["CTF", "Cybersecurity", "Problem Solving"],
  },
  {
    title: "PUP Programmers Guild — Tech Careerscape",
    meta: "3rd Runner-Up | September 16, 2023",
    summary: "Researched the impact of the skill gap in companies in the Philippines and established a prototype for a skill gap assessment platform.",
    tags: ["Research", "Prototyping", "Skill Gap"],
  },
  {
    title: "Technological Institute of the Philippines — Robotics Competition",
    meta: "Champion | May 6, 2023",
    summary: "Designed and built an autonomous sumobot using Arduino Uno, DC motors, L298N driver, and IR sensors.",
    tags: ["Arduino", "Robotics", "Embedded Systems"],
  },
];

const additionalProjects: Project[] = [
  {
    title: "Poro: Time Management Web Application",
    role: "Web application",
    period: "2024",
    summary: "A time management app designed to help users organize tasks and keep a practical daily workflow with smart scheduling and task prioritization.",
    tech: ["React", "JavaScript", "Local Storage", "Tailwind CSS", "Responsive Design"],
    media: {
      type: "image",
      src: skillsThumb,
    },
  },
  {
    title: "Skill Gap Analysis Website",
    role: "Research / web project",
    period: "2024",
    summary: "A skills analysis website focused on identifying gaps and turning raw input into actionable direction with data visualization and actionable insights.",
    tech: ["React", "JavaScript", "Data Visualization", "Bootstrap", "GitHub Pages"],
    media: {
      type: "image",
      src: detailThumb,
    },
  },
  {
    title: "Arduino Robotics Project",
    role: "Robotics",
    period: "2023 - 2024",
    summary: "A robotics build that reflects hands-on prototyping, hardware problem solving, and iteration with motor control and sensor integration.",
    tech: ["Arduino", "C++", "Hardware Design", "Microcontrollers", "Prototyping"],
    media: {
      type: "video",
      id: "1xZAUodqRJe_arx5DPSV1KjDbVHninBN7",
      poster: appconThumb,
    },
  },
  {
    title: "Credivest",
    role: "Fintech concept",
    period: "2024",
    summary: "A finance-oriented concept for presenting investment or lending flows with a polished product demo and clear data storytelling.",
    tech: ["React", "TypeScript", "Fintech", "UI Design", "Presentation"],
    media: {
      type: "video",
      id: "1eyXYl9GuWGVHGBViCcP0n2mGQZUUbodx",
      poster: detailThumb,
    },
  },
];

const backgroundHighlights: Highlight[] = [
  {
    label: "Current focus",
    value: "Cybersecurity + data science",
    note: "You are combining web development, analytics, and security work across internships and projects.",
  },
  {
    label: "Leadership",
    value: "AWS Club Alpha",
    note: "Co-founder and Chief Executive Officer of the RTU AWS Learning Club.",
  },
  {
    label: "Education",
    value: "RTU, BSIT",
    note: "Cumulative GWA 1.50 and Academic Achiever, 2023 to present.",
  },
  {
    label: "Research + events",
    value: "Community work",
    note: "Active across hackathons, conferences, student council, and speaker coordination.",
  },
];

const certificationChips = [
  "DataCamp - Certified Data Science Associate",
  "DataCamp - Certified Data Analyst Associate",
  "Oracle Fusion AI Foundation Associate",
  "CompTIA Security+",
  "Quantum and Blockchain Lecture and Hackathon Series",
  "NVIDIA - Elevate Emerging Technologies",
  "Introduction Course: Python, AI, Machine Learning, Data Science",
  "Data Engineering Pilipinas DataCamp Scholar",
  "Security Blue Team - Blue Team Junior Analyst",
  "OPSWAT Academy - Cybersecurity Fundamentals Associate",
  "MySQL Querying Fundamentals",
  "JavaScript Coding Camp",
  "Data Visualization Workshop",
];

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
      {sub ? <div className="mt-1 text-xs text-muted-foreground">{sub}</div> : null}
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

function ProjectMedia({ project }: { project: Project }) {
  // shared image class for static images
  const imgClass = "mb-5 w-full rounded-[6px] object-cover opacity-95";

  if (project.media.type === "video") {
    return (
      <div className="mb-5 w-full rounded-[6px] overflow-hidden bg-[#0f0f0f]">
        <div
          className="relative"
          style={{
            paddingTop: "56.25%",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundImage: project.media.poster ? `url(${project.media.poster})` : "none",
          }}
        >
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://drive.google.com/file/d/${project.media.id}/preview`}
            title={project.title}
            allow="autoplay; encrypted-media"
            loading="lazy"
            allowFullScreen
          />
        </div>
      </div>
    );
  }

  return <img src={project.media.src} alt={project.title} className={imgClass} />;
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
    <div className="min-h-screen bg-[#0a0a0a] text-foreground">
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
              <a key={item.href} href={item.href} className="border-b-2 border-transparent pb-1 transition-all duration-[250ms] ease-out hover:text-foreground hover:border-foreground">
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
        {menuOpen ? (
          <div id="mobile-nav" className="border-t border-white/10 bg-[#0d0d0d] md:hidden">
            <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-4 px-6 py-6 text-[13px] uppercase tracking-[0.2em] text-muted-foreground">
              {[
                { label: "About", href: "#about" },
                { label: "Work", href: "#work" },
                { label: "Experience", href: "#experience" },
                { label: "Contact", href: "#contact" },
              ].map((item) => (
                <a key={item.href} href={item.href} className="border-b border-white/10 pb-3 transition-colors duration-[250ms] ease-out hover:text-foreground" onClick={() => setMenuOpen(false)}>
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        ) : null}
      </header>

      <section className="relative flex min-h-screen flex-col justify-end overflow-hidden px-6 py-28 md:px-12" style={{ backgroundImage: "radial-gradient(circle at 70% 30%, rgba(200,240,74,0.06), transparent 55%), radial-gradient(circle at 20% 80%, rgba(255,107,53,0.05), transparent 55%)" }}>
        <div className="mx-auto w-full max-w-[1400px]">
          <motion.div variants={heroContainer} initial="hidden" animate="show" className="space-y-10">
            <motion.div variants={fadeUp} className="flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-accent">
              <span className="h-px w-8 bg-accent" />
              <span>Available for projects · Quezon City, PH</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="font-display text-[clamp(2.8rem,7vw,7rem)] font-light leading-[1] text-foreground">
              Hi, I'm <span className="italic text-accent">Cath</span>.
            </motion.h1>
            <motion.div variants={fadeUp} className="grid gap-8 border-t border-white/10 pt-10 text-[14px] text-muted-foreground lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div className="space-y-4 leading-relaxed">
                <p>
                  IT student specializing in cybersecurity, web development, and data science with full-stack deployment experience.
                </p>
                <p>
                  I build projects that mix systems thinking with clear presentation, from research tools and learning platforms to robotics and web apps.
                </p>
              </div>
              <div className="grid gap-3 text-[11px] uppercase tracking-[0.25em] text-muted-foreground sm:grid-cols-2 lg:grid-cols-1">
                <div className="border border-white/10 bg-[#131313] px-4 py-3">Full-stack deployment</div>
                <div className="border border-white/10 bg-[#131313] px-4 py-3">Cybersecurity + data</div>
                <div className="border border-white/10 bg-[#131313] px-4 py-3">Web apps + research</div>
                <div className="border border-white/10 bg-[#131313] px-4 py-3">Robotics + automation</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <motion.section id="about" className="border-t border-white/10 px-6 py-28 md:px-12" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-120px" }} variants={fadeUp}>
        <div className="mx-auto w-full max-w-[1400px]">
          <SectionLabel n="01" t="About me" />
          <div className="mt-10 grid gap-20 lg:grid-cols-2">
            <h2 className="font-display text-4xl font-light leading-[1.15] text-foreground md:text-[3.5rem]">
              My portfolio spans <span className="italic text-accent">cybersecurity, web development, data science, and systems work</span>, not just one lane.
            </h2>
            <div className="space-y-6 text-sm leading-[1.9] text-muted-foreground">
              <p>
                I want the site to show the full range of what I have built: AI learning platforms, guidance tools, fintech concepts, time management apps, research presentations, and hardware projects.
              </p>
              <p>
                I also work in student leadership and volunteering, so the portfolio needs to show both technical output and the community side of the work.
              </p>
              <div className="flex flex-wrap gap-2 pt-4">
                {[
                  "Python",
                  "JavaScript",
                  "React.js",
                  "Tailwind CSS",
                  "Firebase",
                  "MySQL",
                  "Linux",
                  "Git",
                ].map((skill, index) => (
                  <span
                    key={skill}
                    className={index < 2 ? "rounded-[2px] border border-[#c8f04a4d] bg-[#c8f04a14] px-3 py-1.5 text-[12px] text-accent" : "rounded-[2px] border border-white/10 bg-[#1e1e1e] px-3 py-1.5 text-[12px] text-muted-foreground"}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section id="work" className="border-t border-white/10 px-6 py-28 md:px-12" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-120px" }} variants={fadeUp}>
        <div className="mx-auto w-full max-w-[1400px]">
          <SectionLabel n="02" t="Featured projects" />
          <div className="mt-8 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            These are the primary projects I want to feature first.
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <article key={project.title} className="rounded-lg shadow-lg border border-white/10 bg-[#141414] p-6 transition-transform duration-300 ease-out hover:-translate-y-[3px]">
                <ProjectMedia project={project} />
                <div className="text-[10px] uppercase tracking-[0.3em] text-accent">{project.role}</div>
                <h3 className="mt-3 font-display text-3xl font-light text-foreground">{project.title}</h3>
                <div className="mt-2 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">{project.period}</div>
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{project.summary}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span key={tech} className="rounded-[2px] border border-white/10 bg-[#1e1e1e] px-3 py-1 text-[11px] text-muted-foreground">{tech}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <a href="#other-projects" className="inline-flex items-center gap-3 border border-accent/40 bg-[#1a1a1a] px-6 py-3 text-[11px] uppercase tracking-[0.28em] text-accent transition-all duration-300 ease-out hover:-translate-y-[2px] hover:border-accent hover:bg-[#202020]">
              View other projects
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </motion.section>

      <motion.section id="other-projects" className="border-t border-white/10 px-6 py-28 md:px-12" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-120px" }} variants={fadeUp}>
        <div className="mx-auto w-full max-w-[1400px]">
          <SectionLabel n="03" t="Other projects" />
          <div className="mt-8 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Supporting projects, research work, and build experiments that round out the portfolio.
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {additionalProjects.map((project) => (
              <article key={project.title} className="rounded-lg shadow-lg border border-white/10 bg-[#141414] p-6 transition-transform duration-300 ease-out hover:-translate-y-[3px]">
                <ProjectMedia project={project} />
                <div className="text-[10px] uppercase tracking-[0.3em] text-accent">{project.role}</div>
                <h3 className="mt-3 font-display text-3xl font-light text-foreground">{project.title}</h3>
                <div className="mt-2 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">{project.period}</div>
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{project.summary}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span key={tech} className="rounded-[2px] border border-white/10 bg-[#1e1e1e] px-3 py-1 text-[11px] text-muted-foreground">{tech}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section id="experience" className="border-t border-white/10 px-6 py-28 md:px-12" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-120px" }} variants={fadeUp}>
        <div className="mx-auto w-full max-w-[1400px]">
          <SectionLabel n="04" t="Professional experience" />
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {resumeExperience.map((item) => (
              <article key={item.title} className="border border-white/10 bg-[#141414] p-6">
                <div className="text-[10px] uppercase tracking-[0.3em] text-accent">{item.meta}</div>
                <h3 className="mt-3 font-display text-2xl font-light text-foreground">{item.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{item.summary}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="rounded-[2px] border border-white/10 bg-[#1e1e1e] px-3 py-1 text-[11px] text-muted-foreground">{tag}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
          <div className="mt-12 grid gap-10 lg:grid-cols-2">
            <div>
              <div className="mb-4 text-[10px] uppercase tracking-[0.3em] text-foreground">Volunteering & events</div>
              <div className="space-y-4">
                {volunteeringEvents.map((item) => (
                  <article key={item.title} className="border-b hairline pb-4">
                    <div className="text-[10px] uppercase tracking-[0.3em] text-accent">{item.meta}</div>
                    <h4 className="mt-2 font-display text-xl font-light text-foreground">{item.title}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.summary}</p>
                  </article>
                ))}
              </div>
            </div>
            <div>
              <div className="mb-4 text-[10px] uppercase tracking-[0.3em] text-foreground">Leadership activities & awards</div>
              <ul className="space-y-3 text-sm leading-relaxed text-muted-foreground">
                <li className="border-b hairline pb-3">(RTU) AWS Learning Club - Alpha, Co-founder & Chief Executive Officer, September 2025 - Present.</li>
                <li className="border-b hairline pb-3">RTU Student Council Department of Archives, Member, October 2023 - August 2024.</li>
                <li className="border-b hairline pb-3">3rd Place, KadaKareer HomeCredit Hackathon.</li>
                <li className="border-b hairline pb-3">Participant, DECODE 2024 University Capture The Flag by Trend Micro.</li>
                <li className="border-b hairline pb-3">3rd Place, PUP Programmers Guild Tech Careerscape.</li>
                <li className="border-b hairline pb-3">Champion, Robotics Competition - Technological Institute of the Philippines.</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section className="border-t border-white/10 px-6 py-28 md:px-12" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-120px" }} variants={fadeUp}>
        <div className="mx-auto w-full max-w-[1400px]">
          <SectionLabel n="05" t="Projects, education & certifications" />
          <div className="mt-8 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            This section ties together your technical participations, academic background, and completed trainings.
          </div>
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <div className="mb-2 text-[10px] uppercase tracking-[0.3em] text-accent">Project participations</div>
              <div className="grid gap-4">
                {projectParticipations.map((item) => (
                  <article key={item.title} className="border border-white/10 bg-[#141414] p-5">
                    <div className="text-[10px] uppercase tracking-[0.3em] text-accent">{item.meta}</div>
                    <h3 className="mt-3 font-display text-2xl font-light text-foreground">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.summary}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span key={tag} className="rounded-[2px] border border-white/10 bg-[#1e1e1e] px-3 py-1 text-[11px] text-muted-foreground">{tag}</span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <div className="space-y-10">
              <div>
                <div className="mb-2 text-[10px] uppercase tracking-[0.3em] text-accent">Education</div>
                <h3 className="font-display text-3xl font-light text-foreground">Rizal Technological University</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Bachelor of Science in Information Technology, 2023 - Present.</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Cumulative GWA: 1.50, Academic Achiever.</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Scholar support: Quezon City Youth Development Organization Scholar, Data Engineering Pilipinas DataCamp Scholar, and Amazon Web Services AI & ML Scholar.</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Relevant coursework: Software Development, Object Oriented Programming, Integrative Programming and Technologies, Web Systems and Technologies, Database Management, Operating Systems, and Networking.</p>
              </div>
              <div>
                <div className="mb-4 text-[10px] uppercase tracking-[0.3em] text-foreground">Certifications</div>
                <div className="flex flex-wrap gap-2">
                  {certificationChips.map((cert) => (
                    <span key={cert} className="rounded-[2px] border border-white/10 bg-[#1e1e1e] px-3 py-1.5 text-[12px] text-muted-foreground">{cert}</span>
                  ))}
                </div>
              </div>
              <div className="border-l-2 border-accent bg-secondary/40 p-6">
                <div className="mb-2 text-[10px] uppercase tracking-[0.3em] text-accent">Contact</div>
                <div className="space-y-3 text-sm leading-relaxed text-foreground">
                  <div><a href="mailto:notadocath@gmail.com" className="hover:underline">notadocath@gmail.com</a></div>
                  <div><a href="https://www.linkedin.com/in/catherine-notado-679a29246" className="hover:underline">linkedin.com/in/catherine-notado-679a29246</a></div>
                  <div>+63 920 3066 498</div>
                  <div>Quezon City, Philippines</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section id="contact" className="border-t border-white/10 px-6 py-32 md:px-12" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-120px" }} variants={fadeUp}>
        <div className="mx-auto flex w-full max-w-[1400px] flex-col items-center text-center">
          <div className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">06 · Let's work together</div>
          <h2 className="mt-6 font-display text-[clamp(3rem,7vw,6rem)] font-light leading-[1.05] text-foreground">
            Got an idea or <span className="italic text-accent">project?</span>
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground">If you want to discuss app development, AI tools, robotics, research prototypes, or community work, I'm open to projects that build something useful.</p>
          <a href="mailto:notadocath@gmail.com" className="mt-8 font-display text-[1.1rem] text-muted-foreground transition-colors duration-[250ms] ease-out hover:text-foreground hover:underline">notadocath@gmail.com</a>
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
