import Image from "next/image";
import { ArrowUpRight, Mail } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { contact } from "@/data/site";
import { img, media } from "@/data/media";

type CtaSectionProps = {
  title?: string;
  description?: string;
  eyebrow?: string;
};

export function CtaSection({
  eyebrow = "Next Step",
  title = "Let's Bring Your Event to Life",
  description = "Send us the date, the venue and the ambition. We will come back with a plan, a plot and an honest number.",
}: CtaSectionProps) {
  return (
    <Section
      id="get-a-quote"
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
            className="kooka-bloom -top-24 right-0 h-[28rem] w-[28rem] animate-glow-pulse"
          />

          <RevealGroup className="relative px-7 py-16 sm:px-14 sm:py-20 lg:px-20 lg:py-24">
            <RevealItem as="p" className="kooka-eyebrow mb-6">
              {eyebrow}
            </RevealItem>
            <RevealItem
              as="h2"
              className="kooka-display max-w-3xl text-4xl sm:text-5xl lg:text-6xl"
            >
              {title}
            </RevealItem>
            <RevealItem
              as="p"
              className="mt-6 max-w-xl text-base leading-relaxed text-kooka-mist sm:text-lg"
            >
              {description}
            </RevealItem>

            <RevealItem className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <ButtonLink href={contact.quoteHref} size="lg">
                <Mail className="h-4 w-4" aria-hidden />
                Get a Quote
              </ButtonLink>
              <ButtonLink href={contact.contactHref} variant="secondary" size="lg">
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
