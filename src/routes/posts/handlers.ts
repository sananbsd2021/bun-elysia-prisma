import { NotFoundError } from "elysia";
import prisma from "../../db";

export async function getPosts() {
  try {
    return await prisma.post.findMany({ orderBy: { createdAt: "asc" } });
  } catch (error) {
    console.error("Error getting Posts ", error);
  }
}

export async function createPost(data: { title: string; content: string }) {
  try {
    const { title, content } = data;
    const post = await prisma.post.create({
      data: { title, content },
    });
    if (!post) {
      throw new NotFoundError("Post not found");
    }
    return post;
  } catch (error) {
    console.error("Error Creating Post", error);
  }
}

export async function getPostById(id: number) {
  try {
    const post = await prisma.post.findUnique({ where: { id } });
    if (!post) {
      throw new NotFoundError("Post not found");
    }
    return post;
  } catch (error) {
    console.error("Error getting Post with id ", id, error);
  }
}

export async function updatePost(
  id: number,
  data: { title?: string; content?: string; completed?: boolean }
) {
  try {
    const { title, content, completed } = data;
    const post = await prisma.post.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(content && { content }),
        ...(completed !== undefined && completed !== null && { completed }),
      },
    });
    if (!post) {
      throw new NotFoundError("Post not found");
    }
    return post;
  } catch (error) {
    console.error("Error updating Post with id ", id, error);
  }
}

export async function deletePost(id: number) {
  try {
    const post = await prisma.post.delete({ where: { id } });
    if (!post) {
      throw new NotFoundError("Post not found");
    }
    return post;
  } catch (error) {
    console.error("Error deleting Post with id ", id, error);
  }
}
