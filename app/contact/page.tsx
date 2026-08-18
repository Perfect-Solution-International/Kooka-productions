import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/sections/shared/PageHero";
import { ContactForm } from "@/components/sections/contact/ContactForm";
import { Section } from "@/components/ui/Section";
import { contact, site } from "@/data/site";
import { media } from "@/data/media";

export const metadata: Metadata = {
  title: "Contact Our Event Production Team",
  description: "Contact Kooka Productions in Melbourne for event production, AV, LED screens, sound, lighting, staging and live streaming enquiries.",
  alternates: { canonical: "/contact" },
};

const channels = [
  { icon: Phone, label: "Call Our Team", value: contact.phone, href: contact.phoneHref },
  { icon: Mail, label: "Email Us", value: contact.email, href: contact.emailHref },
  { icon: MapPin, label: "Melbourne HQ", value: contact.address },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Kooka"
        title="Let's Create Something Remarkable"
        subtitle="Melbourne Based. Australia Wide."
        description="Tell us what you are planning and our production team will help shape the right technical and creative solution."
        image={media.conferenceStage}
        size="compact"
      />

      <Section bloom="top">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16 xl:gap-24">
          <div>
            <p className="kooka-eyebrow">Start a Conversation</p>
            <h2 className="kooka-display mt-4 text-3xl sm:text-4xl">Bring Us the Ambition.</h2>
            <p className="mt-5 max-w-lg leading-relaxed text-kooka-mist">
              From first concept to show day, {site.shortName} brings production, AV and technical delivery together under one experienced team.
            </p>

            <ul className="mt-10 divide-y divide-white/[0.08] border-y border-white/[0.08]">
              {channels.map(({ icon: Icon, label, value, href }) => (
                <li key={label}>
                  {href ? (
                    <a href={href} className="group flex items-center gap-4 py-5">
                      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-kooka-amber/30 bg-kooka-amber/10 text-kooka-amber">
                        <Icon className="h-4 w-4" aria-hidden />
                      </span>
                      <span><span className="kooka-eyebrow block">{label}</span><span className="mt-1 block text-sm text-kooka-mist group-hover:text-kooka-white">{value}</span></span>
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 py-5">
                      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-kooka-amber/30 bg-kooka-amber/10 text-kooka-amber">
                        <Icon className="h-4 w-4" aria-hidden />
                      </span>
                      <span><span className="kooka-eyebrow block">{label}</span><span className="mt-1 block text-sm text-kooka-mist">{value}</span></span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <ContactForm />
        </div>
      </Section>
    </>
  );
}
