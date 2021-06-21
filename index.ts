import fy from "fastify";
import dotenv from "dotenv";
import cors from "fastify-cors";

import listRoutes from "./routes/lists";
import listItemRoutes from "./routes/list-items";

// Enable environment variables
dotenv.config();

// Initiate Fastify
const fastify = fy();

// Enable cors
fastify.register(cors);

// Root route
fastify.get("/", (_, res) => {
  res.send("Welcome to the server");
});

// Register other routes
fastify.register(listRoutes, { prefix: "/lists" });
fastify.register(listItemRoutes, { prefix: "/lists/:listId/list-items" });

// Listen for port in environment variables
const port = process.env.PORT || 5000;

// Start server
fastify.listen(port, function (err, address) {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.info(`server listening on ${address}`);
});
