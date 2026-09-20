"use client";

import AppShell from "@/components/AppShell";
import { useTemplates } from "@/components/TemplateStore";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Clock3,
  FileStack,
  LayoutTemplate,
  MoreHorizontal,
  TicketCheck,
  TrendingUp,
  Users,
} from "lucide-react";

const activity = [
  {
    text: "Banking Services template published",
    time: "18 minutes ago",
    dot: "green",
  },
  {
    text: "Ubuntu Health Group provisioned",
    time: "2 hours ago",
    dot: "blue",
  },
  {
    text: "Government template saved as draft",
    time: "Today, 14:42",
    dot: "purple",
  },
  {
    text: "Retail Queues module enabled",
    time: "Yesterday",
    dot: "orange",
  },
];

export default function Overview() {
  const { templates } = useTemplates();
  const published = templates.filter((t) => t.status === "Published").length;
  const tenants = templates.reduce((a, t) => a + t.tenants, 0);

  return (
    <AppShell title="Overview">
      <section className="page-head">
        <div>
          <h1>Platform Overview</h1>
          <p>
            Monitor templates, tenants and queue activity across the DQMS
            platform.
          </p>
        </div>
        <Link className="primary" href="/platform/templates">
          Manage Templates <ArrowRight size={16} />
        </Link>
      </section>

      <div className="stats">
        <div className="stat">
          <span className="stat-icon green">
            <FileStack />
          </span>
          <label>Industry Templates</label>
          <strong>{templates.length}</strong>
          <small>{published} currently published</small>
        </div>

        <div className="stat">
          <span className="stat-icon blue">
            <Building2 />
          </span>
          <label>Active Tenants</label>
          <strong>{tenants}</strong>
          <small className="positive">+3 this month</small>
        </div>

        <div className="stat">
          <span className="stat-icon purple">
            <Users />
          </span>
          <label>Platform Users</label>
          <strong>186</strong>
          <small>Across 25 organisations</small>
        </div>

        <div className="stat">
          <span className="stat-icon orange">
            <TicketCheck />
          </span>
          <label>Tickets Today</label>
          <strong>4,284</strong>
          <small className="positive">+12.4% from yesterday</small>
        </div>
      </div>

      <div className="dashboard-grid">
        <section className="panel wide">
          <div className="panel-title">
            <div>
              <h2>Template Adoption</h2>
              <p>Tenant distribution across published templates</p>
            </div>
            <button>
              <MoreHorizontal />
            </button>
          </div>

          <div className="chart">
            <div className="bars">
              {templates
                .filter((t) => t.status !== "Archived")
                .map((t) => (
                  <div className="bar-row" key={t.id}>
                    <div className="bar-label">
                      <b>{t.name}</b>
                      <span>{t.tenants} tenants</span>
                    </div>
                    <div className="track">
                      <i
                        style={{
                          width: `${Math.max(5, (t.tenants / 12) * 100)}%`,
                          background: t.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <Link href="/platform/templates" className="panel-link">
            View template library <ArrowRight size={15} />
          </Link>
        </section>

        <section className="panel">
          <div className="panel-title">
            <div>
              <h2>Recent Activity</h2>
              <p>Latest platform events</p>
            </div>
          </div>

          <div className="activity">
            {activity.map((a) => (
              <div className="activity-item" key={a.text}>
                <i className={a.dot} />
                <div>
                  <b>{a.text}</b>
                  <span>{a.time}</span>
                </div>
              </div>
            ))}
          </div>

          <button className="text-button">View all activity</button>
        </section>
      </div>

      <section className="panel health">
        <div className="panel-title">
          <div>
            <h2>Platform Health</h2>
            <p>Demonstration status for core frontend services</p>
          </div>
          <span className="live">
            <i /> All systems operational
          </span>
        </div>

        <div className="health-grid">
          <div>
            <span>Template service</span>
            <b>Operational</b>
          </div>
          <div>
            <span>Tenant provisioning</span>
            <b>Operational</b>
          </div>
          <div>
            <span>Queue events</span>
            <b>Operational</b>
          </div>
          <div>
            <span>Knowledge indexing</span>
            <b>Demo mode</b>
          </div>
        </div>
      </section>
    </AppShell>
  );
}