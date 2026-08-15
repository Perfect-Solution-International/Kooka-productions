import Image from "next/image";
import { ArrowUpRight, Mail } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { contact } from "@/data/site";
import { img, media } from "@/data/media";

type CtaSectionProps = {
  readonly title?: string;
  readonly description?: string;
  readonly eyebrow?: string;
  /** Forwarded to `Section`, so the home page can run the tighter rhythm. */
  readonly density?: "default" | "tight";
};

export function CtaSection({
  eyebrow = "Next Step",
  title = "Let's Bring Your Event to Life",
  description = "Speak with our team to plan and deliver your next event with confidence.",
  density = "default",
}: CtaSectionProps) {
  return (
    <Section
      id="get-a-quote"
      density={density}
      className="border-t border-white/[0.06]"
      containerClassName="relative"
    >
      <Reveal>
        <div className="relative isolate overflow-hidden rounded-3xl border border-white/[0.08]">
          <Image
            src={img(media.crowdHands, 1800, 78)}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-linear-to-r from-kooka-void via-kooka-void/85 to-kooka-void/50"
          />
          <div
            aria-hidden
            className="kooka-bloom -top-16 right-0 h-[16rem] w-[16rem] animate-glow-pulse sm:-top-24 sm:h-[28rem] sm:w-[28rem]"
          />

          <RevealGroup className="relative px-5 py-12 sm:px-14 sm:py-20 lg:px-20 lg:py-24">
            <RevealItem as="p" className="kooka-eyebrow mb-6">
              {eyebrow}
            </RevealItem>
            <RevealItem
              as="h2"
              className="kooka-display max-w-3xl text-[clamp(1.875rem,7vw,3.75rem)]"
            >
              {title}
            </RevealItem>
            <RevealItem
              as="p"
              className="mt-6 max-w-xl text-base leading-relaxed text-kooka-mist sm:text-lg"
            >
              {description}
            </RevealItem>

            <RevealItem className="mt-9 flex flex-col items-stretch gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-4">
              <ButtonLink
                href={contact.quoteHref}
                size="lg"
                className="w-full sm:w-auto"
              >
                <Mail className="h-4 w-4" aria-hidden />
                Get a Quote
              </ButtonLink>
              <ButtonLink
                href={contact.contactHref}
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto"
              >
                Contact Us
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                  aria-hidden
                />
              </ButtonLink>
            </RevealItem>
          </RevealGroup>
        </div>
      </Reveal>
    </Section>
  );
}
