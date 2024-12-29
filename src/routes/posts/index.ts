import { Elysia, t } from "elysia";
import {
  createPost,
  deletePost,
  getPostById,
  getPosts,
  updatePost,
} from "./handlers";

const postRoutes = new Elysia({ prefix: "/api/posts" })
  .get("/", () => getPosts())
  .post("/", ({ body }) => createPost(body), {
    body: t.Object({ title: t.String(), content: t.String() }),
  })
  .get("/:id", ({ params: { id } }) => getPostById(id), {
    params: t.Object({ id: t.Numeric() }),
  })
  .patch("/:id", ({ params: { id }, body }) => updatePost(Number(id), body), {
    params: t.Object({ id: t.Numeric() }),
    body: t.Object({
      title: t.Optional(t.String()),
      content: t.Optional(t.String()),
    }),
  })
  .delete("/:id", ({ params: { id } }) => deletePost(id), {
    params: t.Object({ id: t.Numeric() }),
  });

export default postRoutes;
