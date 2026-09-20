"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Library,
  Building2,
  Boxes,
  ScrollText,
  Settings,
  Bell,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const nav = [
  { href: "/platform", label: "Overview", icon: LayoutDashboard },
  { href: "/platform/templates", label: "Template Library", icon: Library },
  { href: "#", label: "Tenants", icon: Building2, soon: true },
  { href: "#", label: "Plans & Modules", icon: Boxes, soon: true },
  { href: "#", label: "Audit Logs", icon: ScrollText, soon: true },
  { href: "#", label: "Platform Settings", icon: Settings, soon: true },
];

export default function AppShell({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="shell">
      <button
        className="mobile-menu"
        onClick={() => setOpen(true)}
        aria-label="Open navigation"
      >
        <Menu size={21} />
      </button>

      {open && <div className="backdrop" onClick={() => setOpen(false)} />}

      <aside className={`sidebar ${open ? "open" : ""}`}>
        <div className="brand">
          <div className="brand-mark">Q</div>
          <div>
            <b>DQMS Platform</b>
            <small>Super Admin Console</small>
          </div>
          <button className="close" onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>

        <nav>
          {nav.map(({ href, label, icon: Icon, soon }) => {
            const active =
              href !== "#" &&
              (path === href || (href !== "/platform" && path.startsWith(href)));

            return (
              <Link
                key={label}
                href={href}
                onClick={(e) => {
                  if (soon) e.preventDefault();
                  setOpen(false);
                }}
                className={active ? "active" : ""}
              >
                <Icon size={18} />
                <span>{label}</span>
                {soon && <em>Soon</em>}
              </Link>
            );
          })}
        </nav>

        <div className="profile">
          <div className="avatar">SA</div>
          <div>
            <b>Platform Administrator</b>
            <small>Full platform access</small>
          </div>
        </div>
      </aside>

      <div className="workspace">
        <header>
          <div className="crumb">
            Platform / <b>{title}</b>
          </div>
          <div className="header-right">
            <button className="icon-btn">
              <Bell size={18} />
              <i />
            </button>
            <div className="account">
              <b>Super Admin</b>
              <small>DQMS Platform</small>
            </div>
          </div>
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
}