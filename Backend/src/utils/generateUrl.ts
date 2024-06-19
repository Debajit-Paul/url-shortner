import { nanoid } from "nanoid";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { env } from "hono/adapter";

const generateNewUrl = async (c: any) => {
  const { DATABASE_URL } = env<{ DATABASE_URL: string }>(c);

  const prisma = new PrismaClient({
    datasourceUrl: DATABASE_URL,
  }).$extends(withAccelerate());

  const { url, customId } = await c.req.json();

  if (!url) {
    return c.json({ message: "url is needed" }, 400);
  }

  const userId = c.get("userId");
  const urlId = nanoid(8);

  // Temporary Urls
  if (!userId) {
    const urlExist = await prisma.tempUrl.findFirst({
      where: {
        redirectURL: url,
      },
    });

    if (urlExist) {
      return c.json({
        message: "url already exist",
        shortId: urlExist.shortId,
        redirectURL: url,
      });
    }
    console.log(urlId);
    const newUrl = await prisma.tempUrl.create({
      data: {
        shortId: urlId,
        redirectURL: url,
      },
    });
    return c.json({
      id: newUrl.id,
      shortId: newUrl.shortId,
      redirectURL: newUrl.redirectURL,
    });
  }
  // Users Personal Url
  else {
    const urlExist = await prisma.url.findFirst({
      where: {
        user: {
          id: userId,
        },
        redirectURL: url,
      },
    });

    if (urlExist) {
      return c.json({ message: "url already exist", url: urlExist.shortId });
    }

    if (customId) {
      const shortIdExist = await prisma.url.findFirst({
        where: {
          shortId: customId,
        },
      });

      if (shortIdExist) {
        return c.json({ message: "customId already exist" }, 400);
      }
    }

    const newUrl = await prisma.url.create({
      data: {
        shortId: customId ? customId : urlId,
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
