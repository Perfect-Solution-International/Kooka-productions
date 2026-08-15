import { Mail, Phone } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { contact, site } from "@/data/site";

const channels = [
  { icon: Phone, label: contact.phone, href: contact.phoneHref },
  { icon: Mail, label: contact.email, href: contact.emailHref },
];

export function ContactStrip() {
  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden border-y border-white/[0.07] bg-kooka-carbon"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-r from-kooka-amber/[0.06] via-transparent to-kooka-ember/[0.06]"
      />

      <div className="kooka-container relative py-14 lg:py-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          {/* Phones read the block as centred type; the rail returns at md. */}
          <Reveal className="mx-auto max-w-xl text-center md:mx-0 md:text-left">
            <p className="kooka-eyebrow mb-4">Kooka HQ</p>
            <p className="kooka-display text-2xl sm:text-3xl lg:text-4xl">
              {site.locationBanner}
            </p>
          </Reveal>

          <RevealGroup as="ul" className="grid gap-5 sm:grid-cols-2 lg:gap-8">
            {channels.map(({ icon: ChannelIcon, label, href }) => (
              <RevealItem as="li" key={label} className="group">
                <a href={href} className="flex min-h-11 items-center gap-3">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-kooka-amber/30 bg-kooka-amber/10 text-kooka-amber">
                    <ChannelIcon className="h-4 w-4" aria-hidden />
                  </span>
                  <span className="text-sm leading-snug text-kooka-mist transition-colors duration-300 group-hover:text-kooka-white">
                    {label}
                  </span>
                </a>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
