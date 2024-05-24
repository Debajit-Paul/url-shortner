import { Hono } from "hono";
import { env } from "hono/adapter";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { signInSchema, signUpSchema, urlSchema } from "../utils/zod";
import { zValidator } from "@hono/zod-validator";
import { redirect } from "../middleware/redirect";
import { jwtVerify } from "../middleware/jwtVerify";
import { logger } from "hono/logger";
import { generateNewUrl } from "../utils/generateUrl";

type Variables = {
  userId: number;
};

const user = new Hono<{ Variables: Variables }>();

user.use(logger());

user.use("/me/*", async (c, next) => redirect(c, next));

user.post("/me/signup", zValidator("json", signUpSchema), async (c) => {
  const { username, email, password } = await c.req.json();
  const { DATABASE_URL } = env<{ DATABASE_URL: string }>(c);

  const prisma = new PrismaClient({
    datasourceUrl: DATABASE_URL,
  }).$extends(withAccelerate());

  const userExist = await prisma.users.findFirst({
    where: {
      email: email,
    },
  });

  if (userExist) {
    return c.json({ message: "user Already Exists" }, 400);
  }

  await prisma.users.create({
    data: {
      email,
      password,
      username,
    },
  });

  return c.json({ message: "User Created" });
});

user.post("/me/signin", zValidator("json", signInSchema), async (c) => {
  const { email, password } = await c.req.json();

  const { DATABASE_URL } = env<{ DATABASE_URL: string }>(c);

  const prisma = new PrismaClient({
    datasourceUrl: DATABASE_URL,
  }).$extends(withAccelerate());

  const user = await prisma.users.findFirst({
    where: {
      email: email,
      password: password,
    },
  });

  if (!user) {
    return c.json({ message: "invalid credentials" }, 400);
  }

  const payload = {
    id: user.id,
    email,
    username: user.username,
  };
  const { JWT_SECRET } = env<{ JWT_SECRET: string }>(c);
  const token = await sign(payload, JWT_SECRET);
  return c.json({
    payload,
    token,
  });
});

user.use(async (c, next) => jwtVerify(c, next));
user.get("/", async (c) => {
  const userId = c.get("userId");
  const { DATABASE_URL } = env<{ DATABASE_URL: string }>(c);
  const prisma = new PrismaClient({
    datasourceUrl: DATABASE_URL,
  }).$extends(withAccelerate());

  const user = await prisma.users.findFirst({
    where: {
      id: userId,
    },
    include: {
      url: {
        include: {
          clickHistory: {},
        },
      },
    },
  });

  return c.json({
    user: {
      id: user?.id,
      username: user?.username,
      email: user?.email,
      url: user?.url,
    },
  });
});

user.post("/", zValidator("json", urlSchema), generateNewUrl);

export { user };
