import { Hono } from "hono";
import { cors } from "hono/cors";
import { url } from "./routers/url";

const app = new Hono();

app.use(cors());

app.route("/url", url);

export default app;
