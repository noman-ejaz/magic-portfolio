import type { IconName } from "@/resources/icons";
import type { zones } from "tzdata";

/**
 * IANA time zone string (e.g., 'Asia/Calcutta', 'Europe/Vienna').
 * See: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
 */
export type IANATimeZone = Extract<keyof typeof zones, string>; // Narrow to string keys for React usage

/**
 * Represents a person featured in the portfolio.
 */
export type Person = {
  /** First name of the person */
  firstName: string;
  /** Last name of the person */
  lastName: string;
  /** The name you want to display, allows variations like nicknames */
  name: string;
  /** Role or job title — used for SEO titles and Person schema */
  role: string;
  /** Short professional headline used on the home page and social cards */
  headline: string;
  /** Path to avatar image */
  avatar: string;
  /** Email address */
  email: string;
  /** Phone number in international format, without the leading `+` */
  phone: string;
  /** IANA time zone location */
  location: IANATimeZone;
  /** Human readable city/country, used for local SEO */
  locationLabel: string;
  /** Languages spoken */
  languages?: string[];
};

/**
 * Social link configuration.
 */
export type Social = Array<{
  /** Name of the social platform */
  name: string;
  /** Icon for the social platform
   * The icons are a part of "src/resources/icons.ts" file.
   * If you need a different icon, import it there and reference it everywhere else
   */
  icon: IconName;
  /**
   * The link to the social platform
   *
   * The link is not validated by code, make sure it's correct
   */
  link: string;
  /** Whether this social link is essential and should be displayed on the about page */
  essential?: boolean;
}>;

/**
 * Base interface for page configuration with common properties.
 */
export interface BasePageConfig {
  /** Path to the page
   *
   * The path should be relative to the public directory
   */
  path: `/${string}` | string;
  /** Label for navigation or display */
  label: string;
  /** Title of the page — rendered as `<title> | Noman Ejaz` in the browser */
  title: string;
  /** Description for SEO and metadata */
  description: string;
  /** Meta keywords — supplements, never replaces, on-page content */
  keywords?: string[];
  /** OG Image should be put inside `public/images` folder */
  image?: `/images/${string}` | string;
}

/**
 * Home page configuration.
 */
export interface Home extends BasePageConfig {
  /** The image to be displayed in metadata
   *
   * The image needs to be put inside `/public/images/` directory
   */
  image: `/images/${string}` | string;
  /** The headline of the home page */
  headline: React.ReactNode;
  /** Featured badge, which appears above the headline */
  featured: {
    display: boolean;
    title: React.ReactNode;
    href: string;
  };
  /** The sub text which appears below the headline */
  subline: React.ReactNode;
  /** Short "what I do" capability list, rendered under the hero */
  capabilities: {
    title: string;
    items: Array<{
      title: string;
      description: string;
      tags: string[];
    }>;
  };
  /** Social proof / trust numbers shown under the capability list */
  stats: {
    title: string;
    items: Array<{ value: string; label: string }>;
  };
}

/**
 * About page configuration.
 * @description Configuration for the About page, including sections for table of contents, avatar, introduction, work experience, studies, and technical skills.
 */
export interface About extends BasePageConfig {
  /** Table of contents configuration */
  tableOfContent: {
    /** Whether to display the table of contents */
    display: boolean;
    /** Whether to show sub-items in the table of contents */
    subItems: boolean;
  };
  /** Avatar section configuration */
  avatar: {
    /** Whether to display the avatar */
    display: boolean;
  };
  /** Introduction section */
  intro: {
    /** Whether to display the introduction */
    display: boolean;
    /** Title of the introduction section */
    title: string;
    /** Description of the introduction section */
    description: React.ReactNode;
  };
  /** Work experience section */
  work: {
    /** Whether to display work experience */
    display: boolean;
    /** Title for the work experience section */
    title: string;
    /** List of work experiences */
    experiences: Array<{
      /** Company name */
      company: string;
      /** Timeframe of employment */
      timeframe: string;
      /** Role or job title */
      role: string;
      /** Short one line summary shown next to the role */
      summary?: string;
      /** Achievements at the company */
      achievements: React.ReactNode[];
      /** Images related to the experience */
      images?: Array<{
        /** Image source path */
        src: string;
        /** Image alt text */
        alt: string;
        /** Image width ratio */
        width: number;
        /** Image height ratio */
        height: number;
      }>;
    }>;
  };
  /** Studies/education section */
  studies: {
    /** Whether to display studies section */
    display: boolean;
    /** Title for the studies section */
    title: string;
    /** List of institutions attended */
    institutions: Array<{
      /** Institution name */
      name: string;
      /** Description of studies */
      description: React.ReactNode;
    }>;
  };
  /** Technical skills section */
  technical: {
    /** Whether to display technical skills section */
    display: boolean;
    /** Title for the technical skills section */
    title: string;
    /** List of technical skills */
    skills: Array<{
      /** Skill title */
      title: string;
      /** Skill description */
      description?: React.ReactNode;
      /** Skill tags */
      tags?: Array<{
        name: string;
        icon?: string;
      }>;
      /** Images related to the skill */
      images?: Array<{
        /** Image source path */
        src: string;
        /** Image alt text */
        alt: string;
        /** Image width ratio */
        width: number;
        /** Image height ratio */
        height: number;
      }>;
    }>;
  };
  /** Frequently asked questions — rendered as FAQPage structured data */
  faq: {
    /** Whether to display the FAQ section */
    display: boolean;
    /** Title for the FAQ section */
    title: string;
    /** Question and answer pairs */
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
}

/**
 * Services page configuration.
 * @description Targeting commercial-intent keywords such as "hire full stack developer".
 */
export interface Services extends BasePageConfig {
  /** Short intro rendered under the page heading */
  intro: React.ReactNode;
  /** Grouped list of services, each rendered as its own anchored section */
  groups: Array<{
    /** Anchor id, also used in the table of contents */
    id: string;
    /** Service title */
    title: string;
    /** One sentence explaining the service */
    description: string;
    /** Concrete deliverables / technologies covered */
    items: string[];
  }>;
  /** Engagement process steps */
  process: {
    /** Whether to display the process section */
    display: boolean;
    /** Anchor id for the process section */
    id: string;
    /** Title for the process section */
    title: string;
    /** Ordered steps */
    steps: Array<{
      title: string;
      description: string;
    }>;
  };
  /** Closing call to action */
  cta: {
    /** Anchor id for the call to action section */
    id: string;
    title: string;
    description: string;
    label: string;
    href: string;
  };
  /** Frequently asked questions — rendered as FAQPage structured data */
  faq: {
    /** Whether to display the FAQ section */
    display: boolean;
    /** Anchor id for the FAQ section */
    id: string;
    /** Title for the FAQ section */
    title: string;
    /** Question and answer pairs */
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
}

/**
 * Work/projects page configuration.
 */
export interface Work extends BasePageConfig {
  /** Short intro rendered under the page heading */
  intro: React.ReactNode;
}
