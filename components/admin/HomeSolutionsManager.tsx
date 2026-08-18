"use client";

import { useState, type SubmitEvent } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { readErrorMessage, uploadFile } from "@/lib/api/client";
import type { HomeSolutionItem } from "@/services/home-solution.service";
import type { IconName } from "@/data/services";

const icons: IconName[] = ["sparkles", "projector", "monitor", "audio-lines", "lightbulb", "layout-panel-top", "radio-tower", "settings-2", "building-2"];
type FormState = { slug: string; title: string; icon: IconName; image: string; description: string; deliverables: string; idealFor: string; sortOrder: string; published: boolean };
const emptyForm: FormState = { slug: "", title: "", icon: "sparkles", image: "", description: "", deliverables: "", idealFor: "", sortOrder: "", published: true };
const lines = (value: string) => value.split("\n").map((item) => item.trim()).filter(Boolean);

export function HomeSolutionsManager({ initialItems }: { readonly initialItems: HomeSolutionItem[] }) {
  const [items, setItems] = useState(initialItems);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function edit(item: HomeSolutionItem) {
    setEditingId(item.id);
    setForm({ slug: item.slug, title: item.title, icon: item.icon, image: item.image, description: item.description, deliverables: item.deliverables.join("\n"), idealFor: item.idealFor.join("\n"), sortOrder: String(item.sortOrder), published: item.published });
    setError(null);
  }

  function reset() { setEditingId(null); setForm(emptyForm); setError(null); }

  async function upload(file?: File) {
    if (!file) return;
    setUploading(true); setError(null);
    const result = await uploadFile(file);
    if ("error" in result) setError(result.error);
    else setForm((value) => ({ ...value, image: result.path }));
    setUploading(false);
  }

  async function submit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.image) { setError("Upload an image first."); return; }
    setPending(true); setError(null);
    const url = editingId ? `/api/admin/home-solutions/${editingId}` : "/api/admin/home-solutions";
    const response = await fetch(url, {
      method: editingId ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: form.title, icon: form.icon, image: form.image, description: form.description, deliverables: lines(form.deliverables), idealFor: lines(form.idealFor), published: form.published, ...(form.slug.trim() ? { slug: form.slug.trim() } : {}), ...(form.sortOrder !== "" ? { sortOrder: Number(form.sortOrder) } : {}) }),
    });
    if (!response.ok) { setError(await readErrorMessage(response, "Could not save solution.")); setPending(false); return; }
    const { item } = (await response.json()) as { item: HomeSolutionItem };
    setItems((current) => editingId ? current.map((value) => value.id === editingId ? item : value) : [...current, item]);
    reset(); setPending(false);
  }

  async function remove(id: string) {
    if (!window.confirm("Delete this home solution?")) return;
    const response = await fetch(`/api/admin/home-solutions/${id}`, { method: "DELETE" });
    if (!response.ok) { setError(await readErrorMessage(response, "Could not delete solution.")); return; }
    setItems((current) => current.filter((item) => item.id !== id));
    if (editingId === id) reset();
  }

  const input = "mt-1.5 w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-kooka-white outline-none focus:border-kooka-amber";
  return (
    <AdminShell title="Manage Solutions">
      <div className="h-full overflow-y-auto p-5 no-scrollbar lg:overflow-hidden">
        <div className="grid gap-6 lg:h-full lg:grid-cols-[1.05fr_1fr]">
          <ul className="order-2 space-y-3 lg:order-1 lg:overflow-y-auto lg:pr-1 no-scrollbar">
            {[...items].sort((a, b) => a.sortOrder - b.sortOrder).map((item) => (
              <li key={item.id} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                <div className="flex gap-4"><img src={item.image} alt="" className="h-20 w-24 rounded-lg object-cover" /><div className="min-w-0 flex-1"><p className="font-display text-sm text-kooka-white">{item.title}</p><p className="mt-1 line-clamp-2 text-xs text-kooka-mist">{item.description}</p><p className="mt-2 text-[0.65rem] text-kooka-amber">Order {item.sortOrder} · {item.published ? "Published" : "Hidden"}</p></div></div>
                <div className="mt-3 flex gap-2"><button type="button" onClick={() => edit(item)} className="rounded-full border border-white/15 px-4 py-1.5 text-xs text-kooka-mist hover:text-kooka-amber">Edit</button><button type="button" onClick={() => void remove(item.id)} className="rounded-full border border-white/15 px-4 py-1.5 text-xs text-kooka-mist hover:text-red-400">Delete</button></div>
              </li>
            ))}
          </ul>
          <form onSubmit={(event) => void submit(event)} className="order-1 space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6 lg:order-2 lg:overflow-y-auto no-scrollbar">
            <h2 className="font-display text-sm uppercase tracking-[0.14em] text-kooka-mist">{editingId ? "Edit Solution" : "Add Solution"}</h2>
            <label className="block text-sm text-kooka-mist">Title<input required value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} className={input} /></label>
            <label className="block text-sm text-kooka-mist">Slug (optional)<input value={form.slug} onChange={(event) => setForm({ ...form, slug: event.target.value })} className={input} placeholder="event-production" /></label>
            <div className="grid gap-4 sm:grid-cols-2"><label className="block text-sm text-kooka-mist">Icon<select value={form.icon} onChange={(event) => setForm({ ...form, icon: event.target.value as IconName })} className={input}>{icons.map((icon) => <option key={icon} value={icon}>{icon}</option>)}</select></label><label className="block text-sm text-kooka-mist">Order<input type="number" min="0" value={form.sortOrder} onChange={(event) => setForm({ ...form, sortOrder: event.target.value })} className={input} /></label></div>
            <label className="block text-sm text-kooka-mist">Image<input type="file" accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml" onChange={(event) => void upload(event.target.files?.[0])} className={input} />{form.image ? <img src={form.image} alt="" className="mt-2 aspect-video w-full rounded-lg object-cover" /> : <span className="mt-1 block text-xs">{uploading ? "Uploading…" : "No image selected."}</span>}</label>
            <label className="block text-sm text-kooka-mist">Description<textarea required rows={5} value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} className={input} /></label>
            <label className="block text-sm text-kooka-mist">What We Deliver <span className="text-xs text-kooka-muted">(one item per line)</span><textarea required rows={4} value={form.deliverables} onChange={(event) => setForm({ ...form, deliverables: event.target.value })} className={input} /></label>
            <label className="block text-sm text-kooka-mist">Ideal For <span className="text-xs text-kooka-muted">(one item per line)</span><textarea required rows={4} value={form.idealFor} onChange={(event) => setForm({ ...form, idealFor: event.target.value })} className={input} /></label>
            <label className="flex items-center gap-3 text-sm text-kooka-mist"><input type="checkbox" checked={form.published} onChange={(event) => setForm({ ...form, published: event.target.checked })} className="h-4 w-4 accent-kooka-amber" />Published</label>
            {error ? <p className="text-sm text-red-400">{error}</p> : null}
            <div className="flex gap-3"><button disabled={pending || uploading} className="rounded-full bg-kooka-amber px-6 py-2.5 text-xs font-semibold text-kooka-black disabled:opacity-50">{editingId ? "Save Changes" : "Add Solution"}</button>{editingId ? <button type="button" onClick={reset} className="rounded-full border border-white/15 px-6 py-2.5 text-xs text-kooka-mist">Cancel</button> : null}</div>
          </form>
        </div>
      </div>
    </AdminShell>
  );
}
