import { useEffect, useMemo, useRef, useState } from "react";
import profilePhoto from "../assets/profile.jpg";
import projectParadox from "../assets/project-paradox.png";
import academia from "../assets/academia.png";
import faceAttendance from "../assets/face-attendance.png";
import milkDairy from "../assets/milk-dairy.png";
import resumePdf from "../assets/resume.pdf";

const navItems = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const skills = [
  "JavaScript (ES6+)",
  "HTML5",
  "CSS3",
  "Python",
  "SQL",
  "React",
  "MySQL",
  "OpenCV",
  "Git",
  "GitHub",
  "Jenkins",
  "Docker",
  "CI/CD",
  "Figma",
  "UI/UX Principles",
];

const projects = [
  {
    title: "Project Paradox",
    meta: "Crop Recommendation System (React, Django, MySQL)",
    description:
      "Developed a crop recommendation system achieving ~85% prediction accuracy using machine learning models integrated with Django REST APIs.",
    tags: ["React", "Django", "MySQL"],
    repo: "https://github.com/Amruta422/project_paradox",
    image: projectParadox,
    alt: "Screenshot of Project Paradox application",
  },
  {
    title: "Academia",
    meta: "Mini E-learning Platform (Django, HTML, CSS)",
    description:
      "Developed an e-learning app with book listings, study-material sharing, and group collaboration features.",
    tags: ["Django", "HTML/CSS"],
    repo: "https://github.com/Amruta422/Academia",
    image: academia,
    alt: "Screenshot of Academia application",
  },
  {
    title: "Face Attendance System",
    meta: "Python, OpenCV",
    description:
      "Implemented a real-time face detection and recognition workflow for automated attendance.",
    tags: ["Python", "OpenCV"],
    repo: "https://github.com/Amruta422/face-attendenc",
    image: faceAttendance,
    alt: "Screenshot of Face Attendance System",
  },
  {
    title: "Milk Dairy Application",
    meta: "Web Application",
    description:
      "Built a dairy management app to organize milk collection details, customer records, and daily operational entries.",
    tags: ["HTML/CSS", "JavaScript", "Database"],
    repo: "https://github.com/Amruta422/milk-dairy",
    image: milkDairy,
    alt: "Screenshot of Milk Dairy Application",
  },
];

const education = [
  {
    title: "B.E. in Computer Science",
    meta: "Maratha Mandal Engineering College | Nov 2021 to May 2025",
    detail: "CGPA: 8.42",
  },
  {
    title: "PUC",
    meta: "Jyoti PU College | Sep 2019 to Apr 2021",
    detail: "Percentage: 81%",
  },
  {
    title: "SSLC",
    meta: "Mahila Vidyalaya High School | Jun 2016 to Apr 2019",
    detail: "Percentage: 82%",
  },
];

const certifications = [
  "Python with Machine Learning (Compsoft Technologies)",
  "UI/UX Design - Figma (Varcons Technologies)",
  "DevOps Internship via NSDC (IBM & Roaman Technologies)",
];

const heroSignals = ["React", "Django REST", "DevOps", "Machine Learning"];

const contacts = [
  {
    label: "Email",
    value: "amrutay412@gmail.com",
    href: "mailto:amrutay412@gmail.com",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/amruta-yadav-245435353",
    href: "https://www.linkedin.com/in/amruta-yadav-245435353/",
  },
  {
    label: "GitHub",
    value: "github.com/Amruta422",
    href: "https://github.com/Amruta422",
  },
];

const themeStorageKey = "portfolio-theme";

const getPreferredTheme = () => {
  if (typeof window === "undefined") {
    return "light";
  }

  try {
    const saved = window.localStorage.getItem(themeStorageKey);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (saved === "dark" || saved === "light") {
      return saved;
    }
    return prefersDark ? "dark" : "light";
  } catch (error) {
    return "light";
  }
};

const createInlineFallback = (label) => {
  const safeLabel = (label || "Image")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675" role="img" aria-label="${safeLabel}">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#f2e6d7" />
          <stop offset="100%" stop-color="#dccbb6" />
        </linearGradient>
      </defs>
      <rect width="1200" height="675" fill="url(#g)" />
      <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-family="Arial, sans-serif" font-size="44" fill="#5f5348">${safeLabel}</text>
    </svg>
  `.trim();

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

const cx = (...classes) => classes.filter(Boolean).join(" ");

export default function App() {
  const progressRef = useRef(null);
  const [activeSection, setActiveSection] = useState("");
  const [theme, setTheme] = useState(getPreferredTheme);

  const year = useMemo(() => new Date().getFullYear(), []);

  useEffect(() => {
    document.documentElement.classList.add("js");
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      window.localStorage.setItem(themeStorageKey, theme);
    } catch (error) {
      // Ignore storage errors and still apply the theme for this session.
    }
  }, [theme]);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll("main section[id]"));
    const progressBar = progressRef.current;

    const setActiveNav = () => {
      let currentId = "";
      sections.forEach((section) => {
        const top = section.offsetTop - 140;
        const bottom = top + section.offsetHeight;
        if (window.scrollY >= top && window.scrollY < bottom) {
          currentId = section.id;
        }
      });
      setActiveSection(currentId);
    };

    const updateScrollProgress = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const current = window.scrollY;
      const percent = maxScroll > 0 ? (current / maxScroll) * 100 : 0;
      if (progressBar) {
        progressBar.style.width = `${percent}%`;
      }
    };

    const onScroll = () => {
      updateScrollProgress();
      setActiveNav();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("load", onScroll);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("load", onScroll);
    };
  }, []);

  useEffect(() => {
    const revealItems = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      revealItems.forEach((item) => item.classList.add("in-view"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, activeObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            activeObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealItems.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  const handleToggleTheme = () => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  };

  const handleImageError = (label) => (event) => {
    const img = event.currentTarget;
    if (img.dataset.inlineFallbackApplied) {
      return;
    }
    img.dataset.inlineFallbackApplied = "true";
    img.src = createInlineFallback(label);
  };

  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <div className="app-shell min-h-screen text-[var(--ink)]">
      <div className="ambient-layer" aria-hidden="true" />
      <div ref={progressRef} className="scroll-progress" aria-hidden="true" />

      <header className="site-header">
        <nav className="mx-auto flex min-h-[72px] w-[min(1120px,92vw)] flex-col gap-4 py-4 sm:flex-row sm:items-center">
          <a
            className="brand-mark font-serif text-[clamp(1.08rem,2.6vw,1.5rem)] font-bold tracking-[0.02em] text-[var(--ink)]"
            href="#home"
          >
            Amruta Yadav
          </a>
          <div className="flex flex-wrap items-center gap-2 sm:ml-auto">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={cx(
                  "nav-pill",
                  activeSection === item.id && "is-active"
                )}
              >
                {item.label}
              </a>
            ))}
            <a
              className="nav-resume"
              href={resumePdf}
              target="_blank"
              rel="noreferrer"
            >
              Resume
            </a>
            <button
              className="theme-toggle"
              type="button"
              aria-label={`Switch to ${nextTheme} mode`}
              title={`Switch to ${nextTheme} mode`}
              onClick={handleToggleTheme}
            >
              <span className="sr-only">Toggle theme</span>
              {theme === "dark" ? (
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="currentColor"
                >
                  <path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0-5.5a1 1 0 0 1 1 1V4a1 1 0 1 1-2 0V2.5a1 1 0 0 1 1-1zm0 17.5a1 1 0 0 1 1 1V22a1 1 0 1 1-2 0v-1.5a1 1 0 0 1 1-1zm9.5-6a1 1 0 0 1 1 1 1 1 0 0 1-1 1H20a1 1 0 1 1 0-2h1.5zM4 12a1 1 0 0 1-1 1H1.5a1 1 0 1 1 0-2H3a1 1 0 0 1 1 1zm14.66-6.66a1 1 0 0 1 1.42 0l1.06 1.06a1 1 0 1 1-1.42 1.42l-1.06-1.06a1 1 0 0 1 0-1.42zM3.86 18.46a1 1 0 0 1 1.42 0l1.06 1.06a1 1 0 0 1-1.42 1.42l-1.06-1.06a1 1 0 0 1 0-1.42zM18.46 20.14a1 1 0 0 1 0-1.42l1.06-1.06a1 1 0 1 1 1.42 1.42l-1.06 1.06a1 1 0 0 1-1.42 0zM3.86 5.54a1 1 0 0 1 0-1.42l1.06-1.06a1 1 0 0 1 1.42 1.42L5.28 5.54a1 1 0 0 1-1.42 0z" />
                </svg>
              ) : (
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="currentColor"
                >
                  <path d="M21 14.5A9.5 9.5 0 0 1 9.5 3a9.38 9.38 0 0 1 .72-3.68A10 10 0 1 0 22.68 15a9.38 9.38 0 0 1-3.68.72z" />
                </svg>
              )}
            </button>
          </div>
        </nav>
      </header>

      <main className="main-shell mx-auto grid w-[min(1120px,92vw)] grid-cols-12 gap-[clamp(1rem,2.4vw,1.8rem)] pb-4 pt-2">
        <section
          id="home"
          className="reveal hero-shell col-span-12 mt-4 p-[clamp(1.5rem,3vw,2.8rem)] lg:col-span-7"
        >
          <div className="hero-grid" aria-hidden="true" />
          <div className="relative z-10 max-w-[42ch]">
            <p className="hero-badge">Software Developer</p>
            <p className="hero-availability">Open to collaboration and full-time roles</p>
            <h1 className="hero-title mt-2 max-w-[20ch] font-serif text-[clamp(1.6rem,3.6vw,2.85rem)] font-bold">
              Building fast digital products with a modern engineering mindset.
            </h1>
            <p className="mt-3 text-[clamp(0.92rem,1.2vw,1.05rem)] text-[var(--muted)]">
              I create performant, accessible, and visually polished web apps that solve real
              problems.
            </p>
            <div className="hero-tech-row mt-4" aria-label="Core strengths">
              {heroSignals.map((signal) => (
                <span key={signal} className="hero-tech-pill">
                  {signal}
                </span>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <a className="btn btn-primary" href="#projects">
                View Projects
              </a>
              <a className="btn btn-ghost" href="#contact">
                Let's Talk
              </a>
            </div>
          </div>
        </section>

        <section
          className="reveal profile-shell col-span-12 mt-4 flex flex-col items-center justify-center p-[clamp(1.2rem,2.5vw,2rem)] lg:col-span-5"
          aria-label="Profile photo"
        >
          <img
            src={profilePhoto}
            alt="Portrait of Amruta Yadav"
            className="hero-profile-photo"
            loading="eager"
            decoding="async"
            data-fallback-label="Profile Photo"
            onError={handleImageError("Profile Photo")}
          />
          <div className="mt-4 grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
            <article className="hero-stat-card">
              <p className="hero-stat-number">CGPA 8.42</p>
              <p className="hero-stat-label">B.E. CSE</p>
            </article>
            <article className="hero-stat-card">
              <p className="hero-stat-number">4+</p>
              <p className="hero-stat-label">Hands-on Projects</p>
            </article>
          </div>
        </section>

        <section id="about" className="reveal col-span-12 panel-shell">
          <div className="section-head">
            <p>About</p>
            <h2 className="font-serif text-[clamp(1.5rem,2.8vw,2.2rem)]">Summary</h2>
          </div>
          <p className="max-w-[75ch]">
            Software developer experienced in building responsive and accessible web applications.
            Comfortable with full-stack foundations and DevOps practices including Git, Jenkins,
            Docker, and CI/CD. I enjoy turning ideas into clean, usable interfaces with reliable
            backend integration.
          </p>
        </section>

        <section id="skills" className="reveal col-span-12 panel-shell">
          <div className="section-head">
            <p>Capabilities</p>
            <h2 className="font-serif text-[clamp(1.5rem,2.8vw,2.2rem)]">Skills</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center rounded-full border border-[rgba(47,128,237,0.26)] bg-[linear-gradient(135deg,rgba(47,128,237,0.18),rgba(255,154,98,0.16))] px-3 py-1 text-[0.86rem] font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section id="experience" className="reveal col-span-12">
          <div className="section-head">
            <p>Background</p>
            <h2 className="font-serif text-[clamp(1.5rem,2.8vw,2.2rem)]">Experience</h2>
          </div>
          <div className="timeline">
            <article className="card-shell timeline-card">
              <h3 className="font-serif text-[1.08rem]">
                KODNEST - Full Stack Development Trainee
              </h3>
              <p className="meta">July 2025 to January 2026</p>
              <p>
                Completed intensive full-stack training across HTML, CSS, JavaScript, Python, and
                database concepts with project-based implementation.
              </p>
            </article>
            <article className="card-shell timeline-card">
              <h3 className="font-serif text-[1.08rem]">
                IBM &amp; Roaman Technologies - DevOps Engineering Intern
              </h3>
              <p className="meta">September 2024 to January 2025</p>
              <p>
                Worked with Git, Jenkins, Docker, and CI/CD workflows to gain real-world exposure in
                deployment and version control practices.
              </p>
            </article>
          </div>
        </section>

        <section id="projects" className="reveal col-span-12">
          <div className="section-head">
            <p>Work</p>
            <h2 className="font-serif text-[clamp(1.5rem,2.8vw,2.2rem)]">
              Featured Projects
            </h2>
          </div>
          <div className="grid grid-cols-12 gap-4">
            {projects.map((project) => (
              <article
                key={project.title}
                className="project-card-shell card-shell col-span-12 md:col-span-6"
              >
                <img
                  src={project.image}
                  alt={project.alt}
                  className="project-shot"
                  loading="lazy"
                  decoding="async"
                  data-fallback-label={project.title}
                  onError={handleImageError(project.title)}
                />
                <h3 className="font-serif text-[1.08rem]">{project.title}</h3>
                <p className="meta">{project.meta}</p>
                <p>{project.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full border border-[rgba(47,128,237,0.26)] bg-[linear-gradient(135deg,rgba(47,128,237,0.18),rgba(255,154,98,0.16))] px-3 py-1 text-[0.82rem] font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  className="project-repo"
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer"
                >
                  View Repo
                </a>
              </article>
            ))}
          </div>
        </section>

        <section id="education" className="reveal col-span-12 panel-shell">
          <div className="section-head">
            <p>Academic</p>
            <h2 className="font-serif text-[clamp(1.5rem,2.8vw,2.2rem)]">Education</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {education.map((item) => (
              <article key={item.title} className="card-shell">
                <h3 className="font-serif text-[1.08rem]">{item.title}</h3>
                <p className="meta">{item.meta}</p>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="certifications" className="reveal col-span-12 panel-shell">
          <div className="section-head">
            <p>Recognition</p>
            <h2 className="font-serif text-[clamp(1.5rem,2.8vw,2.2rem)]">
              Certifications
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {certifications.map((item) => (
              <span
                key={item}
                className="inline-flex items-center rounded-full border border-[rgba(47,128,237,0.26)] bg-[linear-gradient(135deg,rgba(47,128,237,0.18),rgba(255,154,98,0.16))] px-3 py-1 text-[0.86rem] font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]"
              >
                {item}
              </span>
            ))}
          </div>
        </section>

        <section id="contact" className="reveal col-span-12 panel-shell">
          <div className="section-head">
            <p>Connect</p>
            <h2 className="font-serif text-[clamp(1.5rem,2.8vw,2.2rem)]">Contact</h2>
          </div>
          <div className="mx-auto grid max-w-[680px] gap-3">
            {contacts.map((contact) => (
              <a
                key={contact.label}
                className="contact-shell"
                href={contact.href}
                target={contact.href.startsWith("http") ? "_blank" : undefined}
                rel={contact.href.startsWith("http") ? "noreferrer" : undefined}
              >
                <span className="block text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-[var(--muted)]">
                  {contact.label}
                </span>
                <span className="block text-[0.95rem] font-bold">{contact.value}</span>
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer className="mx-auto flex w-[min(1120px,92vw)] flex-wrap justify-between gap-3 pb-8 text-[0.9rem] text-[var(--muted)]">
        <p>Designed and developed by Amruta Yadav.</p>
        <p>&copy; {year} All rights reserved.</p>
      </footer>

      <a
        className="resume-float"
        href={resumePdf}
        download="Amruta_Yadav_Resume.pdf"
        aria-label="Download resume"
      >
        Download Resume
      </a>
    </div>
  );
}
