"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { QueueTemplate, seedTemplates } from "@/lib/data";

type Store = {
  templates: QueueTemplate[];
  add: (t: QueueTemplate) => void;
  duplicate: (id: string) => void;
  toggleStatus: (id: string) => void;
  reset: () => void;
};

const C = createContext<Store | null>(null);

export function TemplateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [templates, setTemplates] = useState(seedTemplates);

  useEffect(() => {
    const x = localStorage.getItem("dqms-templates");
    if (x) {
      try {
        setTemplates(JSON.parse(x));
      } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("dqms-templates", JSON.stringify(templates));
  }, [templates]);

  const add = (t: QueueTemplate) => setTemplates((v) => [t, ...v]);

  const duplicate = (id: string) =>
    setTemplates((v) => {
      const t = v.find((x) => x.id === id);
      return t
        ? [
            {
              ...t,
              id: crypto.randomUUID(),
              name: `${t.name} Copy`,
              status: "Draft",
              version: "0.1",
              tenants: 0,
              updated: "Just now",
            },
            ...v,
          ]
        : v;
    });

  const toggleStatus = (id: string) =>
    setTemplates((v) =>
      v.map((t) =>
        t.id === id
          ? {
              ...t,
              status: t.status === "Published" ? "Archived" : "Published",
              updated: "Just now",
            }
          : t
      )
    );

  const reset = () => setTemplates(seedTemplates);

  return (
    <C.Provider value={{ templates, add, duplicate, toggleStatus, reset }}>
      {children}
    </C.Provider>
  );
}

export function useTemplates() {
  const x = useContext(C);
  if (!x) throw new Error("TemplateProvider missing");
  return x;
}