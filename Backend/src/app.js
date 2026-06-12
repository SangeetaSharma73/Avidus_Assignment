const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const taskRoutes = require("./routes/task.routes");
const authRoutes = require("./routes/auth.routes");
const errorHandler = require("./middleware/error.middleware");
const adminRoutes = require("./routes/admin.routes");
const app = express();
const limiter = require("./middleware/rateLimiter");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const requestLogger = require("./middleware/requestLogger");

app.use(requestLogger);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(xss());
app.use(mongoSanitize());
app.use(limiter);
app.use(cors());

app.use(helmet());

app.use(morgan("dev"));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API Running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use(errorHandler);
app.use("/api/admin", adminRoutes);

module.exports = app;
