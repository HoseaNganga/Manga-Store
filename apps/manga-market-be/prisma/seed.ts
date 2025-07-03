import { PrismaClient } from '@prisma/client';
import { productsList } from './productsList';
import { heroUrls } from './heroList';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // Check existing products
  const existingProducts = await prisma.product.findMany({
    select: { stripePriceId: true },
  });
  const existingPriceIds = new Set(
    existingProducts.map((p) => p.stripePriceId)
  );

  console.log({ existingProducts });

  console.log({ productsList });

  // Create only products that don't exist
  for (const product of productsList) {
    const { ...productData } = product;
    if (!existingPriceIds.has(productData.stripePriceId)) {
      await prisma.product.create({
        data: {
          title: productData.title,
          author: productData.author,
          genre: productData.genre,
          description: productData.description,
          price: productData.price,
          stock: productData.stock,
          coverUrl: productData.coverUrl,
          images: productData.images,
          rating: productData.rating,
          stripePriceId: productData.stripePriceId,
          featured: productData.featured,
          releaseDate: productData.releaseDate,
        },
      });
      console.log(`Created product: ${productData.title}`);
    } else {
      console.log(`Skipping existing product: ${productData.title}`);
    }
  }
  console.log('Product seeding finished.');
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
console.log('Seeding finished.');

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
