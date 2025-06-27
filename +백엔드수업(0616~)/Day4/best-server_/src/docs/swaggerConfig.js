// src/docs/swaggerConfig.js

const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "API documentation using Swagger",
    },
    servers: [
      {
        url: "http://localhost:7777",
      },
    ],
  },
  // apis: [path.join(__dirname, "../routes/*.js")], // 라우트 파일에서 JSDoc을 찾음
  apis: [path.join(__dirname, "./*.js")], // docs 폴더 추가
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
