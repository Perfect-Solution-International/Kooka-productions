"use client";

import { useState, type SubmitEvent } from "react";
import type { ShowreelItem } from "@/services/showreel.service";
import { readErrorMessage } from "@/lib/api/client";
import { AdminShell } from "@/components/admin/AdminShell";

type ProjectsManagerProps = {
  readonly initialItems: ShowreelItem[];
};

type FormState = {
  slug: string;
  title: string;
  type: string;
  location: string;
  year: string;
  blurb: string;
  image: string;
  href: string;
  /** One image path per line. */
  gallery: string;
};

const emptyForm: FormState = {
  slug: "",
  title: "",
  type: "",
  location: "",
  year: "",
  blurb: "",
  image: "",
  href: "",
  gallery: "",
};

function galleryLines(value: string): string[] {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

function ImageFieldStatus({
  uploading,
  image,
}: {
  readonly uploading: boolean;
  readonly image: string;
}) {
  if (uploading) {
    return <p className="mt-1.5 text-xs text-kooka-mist/70">Uploading…</p>;
  }

  if (!image) {
    return <p className="mt-1.5 text-xs text-kooka-mist/70">No image selected.</p>;
  }

  return (
    <p className="mt-1.5 flex items-center gap-2 text-xs text-kooka-mist/70">
      <img src={image} alt="" className="h-8 w-8 rounded object-cover" />
      {image}
    </p>
  );
}

export function ProjectsManager({ initialItems }: ProjectsManagerProps) {
  const [items, setItems] = useState<ShowreelItem[]>(initialItems);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [uploading, setUploading] = useState(false);

  function startEdit(item: ShowreelItem) {
    setEditingId(item.id);
    setForm({
      slug: item.slug,
      title: item.title,
      type: item.type,
      location: item.location,
      year: item.year,
      blurb: item.blurb,
      image: item.image,
      href: item.href ?? "",
      gallery: item.gallery.map((image) => image.url).join("\n"),
    });
    setError(null);
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
    setError(null);
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.image) {
      setError("Upload an image first.");
      return;
    }

    setPending(true);
    setError(null);

    const url = editingId
      ? `/api/admin/showreel/${encodeURIComponent(editingId)}`
      : "/api/admin/showreel";

    /*
     * The gallery travels with every save. Omitting it used to wipe the
     * existing images, because an update replaces the record wholesale.
     */
    const payload = {
      title: form.title,
      type: form.type,
      location: form.location,
      year: form.year,
      blurb: form.blurb,
      image: form.image,
      href: form.href.trim() || null,
      gallery: galleryLines(form.gallery),
      ...(form.slug.trim() ? { slug: form.slug.trim() } : {}),
    };

    const response = await fetch(url, {
      method: editingId ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      setError(await readErrorMessage(response, "Something went wrong."));
      setPending(false);
      return;
    }

    const body: unknown = await response.json();
    const item = (body as { item: ShowreelItem }).item;
    setItems((prev) =>
      editingId
        ? prev.map((existing) => (existing.id === editingId ? item : existing))
        : [...prev, item],
    );
    cancelEdit();
    setPending(false);
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Delete this project?")) return;

    const response = await fetch(`/api/admin/showreel/${encodeURIComponent(id)}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setItems((prev) => prev.filter((item) => item.id !== id));
      if (editingId === id) cancelEdit();
    }
  }

  async function handleImageSelect(file: File | undefined) {
    if (!file) return;
    setUploading(true);
    setError(null);

    const body = new FormData();
    body.append("file", file);

    const response = await fetch("/api/admin/upload", { method: "POST", body });

    if (!response.ok) {
      setError(await readErrorMessage(response, "Image upload failed."));
      setUploading(false);
      return;
    }

    const { path: uploadedPath } = (await response.json()) as { path: string };
    setForm((prev) => ({ ...prev, image: uploadedPath }));
    setUploading(false);
  }

  return (
    <AdminShell title="Manage Projects — Showreel">
      {/*
        Below `lg` the two panes stack and this one container scrolls. From
        `lg` up the frame is fixed and each pane scrolls on its own, so the
        page itself never moves.
      */}
      <div className="h-full overflow-y-auto no-scrollbar p-5 lg:overflow-hidden">
        <div className="grid gap-6 lg:h-full lg:min-h-0 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          <ul className="space-y-3 order-2 lg:h-full lg:min-h-0 lg:overflow-y-auto no-scrollbar lg:pr-1">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.02] px-5 py-4"
              >
                <div>
                  <p className="font-display text-sm text-kooka-white">{item.title}</p>
                  <p className="mt-1 text-[0.7rem] text-kooka-mist/70">
                    {item.type} · {item.location} · {item.year}
                  </p>
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
                    onClick={() => void handleDelete(item.id)}
                    className="rounded-full border border-white/15 px-4 py-1.5 text-xs uppercase tracking-[0.1em] text-kooka-mist hover:border-red-400/60 hover:text-red-400"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
            {items.length === 0 ? <p className="text-sm text-kooka-mist">No projects yet.</p> : null}
          </ul>

          <form
            onSubmit={(event) => void handleSubmit(event)}
            className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6 order-1 lg:h-full lg:min-h-0 lg:overflow-y-auto no-scrollbar"
          >
          <h2 className="font-display text-sm uppercase tracking-[0.14em] text-kooka-mist">
            {editingId ? "Edit Project" : "Add Project"}
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
              Image{" "}
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
                onChange={(event) => void handleImageSelect(event.target.files?.[0])}
                className="mt-1.5 w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-kooka-white outline-none file:mr-3 file:rounded-full file:border-0 file:bg-kooka-amber file:px-3 file:py-1 file:text-xs file:font-semibold file:text-kooka-black focus:border-kooka-amber"
              />
              <ImageFieldStatus uploading={uploading} image={form.image} />
            </label>

            <label className="text-sm text-kooka-mist">
              Type{" "}
              <input
                value={form.type}
                onChange={(event) => setForm((prev) => ({ ...prev, type: event.target.value }))}
                className="mt-1.5 w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-kooka-white outline-none focus:border-kooka-amber"
                placeholder="Live Concert"
                required
              />
            </label>

            <label className="text-sm text-kooka-mist">
              Location{" "}
              <input
                value={form.location}
                onChange={(event) => setForm((prev) => ({ ...prev, location: event.target.value }))}
                className="mt-1.5 w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-kooka-white outline-none focus:border-kooka-amber"
                placeholder="Melbourne"
                required
              />
            </label>

            <label className="text-sm text-kooka-mist">
              Year{" "}
              <input
                value={form.year}
                onChange={(event) => setForm((prev) => ({ ...prev, year: event.target.value }))}
                className="mt-1.5 w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-kooka-white outline-none focus:border-kooka-amber"
                placeholder="2026"
                required
              />
            </label>

            <label className="text-sm text-kooka-mist">
              Link (optional){" "}
              <input
                value={form.href}
                onChange={(event) => setForm((prev) => ({ ...prev, href: event.target.value }))}
                className="mt-1.5 w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-kooka-white outline-none focus:border-kooka-amber"
                placeholder="/showreel/live-in-concert"
              />
            </label>

            <label className="text-sm text-kooka-mist">
              Slug (optional){" "}
              <input
                value={form.slug}
                onChange={(event) => setForm((prev) => ({ ...prev, slug: event.target.value }))}
                className="mt-1.5 w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-kooka-white outline-none focus:border-kooka-amber"
                placeholder="live-in-concert"
              />
              {/* Left as-is on save, so renaming a project keeps its URL. */}
              <span className="mt-1.5 block text-xs text-kooka-mist/70">
                Generated from the title when left blank. Changing it changes the
                public URL.
              </span>
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

          <label className="block text-sm text-kooka-mist">
            Gallery — one image path per line{" "}
            <textarea
              value={form.gallery}
              onChange={(event) => setForm((prev) => ({ ...prev, gallery: event.target.value }))}
              rows={4}
              className="mt-1.5 w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2 font-mono text-xs text-kooka-white outline-none focus:border-kooka-amber"
              placeholder={"/Highlighted/project-2.webp\n/Highlighted/project-3.webp"}
            />
          </label>

          {error ? <p className="text-sm text-red-400">{error}</p> : null}

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={pending || uploading}
              className="rounded-full bg-kooka-amber px-6 py-2.5 font-display text-xs font-semibold uppercase tracking-[0.14em] text-kooka-black disabled:opacity-50"
            >
              {editingId ? "Save Changes" : "Add Project"}
            </button>
            {editingId ? (
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
        </div>
      </div>
    </AdminShell>
  );
}
