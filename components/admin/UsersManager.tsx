"use client";

import { useState, type SubmitEvent } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { readErrorMessage } from "@/lib/api/client";
import type { AdminUserRecord } from "@/services/user.service";

type UsersManagerProps = {
  readonly initialUsers: AdminUserRecord[];
};

type FormState = {
  name: string;
  email: string;
  password: string;
};

const emptyForm: FormState = { name: "", email: "", password: "" };

const MIN_PASSWORD_LENGTH = 10;

const PASSWORD_ALPHABET =
  "abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789!@#$%^&*";

/*
 * Rejection sampling rather than a plain modulo, so every character in the
 * alphabet stays equally likely.
 */
function generatePassword(length = 16): string {
  const limit = 256 - (256 % PASSWORD_ALPHABET.length);
  let password = "";

  while (password.length < length) {
    const bytes = new Uint8Array(length);
    crypto.getRandomValues(bytes);

    for (const byte of bytes) {
      if (byte >= limit) continue;
      password += PASSWORD_ALPHABET[byte % PASSWORD_ALPHABET.length];
      if (password.length === length) break;
    }
  }

  return password;
}

function formatDate(value: Date | string): string {
  return new Date(value).toLocaleDateString("en-AU", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function UsersManager({ initialUsers }: UsersManagerProps) {
  const [users, setUsers] = useState<AdminUserRecord[]>(initialUsers);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function startEdit(user: AdminUserRecord) {
    setEditingId(user.id);
    setForm({ name: user.name, email: user.email, password: "" });
    setError(null);
    setNotice(null);
    setShowPassword(false);
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
    setError(null);
    setShowPassword(false);
  }

  function fillGeneratedPassword() {
    setForm((prev) => ({ ...prev, password: generatePassword() }));
    setShowPassword(true);
    setNotice("Generated password filled in — copy it before saving, it is never shown again.");
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setNotice(null);

    /*
     * An edit may leave the password untouched; a new account may not. Either
     * way a supplied password has to clear the same floor the server enforces.
     */
    if (form.password.length > 0 || !editingId) {
      if (form.password.length < MIN_PASSWORD_LENGTH) {
        setError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
        return;
      }
    }

    setPending(true);

    const url = editingId
      ? `/api/admin/users/${encodeURIComponent(editingId)}`
      : "/api/admin/users";

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      ...(form.password ? { password: form.password } : {}),
    };

    const response = await fetch(url, {
      method: editingId ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      setError(await readErrorMessage(response, "Could not save the account."));
      setPending(false);
      return;
    }

    const body: unknown = await response.json();
    const user = (body as { item: AdminUserRecord }).item;

    setUsers((prev) =>
      editingId
        ? prev.map((existing) => (existing.id === editingId ? user : existing))
        : [...prev, user],
    );
    setNotice(editingId ? `Updated ${user.email}.` : `Created ${user.email}.`);
    cancelEdit();
    setPending(false);
  }

  async function handleDelete(user: AdminUserRecord) {
    if (!window.confirm(`Delete ${user.email}? They lose admin access immediately.`)) return;

    setError(null);
    setNotice(null);

    const response = await fetch(`/api/admin/users/${encodeURIComponent(user.id)}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      setError(await readErrorMessage(response, "Could not delete the account."));
      return;
    }

    setUsers((prev) => prev.filter((existing) => existing.id !== user.id));
    setNotice(`Deleted ${user.email}.`);
    if (editingId === user.id) cancelEdit();
  }

  return (
    <AdminShell title="Manage Users">
      <div className="h-full overflow-y-auto no-scrollbar p-5 lg:overflow-hidden">
        <div className="grid gap-6 lg:h-full lg:min-h-0 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)]">
          <ul className="space-y-3 order-2 lg:h-full lg:min-h-0 lg:overflow-y-auto no-scrollbar lg:pr-1">
            {users.map((user) => (
              <li
                key={user.id}
                className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.02] px-5 py-4"
              >
                <div className="min-w-0">
                  <p className="truncate font-display text-sm text-kooka-white">{user.name}</p>
                  <p className="mt-1 truncate text-[0.7rem] text-kooka-mist">{user.email}</p>
                  <p className="mt-1 text-[0.7rem] text-kooka-mist/70">
                    Added {formatDate(user.createdAt)}
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    onClick={() => startEdit(user)}
                    className="rounded-full border border-white/15 px-4 py-1.5 text-xs uppercase tracking-[0.1em] text-kooka-mist hover:text-kooka-amber"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => void handleDelete(user)}
                    disabled={users.length <= 1}
                    className="rounded-full border border-white/15 px-4 py-1.5 text-xs uppercase tracking-[0.1em] text-kooka-mist hover:border-red-400/60 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
            {users.length === 0 ? <p className="text-sm text-kooka-mist">No accounts yet.</p> : null}
          </ul>

          <form
            onSubmit={(event) => void handleSubmit(event)}
            className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6 order-1 lg:h-full lg:min-h-0 lg:overflow-y-auto no-scrollbar"
          >
            <h2 className="font-display text-sm uppercase tracking-[0.14em] text-kooka-mist">
              {editingId ? "Edit Account" : "New Account"}
            </h2>

            <label className="block text-sm text-kooka-mist">
              Name{" "}
              <input
                value={form.name}
                onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                className="mt-1.5 w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-kooka-white outline-none focus:border-kooka-amber"
                placeholder="Jane Doe"
                maxLength={191}
                autoComplete="off"
                required
              />
            </label>

            <label className="block text-sm text-kooka-mist">
              Email{" "}
              <input
                type="email"
                value={form.email}
                onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                className="mt-1.5 w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-kooka-white outline-none focus:border-kooka-amber"
                autoComplete="off"
                required
              />
            </label>

            <div className="text-sm text-kooka-mist">
              <label htmlFor="user-password">
                {editingId ? "New password (leave blank to keep current)" : "Password"}
              </label>
              <div className="mt-1.5 flex gap-2">
                <input
                  id="user-password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, password: event.target.value }))
                  }
                  className="w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2 font-mono text-sm text-kooka-white outline-none focus:border-kooka-amber"
                  autoComplete="new-password"
                  minLength={editingId ? undefined : MIN_PASSWORD_LENGTH}
                  required={!editingId}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="shrink-0 rounded-lg border border-white/15 px-3 text-xs uppercase tracking-[0.1em] text-kooka-mist hover:text-kooka-amber"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <button
                type="button"
                onClick={fillGeneratedPassword}
                className="mt-2 rounded-full border border-white/15 px-4 py-1.5 text-xs uppercase tracking-[0.1em] text-kooka-mist hover:border-kooka-amber/60 hover:text-kooka-amber"
              >
                Generate
              </button>
              <p className="mt-1.5 text-xs text-kooka-mist/70">
                Minimum {MIN_PASSWORD_LENGTH} characters. Stored hashed and never readable again,
                so hand it to the account holder before saving.
              </p>
            </div>

            {error ? <p className="text-sm text-red-400">{error}</p> : null}
            {notice ? <p className="text-sm text-kooka-amber">{notice}</p> : null}

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={pending}
                className="rounded-full bg-kooka-amber px-6 py-2.5 font-display text-xs font-semibold uppercase tracking-[0.14em] text-kooka-black disabled:opacity-50"
              >
                {editingId ? "Save Changes" : "Create Account"}
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
