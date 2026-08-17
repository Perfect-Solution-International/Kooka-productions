import "dotenv/config";
import { hash } from "bcryptjs";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../lib/generated/prisma/client";
import showreelItems from "./seed-data/showreel.json";

/*
 * Idempotent: rows are upserted on their natural key, so re-running the seed
 * refreshes the shipped projects without duplicating them or changing the ids
 * that admin bookmarks point at.
 */

const BCRYPT_ROUNDS = 12;

type ShowreelSeed = {
  slug: string;
  title: string;
  type: string;
  location: string;
  year: string;
  blurb: string;
  image: string;
  gallery?: string[];
  href?: string;
};

async function seedShowreel(prisma: PrismaClient): Promise<void> {
  for (const [index, item] of (showreelItems as ShowreelSeed[]).entries()) {
    const row = {
      title: item.title,
      type: item.type,
      location: item.location,
      year: item.year,
      blurb: item.blurb,
      image: item.image,
      href: item.href ?? null,
      sortOrder: index,
    };

    const showreel = await prisma.showreel.upsert({
      where: { slug: item.slug },
      create: { slug: item.slug, ...row },
      update: row,
    });

    /*
     * Gallery rows are positional and carry no natural key, so they are
     * rebuilt wholesale rather than diffed.
     */
    await prisma.showreelImage.deleteMany({ where: { showreelId: showreel.id } });
    const gallery = item.gallery ?? [];
    if (gallery.length > 0) {
      await prisma.showreelImage.createMany({
        data: gallery.map((url, position) => ({
          showreelId: showreel.id,
          url,
          sortOrder: position,
        })),
      });
    }
  }
}

async function seedAdminUser(prisma: PrismaClient): Promise<void> {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) {
    throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD must be set to seed the first admin");
  }

  const passwordHash = await hash(password, BCRYPT_ROUNDS);
  await prisma.user.upsert({
    where: { email },
    create: { email, passwordHash },
    update: { passwordHash },
  });
}

async function main(): Promise<void> {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }

  const prisma = new PrismaClient({
    adapter: new PrismaMariaDb(connectionString),
  });

  try {
    await seedShowreel(prisma);
    await seedAdminUser(prisma);
    console.info("Seed complete.");
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
