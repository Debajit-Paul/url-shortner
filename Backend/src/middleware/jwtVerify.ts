import { verify } from "hono/jwt";
import { env } from "hono/adapter";

const jwtVerify = async (c: any, next: any) => {
  const authHeader: string | undefined = c.req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return c.json({ message: "Authorization Header Missing/Invalid" }, 400);
  }
  const token = authHeader?.split(" ")[1];
  try {
    const { JWT_SECRET } = env<{ JWT_SECRET: string }>(c);
    const response = await verify(token as string, JWT_SECRET);
    console.log(response.id);
    c.set("userId", response.id);
    await next();
  } catch (err) {
    return c.json({ message: `Authorization Header Invalid => ${err}` }, 400);
  }
};

export { jwtVerify };
