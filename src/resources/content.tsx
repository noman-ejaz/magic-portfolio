import type { About, Home, Person, Services, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";
import { Fragment } from "react";

const person: Person = {
  firstName: "Noman",
  lastName: "Ejaz",
  name: "Noman Ejaz",
  role: "Full Stack Software Engineer",
  headline: "Python, Django, FastAPI, React and AI systems",
  avatar: "/images/personal.jpg",
  email: "nomanejaz8970@gmail.com",
  phone: "92-318-3374121",
  location: "Asia/Karachi", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  locationLabel: "Islamabad, Pakistan",
  languages: ["English", "Urdu"], // optional: Leave the array empty if you don't want to display languages
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /src/resources/icons.ts
  // Set essential: true for links you want to show on the about page
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/noman-ejaz",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/noman-ejaz-7b4389195/",
    essential: true,
  },
  {
    name: "Facebook",
    icon: "facebook",
    link: "https://www.facebook.com/profile.php?id=100078342571683",
    essential: false,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: `/api/og/generate?title=${encodeURIComponent(
    "Noman Ejaz — Full Stack Developer | Django, FastAPI, React & AI Systems",
  )}`,
  label: "Home",
  title: "Noman Ejaz | Full Stack Developer — Django, FastAPI, React & AI",
  description:
    "Noman Ejaz is a full stack developer in Islamabad, Pakistan building production web applications with Python, Django, FastAPI, React, Next.js, PostgreSQL, AWS and Docker — including AI-powered systems and workflow automation.",
  keywords: [
    "full stack developer Islamabad",
    "full stack developer Pakistan",
    "Noman Ejaz",
    "Python developer Islamabad",
    "Django developer",
    "FastAPI developer",
    "React developer Islamabad",
    "Next.js developer",
    "AI system developer",
    "AWS cloud developer",
    "Docker developer",
    "hire software engineer Pakistan",
  ],
  headline: <>I build AI-powered web systems that actually ship</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Available for new projects: </strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          {person.phone}
        </Text>
      </Row>
    ),
    href: "https://wa.me/923183374121",
  },
  subline: (
    <Fragment key="">
      I'm Noman Ejaz, a full stack software engineer based in Islamabad. I design and build{" "}
      <strong>Python and Django backends</strong>, <strong>FastAPI services</strong>,{" "}
      <strong>React and Next.js front-ends</strong>, <strong>AI-powered features</strong> and{" "}
      <strong>cloud infrastructure on AWS and Docker</strong> — turning manual processes into
      software that runs reliably in production.
    </Fragment>
  ),
  capabilities: {
    title: "What I build",
    items: [
      {
        title: "Python backends & REST APIs",
        description:
          "Django, Django REST Framework, FastAPI and Flask services with clean models, authentication, permissions and third-party API integration.",
        tags: ["Python", "Django", "DRF", "FastAPI", "Flask"],
      },
      {
        title: "React & Next.js front-ends",
        description:
          "Fast, accessible interfaces in React, Next.js, TypeScript and Tailwind CSS — dashboards, admin panels and customer-facing products.",
        tags: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      },
      {
        title: "AI systems & automation",
        description:
          "Intelligent recommendation engines, AI-assisted workflows, real-time data pipelines and background automation that removes repetitive manual work.",
        tags: ["AI Systems", "Automation", "Celery", "Redis"],
      },
      {
        title: "Cloud, Docker & databases",
        description:
          "Deployment, scaling and observability on AWS and Render with Docker, PostgreSQL, MongoDB, Firebase and Redis caching.",
        tags: ["AWS", "Docker", "PostgreSQL", "MongoDB"],
      },
    ],
  },
  stats: {
    title: "At a glance",
    items: [
      { value: "3+", label: "Years shipping production software" },
      { value: "10+", label: "Products shipped to production" },
      { value: "15+", label: "Technologies used in production" },
      { value: "100%", label: "Projects owned from API to deployment" },
    ],
  },
};

const about: About = {
  path: "/about",
  label: "About",
  title: "About",
  description:
    "Noman Ejaz is a full stack software engineer in Islamabad, Pakistan, specialising in Python, Django, FastAPI, React, Next.js, AWS and Docker — with hands-on experience shipping AI-powered systems and business web platforms.",
  keywords: [
    "Noman Ejaz software engineer",
    "full stack developer Islamabad",
    "Python Django developer Pakistan",
    "FastAPI React developer",
    "AWS Docker developer Islamabad",
    "AI engineer Pakistan",
  ],
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <Fragment key="">
        <Text variant="body-default-l" marginBottom="l">
          I'm <strong>Noman Ejaz</strong>, a full stack software engineer based in Islamabad,
          Pakistan. I build complete web products — from the database schema and REST API through to
          the React interface, the deployment pipeline and the dashboards that keep everything
          running.
        </Text>
        <Text variant="body-default-l" marginBottom="l">
          My day-to-day stack is <strong>Python and Django</strong> for business logic,{" "}
          <strong>FastAPI</strong> for high-throughput services, <strong>React and Next.js</strong>{" "}
          for the front-end, and <strong>PostgreSQL</strong> for data. I deploy with{" "}
          <strong>AWS</strong> and <strong>Docker</strong>, and I use{" "}
          <strong>Redis, Celery and Firebase</strong> when a product needs real-time updates and
          background processing.
        </Text>
        <Text variant="body-default-l">
          A growing part of my work is <strong>AI systems</strong> — recommendation engines,
          AI-assisted workflows and automation that replaces repetitive manual processes with
          software. I care about code that other developers can read, systems that stay maintainable
          after launch, and honest estimates that hold up in production.
        </Text>
      </Fragment>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "Digi Inn Solutions",
        timeframe: "2023 - Present",
        role: "Software Engineer",
        summary:
          "Full stack engineer on client web platforms, covering API design, front-end delivery and cloud hosting.",
        achievements: [
          <Fragment key="">
            Plan, design, develop and deploy scalable web applications with{" "}
            <strong>Django, Django REST Framework, FastAPI, React, Next.js</strong>, Tailwind CSS,
            SQLite and <strong>PostgreSQL</strong>.
          </Fragment>,
          <Fragment key="">
            Design and ship <strong>RESTful APIs</strong> for clean communication between front-end
            and back-end, and optimise application performance for security, efficiency and scale.
          </Fragment>,
          <Fragment key="">
            Build <strong>AI and automation features</strong> — recommendation logic, background
            task processing and analytics dashboards that turn raw operational data into decisions.
          </Fragment>,
          <Fragment key="">
            Break down requirements, delegate tasks to team members and keep delivery on track
            across the full project lifecycle.
          </Fragment>,
          <Fragment key="">
            Containerise services with <strong>Docker</strong> and deploy on{" "}
            <strong>AWS and Render</strong>, with caching and queues for real-time workloads.
          </Fragment>,
        ],
      },
      {
        company: "Al-Khidmat Razi Hospital",
        timeframe: "2023",
        role: "Associate Software Engineer",
        summary: "Built and maintained internal healthcare web systems in Python and Django.",
        achievements: [
          <Fragment key="">
            Developed and deployed scalable web applications using{" "}
            <strong>Python, Django, Django REST Framework and FastAPI</strong>.
          </Fragment>,
          <Fragment key="">
            Designed and integrated <strong>RESTful APIs</strong> for efficient, reliable
            communication between hospital systems and internal teams.
          </Fragment>,
          <Fragment key="">
            Applied role-based access control and input validation to protect sensitive healthcare
            records and audit user activity.
          </Fragment>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Studies",
    institutions: [
      {
        name: "Mohi Ud Din Islamic University",
        description: (
          <Fragment key="">
            Studied software engineering, with a focus on programming fundamentals, databases, web
            technologies and system design.
          </Fragment>
        ),
      },
    ],
  },
  technical: {
    display: true,
    title: "Technical Skills",
    skills: [
      {
        title: "Backend — Python, Django & FastAPI",
        description: (
          <Fragment key="">
            Business logic, REST APIs, authentication, permissions, background jobs and third-party
            integrations.
          </Fragment>
        ),
        tags: [
          { name: "Python", icon: "python" },
          { name: "Django", icon: "django" },
          { name: "Django REST Framework", icon: "django" },
          { name: "FastAPI", icon: "fastapi" },
          { name: "Flask", icon: "flask" },
          { name: "Celery", icon: "celery" },
          { name: "Redis", icon: "redis" },
        ],
      },
      {
        title: "Frontend — React & Next.js",
        description: (
          <Fragment key="">
            Responsive, accessible interfaces, server rendering, component architecture and design
            systems.
          </Fragment>
        ),
        tags: [
          { name: "React", icon: "react" },
          { name: "Next.js", icon: "nextjs" },
          { name: "JavaScript", icon: "javascript" },
          { name: "TypeScript", icon: "typescript" },
          { name: "Tailwind CSS", icon: "tailwind" },
          { name: "Bootstrap", icon: "bootstrap" },
        ],
      },
      {
        title: "AI & Data",
        description: (
          <Fragment key="">
            Recommendation systems, intelligent automation and real-time data handling on top of
            relational and document stores.
          </Fragment>
        ),
        tags: [
          { name: "AI Systems", icon: "ai" },
          { name: "Automation", icon: "rocket" },
          { name: "PostgreSQL", icon: "postgresql" },
          { name: "MongoDB", icon: "mongodb" },
          { name: "SQLite", icon: "sqlite" },
          { name: "Firebase", icon: "firebase" },
        ],
      },
      {
        title: "Cloud & DevOps",
        description: (
          <Fragment key="">
            Containerisation, cloud hosting, deployment automation and caching for production
            workloads.
          </Fragment>
        ),
        tags: [
          { name: "AWS", icon: "aws" },
          { name: "Docker", icon: "docker" },
          { name: "Render", icon: "render" },
          { name: "Supabase", icon: "supabase" },
          { name: "GitHub Actions", icon: "github" },
        ],
      },
    ],
  },
  faq: {
    display: true,
    title: "Frequently asked questions",
    items: [
      {
        question: "What technologies does Noman Ejaz work with?",
        answer:
          "Noman Ejaz works primarily with Python, Django, Django REST Framework, FastAPI and Flask on the back-end, and React, Next.js, JavaScript and Tailwind CSS on the front-end. Data work covers PostgreSQL, MongoDB, SQLite and Firebase, while deployment uses AWS, Docker and Render, with Redis and Celery for caching and background tasks.",
      },
      {
        question: "Where is Noman Ejaz based and does he work remotely?",
        answer:
          "Noman Ejaz is based in Islamabad, Pakistan and works remotely with clients and teams in Pakistan, Europe, the United Kingdom, the United States, the Gulf and Asia Pacific. All communication and delivery happen in English.",
      },
      {
        question: "Does Noman Ejaz build AI-powered applications?",
        answer:
          "Yes. Recent work includes AI-powered recommendation systems, intelligent automation of manual business processes, and analytics pipelines that surface real-time insight. The approach is always to tie AI to a clear business outcome rather than adding complexity for its own sake.",
      },
      {
        question: "What does a full stack project with Noman Ejaz include?",
        answer:
          "A full stack engagement covers requirements and data modelling, backend API design, database schema, front-end interface, third-party API integration, Docker and cloud deployment, and post-launch maintenance. You get the source code and documentation at handover.",
      },
      {
        question: "Can Noman Ejaz take over an existing codebase?",
        answer:
          "Yes. He can audit an existing Django, FastAPI or React codebase, document how it works, fix the urgent defects, and then continue feature development with a clear estimate for each piece of work.",
      },
    ],
  },
};

const services: Services = {
  path: "/services",
  label: "Services",
  title: "Services",
  description:
    "Full stack development services from Islamabad, Pakistan — Django and FastAPI backends, React and Next.js front-ends, AI systems and automation, plus AWS, Docker and cloud deployment. Hire Noman Ejaz for your web project.",
  keywords: [
    "hire full stack developer",
    "hire Django developer Pakistan",
    "hire Python developer Islamabad",
    "hire React developer",
    "hire FastAPI developer",
    "AI developer for hire",
    "AWS and Docker developer",
    "freelance full stack developer Pakistan",
    "software engineer for hire Islamabad",
  ],
  intro: (
    <Fragment key="">
      I take projects from a rough idea to a deployed, maintainable product. Whether you need a
      single API, a complete web platform, or an AI feature added to an existing system, the process
      is the same: understand the real problem, design for it properly, then ship it.
    </Fragment>
  ),
  groups: [
    {
      id: "full-stack-web-apps",
      title: "Full Stack Web Applications",
      description:
        "Complete web products built and owned end to end — database, API, interface, deployment and maintenance.",
      items: [
        "Product requirements and data modelling",
        "Django or FastAPI backend with a documented REST API",
        "React or Next.js front-end, responsive and accessible",
        "User accounts, roles and permissions",
        "Admin dashboards and analytics",
        "Docker packaging and cloud deployment",
      ],
    },
    {
      id: "python-backend-apis",
      title: "Python Backends & REST APIs",
      description:
        "Fast, secure server-side systems in Python — the layer your product actually runs on.",
      items: [
        "Django and Django REST Framework applications",
        "FastAPI services with async I/O and OpenAPI docs",
        "Authentication, tokens, roles and permissions",
        "Third-party API integration and payment gateways",
        "Celery background jobs, scheduling and retries",
        "Redis caching, rate limiting and query optimisation",
      ],
    },
    {
      id: "ai-systems-automation",
      title: "AI Systems & Intelligent Automation",
      description:
        "Moving repetitive work into software, and using AI where it genuinely improves the outcome.",
      items: [
        "Recommendation engines based on order and usage history",
        "AI-assisted workflows and decision support",
        "Document and data extraction pipelines",
        "Automated reporting and insight generation",
        "Real-time analytics and alerting dashboards",
        "Process automation and scheduled background tasks",
      ],
    },
    {
      id: "cloud-devops",
      title: "Cloud, Docker & DevOps",
      description:
        "Deployment that stays reliable after launch, not just a server that worked once.",
      items: [
        "Docker images and container orchestration setup",
        "AWS and Render hosting, storage and networking",
        "CI/CD pipelines with GitHub Actions",
        "Environment configuration and secret management",
        "Logging, backups and monitoring",
        "Performance tuning and scaling under load",
      ],
    },
    {
      id: "business-websites",
      title: "Business Websites & WordPress",
      description:
        "Fast, search-engine friendly websites for service businesses, built to generate enquiries.",
      items: [
        "Service and landing pages with local SEO",
        "Online booking and quote request forms",
        "Content management the business can run itself",
        "On-page SEO, structured data and fast load times",
        "Contact form spam protection",
        "Analytics and Search Console setup",
      ],
    },
    {
      id: "codebase-audit",
      title: "Codebase Audits & Takeovers",
      description:
        "Already have code that needs help? I will document it, stabilise it, then keep building.",
      items: [
        "Technical review of Django, FastAPI and React projects",
        "Security and performance findings, ranked by impact",
        "Architecture and database schema review",
        "Refactoring and test coverage on critical paths",
        "Documentation and onboarding for your team",
        "Feature delivery on top of the existing codebase",
      ],
    },
  ],
  process: {
    display: true,
    id: "how-i-work",
    title: "How I work",
    steps: [
      {
        title: "1. Discovery",
        description:
          "A short call to understand the business problem, the users and what success actually looks like. You get a written scope and a fixed estimate.",
      },
      {
        title: "2. Architecture",
        description:
          "Data model, API surface and infrastructure agreed in writing before code is written, so scope stays predictable.",
      },
      {
        title: "3. Build",
        description:
          "Short cycles with a working demo at the end of each one. You see progress early, not at the final handover.",
      },
      {
        title: "4. Deploy",
        description:
          "Docker packaging, cloud deployment, monitoring and backups — production-ready from day one, not bolted on later.",
      },
      {
        title: "5. Support",
        description:
          "Bug fixes, small enhancements and handover documentation. You own the code and the infrastructure.",
      },
    ],
  },
  cta: {
    id: "have-a-project-in-mind",
    title: "Have a project in mind?",
    description:
      "Send me a short description of what you need. I reply with honest feedback on feasibility, approach and cost — even if I am not the right fit.",
    label: "Start a conversation",
    href: "https://wa.me/923183374121",
  },
  faq: {
    display: true,
    id: "questions-before-you-hire",
    title: "Questions before you hire",
    items: [
      {
        question: "How much does a full stack project cost?",
        answer:
          "Cost depends on scope, and I quote after understanding the work rather than guessing from a feature list. Small, well-defined builds start considerably lower than large platforms. Every quote is fixed and written down before work begins, so there are no surprise invoices.",
      },
      {
        question: "How long does a project take?",
        answer:
          "A focused single-service backend or a business website is usually a few weeks. A complete platform with authentication, dashboards and third-party integrations typically runs one to three months. You receive a dated plan with milestones before the project starts.",
      },
      {
        question: "Do I own the code and the infrastructure?",
        answer:
          "Yes. Source code, infrastructure configuration and documentation are handed over to you at the end of the project. There are no licensing traps and no dependency on me to keep the system running.",
      },
      {
        question: "Which time zones do you work with?",
        answer:
          "I work remotely with clients across Pakistan, Europe, the United Kingdom, the United States, the Gulf and Asia Pacific. I schedule overlap with your working hours and communicate in English.",
      },
      {
        question: "Can you work with my existing developer or agency?",
        answer:
          "Absolutely. I regularly work as the backend or AI specialist inside an existing team, integrating with your current codebase, code review process and project management. Clear contracts and defined interfaces keep that collaboration smooth.",
      },
    ],
  },
};

const work: Work = {
  path: "/work",
  label: "Projects",
  title: "Projects",
  description:
    "Selected projects by Noman Ejaz — Django, FastAPI, React and Next.js web platforms, real-time tracking systems, eCommerce builds, AI recommendation systems and AWS/Docker deployments, with architecture decisions explained.",
  keywords: [
    "Django project case study",
    "FastAPI project case study",
    "React project portfolio",
    "real time tracking system Django",
    "AI recommendation system project",
    "eCommerce project Django MongoDB",
    "AWS Docker deployment project",
  ],
  intro: (
    <Fragment key="">
      Seven production platforms, from real-time fleet tracking to AI-powered restaurant
      recommendations. Each write-up covers the problem, the architecture, the stack and what I'd do
      differently next time.
    </Fragment>
  ),
};

export { person, social, home, about, services, work };
