"use client";

import AppShell from "@/components/AppShell";
import { useTemplates } from "@/components/TemplateStore";
import { useMemo, useState } from "react";
import {
  Archive,
  Building2,
  Copy,
  FileStack,
  Grid2X2,
  LayoutList,
  MoreVertical,
  Plus,
  Search,
  Settings2,
  Users,
  X,
} from "lucide-react";
import type { QueueTemplate, TemplateStatus } from "@/lib/data";

export default function Templates() {
  const { templates, add, duplicate, toggleStatus, reset } = useTemplates();
  const [q, setQ] = useState("");
  const [industry, setIndustry] = useState("All industries");
  const [status, setStatus] = useState("All statuses");
  const [grid, setGrid] = useState(true);
  const [modal, setModal] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);

  const industries = [
    "All industries",
    ...Array.from(new Set(templates.map((t) => t.industry))),
  ];

  const visible = useMemo(
    () =>
      templates.filter(
        (t) =>
          (t.name + " " + t.industry)
            .toLowerCase()
            .includes(q.toLowerCase()) &&
          (industry === "All industries" || t.industry === industry) &&
          (status === "All statuses" || t.status === status)
      ),
    [templates, q, industry, status]
  );

  return (
    <AppShell title="Template Library">
      <section className="page-head">
        <div>
          <h1>Industry Template Library</h1>
          <p>
            Create reusable queue configurations and assign them to client
            organisations.
          </p>
        </div>
        <button className="primary" onClick={() => setModal(true)}>
          <Plus size={17} /> Create New Template
        </button>
      </section>

      <div className="stats compact">
        <div className="stat">
          <label>Total Templates</label>
          <strong>{templates.length}</strong>
          <small>
            {templates.filter((t) => t.status === "Published").length} published
          </small>
        </div>
        <div className="stat">
          <label>Industries Covered</label>
          <strong>{new Set(templates.map((t) => t.industry)).size}</strong>
          <small>Reusable configurations</small>
        </div>
        <div className="stat">
          <label>Active Tenants</label>
          <strong>{templates.reduce((a, t) => a + t.tenants, 0)}</strong>
          <small className="positive">Ready for provisioning</small>
        </div>
        <div className="stat">
          <label>Available Modules</label>
          <strong>9</strong>
          <small>Across the platform</small>
        </div>
      </div>

      <div className="toolbar">
        <div className="search">
          <Search size={17} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search templates by name or industry..."
          />
        </div>
        <select
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
        >
          {industries.map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option>All statuses</option>
          <option>Published</option>
          <option>Draft</option>
          <option>Archived</option>
        </select>
        <div className="view-toggle">
          <button
            className={grid ? "selected" : ""}
            onClick={() => setGrid(true)}
          >
            <Grid2X2 size={16} />
          </button>
          <button
            className={!grid ? "selected" : ""}
            onClick={() => setGrid(false)}
          >
            <LayoutList size={16} />
          </button>
        </div>
      </div>

      <div className={grid ? "template-grid" : "template-list"}>
        {visible.map((t) => (
          <article className="template-card" key={t.id}>
            <div className="card-top">
              <span
                className="template-icon"
                style={{ background: t.color + "18", color: t.color }}
              >
                <FileStack />
              </span>
              <div className="template-name">
                <div>
                  <h2>{t.name}</h2>
                  <em>v{t.version}</em>
                </div>
                <p style={{ color: t.color }}>{t.industry}</p>
              </div>
              <div className="menu-wrap">
                <button
                  className="icon-btn"
                  onClick={() => setMenu(menu === t.id ? null : t.id)}
                >
                  <MoreVertical size={18} />
                </button>
                {menu === t.id && (
                  <div className="context-menu">
                    <button
                      onClick={() => {
                        duplicate(t.id);
                        setMenu(null);
                      }}
                    >
                      <Copy /> Duplicate
                    </button>
                    <button
                      onClick={() => {
                        toggleStatus(t.id);
                        setMenu(null);
                      }}
                    >
                      <Archive />
                      {t.status === "Published" ? "Archive" : "Publish"}
                    </button>
                  </div>
                )}
              </div>
            </div>

            <p className="description">{t.description}</p>

            <div className="meta">
              <span className={`badge ${t.status.toLowerCase()}`}>
                <i />
                {t.status}
              </span>
              <span>
                <Users /> {t.tenants} tenants
              </span>
              <span>
                <Settings2 /> {t.modules} modules
              </span>
            </div>

            <div className="card-footer">
              <small>Updated {t.updated}</small>
              <div>
                <button
                  className="secondary"
                  onClick={() =>
                    alert(
                      `Preview: ${t.name}\n\nCustomer app, operator station and admin preview will be connected in the next phase.`
                    )
                  }
                >
                  Preview
                </button>
                <button
                  className="primary small"
                  onClick={() =>
                    alert(`${t.name} opened in demo management mode.`)
                  }
                >
                  Manage
                </button>
              </div>
            </div>
          </article>
        ))}

        <button className="new-card" onClick={() => setModal(true)}>
          <span>
            <Plus />
          </span>
          <b>Create a new industry template</b>
          <p>
            Start with a blank configuration or duplicate an existing template.
          </p>
        </button>
      </div>

      {visible.length === 0 && (
        <div className="empty">
          <Search />
          <h3>No templates found</h3>
          <p>Change the filters or create a new template.</p>
        </div>
      )}

      <div className="reset-row">
        <button className="text-button" onClick={reset}>
          Reset demonstration data
        </button>
      </div>

      {modal && (
        <NewTemplate
          onClose={() => setModal(false)}
          onSave={(t) => {
            add(t);
            setModal(false);
          }}
        />
      )}
    </AppShell>
  );
}

function NewTemplate({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (x: QueueTemplate) => void;
}) {
  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("Financial Services");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TemplateStatus>("Draft");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    onSave({
      id: crypto.randomUUID(),
      name: name.trim(),
      industry,
      description:
        description.trim() || "Configurable queue management template.",
      status,
      version: status === "Published" ? "1.0" : "0.1",
      tenants: 0,
      modules: 5,
      updated: "Just now",
      color: "#0a9e75",
    });
  }

  return (
    <div className="modal-backdrop">
      <form className="modal" onSubmit={submit}>
        <div className="modal-head">
          <div>
            <h2>Create Industry Template</h2>
            <p>
              Create the base record now. Services and workflows will be
              configured later.
            </p>
          </div>
          <button type="button" className="icon-btn" onClick={onClose}>
            <X />
          </button>
        </div>

        <label>
          Template name
          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Retail Customer Service"
            required
          />
        </label>

        <label>
          Industry
          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
          >
            <option>Financial Services</option>
            <option>Healthcare</option>
            <option>Public Services</option>
            <option>Education</option>
            <option>Retail</option>
            <option>Cross-industry</option>
          </select>
        </label>

        <label>
          Description
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the queue environment and default workflow..."
            rows={4}
          />
        </label>

        <label>
          Initial status
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as TemplateStatus)}
          >
            <option>Draft</option>
            <option>Published</option>
          </select>
        </label>

        <div className="modal-actions">
          <button type="button" className="secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="primary" type="submit">
            Create Template
          </button>
        </div>
      </form>
    </div>
  );
}