import { nanoid } from "nanoid";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { env } from "hono/adapter";

const generateNewUrl = async (c: any) => {
  const { url, customId } = await c.req.json();

  if (!url) {
    return c.json({ message: "url is needed" }, 400);
  }

  const { DATABASE_URL } = env<{ DATABASE_URL: string }>(c);

  const prisma = new PrismaClient({
    datasourceUrl: DATABASE_URL,
  }).$extends(withAccelerate());

  const urlExist = await prisma.url.findFirst({
    where: {
      redirectURL: url,
    },
  });

  if (urlExist) {
    return c.json({ message: "url already exist", id: urlExist.shortId });
  }

  const userId = c.get("userId");

  if (!customId) {
    const urlId = nanoid(8);
    const newUrl = await prisma.url.create({
      data: {
        shortId: urlId,
        redirectURL: url,
        ...(userId && { user: { connect: { id: userId } } }),
      },
    });
    return c.json({
      id: newUrl.id,
      url: newUrl.shortId,
    });
  } else {
    const shortIdExist = await prisma.url.findFirst({
      where: {
        shortId: customId,
      },
    });

    if (shortIdExist) {
      return c.json({ message: "customId already exist" }, 400);
    }

    const newUrl = await prisma.url.create({
      data: {
        shortId: customId,
        redirectURL: url,
        ...(userId && { user: { connect: { id: userId } } }),
      },
    });
    return c.json({
      id: newUrl.id,
      url: newUrl.shortId,
    });
  }
};

export { generateNewUrl };
