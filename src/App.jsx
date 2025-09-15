import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Github, Linkedin, Mail, ExternalLink, Download,
  Menu, X, Shield, Rocket, GraduationCap, Sparkles, Link as LinkIcon,
} from "lucide-react";


/* tiny UI */
const cx = (...classes) => classes.filter(Boolean).join(" ");
const Button = ({ asChild, href, children, className="", variant="default", size="md", onClick, type="button", ...props }) => {
  const base = "inline-flex items-center gap-2 rounded-2xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  const sizes = { sm:"px-3 py-1.5 text-sm", md:"px-4 py-2 text-sm", lg:"px-5 py-2.5", icon:"p-2" };
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-600",
outline: "border border-gray-300 hover:bg-gray-50 text-gray-900 dark:text-gray-100 dark:border-gray-700 dark:hover:bg-gray-800",
ghost: "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800",
  };
  const classes = cx(base, sizes[size]||sizes.md, variants[variant]||variants.default, className);
  return asChild && href
    ? <a href={href} className={classes} onClick={onClick} {...props}>{children}</a>
    : <button type={type} className={classes} onClick={onClick} {...props}>{children}</button>;
};
const Card        = ({className="", children}) => <div className={cx("rounded-2xl border border-gray-200 bg-white/80 shadow-sm", className)}>{children}</div>;
const CardHeader  = ({className="", children}) => <div className={cx("px-5 pt-5", className)}>{children}</div>;
const CardTitle   = ({className="", children}) => <h3 className={cx("text-lg font-semibold", className)}>{children}</h3>;
const CardContent = ({className="", children}) => <div className={cx("px-5 pb-5", className)}>{children}</div>;
const Badge = ({children, variant="secondary", className=""}) => {
  const styles = { secondary:"bg-gray-100 text-gray-800", outline:"border border-gray-300 text-gray-700" };
  return <span className={cx("inline-flex items-center rounded-xl px-2.5 py-1 text-xs", styles[variant], className)}>{children}</span>;
};
const Input   = (p) => <input {...p}   className="w-full rounded-xl border border-gray-300 bg-white/90 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-600" />;
const Textarea= (p) => <textarea {...p} className="w-full rounded-xl border border-gray-300 bg-white/90 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-600" />;

/* data */
const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

const PROJECTS = [
  { title: "Vulnerability Assessment Lab", blurb: "Hands-on assessment of vulnerable systems using Nmap, Metasploit, and Kali Linux tools.", tags: ["Nmap","Metasploit","Kali Linux","Exploit Testing"], href: "#", repo: "#" },
  { title: "Log Analysis & Threat Hunting", blurb: "Analyzed server and application logs to detect malicious patterns and potential intrusions.", tags: ["Threat Hunting","Log Analysis","Linux","IDS/IPS Basics"], href: "#", repo: "#" },
  { title: "Secure Web Server Deployment", blurb: "Configured and hardened an Apache web server with SSL/TLS and firewall rules.", tags: ["Apache","Linux","SSL/TLS","Firewall"], href: "#", repo: "#" },
  { title: "Networking Labs — Cisco Packet Tracer", blurb: "Configured OSPF multi-area networks, port security, VLANs, and ACLs in Cisco Packet Tracer.", tags: ["Cisco","OSPF","VLANs","Port Security"], href: "#", repo: "#" },
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
  {
    company: "ITED Foundation — Project AURA",
    role: "Developer",
    period: "2025",
    points: [
      "Designed Firebase Realtime Database schema with secure RBAC.",
      "Built Python + Flask backend to process Excel data and generate alerts.",
      "Integrated admin/operator dashboards with real-time alert display.",
      "Automated Word/Excel transcript generation.",
      "Implemented security rules & audit logging.",
    ],
  },
];

const SKILLS = [
  "Networking (Cisco, OSPF, VLANs, Port Security)",
  "Kali Linux","Metasploit","Nmap","Wireshark","Firewall Configuration",
  "IDS/IPS Basics","Vulnerability Assessment","Log Analysis & Threat Hunting",
  "Password Cracking & Security","Secure Web Server Deployment","Linux Administration","Git/GitHub",
];

/* components */
const SectionHeader = ({ eyebrow, title, icon: Icon }) => (
  <div className="mb-8 flex items-center gap-3">
    <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600/10 text-blue-600">
      <Icon className="h-5 w-5" />
    </div>
    <div>
      <p className="text-xs uppercase tracking-wider text-gray-500">{eyebrow}</p>
      <h2 className="text-2xl font-semibold leading-tight md:text-3xl">{title}</h2>
    </div>
  </div>
);

/* app */
export default function App() {
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-50 text-gray-900">
      {/* header */}
      <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/90 backdrop-blur shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
          <a href="#home" className="flex items-center gap-2">
            <div className="relative">
              <motion.div className="absolute -inset-2 rounded-2xl bg-gradient-to-tr from-blue-400/40 via-fuchsia-400/30 to-cyan-400/30 blur"
                animate={{ opacity: [0.5, 0.9, 0.5] }} transition={{ duration: 6, repeat: Infinity }}/>
              <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600 text-white shadow">
                <Sparkles className="h-5 w-5" />
              </div>
            </div>
            <span className="text-sm font-semibold tracking-wide">Ankit Khatiwada</span>
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {SECTIONS.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600">
                {s.label}
              </a>
            ))}
          </nav>

          <Button variant="outline" size="icon" className="md:hidden" aria-label="Open menu" onClick={() => setMobileOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* mobile drawer */}
        {mobileOpen && (
  <>
    {/* backdrop */}
    <div
      className="fixed inset-0 z-[60] bg-transparent"
      onClick={() => setMobileOpen(false)}
    />

    {/* drawer */}
    <motion.aside
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", stiffness: 260, damping: 30 }}
      className="fixed right-0 top-0 z-[70] h-screen w-80 max-w-[85vw] bg-black text-white shadow-2xl"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
        <h3 className="text-lg font-semibold">Navigate</h3>
        <Button variant="ghost" size="icon" aria-label="Close menu" onClick={() => setMobileOpen(false)}>
          <X className="h-5 w-5" />
        </Button>
      </div>
      <nav className="divide-y divide-gray-700">
        {SECTIONS.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            onClick={() => setMobileOpen(false)}
            className="block px-5 py-4 text-base text-gray-200 hover:bg-gray-800 hover:text-white"
          >
            {s.label}
          </a>
        ))}
      </nav>
    </motion.aside>
  </>
)}

      </header>

      {/* hero */}
      <section id="home" className="mx-auto max-w-6xl px-4 pt-20 pb-12 md:pt-28">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              Hi, I’m <span className="text-blue-600">Ankit Khatiwada</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.6 }}
              className="mt-4 text-base leading-relaxed text-gray-600">
              Cybersecurity and Networking student at the Canadian College of Technology and Business. I’m passionate
              about ethical hacking, secure system design, and hands-on network defense.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-6 flex flex-wrap items-center gap-3">
              <Button asChild href="#projects"><span><Rocket className="h-4 w-4" /> Explore Projects</span></Button>
              <Button asChild variant="outline" href="#contact"><span><Mail className="h-4 w-4" /> Contact</span></Button>
              <Button asChild variant="ghost" href="/resume.pdf"><span><Download className="h-4 w-4" /> Download Résumé</span></Button>
            </motion.div>

            <div className="mt-6 flex gap-3 text-gray-500">
              <a className="hover:text-gray-900" href="https://github.com/ankitkhatiwada" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github className="h-5 w-5" /></a>
              <a className="hover:text-gray-900" href="https://www.linkedin.com/in/ankit-khatiwada-4916bb278" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin className="h-5 w-5" /></a>
              <a className="hover:text-gray-900" href="mailto:ankitkhatiwada09@gmail.com" aria-label="Email"><Mail className="h-5 w-5" /></a>
            </div>
          </div>

          <div className="relative">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}
              className="relative aspect-square w-full overflow-hidden rounded-3xl border border-gray-200 bg-gradient-to-tr from-blue-500/15 via-fuchsia-300/15 to-cyan-300/15 p-1 shadow-xl">
              <div className="absolute -inset-6 animate-[spin_12s_linear_infinite] rounded-[3rem] bg-[conic-gradient(var(--tw-gradient-stops))] opacity-40 blur-2xl" />
              <div className="relative z-10 grid h-full place-items-center rounded-3xl bg-white/80 p-6 backdrop-blur">
                <Shield className="h-24 w-24 opacity-80" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* about */}
      <section id="about" className="mx-auto max-w-6xl px-4 py-16">
        <SectionHeader eyebrow="About" title="A bit about me" icon={GraduationCap} />
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader><CardTitle>Who I am</CardTitle></CardHeader>
            <CardContent className="space-y-4 text-sm leading-relaxed text-gray-600">
              <p>I’m a cybersecurity student with hands-on experience in vulnerability assessments, penetration testing, and secure web server deployment. I enjoy tackling challenges that combine technical depth with problem solving.</p>
              <p>My recent focus has been on practical labs at CCTB — working with Kali Linux, Cisco Packet Tracer, and security tools to simulate real-world attack and defense scenarios.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Quick facts</CardTitle></CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {["Based in Vancouver", "Cybersecurity Enthusiast", "Hands-on Learner", "Open to Co-op"].map((t) => (
                <Badge key={t} variant="secondary" className="rounded-xl">{t}</Badge>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* projects */}
      <section id="projects" className="mx-auto max-w-6xl px-4 py-16">
        <SectionHeader eyebrow="Work" title="Selected projects" icon={ExternalLink} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p) => (
            <Card key={p.title} className="overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-start justify-between gap-4">
                  <span>{p.title}</span>
                  <Badge className="rounded-xl" variant="secondary">Featured</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-gray-600">{p.blurb}</p>
                <div className="mb-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (<Badge key={t} variant="outline" className="rounded-xl">{t}</Badge>))}
                </div>
                <div className="flex items-center gap-3">
                  <Button size="sm" asChild href={p.href}><span>Live <ExternalLink className="ml-2 h-4 w-4" /></span></Button>
                  <Button size="sm" variant="outline" asChild href={p.repo}><span>Code <LinkIcon className="ml-2 h-4 w-4" /></span></Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* experience */}
      <section id="experience" className="mx-auto max-w-6xl px-4 py-16">
        <SectionHeader eyebrow="Path" title="Experience" icon={Rocket} />
        <div className="grid gap-6 md:grid-cols-2">
          {EXPERIENCES.map((e) => (
            <Card key={e.company}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{e.role} — {e.company}</span>
                  <Badge variant="secondary" className="rounded-xl">{e.period}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-inside list-disc space-y-2 text-sm text-gray-600">
                  {e.points.map((pt, i) => (<li key={i}>{pt}</li>))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* skills */}
      <section id="skills" className="mx-auto max-w-6xl px-4 py-16">
        <SectionHeader eyebrow="Toolkit" title="Skills" icon={Sparkles} />
        <div className="flex flex-wrap gap-2">
          {SKILLS.map((s) => (<Badge key={s} variant="outline" className="rounded-xl px-3 py-1 text-sm">{s}</Badge>))}
        </div>
      </section>

      {/* contact */}
      <section id="contact" className="mx-auto max-w-6xl px-4 py-16">
        <SectionHeader eyebrow="Say hi" title="Let’s work together" icon={Mail} />
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader><CardTitle>Send a message</CardTitle></CardHeader>
            <CardContent>
              <form className="grid gap-3" onSubmit={contactAction}>
                <div className="grid gap-2">
                  <label className="text-sm" htmlFor="name">Name</label>
                  <Input id="name" name="name" placeholder="Your name" required />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm" htmlFor="email">Email</label>
                  <Input id="email" name="email" type="email" placeholder="you@example.com" required />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm" htmlFor="message">Message</label>
                  <Textarea id="message" name="message" placeholder="What can I build for you?" rows={5} required />
                </div>
                <Button type="submit" className="justify-center">Send</Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Details</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm text-gray-600">
              <p>Currently open to co-op, internship, and entry-level opportunities in Cybersecurity & Networking.</p>
              <a href="mailto:ankitkhatiwada09@gmail.com" className="flex items-center gap-3 hover:underline"><Mail className="h-4 w-4" /><span>ankitkhatiwada09@gmail.com</span></a>
              <a href="https://www.linkedin.com/in/ankit-khatiwada-4916bb278" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:underline"><Linkedin className="h-4 w-4" /><span>linkedin.com/in/ankit-khatiwada-4916bb278</span></a>
              <a href="https://github.com/ankitkhatiwada" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:underline"><Github className="h-4 w-4" /><span>github.com/ankitkhatiwada</span></a>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* footer */}
      <footer className="border-t border-gray-200">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row">
          <p className="text-xs text-gray-500">© {year} Ankit Khatiwada. All rights reserved.</p>
          <div className="flex items-center gap-3 text-gray-500">
            <a className="hover:text-gray-900" href="https://github.com/ankitkhatiwada" aria-label="GitHub"><Github className="h-4 w-4" /></a>
            <a className="hover:text-gray-900" href="https://www.linkedin.com/in/ankit-khatiwada-4916bb278/" aria-label="LinkedIn"><Linkedin className="h-4 w-4" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
