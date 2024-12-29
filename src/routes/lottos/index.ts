import { Elysia, t } from "elysia";
import {
  createLotto,
  deleteLotto,
  getLottoById,
  getLottos,
  updateLotto,
} from "./handlers";

const lottoRoutes = new Elysia({ prefix: "/api/lottos" })
  .get("/", () => getLottos())
  .post("/", ({ body }) => createLotto(body), {
    body: t.Object({ title: t.String(), content: t.String() }),
  })
  .get("/:id", ({ params: { id } }) => getLottoById(id), {
    params: t.Object({ id: t.Numeric() }),
  })
  .patch("/:id", ({ params: { id }, body }) => updateLotto(Number(id), body), {
    params: t.Object({ id: t.Numeric() }),
    body: t.Object({
      title: t.Optional(t.String()),
      content: t.Optional(t.String()),
    }),
  })
  .delete("/:id", ({ params: { id } }) => deleteLotto(id), {
    params: t.Object({ id: t.Numeric() }),
  });

export default lottoRoutes;
