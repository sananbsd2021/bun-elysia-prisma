import { Elysia, t } from "elysia";
import {
  createContact,
  deleteContact,
  getContactById,
  getContacts,
  updateContact,
} from "./handlers";

const contactRoutes = new Elysia({ prefix: "/api/contacts" })
  .get("/", () => getContacts())
  .post("/", ({ body }) => createContact(body), {
    body: t.Object({ 
      content: t.String(),
      subject: t.String(),
      name: t.String(),
      email: t.String(),
      phone: t.String(), 
    }),
  })
  .get("/:id", ({ params: { id } }) => getContactById(id), {
    params: t.Object({ id: t.Numeric() }),
  })
  .patch("/:id", ({ params: { id }, body }) => updateContact(Number(id), body), {
    params: t.Object({ id: t.Numeric() }),
    body: t.Object({
      content: t.Optional(t.String()),
      subject: t.String(),
      name: t.String(),
      email: t.String(),
      phone: t.String(),
    }),
  })
  .delete("/:id", ({ params: { id } }) => deleteContact(id), {
    params: t.Object({ id: t.Numeric() }),
  });

export default contactRoutes;
