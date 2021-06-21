import { FastifyInstance } from "fastify";

export default async function routes(fastify: FastifyInstance) {
  fastify.get("/", async () => {
    return {
      hello: "world",
    };
  });
}
