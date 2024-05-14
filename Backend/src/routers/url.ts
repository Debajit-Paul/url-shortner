import { Hono } from "hono";
import { generateNewUrl } from "../utils/generateUrl";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { env } from "hono/adapter";
import { urlSchema } from "../utils/zod";
import { zValidator } from "@hono/zod-validator";

const url = new Hono();

url.post("/", zValidator("json", urlSchema), generateNewUrl);

url.get("/:urlId", async (c) => {
  const urlId = c.req.param("urlId");

  const { DATABASE_URL } = env<{ DATABASE_URL: string }>(c);

  const prisma = new PrismaClient({
    datasourceUrl: DATABASE_URL,
  }).$extends(withAccelerate());

  const url = await prisma.url.findFirst({
    where: {
      shortId: urlId,
    },
  });

  if (!url?.redirectURL) {
    return c.json({ message: "invalid url" }, 400);
  }

  await prisma.clickHistory.create({
    data: {
      clickTime: new Date(),
      url: {
        connect: {
          id: url.id,
        },
      },
    },
  });

  console.log("clicked");

  return c.redirect(`${url?.redirectURL}`);
});

export { url };
