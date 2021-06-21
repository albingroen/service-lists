import { FastifyInstance } from "fastify";
import prisma from "../lib/prisma";

export default async function routes(fastify: FastifyInstance) {
  // Create one list item
  fastify.post<{
    Body: { title: string };
    Params: {
      listId: string;
    };
  }>("/", (req) => {
    return prisma.listItem.create({
      data: {
        ...req.body,
        listId: req.params.listId,
      },
    });
  });

  // Update one list item
  fastify.put<{
    Body: { title: string };
    Params: {
      listId: string;
      id: string;
    };
  }>("/:id", (req) => {
    return prisma.listItem.update({
      where: {
        id: req.params.id,
      },
      data: req.body,
    });
  });

  // Delete one list item
  fastify.delete<{
    Params: {
      listId: string;
      id: string;
    };
  }>("/:id", (req) => {
    return prisma.listItem.delete({
      where: {
        id: req.params.id,
      },
    });
  });
}
