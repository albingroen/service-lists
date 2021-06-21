import { FastifyInstance } from "fastify";
import prisma from "../lib/prisma";

export default async function routes(fastify: FastifyInstance) {
  // Get all lists
  fastify.get("/", async () => {
    return prisma.list.findMany({ include: { items: true } });
  });

  // Get one list
  fastify.get<{ Params: { id: string } }>("/:id", async (req) => {
    return prisma.list.findUnique({
      where: {
        id: req.params.id,
      },
    });
  });

  // Create one list
  fastify.post<{ Body: { title: string; passphrase: string } }>(
    "/",
    async (req) => {
      return prisma.list.create({
        data: req.body,
      });
    }
  );

  // Update one list
  fastify.put<{ Params: { id: string }; Body: { title: string } }>(
    "/:id",
    async (req) => {
      return prisma.list.update({
        where: {
          id: req.params.id,
        },
        data: req.body,
      });
    }
  );

  // Delete one list
  fastify.delete<{ Params: { id: string } }>("/:id", async (req) => {
    return prisma.list.delete({
      where: {
        id: req.params.id,
      },
    });
  });
}
