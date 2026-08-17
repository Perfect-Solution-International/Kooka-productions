"use client";

import { useState, type SubmitEvent } from "react";
import { useRouter } from "next/navigation";
import type { FootprintItem } from "@/lib/footprintStore";

type ProjectsManagerProps = {
  readonly initialItems: FootprintItem[];
};

type FormState = {
  title: string;
  blurb: string;
  image: string;
};

const emptyForm: FormState = { title: "", blurb: "", image: "" };

export function ProjectsManager({ initialItems }: ProjectsManagerProps) {
  const router = useRouter();
  const [items, setItems] = useState<FootprintItem[]>(initialItems);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  function startEdit(item: FootprintItem) {
    setEditingSlug(item.slug);
    setForm({ title: item.title, blurb: item.blurb, image: item.image });
    setError(null);
  }

  function cancelEdit() {
    setEditingSlug(null);
    setForm(emptyForm);
    setError(null);
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError(null);

    const url = editingSlug
      ? `/api/admin/projects/${encodeURIComponent(editingSlug)}`
      : "/api/admin/projects";

    const response = await fetch(url, {
      method: editingSlug ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      const body: unknown = await response.json().catch(() => null);
      const message =
        typeof body === "object" && body !== null && "error" in body && typeof body.error === "string"
          ? body.error
          : "Something went wrong.";
      setError(message);
      setPending(false);
      return;
    }

    const body: unknown = await response.json();
    const item = (body as { item: FootprintItem }).item;
    setItems((prev) =>
      editingSlug
        ? prev.map((existing) => (existing.slug === editingSlug ? item : existing))
        : [...prev, item],
    );
    cancelEdit();
    setPending(false);
  }

  async function handleDelete(slug: string) {
    if (!window.confirm("Delete this project?")) return;

    const response = await fetch(`/api/admin/projects/${encodeURIComponent(slug)}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setItems((prev) => prev.filter((item) => item.slug !== slug));
      if (editingSlug === slug) cancelEdit();
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-kooka-black px-6 py-12 text-kooka-white">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-2xl">Manage Projects — Showreel</h1>
          <button
            type="button"
            onClick={() => void handleLogout()}
            className="rounded-full border border-white/15 px-4 py-2 text-xs uppercase tracking-[0.14em] text-kooka-mist hover:border-kooka-amber/60 hover:text-kooka-amber"
          >
            Log Out
          </button>
        </div>

        <form
          onSubmit={(event) => void handleSubmit(event)}
          className="mt-8 space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6"
        >
          <h2 className="font-display text-sm uppercase tracking-[0.14em] text-kooka-mist">
            {editingSlug ? "Edit Project" : "Add Project"}
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm text-kooka-mist">
              Title{" "}
              <input
                value={form.title}
                onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
                className="mt-1.5 w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-kooka-white outline-none focus:border-kooka-amber"
                required
              />
            </label>

            <label className="text-sm text-kooka-mist">
              Image URL or /public path{" "}
              <input
                value={form.image}
                onChange={(event) => setForm((prev) => ({ ...prev, image: event.target.value }))}
                className="mt-1.5 w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-kooka-white outline-none focus:border-kooka-amber"
                placeholder="/Highlighted/project-5.webp"
                required
              />
            </label>
          </div>

          <label className="block text-sm text-kooka-mist">
            Blurb{" "}
            <textarea
              value={form.blurb}
              onChange={(event) => setForm((prev) => ({ ...prev, blurb: event.target.value }))}
              rows={3}
              className="mt-1.5 w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-kooka-white outline-none focus:border-kooka-amber"
              required
            />
          </label>

          {error ? <p className="text-sm text-red-400">{error}</p> : null}

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={pending}
              className="rounded-full bg-kooka-amber px-6 py-2.5 font-display text-xs font-semibold uppercase tracking-[0.14em] text-kooka-black disabled:opacity-50"
            >
              {editingSlug ? "Save Changes" : "Add Project"}
            </button>
            {editingSlug ? (
              <button
                type="button"
                onClick={cancelEdit}
                className="rounded-full border border-white/15 px-6 py-2.5 font-display text-xs uppercase tracking-[0.14em] text-kooka-mist hover:text-kooka-white"
              >
                Cancel
              </button>
            ) : null}
          </div>
        </form>

        <ul className="mt-8 space-y-3">
          {items.map((item) => (
            <li
              key={item.slug}
              className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.02] px-5 py-4"
            >
              <div>
                <p className="font-display text-sm text-kooka-white">{item.title}</p>
                <p className="mt-1 max-w-md text-xs text-kooka-mist">{item.blurb}</p>
                <p className="mt-1 text-[0.7rem] text-kooka-mist/70">{item.image}</p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={() => startEdit(item)}
                  className="rounded-full border border-white/15 px-4 py-1.5 text-xs uppercase tracking-[0.1em] text-kooka-mist hover:text-kooka-amber"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => void handleDelete(item.slug)}
                  className="rounded-full border border-white/15 px-4 py-1.5 text-xs uppercase tracking-[0.1em] text-kooka-mist hover:border-red-400/60 hover:text-red-400"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
          {items.length === 0 ? <p className="text-sm text-kooka-mist">No projects yet.</p> : null}
        </ul>
      </div>
    </main>
  );
}
