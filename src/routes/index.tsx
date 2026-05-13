import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

type Project = {
  title: string;
  role: string;
  period: string;
  summary: string;
  tech: string[];
};

type Highlight = {
  label: string;
  value: string;
  note: string;
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
    period: "Resume project",
    summary: "An AI-powered learning platform for students, framed around accessible study support and smarter learning workflows.",
    tech: ["AI", "Web app", "Student tools"],
  },
  {
    title: "GABAY",
    role: "Guidance system",
    period: "Resume project",
    summary: "A project centered on guidance and support, reflecting your interest in useful web systems for real people.",
    tech: ["Web development", "Support flows", "UX"],
  },
  {
    title: "Credivest",
    role: "Investment platform",
    period: "Resume project",
    summary: "A fintech-style platform concept built around credibility, investment flow, and product clarity.",
    tech: ["Fintech", "Product design", "Full stack"],
  },
];

const additionalProjects: Project[] = [
  {
    title: "Poro: Time Management Web Application",
    role: "Web application",
    period: "Resume project",
    summary: "A time management app designed to help users organize tasks and keep a practical daily workflow.",
    tech: ["React", "Planning", "Productivity"],
  },
  {
    title: "Skill Gap Analysis Website",
    role: "Research / web project",
    period: "Resume project",
    summary: "A skills analysis website focused on identifying gaps and turning raw input into actionable direction.",
    tech: ["Research", "Analysis", "Web app"],
  },
  {
    title: "Arduino Robotics Project",
    role: "Robotics",
    period: "Resume project",
    summary: "A robotics build that reflects hands-on prototyping, hardware problem solving, and iteration.",
    tech: ["Arduino", "Robotics", "Hardware"],
  },
];

type DriveProject = {
  name: string;
  link: string;
};

const driveProjectFolders: DriveProject[] = [
  { name: "APPCON CAPYCADEMY", link: "https://drive.google.com/drive/folders/1D6iUPmZkfe3pzId__xhcHJELkk_qn1Cu" },
  { name: "ARDUINO ROBOTICS OURMAN", link: "https://drive.google.com/drive/folders/1D6iUPmZkfe3pzId__xhcHJELkk_qn1Cu" },
  { name: "CAMP KARINGAL WEBSITE", link: "https://drive.google.com/drive/folders/1D6iUPmZkfe3pzId__xhcHJELkk_qn1Cu" },
  { name: "CREDIVEST", link: "https://drive.google.com/drive/folders/1D6iUPmZkfe3pzId__xhcHJELkk_qn1Cu" },
  { name: "GABAY", link: "https://drive.google.com/drive/folders/1D6iUPmZkfe3pzId__xhcHJELkk_qn1Cu" },
  { name: "HOSHI BOOKSTORE", link: "https://drive.google.com/drive/folders/1D6iUPmZkfe3pzId__xhcHJELkk_qn1Cu" },
  { name: "MEOWLOGY", link: "https://drive.google.com/drive/folders/1D6iUPmZkfe3pzId__xhcHJELkk_qn1Cu" },
  { name: "PORO: TIME MANAGEMENT WEB APPLICATION", link: "https://drive.google.com/drive/folders/1D6iUPmZkfe3pzId__xhcHJELkk_qn1Cu" },
  { name: "SKILLGAP ANALYSIS RESEARCH PRESENTATION", link: "https://drive.google.com/drive/folders/1D6iUPmZkfe3pzId__xhcHJELkk_qn1Cu" },
];

const backgroundHighlights: Highlight[] = [
  {
    label: "Technical focus",
    value: "Cybersecurity + web + data",
    note: "You work across full-stack deployment, analysis, and systems thinking.",
  },
  {
    label: "Internship",
    value: "PNP QCPD",
    note: "IT Support & Data Management Intern from January 2022 to May 2022.",
  },
  {
    label: "Education",
    value: "RTU, BIT",
    note: "Bachelor of Information Technology, 2023 to ongoing.",
  },
  {
    label: "Community",
    value: "Speaker coordinator",
    note: "Volunteer leadership across DEVCON Manila and Arduino Day Philippines.",
  },
];

const certificationChips = [
  "Cisco Networking Basics",
  "Cisco Networking Devices and Initial Configuration",
  "Cisco Enterprise Networking, Security, and Automation",
  "Microsoft Excel for Data Analysis",
  "Enterprise Linux System Administration",
  "Internshala Python Programming",
  "Quantum Computing Foundations",
  "Blockchain Essentials",
  "Ethical Hacking Essentials",
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
            The projects below come from your resume and show the broader work beyond analytics.
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <article key={project.title} className="border border-white/10 bg-[#141414] p-6 transition-transform duration-300 ease-out hover:-translate-y-[3px]">
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

      <motion.section className="border-t border-white/10 px-6 py-28 md:px-12" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-120px" }} variants={fadeUp}>
        <div className="mx-auto w-full max-w-[1400px]">
          <SectionLabel n="03" t="More projects" />
          <div className="mt-8 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            These are the additional projects from your resume that sit outside the headline work.
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {additionalProjects.map((project) => (
              <article key={project.title} className="border border-white/10 bg-[#141414] p-6 transition-transform duration-300 ease-out hover:-translate-y-[3px]">
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

      <motion.section className="border-t border-white/10 px-6 py-28 md:px-12" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-120px" }} variants={fadeUp}>
        <div className="mx-auto w-full max-w-[1400px]">
          <SectionLabel n="04" t="Drive folders" />
          <div className="mt-8 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Folder names recovered from the shared Drive archive, so the portfolio can reflect the broader body of work.
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {driveProjectFolders.map((project) => (
              <a
                key={project.name}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-[4px] border border-white/10 bg-[#141414] px-5 py-5 transition-all duration-300 ease-out hover:-translate-y-[2px] hover:border-accent/50 hover:bg-[#1a1a1a]"
              >
                <div className="text-[10px] uppercase tracking-[0.3em] text-accent">Drive project</div>
                <div className="mt-3 font-display text-2xl font-light leading-tight text-foreground">{project.name}</div>
                <div className="mt-4 text-xs uppercase tracking-[0.25em] text-muted-foreground">Open folder →</div>
              </a>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section id="experience" className="border-t border-white/10 px-6 py-28 md:px-12" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-120px" }} variants={fadeUp}>
        <div className="mx-auto w-full max-w-[1400px]">
          <SectionLabel n="05" t="Experience & background" />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {backgroundHighlights.map((item) => (
              <Stat key={item.label} k={item.label} v={item.value} sub={item.note} />
            ))}
          </div>
          <div className="mt-12 grid gap-10 lg:grid-cols-2">
            <div>
              <div className="mb-4 text-[10px] uppercase tracking-[0.3em] text-foreground">Leadership & volunteer work</div>
              <ul className="space-y-3 text-sm leading-relaxed text-muted-foreground">
                <li className="border-b hairline pb-3">Speaker Coordinator at DEVCON Manila, managing technical presentations and speaker communications.</li>
                <li className="border-b hairline pb-3">Speaker Coordinator at Arduino Day Philippines, coordinating events and schedules.</li>
                <li className="border-b hairline pb-3">Student Council Department of Archive member at Rizal Technological University.</li>
              </ul>
            </div>
            <div>
              <div className="mb-4 text-[10px] uppercase tracking-[0.3em] text-foreground">Awards</div>
              <ul className="space-y-3 text-sm leading-relaxed text-muted-foreground">
                <li className="border-b hairline pb-3">3rd Place, KadaKareer HomeCredit Hackathon</li>
                <li className="border-b hairline pb-3">Participant, DECODE 2024 University Capture The Flag by Trend Micro</li>
                <li className="border-b hairline pb-3">3rd Place, PUP Programmers Guild Tech Careerscape</li>
                <li className="border-b hairline pb-3">Champion, Robotics Contest - Technological Institute of the Philippines</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section className="border-t border-white/10 px-6 py-28 md:px-12" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-120px" }} variants={fadeUp}>
        <div className="mx-auto w-full max-w-[1400px]">
          <SectionLabel n="06" t="Education & certifications" />
          <div className="mt-10 grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="space-y-6">
              <div>
                <div className="mb-2 text-[10px] uppercase tracking-[0.3em] text-accent">Education</div>
                <h3 className="font-display text-3xl font-light text-foreground">Bachelor of Information Technology</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Rizal Technological University | 2023 - Ongoing</p>
              </div>
              <div>
                <div className="mb-2 text-[10px] uppercase tracking-[0.3em] text-accent">Professional experience</div>
                <p className="text-sm leading-relaxed text-muted-foreground">IT Support & Data Management Intern at the Philippine National Police (QCPD), where you managed digital documentation workflows and developed the official website for the QCPD sector.</p>
              </div>
            </div>
            <div>
              <div className="mb-4 text-[10px] uppercase tracking-[0.3em] text-foreground">Certifications</div>
              <div className="flex flex-wrap gap-2">
                {certificationChips.map((cert) => (
                  <span key={cert} className="rounded-[2px] border border-white/10 bg-[#1e1e1e] px-3 py-1.5 text-[12px] text-muted-foreground">{cert}</span>
                ))}
              </div>
              <div className="mt-10 border-l-2 border-accent bg-secondary/40 p-6">
                <div className="mb-2 text-[10px] uppercase tracking-[0.3em] text-accent">Contact</div>
                <div className="space-y-3 text-sm leading-relaxed text-foreground">
                  <div><a href="mailto:notadocath@gmail.com" className="hover:underline">notadocath@gmail.com</a></div>
                  <div><a href="https://www.linkedin.com/in/catherine-notado-679a29246" className="hover:underline">linkedin.com/in/catherine-notado-679a29246</a></div>
                  <div>09203066498</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section id="contact" className="border-t border-white/10 px-6 py-32 md:px-12" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-120px" }} variants={fadeUp}>
        <div className="mx-auto flex w-full max-w-[1400px] flex-col items-center text-center">
          <div className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">07 · Let's work together</div>
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
