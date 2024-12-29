import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import todoRoutes from "./routes/todos";
import postRoutes from "./routes/posts";
import contactRoutes from "./routes/contact";

const App = new Elysia();
App.use(swagger());

App
  .group("/api", (app) => app.use(todoRoutes))
  .use(postRoutes)
  .use(contactRoutes)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${App.server?.hostname}:${App.server?.port}`
);
