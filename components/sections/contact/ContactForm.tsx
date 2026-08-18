"use client";

import { useState, type SubmitEvent } from "react";
import { Mail } from "lucide-react";
import { contact } from "@/data/site";

export function ContactForm() {
  const [sending, setSending] = useState(false);

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);

    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const phone = String(form.get("phone") ?? "").trim();
    const eventType = String(form.get("eventType") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();
    const subject = encodeURIComponent(`Event enquiry from ${name}`);
    const body = encodeURIComponent(
      [`Name: ${name}`, `Email: ${email}`, `Phone: ${phone || "Not provided"}`, `Event type: ${eventType || "Not provided"}`, "", message].join("\n"),
    );

    window.open(`${contact.emailHref}?subject=${subject}&body=${body}`, "_self");
    window.setTimeout(() => setSending(false), 800);
  }

  const fieldClass =
    "mt-2 w-full rounded-xl border border-white/12 bg-black/30 px-4 py-3 text-kooka-white outline-none transition-colors placeholder:text-kooka-muted focus:border-kooka-amber";

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6 sm:p-8 lg:p-10">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm text-kooka-mist">
          Name
          <input name="name" autoComplete="name" required className={fieldClass} />
        </label>
        <label className="text-sm text-kooka-mist">
          Email
          <input name="email" type="email" autoComplete="email" required className={fieldClass} />
        </label>
        <label className="text-sm text-kooka-mist">
          Phone
          <input name="phone" type="tel" autoComplete="tel" className={fieldClass} />
        </label>
        <label className="text-sm text-kooka-mist">
          Event Type
          <input name="eventType" placeholder="Concert, gala, corporate event…" className={fieldClass} />
        </label>
      </div>
      <label className="mt-5 block text-sm text-kooka-mist">
        Tell us about your event
        <textarea name="message" rows={6} required className={fieldClass} />
      </label>
      <button
        type="submit"
        disabled={sending}
        className="group mt-7 inline-flex h-14 items-center justify-center gap-3 rounded-full bg-kooka-amber px-9 font-display text-[0.78rem] font-semibold tracking-[0.14em] text-kooka-black uppercase transition-all duration-500 hover:bg-kooka-flare disabled:opacity-60"
      >
        <Mail className="h-4 w-4" aria-hidden />
        {sending ? "Opening Email…" : "Send Enquiry"}
      </button>
    </form>
  );
}
