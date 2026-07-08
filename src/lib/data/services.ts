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
