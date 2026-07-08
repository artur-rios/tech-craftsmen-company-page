### Task 5: Data Files

**Files:**
- Create: `src/lib/data/company.ts`, `src/lib/data/navigation.ts`, `src/lib/data/services.ts`, `src/lib/data/testimonials.ts`, `src/lib/data/team.ts`

**Interfaces:**
- Consumes: nothing
- Produces:
  - `COMPANY: { name: string; email: string; phone: string; address: string; tagline: string }`
  - `NAV_ITEMS: { label: string; href: string }[]`
  - `SERVICES: { id: string; title: string; description: string; icon: string; details: string[]; technologies: string[] }[]`
  - `TESTIMONIALS: { id: string; quote: string; author: string; role: string; company: string }[]`
  - `TEAM_MEMBERS: { id: string; name: string; role: string; bio: string }[]`

- [ ] **Step 1: Create `src/lib/data/company.ts`**

```typescript
export const COMPANY = {
  name: "Tech Craftsmen",
  email: "hello@techcraftsmen.com",
  phone: "+1 (555) 123-4567",
  address: "San Francisco, CA",
  tagline: "Software crafted with precision. Infrastructure built to last.",
};
```

- [ ] **Step 2: Create `src/lib/data/navigation.ts`**

```typescript
export const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;
```

- [ ] **Step 3: Create `src/lib/data/services.ts`**

```typescript
import { Code2, Cloud, GitFork } from "lucide-react";

export const SERVICES = [
  {
    id: "custom-software",
    title: "Custom Software Development",
    description:
      "We build tailored software solutions that solve real business problems — from web applications to backend systems, APIs, and integrations.",
    icon: "Code2",
    details: [
      "Full-stack web application development",
      "API design and system integrations",
      "Legacy system modernization",
      "Performance optimization and scaling",
      "Technology consulting and architecture",
    ],
    technologies: [
      "React",
      "Next.js",
      "Node.js",
      "TypeScript",
      "Python",
      "PostgreSQL",
      "Docker",
    ],
  },
  {
    id: "cloud-consulting",
    title: "Cloud Consulting",
    description:
      "We help you navigate the cloud landscape — designing, migrating, and optimizing infrastructure on AWS, Azure, or GCP.",
    icon: "Cloud",
    details: [
      "Cloud strategy and architecture design",
      "Migration planning and execution",
      "Cost optimization and governance",
      "Multi-cloud and hybrid setups",
      "Disaster recovery and high availability",
    ],
    technologies: ["AWS", "Azure", "GCP", "Terraform", "Kubernetes"],
  },
  {
    id: "devops",
    title: "DevOps",
    description:
      "We streamline your delivery pipeline — automating builds, tests, deployments, and monitoring for faster, more reliable releases.",
    icon: "GitFork",
    details: [
      "CI/CD pipeline setup and optimization",
      "Infrastructure as Code (IaC)",
      "Containerization and orchestration",
      "Monitoring, logging, and alerting",
      "Security and compliance automation",
    ],
    technologies: [
      "GitHub Actions",
      "Jenkins",
      "Terraform",
      "Docker",
      "Kubernetes",
      "Prometheus",
      "Grafana",
    ],
  },
];
```

- [ ] **Step 4: Create `src/lib/data/testimonials.ts`**

```typescript
export const TESTIMONIALS = [
  {
    id: "1",
    quote:
      "Tech Craftsmen transformed our legacy system into a modern, scalable platform. Their attention to detail and engineering rigor is unmatched.",
    author: "Sarah Chen",
    role: "CTO",
    company: "Finova Technologies",
  },
  {
    id: "2",
    quote:
      "Our cloud migration was seamless. They handled everything from architecture to execution. Downtime was zero. We couldn't be happier.",
    author: "Marcus Rivera",
    role: "VP of Engineering",
    company: "Streamline Health",
  },
  {
    id: "3",
    quote:
      "The DevOps pipeline they built cut our deployment time from hours to minutes. Our team can now ship with confidence multiple times a day.",
    author: "Elena Kowalski",
    role: "Engineering Manager",
    company: "DataPulse Analytics",
  },
];
```

- [ ] **Step 5: Create `src/lib/data/team.ts`**

```typescript
export const TEAM_MEMBERS = [
  {
    id: "1",
    name: "Alex Morgan",
    role: "Founder & Lead Engineer",
    bio: "15 years of software engineering experience. Previously led engineering teams at two Fortune 500 companies. Passionate about clean architecture and pragmatic solutions.",
  },
  {
    id: "2",
    name: "Jordan Park",
    role: "Cloud Architect",
    bio: "AWS and GCP certified architect with deep expertise in distributed systems. Helped 30+ companies migrate to the cloud with zero data loss.",
  },
  {
    id: "3",
    name: "Taylor Reed",
    role: "DevOps Engineer",
    bio: "Infrastructure automation specialist. Built CI/CD pipelines processing 10,000+ deployments per month. Open source contributor to Terraform and Kubernetes ecosystems.",
  },
  {
    id: "4",
    name: "Morgan Walsh",
    role: "Full-Stack Developer",
    bio: "Full-stack developer focused on React and Node.js ecosystems. Specializes in building performant, accessible web applications with modern tooling.",
  },
];
```

- [ ] **Step 6: Verify TypeScript compilation**

```bash
npx tsc --noEmit 2>&1 | Select-String -Pattern "error"
```

Expected: no errors.

- [ ] **Step 7: Commit**

```bash
git add src/lib/data/ && git commit -m "feat: add static data files for company, navigation, services, testimonials, and team"
```

---

