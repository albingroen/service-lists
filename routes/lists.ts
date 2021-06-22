import { FastifyInstance } from "fastify";
import prisma from "../lib/prisma";
import bcrypt from "bcrypt";
import { verifyPassword } from "../lib/auth";

export default async function routes(fastify: FastifyInstance) {
  // Get all lists
  fastify.get("/", async () => {
    return prisma.list.findMany({
      select: {
        title: true,
        id: true,
      },
    });
  });

  // Get one list
  fastify.get<{ Params: { id: string } }>("/:id", async (req) => {
    return prisma.list.findUnique({
      where: {
        id: req.params.id,
      },
      select: {
        items: true,
        title: true,
        id: true,
      },
    });
  });

  // Create one list
  fastify.post<{ Body: { title: string; passphrase: string } }>(
    "/",
    async (req) => {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassphrase = bcrypt.hashSync(req.body.passphrase, salt);

      return prisma.list.create({
        data: {
          ...req.body,
          passphrase: hashedPassphrase,
        },
        select: {
          title: true,
          id: true,
        },
      });
    }
  );

  // Update one list
  fastify.put<{
    Headers: { authentication: string };
    Body: { title: string };
    Params: { id: string };
  }>("/:id", async (req) => {
    const list = await prisma.list.findUnique({
      where: {
        id: req.params.id,
      },
    });

    const res = await verifyPassword(
      req.headers.authentication,
      list.passphrase
    );

    if (!res) throw new Error("Unauthorized");

    return prisma.list.update({
      where: {
        id: req.params.id,
      },
      data: req.body,
      select: {
        passphrase: false,
        title: true,
        id: true,
      },
    });
  });

  // Delete one list
  fastify.delete<{
    Headers: { authentication: string };
    Params: { id: string };
  }>("/:id", async (req) => {
    const list = await prisma.list.findUnique({
      where: {
        id: req.params.id,
      },
    });

    const res = await verifyPassword(
      req.headers.authentication,
      list.passphrase
    );

    if (!res) throw new Error("Unauthorized");

    const deleteList = prisma.list.delete({
      where: {
        id: req.params.id,
      },
      select: {
        id: true,
      },
    });

    const deleteListItems = prisma.listItem.deleteMany({
      where: {
        listId: req.params.id,
      },
    });

    return prisma.$transaction([deleteListItems, deleteList]);
  });

  // Authenticate a list
  fastify.post<{ Params: { id: string }; Body: { passphrase: string } }>(
    "/:id/auth",
    async (req) => {
      const list = await prisma.list.findUnique({
        where: {
          id: req.params.id,
        },
        select: {
          passphrase: true,
          id: true,
        },
      });

      if (!list) {
        return null;
      }

      const res = await verifyPassword(req.body.passphrase, list.passphrase);

      if (!res) throw new Error("Unauthorized");

      return true;
    }
  );
}
