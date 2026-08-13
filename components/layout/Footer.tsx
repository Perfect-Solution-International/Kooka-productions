import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { footerQuickLinks } from "@/data/navigation";
import { services } from "@/data/services";
import { contact, site, socials } from "@/data/site";
import { Wordmark } from "@/components/ui/Wordmark";
import { SocialIcon } from "@/components/ui/SocialIcon";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative isolate overflow-hidden border-t border-white/[0.07] bg-kooka-void">
      <div
        className="kooka-bloom -top-52 left-1/4 h-[26rem] w-[26rem] opacity-25"
        aria-hidden
      />

      <div className="kooka-container relative py-20 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Wordmark className="text-lg" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-kooka-mist">
              {site.seoLine}. {site.description}
            </p>

            <ul className="mt-8 flex gap-3">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={social.label}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-kooka-mist transition-all duration-500 hover:border-kooka-amber/60 hover:bg-kooka-amber/10 hover:text-kooka-amber"
                  >
                    <SocialIcon name={social.icon} className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Quick links" className="lg:col-span-2">
            <h2 className="kooka-eyebrow mb-6">Explore</h2>
            <ul className="space-y-3">
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
            <h2 className="kooka-eyebrow mb-6">Solutions</h2>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services#${service.slug}`}
                    className="text-sm text-kooka-mist transition-colors duration-300 hover:text-kooka-amber"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="kooka-eyebrow mb-6">Contact</h2>
            <ul className="space-y-4 text-sm">
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

        <div className="mt-16 flex flex-col gap-4 border-t border-white/[0.07] pt-8 text-xs text-kooka-muted sm:flex-row sm:items-center sm:justify-between">
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
