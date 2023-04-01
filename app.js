const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const { errorHandler } = require('./middleware');

require("dotenv").config();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const favoriteRouter = require("./routes/api/favorite");
const ingredientsRouter = require("./routes/api/ingredients");
const recipesRouter = require("./routes/api/recipes");
const ownRecipesRouter = require("./routes/api/ownRecipes");
const unsubscribeRoutes = require("./routes/api/unsubscribe");
const subscribeRoutes = require("./routes/api/subscribe");
const authRouter = require("./routes/api/auth");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/favorite", favoriteRouter);
app.use("/api/ingredients", ingredientsRouter);
app.use("/api/recipes", recipesRouter);
app.use("/api/ownRecipes", ownRecipesRouter);
app.use("/api/unsubscribe", unsubscribeRoutes);
app.use("/api/subscribe", subscribeRoutes);
app.use("/api/auth", authRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errorHandler);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

module.exports = app;
