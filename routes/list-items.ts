import { FastifyInstance } from "fastify";
import { verifyPassword } from "../lib/auth";
import prisma from "../lib/prisma";

export default async function routes(fastify: FastifyInstance) {
  // Create one list item
  fastify.post<{
    Headers: { authentication: string };
    Body: { title: string };
    Params: {
      listId: string;
    };
  }>("/", async (req) => {
    const list = await prisma.list.findUnique({
      where: {
        id: req.params.listId,
      },
    });

    const res = await verifyPassword(
      req.headers.authentication,
      list.passphrase
    );

    if (!res) throw new Error("Unauthorized");

    return prisma.listItem.create({
      data: {
        ...req.body,
        listId: req.params.listId,
      },
    });
  });

  // Update one list item
  fastify.put<{
    Headers: { authentication: string };
    Body: { title: string };
    Params: {
      listId: string;
      id: string;
    };
  }>("/:id", async (req) => {
    const list = await prisma.list.findUnique({
      where: {
        id: req.params.listId,
      },
    });

    const res = await verifyPassword(
      req.headers.authentication,
      list.passphrase
    );

    if (!res) throw new Error("Unauthorized");

    return prisma.listItem.update({
      where: {
        id: req.params.id,
      },
      data: req.body,
    });
  });

  // Delete one list item
  fastify.delete<{
    Headers: { authentication: string };
    Params: {
      listId: string;
      id: string;
    };
  }>("/:id", async (req) => {
    const list = await prisma.list.findUnique({
      where: {
        id: req.params.listId,
      },
    });

    const res = await verifyPassword(
      req.headers.authentication,
      list.passphrase
    );

    if (!res) throw new Error("Unauthorized");

    return prisma.listItem.delete({
      where: {
        id: req.params.id,
      },
    });
  });
}
