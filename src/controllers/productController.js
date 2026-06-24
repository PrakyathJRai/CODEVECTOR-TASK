const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.getProducts = async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 20, 100);

    const { category, cursorCreatedAt, cursorId } = req.query;

    const where = {};

    if (category) {
      where.category = category;
    }

    if (cursorCreatedAt && cursorId) {
      where.AND = [
        ...(where.category ? [{ category }] : []),
        {
          OR: [
            {
              created_at: {
                lt: new Date(cursorCreatedAt),
              },
            },
            {
              created_at: new Date(cursorCreatedAt),
              id: {
                lt: cursorId,
              },
            },
          ],
        },
      ];
    }

    const products = await prisma.product.findMany({
      where,
      orderBy: [
        { created_at: "desc" },
        { id: "desc" },
      ],
      take: limit,
    });

    const nextCursor =
      products.length > 0
        ? {
            created_at: products[products.length - 1].created_at,
            id: products[products.length - 1].id,
          }
        : null;

    return res.json({
      count: products.length,
      nextCursor,
      products,
    });
  } catch (error) {
    console.error("Get Products Error:", error);

    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};