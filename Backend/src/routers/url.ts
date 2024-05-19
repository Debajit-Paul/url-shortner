import { Hono } from "hono";
import { generateNewUrl } from "../utils/generateUrl";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { env } from "hono/adapter";
import { urlSchema } from "../utils/zod";
import { zValidator } from "@hono/zod-validator";

const url = new Hono();

url.post("/", zValidator("json", urlSchema), generateNewUrl);

url.get("/cleanuptemp", async (c) => {
  const { DATABASE_URL } = env<{ DATABASE_URL: string }>(c);

  const prisma = new PrismaClient({
    datasourceUrl: DATABASE_URL,
  }).$extends(withAccelerate());

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  try {
    await prisma.tempUrl.deleteMany({
      where: {
        createdAt: {
          lt: thirtyDaysAgo,
        },
      },
    });
    return c.json({ message: "Cleanup successfull" });
  } catch (error) {
    return c.json({ message: "Error during cleanup" }, 500);
  }
});

url.get("/:urlId", async (c) => {
  console.log(c.req.param("urlId"));
  const urlId = c.req.param("urlId");
  console.log("urlId => " + urlId);

  const { DATABASE_URL } = env<{ DATABASE_URL: string }>(c);

  const prisma = new PrismaClient({
    datasourceUrl: DATABASE_URL,
  }).$extends(withAccelerate());

  const Result = await Promise.all([
    prisma.url.findUnique({
      where: { shortId: urlId },
    }),
    prisma.tempUrl.findUnique({
      where: { shortId: urlId },
    }),
  ]);

  if (Result[0]) {
    console.log("start0");
    await prisma.clickHistory.create({
      data: {
        clickTime: new Date(),
        url: {
          connect: {
            id: Result[0].id,
          },
        },
      },
    });
    console.log("end0");
    return c.redirect(`${Result[0]?.redirectURL}`);
  }
  if (Result[1]) {
    console.log("start");
    await prisma.tempClickHistory.create({
      data: {
        clickTime: new Date(),
        url: {
          connect: {
            id: Result[1].id,
          },
        },
      },
    });
    console.log("end");
    return c.redirect(`${Result[1]?.redirectURL}`);
  }

  return c.json({ message: "invalid url" }, 400);
});

export { url };
