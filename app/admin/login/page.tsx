"use client";

import { useState, type SubmitEvent } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError(null);

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      /* Omitting the email signs in as the single seeded admin. */
      body: JSON.stringify(email.trim() ? { email: email.trim(), password } : { password }),
    });

    if (!response.ok) {
      setError("Wrong email or password.");
      setPending(false);
      return;
    }

    router.push("/admin/projects");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-kooka-black px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/[0.03] p-8"
      >
        <h1 className="font-display text-xl text-kooka-white">Admin Login</h1>

        <label className="mt-6 block text-sm text-kooka-mist">
          Email (optional){" "}
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-2 w-full rounded-lg border border-white/15 bg-black/30 px-4 py-2.5 text-kooka-white outline-none focus:border-kooka-amber"
            autoComplete="username"
          />
        </label>

        <label className="mt-4 block text-sm text-kooka-mist">
          Password{" "}
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 w-full rounded-lg border border-white/15 bg-black/30 px-4 py-2.5 text-kooka-white outline-none focus:border-kooka-amber"
            autoFocus
            required
          />
        </label>

        {error ? <p className="mt-3 text-sm text-red-400">{error}</p> : null}

        <button
          type="submit"
          disabled={pending}
          className="mt-6 w-full rounded-full bg-kooka-amber px-6 py-2.5 font-display text-sm font-semibold uppercase tracking-[0.14em] text-kooka-black disabled:opacity-50"
        >
          {pending ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </main>
  );
}
