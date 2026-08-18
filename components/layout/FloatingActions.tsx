"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import { usePathname } from "next/navigation";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { contact, socials } from "@/data/site";

const floatingSocials = socials.filter(
  (social) => social.label === "Instagram" || social.label === "Facebook",
);

function WhatsAppIcon({ className }: { readonly className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12.04 2a9.84 9.84 0 0 0-8.5 14.78L2 22l5.36-1.4A9.99 9.99 0 1 0 12.04 2Zm0 17.98a8.05 8.05 0 0 1-4.1-1.12l-.3-.18-3.18.83.85-3.09-.2-.32a8.02 8.02 0 1 1 6.93 3.88Zm4.4-6.03c-.24-.12-1.43-.7-1.65-.79-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2a7.25 7.25 0 0 1-1.34-1.67c-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.5.58.18 1.1.16 1.51.1.46-.07 1.43-.59 1.63-1.15.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
    </svg>
  );
}

export function FloatingActions() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  const actionClass =
    "group inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-kooka-black/70 text-kooka-white shadow-lg backdrop-blur-xl transition-all duration-300 hover:border-kooka-amber hover:bg-kooka-amber hover:text-kooka-black sm:h-11 sm:w-11";

  return (
    <>
      <aside
        aria-label="Social and enquiry links"
        className="fixed top-1/2 right-2 z-40 flex -translate-y-1/2 flex-col gap-2 rounded-full border border-white/[0.08] bg-kooka-black/35 p-1.5 backdrop-blur-xl sm:right-4 sm:gap-2.5 sm:p-2 lg:right-6"
      >
        {floatingSocials.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={social.label}
            className={actionClass}
          >
            <SocialIcon name={social.icon} className="h-4 w-4" />
          </a>
        ))}
        <Link href={contact.quoteHref} aria-label="Get a Quote" className={actionClass}>
          <Mail className="h-4 w-4" aria-hidden />
        </Link>
      </aside>

      <a
        href={contact.whatsappHref}
        target="_blank"
        rel="noreferrer noopener"
        aria-label="Chat with Kooka Productions on WhatsApp"
        className="fixed right-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_14px_40px_-10px_rgba(37,211,102,0.75)] transition-transform duration-300 hover:scale-105 sm:right-5 sm:bottom-5 sm:h-14 sm:w-14 lg:right-7 lg:bottom-7"
      >
        <WhatsAppIcon className="h-6 w-6 sm:h-7 sm:w-7" />
      </a>
    </>
  );
}
