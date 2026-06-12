// src/config/swagger.js

const swaggerJsDoc = require("swagger-jsdoc");

const swaggerSpec = swaggerJsDoc({
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Task Management API",

      version: "1.0.0",

      description: "Role Based Task Management API",
    },

    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },

  apis: ["./src/routes/*.js"],
});

module.exports = swaggerSpec;
