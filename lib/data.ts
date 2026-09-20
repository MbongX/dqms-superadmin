export type TemplateStatus = "Published" | "Draft" | "Archived";

export type QueueTemplate = {
  id: string;
  name: string;
  industry: string;
  description: string;
  status: TemplateStatus;
  version: string;
  tenants: number;
  modules: number;
  updated: string;
  color: string;
};

export const seedTemplates: QueueTemplate[] = [
  {
    id: "banking",
    name: "Banking Services",
    industry: "Financial Services",
    description:
      "Retail banking queues, teller desks, appointments, document guidance and priority services.",
    status: "Published",
    version: "1.2",
    tenants: 8,
    modules: 7,
    updated: "18 Sep 2026",
    color: "#0a9e75",
  },
  {
    id: "health",
    name: "Primary Healthcare",
    industry: "Healthcare",
    description:
      "Patient registration, triage, consultations, pharmacy collection and appointment workflows.",
    status: "Published",
    version: "1.0",
    tenants: 5,
    modules: 8,
    updated: "15 Sep 2026",
    color: "#3278e6",
  },
  {
    id: "government",
    name: "Government Service Centre",
    industry: "Public Services",
    description:
      "Document verification, payments, applications, collections and multi-stage service routing.",
    status: "Draft",
    version: "0.8",
    tenants: 0,
    modules: 6,
    updated: "Today, 14:42",
    color: "#7558df",
  },
  {
    id: "generic",
    name: "Generic Queue Management",
    industry: "Cross-industry",
    description:
      "A flexible starting point for organisations with standard single or multi-service queues.",
    status: "Published",
    version: "2.1",
    tenants: 12,
    modules: 5,
    updated: "10 Sep 2026",
    color: "#dd9419",
  },
];