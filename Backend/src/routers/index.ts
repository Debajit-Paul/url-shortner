import { Hono } from "hono";
import { url } from "./url";
import { user } from "./user";
const mainRouter = new Hono();

mainRouter.route("/url", url);
mainRouter.route("/user", user);

export { mainRouter };
