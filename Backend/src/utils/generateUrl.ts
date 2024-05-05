import { nanoid } from "nanoid";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { env } from "hono/adapter";
import { z } from "zod";

const urlSchema = z.object({
  url: z.string().url(),
});

const generateNewUrl = async (c: any) => {
  const urlId = nanoid(8);
  const body = await c.req.json();
  const { success } = urlSchema.safeParse(body);
  if (!success) {
    return c.json(
      {
        message: "Incorrect inputs",
      },
      400
    );
  }

  const { DATABASE_URL } = env<{ DATABASE_URL: string }>(c);

  const prisma = new PrismaClient({
    datasourceUrl: DATABASE_URL,
  }).$extends(withAccelerate());

  if (!body.url) {
    return c.json({ message: "url is needed" }, 400);
  }

  const urlExist = await prisma.url.findFirst({
    where: {
      redirectURL: body.url,
    },
  });

  if (urlExist) {
    return c.json({ message: "url already exist", id: urlExist.shortId });
  }

  await prisma.url.create({
    data: {
      shortId: urlId,
      redirectURL: body.url,
    },
  });

  return c.json({
    id: urlId,
  });
};

export { generateNewUrl };
