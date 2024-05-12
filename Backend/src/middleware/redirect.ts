import { verify } from "hono/jwt";
import { env } from "hono/adapter";

const redirect = async (c: any, next: any) => {
  const authHeader: string | undefined = c.req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    await next();
    return;
  }
  const token = authHeader?.split(" ")[1];
  try {
    const { JWT_SECRET } = env<{ JWT_SECRET: string }>(c);
    await verify(token as string, JWT_SECRET);
    return c.redirect("https://biturl-to.netlify.app/dashboard");
  } catch (err) {
    await next();
  }
};

export { redirect };
