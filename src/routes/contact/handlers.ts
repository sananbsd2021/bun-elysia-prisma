import { NotFoundError } from "elysia";
import prisma from "../../db";

export async function getContacts() {
  try {
    return await prisma.contact.findMany({ orderBy: { createdAt: "asc" } });
  } catch (error) {
    console.error("Error getting Contacts ", error);
  }
}

export async function createContact(data: { 
  subject: string;
  content: string;
  name: string;
  email: string;
  phone: string; 
  }) {
  try {
    const {  subject ,content, name,email,phone } = data;
    const contact = await prisma.contact.create({
      data: { content, subject, name, email, phone },
    });
    if (!contact) {
      throw new NotFoundError("Contact not found");
    }
    return contact;
  } catch (error) {
    console.error("Error Creating Contact", error);
  }
}

export async function getContactById(id: number) {
  try {
    const contact = await prisma.contact.findUnique({ where: { id } });
    if (!contact) {
      throw new NotFoundError("Post not found");
    }
    return contact;
  } catch (error) {
    console.error("Error getting Post with id ", id, error);
  }
}

export async function updateContact(
  id: number,
  data: { content?: string; subject: string; name: string; email: string; phone: string;  completed?: boolean }
) {
  try {
    const { content, subject, name, email, phone, completed } = data;
    const contact = await prisma.contact.update({
      where: { id },
      data: {
        ...(content && { content }),
        ...(subject && { subject }),
        ...(name && { name }),
        ...(email && { email }),
        ...(phone && { phone }),
        ...(completed !== undefined && completed !== null && { completed }),
      },
    });
    if (!contact) {
      throw new NotFoundError("Contact not found");
    }
    return contact;
  } catch (error) {
    console.error("Error updating Contact with id ", id, error);
  }
}

export async function deleteContact(id: number) {
  try {
    const contact = await prisma.contact.delete({ where: { id } });
    if (!contact) {
      throw new NotFoundError("Contact not found");
    }
    return contact;
  } catch (error) {
    console.error("Error deleting Contact with id ", id, error);
  }
}
