import { PrismaClient } from '@prisma/client';
import { productsList } from './productsList';

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

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
