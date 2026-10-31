// ============================================================
// Single source of truth for sarveshk.dev
// Every fact about experience, projects, skills, and academics
// lives here. Cards and case studies read from the SAME objects
// — drift is impossible.
// ============================================================

export interface Evidence {
  key: string;
  text: string;
}

export interface Experience {
  id: string;
  className: "ai" | "infra" | "web";
  role: string;
  period: string;
  company: string;
  productLink?: { text: string; href: string };
  evidence: Evidence[];
  bullets: string[];
  chips: string[];
}

export interface CaseStudy {
  problem: string;
  approach: string;
  outcome: string;
}

export interface Project {
  id: string;
  icon: string;
  githubUrl: string;
  title: string;
  description: string;
  status?: string;
  caseStudy: CaseStudy;
  chips: string[];
}

export interface AcademicProject {
  name: string;
  description: string;
  tech: string;
}

export interface Education {
  school: string;
  degree: string;
  year: string;
}

export interface SkillGroup {
  heading: string;
  items: string[];
}

export interface SkillCategory {
  world: string;
  sub: string;
  className: "infra" | "ai";
  groups: SkillGroup[];
}

export interface SiteLinks {
  github: string;
  linkedin: string;
  email: string;
  resume: string;
}

export interface SiteContent {
  experience: Experience[];
  projects: Project[];
  academic: AcademicProject[];
  education: Education[];
  skills: SkillCategory[];
  links: SiteLinks;
}

export const content: SiteContent = {
  links: {
    github: "https://github.com/sarvesh1karandikar",
    linkedin: "https://www.linkedin.com/in/sarveshkarandikar/",
    email: "sarvesh1karandikar@gmail.com",
    resume: "/resume/sarvesh-karandikar.pdf",
  },

  experience: [
    {
      id: "ai-canvas",
      className: "ai",
      role: "Senior Software Engineer — AI Canvas",
      period: "Oct 2025 — present",
      company: "Cisco Systems",
      productLink: {
        text: "AI Canvas",
        href: "https://blogs.cisco.com/ai/ai-canvas-controlled-availability",
      },
      evidence: [
        { key: "SHIPPED", text: "Multimodal deep agents — vision, docs, network captures" },
        { key: "PLATFORM", text: "Self-serve partner SDK + MCP server registration" },
        { key: "PIPELINE", text: "gRPC → S3 streaming file pipeline, SSRF-guarded" },
      ],
      bullets: [
        "Built multimodal Canvas Deep Agent — reasons over images, documents, and network captures across fast and plan-execute modes.",
        "Designed a secure file pipeline: gRPC → presigned S3 streaming (SSRF-guarded), Redis manifest store, MCP file-reader tooling.",
        "Own the Knowledge-Base SDK and skill/MCP-server registration powering self-serve partner onboarding.",
      ],
      chips: ["Claude Agent SDK", "MCP", "Python", "gRPC", "Redis", "AWS"],
    },
    {
      id: "nexus-dashboard",
      className: "infra",
      role: "Software Engineer — Nexus Dashboard",
      period: "Nov 2023 — Sep 2025",
      company: "Cisco Systems",
      productLink: {
        text: "Nexus Dashboard",
        href: "https://www.cisco.com/c/en/us/products/data-center-analytics/nexus-dashboard/index.html",
      },
      evidence: [
        { key: "BUILT", text: "K8s PKI certificate management system" },
        { key: "SHIPPED", text: "Java leader-election framework (SPI-based)" },
        { key: "INTEGRATED", text: "External CA onboarding for XE/XR devices" },
      ],
      bullets: [
        "Designed a Certificate Management System for automated CA creation and secure signing across Kubernetes communications.",
        "Enhanced external-CA integration to onboard Cisco XE/XR devices; built an agent-based Postgres/TSDB management interface.",
        "Implemented an SPI-based Java leader-election framework for active-standby configurations.",
      ],
      chips: ["Java", "Go", "Kubernetes", "Postgres", "PKI"],
    },
    {
      id: "cloud-network-controller",
      className: "infra",
      role: "Software Engineer — Cloud Network Controller",
      period: "Jul 2020 — Oct 2023",
      company: "Cisco Systems",
      productLink: {
        text: "Cloud Network Controller",
        href: "https://www.cisco.com/c/en/us/solutions/data-center-virtualization/application-centric-infrastructure/cloud-network-controller.html",
      },
      evidence: [
        { key: "MULTI-CLOUD", text: "GCP integration + AWS + Azure ACI" },
        { key: "SECURITY", text: "L4–L7 config-drift detection engine" },
        { key: "IaC", text: "Terraform resource collection → graph DB" },
      ],
      bullets: [
        "Integrated GCP into the ACI model-based cloud-networking solution for multi-cloud compatibility and scale.",
        "Built config-drift security detection across L4–L7 service chains and a Terraform collection service feeding a unified graph database.",
        "Created a firewall-configuration analysis service using Binary Decision Diagrams to assess connectivity and traffic flows.",
      ],
      chips: ["Python", "Terraform", "GCP", "AWS", "Azure", "Dgraph"],
    },
    {
      id: "wordpress",
      className: "web",
      role: "WordPress Developer",
      period: "2019 — 2020",
      company: "USC Supply Chain",
      evidence: [
        { key: "BUILT", text: "Custom themes, plugins, and client sites" },
        { key: "STACK", text: "PHP · JavaScript · MySQL · REST APIs" },
      ],
      bullets: [
        "Developed and maintained WordPress sites with custom themes and plugins for university supply-chain projects.",
        "Built REST API integrations connecting WordPress to backend inventory and logistics systems.",
        "Managed hosting, deployments, and performance optimization across multiple client sites.",
      ],
      chips: ["WordPress", "PHP", "JavaScript", "MySQL", "REST APIs"],
    },
    {
      id: "circlelink",
      className: "infra",
      role: "ML Engineer Intern",
      period: "2019 — 2020",
      company: "Circle Link (fintech)",
      evidence: [
        { key: "ML", text: "NER + OCR/MICR fine-tuning for loan documents" },
      ],
      bullets: [
        "Built NER models classifying entities in loan documents with Elasticsearch indexing; fine-tuned OCR/MICR check recognition.",
      ],
      chips: ["Python", "NLP", "Elasticsearch", "OCR"],
    },
  ],

  projects: [
    {
      id: "alpaca",
      icon: "▣",
      githubUrl: "https://github.com/sarvesh1karandikar/alpacabot-dashboard",
      title: "AlpacaBot Dashboard",
      description:
        "A terminal-style dashboard for an AlpacaBot trading-agent project, exploring monitoring and control.",
      status: "Implemented",
      chips: ["HTML", "JavaScript", "Dashboard"],
      caseStudy: {
        problem:
          "Make a trading-agent project easier to monitor through a browser interface.",
        approach:
          "Built a terminal-style dashboard that requests data from the agent backend. The public repository contains the dashboard interface.",
        outcome:
          "The interface provides a monitoring surface for the agent project. Backend availability is separate from the public dashboard source.",
      },
    },
    {
      id: "chroma",
      icon: "⬡",
      githubUrl: "https://github.com/sarvesh1karandikar/chromadb",
      title: "ChromaDB Retrieval",
      status: "Prototype",
      description:
        "A document ingestion and retrieval prototype with centroid-based collection routing.",
      chips: ["FastAPI", "RAG", "ChromaDB", "PyTorch"],
      caseStudy: {
        problem:
          "Explore how to organize documents by topic and select relevant collections for retrieval.",
        approach:
          "A FastAPI backend extracts, chunks, and embeds documents, then compares query embeddings with collection centroids to select collections and retrieve text chunks.",
        outcome:
          "Implemented upload and search endpoints returning text chunks for downstream LLM context. Retrieval quality and latency improvements have not been benchmarked.",
      },
    },
    {
      id: "drive",
      icon: "◈",
      githubUrl: "https://github.com/sarvesh1karandikar/DriveSuite",
      title: "DriveSuite",
      description:
        "A home-media assistant system in development: an earlier WhatsApp bridge, a newer Telegram agent, and service integrations.",
      status: "In development",
      chips: ["Python", "Node.js", "SQLite", "Docker"],
      caseStudy: {
        problem:
          "Make a collection of home-media services easier to search and control through a conversational interface.",
        approach:
          "Built an earlier WhatsApp bridge and a newer Telegram agent, alongside service wrappers, infrastructure configuration, and architecture documentation.",
        outcome:
          "Direct HTTP integrations and an MCP client scaffold are present. MCP discovery remains a stub, and the confirmed-action flow still needs end-to-end completion.",
      },
    },
  ],

  academic: [
    {
      name: "DCGAN Image Synthesis",
      description: "Generative adversarial net, CIFAR-10",
      tech: "TensorFlow",
    },
    {
      name: "FAQ Chatbot (LLaMA 2-7B)",
      description: "Local RAG over PDFs",
      tech: "Python · LLaMA",
    },
    {
      name: "CIFAR-10 Classifier",
      description: "CNN, ~75% test accuracy",
      tech: "TensorFlow",
    },
    {
      name: "LSTM Text Generator",
      description: "From-scratch NumPy RNN/LSTM",
      tech: "NumPy",
    },
    {
      name: "Satellite Road Detection",
      description: "Classical CV road extraction",
      tech: "MATLAB",
    },
    {
      name: "Offspring Face GAN",
      description: "Conditional face generation",
      tech: "TensorFlow",
    },
  ],

  education: [
    {
      school: "University of Southern California",
      degree: "MS, Computer Science",
      year: "2020",
    },
    {
      school: "SRM Institute of Science and Technology",
      degree: "BTech, Computer Science & Engineering",
      year: "2019",
    },
  ],

  skills: [
    {
      world: "⬡ Backend & Infrastructure",
      sub: "Cloud networking and platform engineering",
      className: "infra",
      groups: [
        {
          heading: "Languages",
          items: ["Go", "Java", "C++", "GraphQL"],
        },
        {
          heading: "Orchestration",
          items: ["Docker", "Kubernetes", "OCI", "Stacker"],
        },
        {
          heading: "Cloud · Data",
          items: [
            "AWS",
            "Azure",
            "GCP",
            "Terraform",
            "Dgraph",
            "Postgres",
          ],
        },
      ],
    },
    {
      world: "✦ AI & Machine Learning",
      sub: "Where it's all heading",
      className: "ai",
      groups: [
        {
          heading: "Agents · LLM",
          items: ["Claude Agent SDK", "MCP", "RAG", "Bedrock"],
        },
        {
          heading: "Frameworks",
          items: ["TensorFlow", "PyTorch", "NumPy", "Pandas", "NLTK"],
        },
        {
          heading: "Shared bridge",
          items: ["Python", "gRPC", "Redis"],
        },
      ],
    },
  ],
};
