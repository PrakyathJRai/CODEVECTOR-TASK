const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");

const prisma = new PrismaClient();

const categories = [
  "Electronics",
  "Fashion",
  "Books",
  "Sports",
  "Home",
  "Beauty"
];

async function main() {
  const TOTAL = 200000;
  const BATCH_SIZE = 5000;

  console.log("Starting seed...");

  for (let i = 0; i < TOTAL; i += BATCH_SIZE) {
    const products = [];

    for (let j = 0; j < BATCH_SIZE; j++) {
      products.push({
        name: faker.commerce.productName(),
        category:
          categories[Math.floor(Math.random() * categories.length)],
        price: Number(faker.commerce.price()),
        created_at: faker.date.recent({ days: 365 }),
        updated_at: faker.date.recent({ days: 30 }),
      });
    }

    await prisma.product.createMany({
      data: products,
    });

    console.log(
      `Inserted ${Math.min(i + BATCH_SIZE, TOTAL)} / ${TOTAL}`
    );
  }

  console.log("Finished seeding!");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });