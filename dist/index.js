"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fastify_1 = __importDefault(require("fastify"));
var dotenv_1 = __importDefault(require("dotenv"));
var fastify_cors_1 = __importDefault(require("fastify-cors"));
var lists_1 = __importDefault(require("./routes/lists"));
// Enable environment variables
dotenv_1.default.config();
// Initiate Fastify
var fastify = fastify_1.default();
// Enable cors
fastify.register(fastify_cors_1.default);
// Root route
fastify.get("/", function (_, res) {
    res.send("Welcome to the server");
});
// Register other routes
fastify.register(lists_1.default, { prefix: "/lists" });
// Listen for port in environment variables
var port = process.env.PORT || 5000;
// Start server
fastify.listen(port, function (err, address) {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.info("server listening on " + address);
});
