import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Sun,
  Moon,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Download,
  Menu,
  X,
  Shield,
  Rocket,
  GraduationCap,
  Sparkles,
  Link as LinkIcon,
} from "lucide-react";

/* -------------------------
   Minimal UI (Tailwind-only)
-------------------------- */
function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Button({ asChild, href, children, className = "", variant = "default", size = "md", onClick, ...props }) {
  const base =
    "inline-flex items-center gap-2 rounded-2xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-2.5",
    icon: "p-2",
  };
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-600",
    outline:
      "border border-gray-300 hover:bg-gray-50 text-gray-900 dark:text-gray-100 dark:border-gray-700 dark:hover:bg-gray-800",
    ghost: "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800",
  };
  const classes = cx(base, sizes[size] || sizes.md, variants[variant] || variants.default, className);

  if (asChild && href) {
    return (
      <a href={href} className={classes} onClick={onClick} {...props}>
        {children}
      </a>
    );
  }
  return (
    <button className={classes} onClick={onClick} {...props}>
      {children}
    </button>
  );
}

function Card({ className = "", children }) {
  return <div className={cx("rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/60 shadow-sm", className)}>{children}</div>;
}
function CardHeader({ children, className = "" }) {
  return <div className={cx("px-5 pt-5", className)}>{children}</div>;
}
function CardTitle({ children, className = "" }) {
  return <h3 className={cx("text-lg font-semibold", className)}>{children}</h3>;
}
function CardContent({ children, className = "" }) {
  return <div className={cx("px-5 pb-5", className)}>{children}</div>;
}

function Badge({ children, variant = "secondary", className = "" }) {
  const styles = {
    secondary: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
    outline: "border border-gray-300 text-gray-700 dark:border-gray-700 dark:text-gray-200",
  };
  return <span className={cx("inline-flex items-center rounded-xl px-2.5 py-1 text-xs", styles[variant], className)}>{children}</span>;
}

function Input(props) {
  return (
    <input
      {...props}
      className={cx(
        "w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-900/60 px-3 py-2 text-sm outline-none",
        "focus:ring-2 focus:ring-blue-600"
      )}
    />
  );
}
function Textarea(props) {
  return (
    <textarea
      {...props}
      className={cx(
        "w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-900/60 px-3 py-2 text-sm outline-none",
        "focus:ring-2 focus:ring-blue-600"
      )}
    />
  );
}

/* -------------------------
   Page Data
-------------------------- */
const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

const PROJECTS = [
  {
    title: "Vulnerability Assessment Lab",
    blurb: "Hands-on assessment of vulnerable systems using Nmap, Metasploit, and Kali Linux tools.",
    tags: ["Nmap", "Metasploit", "Kali Linux", "Exploit Testing"],
    href: "#",
    repo: "#",
  },
  {
    title: "Log Analysis & Threat Hunting",
    blurb: "Analyzed server and application logs to detect malicious patterns and potential intrusions.",
    tags: ["Threat Hunting", "Log Analysis", "Linux", "IDS/IPS Basics"],
    href: "#",
    repo: "#",
  },
  {
    title: "Secure Web Server Deployment",
    blurb: "Configured and hardened an Apache web server with SSL/TLS and firewall rules.",
    tags: ["Apache", "Linux", "SSL/TLS", "Firewall"],
    href: "#",
    repo: "#",
  },
  {
    title: "Networking Labs — Cisco Packet Tracer",
    blurb: "Configured OSPF multi-area networks, port security, VLANs, and ACLs in Cisco Packet Tracer.",
    tags: ["Cisco", "OSPF", "VLANs", "Port Security"],
    href: "#",
    repo: "#",
  },
];

const EXPERIENCES = [
  {
    company: "CCTB — Cybersecurity Labs",
    role: "Cybersecurity Student",
    period: "2025",
    points: [
      "Conducted vulnerability assessments with Kali Linux and Metasploit.",
      "Performed log analysis and threat hunting using security tools.",
      "Configured and secured Linux web servers with SSL/TLS and firewall rules.",
    ],
  },
  {
    company: "Networking Labs",
    role: "Cisco Packet Tracer Projects",
    period: "2024-2025",
    points: [
      "Configured OSPF in multi-area enterprise networks.",
      "Implemented port security, sticky MAC, and violation modes.",
      "Designed VLANs and applied ACLs for network segmentation.",
    ],
  },
  {company: "ITED Foundation - project AURA (Academic Unified Reporting & Automation)",
    role: "Developer",
    period:"2025",
    points:[
      "Designed Firebase Realtime Database schema with secure role-based access control (RBAC).",
      "Built Python + Flask backend to process Excel data and generate automated student alerts.",
      "Integrated frontend dashboards (admin/operator) with real-time alert display and login tracking.",
      "Automated generation of Word/Excel transcripts, improving academic reporting efficiency.",
      "Implemented security rules & audit logging to protect data integrity and user privacy.",
    ],
  },
];

const SKILLS = [
  "Networking (Cisco, OSPF, VLANs, Port Security)",
  "Kali Linux",
  "Metasploit",
  "Nmap",
  "Wireshark",
  "Firewall Configuration",
  "IDS/IPS Basics",
  "Vulnerability Assessment",
  "Log Analysis & Threat Hunting",
  "Password Cracking & Security",
  "Secure Web Server Deployment",
  "Linux Administration",
  "Git/GitHub",
];

/* -------------------------
   Helpers
-------------------------- */
function useTheme() {
  const [theme, setTheme] = useState(() =>
    typeof window !== "undefined"
      ? localStorage.getItem("theme") ||
        (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
      : "light"
  );
  const toggle = () => {
    const t = theme === "dark" ? "light" : "dark";
    setTheme(t);
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", t === "dark");
    }
    localStorage.setItem("theme", t);
  };
  return { theme, toggle };
}

function NavLink({ id, label, onClick }) {
  return (
    <a
      href={`#${id}`}
      onClick={onClick}
      className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
    >
      {label}
    </a>
  );
}

function SectionHeader({ eyebrow, title, icon: Icon }) {
  return (
    <div className="mb-8 flex items-center gap-3">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600/10 text-blue-600 dark:text-blue-400">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">{eyebrow}</p>
        <h2 className="text-2xl font-semibold leading-tight md:text-3xl">{title}</h2>
      </div>
    </div>
  );
}

/* -------------------------
   App
-------------------------- */
export default function App() {
  const { theme, toggle } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const year = useMemo(() => new Date().getFullYear(), []);

  const contactAction = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get("name");
    const email = form.get("email");
    const message = form.get("message");
    const subject = encodeURIComponent(`Portfolio contact — ${name}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name} <${email}>`);
    window.location.href = `mailto:ankitkhatiwada09@gmail.com?subject=${subject}&body=${body}`;
  };

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", theme === "dark");
    }
  }, [theme]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 text-gray-900 dark:text-gray-100">
      {/* Top Nav */}
      <header className="sticky top-0 z-40 w-full border-b border-gray-200/70 dark:border-gray-800/70 bg-white/70 dark:bg-gray-950/60 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
          <a href="#home" className="flex items-center gap-2">
            <div className="relative">
              <motion.div
                className="absolute -inset-2 rounded-2xl bg-gradient-to-tr from-blue-400/40 via-fuchsia-400/30 to-cyan-400/30 blur"
                animate={{ opacity: [0.5, 0.9, 0.5] }}
                transition={{ duration: 6, repeat: Infinity }}
              />
              <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600 text-white shadow">
                <Sparkles className="h-5 w-5" />
              </div>
            </div>
            <span className="text-sm font-semibold tracking-wide">Ankit Khatiwada</span>
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {SECTIONS.map((s) => (
              <NavLink key={s.id} {...s} />
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Toggle theme" onClick={toggle}>
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button variant="outline" size="icon" className="md:hidden" onClick={() => setMobileOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="mx-auto max-w-6xl px-4 pt-20 pb-12 md:pt-28">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-extrabold tracking-tight sm:text-5xl"
            >
              Hi, I’m <span className="text-blue-600 dark:text-blue-400">Ankit Khatiwada</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="mt-4 text-base leading-relaxed text-gray-600 dark:text-gray-300"
            >
              Cybersecurity and Networking student at the Canadian College of Technology and Business. I’m passionate
              about ethical hacking, secure system design, and hands-on network defense.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-6 flex flex-wrap items-center gap-3"
            >
              <Button asChild href="#projects">
                <span>
                  <Rocket className="h-4 w-4" /> Explore Projects
                </span>
              </Button>
              <Button asChild variant="outline" href="#contact">
                <span>
                  <Mail className="h-4 w-4" /> Contact
                </span>
              </Button>
              <Button asChild variant="ghost" href="/resume.pdf">
                <span>
                  <Download className="h-4 w-4" /> Download Résumé
                </span>
              </Button>
            </motion.div>

            <div className="mt-6 flex gap-3 text-gray-500">
              <a className="hover:text-gray-900 dark:hover:text-white" href="https://github.com/ankitkhatiwada" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </a>
              <a className="hover:text-gray-900 dark:hover:text-white" href="https://www.linkedin.com/in/ankit-khatiwada-4916bb278/" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
              <a className="hover:text-gray-900 dark:hover:text-white" href="#contact" aria-label="Email">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative aspect-square w-full overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-800 bg-gradient-to-tr from-blue-500/20 via-fuchsia-300/20 to-cyan-300/20 p-1 shadow-xl"
            >
              <div className="absolute -inset-6 animate-[spin_12s_linear_infinite] rounded-[3rem] bg-[conic-gradient(var(--tw-gradient-stops))] opacity-40 blur-2xl" />
              <div className="relative z-10 grid h-full place-items-center rounded-3xl bg-white/70 dark:bg-gray-950/70 p-6 backdrop-blur">
                <Shield className="h-24 w-24 opacity-80" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-6xl px-4 py-16">
        <SectionHeader eyebrow="About" title="A bit about me" icon={GraduationCap} />
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Who I am</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              <p>
                I’m a cybersecurity student with hands-on experience in vulnerability assessments, penetration testing, and secure web server deployment. I enjoy tackling challenges that combine technical depth with problem solving.
              </p>
              <p>
                My recent focus has been on practical labs at CCTB — working with Kali Linux, Cisco Packet Tracer, and security tools to simulate real-world attack and defense scenarios.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Quick facts</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {["Based in Vancouver", "Cybersecurity Enthusiast", "Hands-on Learner", "Open to Co-op"].map((t) => (
                <Badge key={t} variant="secondary" className="rounded-xl">
                  {t}
                </Badge>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="mx-auto max-w-6xl px-4 py-16">
        <SectionHeader eyebrow="Work" title="Selected projects" icon={ExternalLink} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p) => (
            <Card key={p.title} className="overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-start justify-between gap-4">
                  <span>{p.title}</span>
                  <Badge className="rounded-xl" variant="secondary">
                    Featured
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">{p.blurb}</p>
                <div className="mb-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <Badge key={t} variant="outline" className="rounded-xl">
                      {t}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <Button size="sm" asChild href={p.href}>
                    <span>
                      Live <ExternalLink className="ml-2 h-4 w-4" />
                    </span>
                  </Button>
                  <Button size="sm" variant="outline" asChild href={p.repo}>
                    <span>
                      Code <LinkIcon className="ml-2 h-4 w-4" />
                    </span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="mx-auto max-w-6xl px-4 py-16">
        <SectionHeader eyebrow="Path" title="Experience" icon={Rocket} />
        <div className="grid gap-6 md:grid-cols-2">
          {EXPERIENCES.map((e) => (
            <Card key={e.company}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>
                    {e.role} — {e.company}
                  </span>
                  <Badge variant="secondary" className="rounded-xl">
                    {e.period}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-inside list-disc space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  {e.points.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="mx-auto max-w-6xl px-4 py-16">
        <SectionHeader eyebrow="Toolkit" title="Skills" icon={Sparkles} />
        <div className="flex flex-wrap gap-2">
          {SKILLS.map((s) => (
            <Badge key={s} variant="outline" className="rounded-xl px-3 py-1 text-sm">
              {s}
            </Badge>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-6xl px-4 py-16">
        <SectionHeader eyebrow="Say hi" title="Let’s work together" icon={Mail} />
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Send a message</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="grid gap-3" onSubmit={contactAction}>
                <div className="grid gap-2">
                  <label className="text-sm" htmlFor="name">
                    Name
                  </label>
                  <Input id="name" name="name" placeholder="Your name" required />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm" htmlFor="email">
                    Email
                  </label>
                  <Input id="email" name="email" type="email" placeholder="you@example.com" required />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm" htmlFor="message">
                    Message
                  </label>
                  <Textarea id="message" name="message" placeholder="What can I build for you?" rows={5} required />
                </div>
                <Button type="submit" className="justify-center">
                  Send
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
              <p>Currently open to co-op, internship, and entry-level opportunities in Cybersecurity & Networking.</p>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4" /> ankitkhatiwada09@gmail.com
              </div>
              <div className="flex items-center gap-3">
                <Linkedin className="h-4 w-4" /> inkedin.com/in/ankit-khatiwada-4916bb278
              </div>
              <div className="flex items-center gap-3">
                <Github className="h-4 w-4" /> github.com/ankit-khatiwada
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row">
          <p className="text-xs text-gray-500 dark:text-gray-400">© {year} Ankit Khatiwada. All rights reserved.</p>
          <div className="flex items-center gap-3 text-gray-500">
            <a className="hover:text-gray-900 dark:hover:text-white" href="https://github.com/ankit-khatiwada" aria-label="GitHub">
              <Github className="h-4 w-4" />
            </a>
            <a className="hover:text-gray-900 dark:hover:text-white" href="https://www.linkedin.com/in/ankit-khatiwada-4916bb278/" aria-label="LinkedIn">
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
