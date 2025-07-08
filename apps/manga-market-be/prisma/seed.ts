import { PrismaClient } from '@prisma/client';
import { productsList } from './productsList';
import { heroUrls } from './heroList';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // --- Step 1: Seed Genres First
  const allGenreNames = new Set<string>();
  productsList.forEach((product) => {
    if (Array.isArray(product.genre)) {
      product.genre.forEach((gName) => allGenreNames.add(gName));
    }
  });

  const genreIdMap = new Map<string, { id: string }>();

  console.log('Seeding genres...');
  for (const genreName of Array.from(allGenreNames)) {
    const genre = await prisma.genre.upsert({
      where: { name: genreName },
      update: {},
      create: { name: genreName },
    });
    genreIdMap.set(genre.name, { id: genre.id });
    console.log(`Created/Upserted Genre: ${genre.name}`);
  }
  console.log('Genre seeding finished.');

  // --- Step 2: Seed Products (using upsert to handle existing and connect genres) ---
  console.log('Seeding products (upserting existing and creating new)...');

  for (const product of productsList) {
    const { genre: sourceGenres, ...productDataWithoutGenre } = product;

    // Prepare the 'connect' data for the many-to-many relationship
    const genresToConnect = sourceGenres
      .map((gName) => {
        const genreIdRef = genreIdMap.get(gName);
        if (!genreIdRef) {
          console.warn(
            `Warning: Genre '${gName}' not found for product '${product.title}'. Skipping connection.`
          );
          return null; // Skip this genre if not found
        }
        return { id: genreIdRef.id };
      })
      .filter(Boolean) as { id: string }[]; // Filter out any nulls and assert type

    // Use upsert to either create a new product or update an existing one
    const createdOrUpdatedProduct = await prisma.product.upsert({
      where: {
        stripePriceId: productDataWithoutGenre.stripePriceId, // Use a unique identifier to find existing products
      },
      update: {
        // Update product's scalar fields (title, author, price, etc.)
        title: productDataWithoutGenre.title,
        author: productDataWithoutGenre.author,
        description: productDataWithoutGenre.description,
        price: productDataWithoutGenre.price,
        stock: productDataWithoutGenre.stock,
        coverUrl: productDataWithoutGenre.coverUrl,
        images: productDataWithoutGenre.images,
        rating: productDataWithoutGenre.rating,
        featured: productDataWithoutGenre.featured,
        releaseDate: productDataWithoutGenre.releaseDate,
        // Update the genres relationship
        genres: {
          set: genresToConnect, // IMPORTANT: 'set' synchronizes the relationships
          // It will disconnect old ones not in `genresToConnect`
          // and connect new ones that are.
        },
      },
      create: {
        // Create new product's scalar fields
        ...productDataWithoutGenre,
        // Connect genres for the newly created product
        genres: {
          connect: genresToConnect,
        },
      },
    });
    console.log(`Upserted product: ${createdOrUpdatedProduct.title}`);
  }
  console.log('Product seeding finished.');

  // --- Step 3: Seed Hero URLs (unchanged) ---
  console.log('Seeding hero URLs...');
  for (const url of heroUrls) {
    const existingHeroUrl = await prisma.heroUrl.findUnique({
      where: { url: url },
    });

    if (!existingHeroUrl) {
      await prisma.heroUrl.create({
        data: {
          url: url,
        },
      });
      console.log(`Created hero URL: ${url}`);
    } else {
      console.log(`Skipping existing hero URL: ${url}`);
    }
  }
  console.log('Hero URL seeding finished.');
}

console.log('Seeding process initiated.');
main()
  .catch((e) => {
    console.error('Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('Prisma client disconnected.');
  });
