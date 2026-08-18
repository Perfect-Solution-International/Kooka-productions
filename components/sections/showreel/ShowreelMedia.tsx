import Image from "next/image";
import type { ShowreelGalleryImage } from "@/services/showreel.service";
import { img, isRemoteImage } from "@/data/media";

type ShowreelMediaProps = {
  readonly title: string;
  readonly cover: string;
  readonly gallery: readonly ShowreelGalleryImage[];
};

export function ShowreelMedia({ title, cover, gallery }: ShowreelMediaProps) {
  const images = gallery.length > 0
    ? gallery
    : [{ id: "cover", url: cover, alt: title }];

  return (
    <div className="grid gap-4 md:grid-cols-12 md:gap-5">
      {images.map((image, index) => {
        const remote = isRemoteImage(image.url);
        const feature = index % 3 === 0;

        return (
          <figure
            key={image.id}
            className={`group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-kooka-carbon md:rounded-3xl ${
              feature
                ? "aspect-16/10 md:col-span-8 md:row-span-2 md:aspect-auto md:min-h-[34rem]"
                : "aspect-4/3 md:col-span-4 md:min-h-[16.5rem]"
            }`}
          >
            <Image
              src={remote ? img(image.url, feature ? 1800 : 900, 82) : image.url}
              alt={image.alt ?? `${title} — gallery image ${index + 1}`}
              fill
              unoptimized={!remote}
              sizes={feature ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 768px) 34vw, 100vw"}
              className="object-cover transition-transform duration-[1400ms] ease-kooka group-hover:scale-[1.025]"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-linear-to-t from-kooka-black/30 via-transparent to-transparent"
            />
            <figcaption className="sr-only">
              {image.alt ?? `${title} gallery image ${index + 1}`}
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}
