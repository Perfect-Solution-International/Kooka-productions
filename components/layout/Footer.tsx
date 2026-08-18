import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { footerQuickLinks } from "@/data/navigation";
import type { HomeSolutionItem } from "@/services/home-solution.service";
import { contact, site, socials } from "@/data/site";
import { Wordmark } from "@/components/ui/Wordmark";
import { SocialIcon } from "@/components/ui/SocialIcon";

/**
 * The footer carries a curated subset of the solutions rather than the full
 * index — the complete list lives on /solutions and in the header dropdown.
 */
const footerServiceSlugs = [
  "event-production",
  "av-production",
  "led-screens",
  "sound-systems",
  "lighting-design",
  "stage-design",
];

export function Footer({ solutions }: { readonly solutions: readonly HomeSolutionItem[] }) {
  const year = new Date().getFullYear();
  const footerServices = footerServiceSlugs.flatMap(
    (slug) => solutions.find((service) => service.slug === slug) ?? [],
  );

  return (
    <footer className="relative isolate overflow-hidden border-t border-white/[0.07] bg-kooka-void">
      <div
        className="kooka-bloom -top-40 left-1/4 h-[20rem] w-[20rem] opacity-25"
        aria-hidden
      />

      <div className="kooka-container relative py-12 lg:py-14">
        {/*
          Stacked on a phone, then the two short link columns pair off before
          the full twelve-column rail takes over.
        */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-4">
            <Wordmark className="text-lg" />
            <p className="mt-4 text-center font-display text-sm tracking-[0.16em] text-kooka-amber uppercase sm:text-left">
              {site.tagline}
            </p>
            <p className="mt-3 max-w-sm text-center text-sm leading-relaxed text-kooka-mist sm:text-left">
              {site.seoLine}
            </p>

            <ul className="mt-6 flex justify-center gap-2.5 sm:justify-start">
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

          {/*
            Two columns from the smallest screen up so Explore and Solutions
            pair off immediately; `sm:contents` drops the wrapper once the
            outer grid takes over pairing them itself.
          */}
          <div className="grid grid-cols-2 gap-x-4 sm:contents">
            <nav aria-label="Quick links" className="lg:col-span-2">
              <h2 className="kooka-eyebrow mb-2 lg:mb-4">Explore</h2>
              <ul className="lg:space-y-2">
                {footerQuickLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="flex min-h-11 items-center text-sm text-kooka-mist transition-colors duration-300 hover:text-kooka-amber lg:min-h-0"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Services" className="lg:col-span-3">
              <h2 className="kooka-eyebrow mb-2 lg:mb-4">Solutions</h2>
              <ul className="lg:space-y-2">
                {footerServices.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/solutions/${service.slug}`}
                      className="flex min-h-11 items-center text-sm text-kooka-mist transition-colors duration-300 hover:text-kooka-amber lg:min-h-0"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/solutions"
                    className="flex min-h-11 items-center text-sm text-kooka-amber transition-colors duration-300 hover:text-kooka-flare lg:min-h-0"
                  >
                    All Solutions
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="sm:col-span-2 lg:col-span-3">
            <h2 className="kooka-eyebrow mb-2 text-center sm:text-left lg:mb-4">
              Contact
            </h2>
            <ul className="space-y-1 text-sm lg:space-y-3">
              <li>
                <a
                  href={contact.phoneHref}
                  className="group flex min-h-11 items-center gap-3 text-kooka-mist transition-colors duration-300 hover:text-kooka-white lg:min-h-0 lg:items-start"
                >
                  <Phone
                    className="h-4 w-4 shrink-0 text-kooka-amber lg:mt-0.5"
                    aria-hidden
                  />
                  {contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={contact.emailHref}
                  className="group flex min-h-11 items-center gap-3 break-all text-kooka-mist transition-colors duration-300 hover:text-kooka-white lg:min-h-0 lg:items-start"
                >
                  <Mail
                    className="h-4 w-4 shrink-0 text-kooka-amber lg:mt-0.5"
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

        <div className="mt-10 flex flex-col gap-3 border-t border-white/[0.07] pt-5 text-center text-xs text-kooka-muted sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:text-left">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p className="font-display tracking-[0.24em] uppercase">
            {site.domain}
          </p>
          <p className="flex items-center justify-center gap-2 sm:justify-end">
            <span className="font-display tracking-[0.18em] uppercase">
              Developed By
            </span>
            <Image
              src="/psi-logo.png"
              alt="PSI"
              width={1300}
              height={497}
              className="h-7 w-auto opacity-70 transition-opacity duration-500 hover:opacity-100"
            />
          </p>
        </div>
      </div>
    </footer>
  );
}
