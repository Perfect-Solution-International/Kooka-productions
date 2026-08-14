import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { footerQuickLinks } from "@/data/navigation";
import { services } from "@/data/services";
import { contact, site, socials } from "@/data/site";
import { Wordmark } from "@/components/ui/Wordmark";
import { SocialIcon } from "@/components/ui/SocialIcon";

/**
 * The footer carries a curated subset of the solutions rather than the full
 * index — the complete list lives on /services and in the header dropdown.
 */
const footerServiceSlugs = [
  "event-production",
  "av-production",
  "led-screens",
  "sound-systems",
  "lighting-design",
  "stage-design",
];

const footerServices = footerServiceSlugs.flatMap(
  (slug) => services.find((service) => service.slug === slug) ?? [],
);

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative isolate overflow-hidden border-t border-white/[0.07] bg-kooka-void">
      <div
        className="kooka-bloom -top-40 left-1/4 h-[20rem] w-[20rem] opacity-25"
        aria-hidden
      />

      <div className="kooka-container relative py-12 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Wordmark className="text-lg" />
            <p className="mt-4 font-display text-sm tracking-[0.16em] text-kooka-amber uppercase">
              {site.tagline}
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-kooka-mist">
              {site.seoLine}
            </p>

            <ul className="mt-6 flex gap-2.5">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={social.label}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-kooka-mist transition-all duration-500 hover:border-kooka-amber/60 hover:bg-kooka-amber/10 hover:text-kooka-amber"
                  >
                    <SocialIcon name={social.icon} className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Quick links" className="lg:col-span-2">
            <h2 className="kooka-eyebrow mb-4">Explore</h2>
            <ul className="space-y-2">
              {footerQuickLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-kooka-mist transition-colors duration-300 hover:text-kooka-amber"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Services" className="lg:col-span-3">
            <h2 className="kooka-eyebrow mb-4">Solutions</h2>
            <ul className="space-y-2">
              {footerServices.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services#${service.slug}`}
                    className="text-sm text-kooka-mist transition-colors duration-300 hover:text-kooka-amber"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/services"
                  className="text-sm text-kooka-amber transition-colors duration-300 hover:text-kooka-flare"
                >
                  All Solutions
                </Link>
              </li>
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="kooka-eyebrow mb-4">Contact</h2>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={contact.phoneHref}
                  className="group flex items-start gap-3 text-kooka-mist transition-colors duration-300 hover:text-kooka-white"
                >
                  <Phone
                    className="mt-0.5 h-4 w-4 shrink-0 text-kooka-amber"
                    aria-hidden
                  />
                  {contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={contact.emailHref}
                  className="group flex items-start gap-3 break-all text-kooka-mist transition-colors duration-300 hover:text-kooka-white"
                >
                  <Mail
                    className="mt-0.5 h-4 w-4 shrink-0 text-kooka-amber"
                    aria-hidden
                  />
                  {contact.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-kooka-mist">
                <MapPin
                  className="mt-0.5 h-4 w-4 shrink-0 text-kooka-amber"
                  aria-hidden
                />
                {contact.address}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/[0.07] pt-5 text-xs text-kooka-muted sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p className="font-display tracking-[0.24em] uppercase">
            {site.domain}
          </p>
        </div>
      </div>
    </footer>
  );
}
