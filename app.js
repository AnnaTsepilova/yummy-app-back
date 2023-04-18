const express = require("express");
const logger = require("morgan");
const cors = require("cors");

require("dotenv").config();

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const favoritesRouter = require("./routes/api/favorites");
const ingredientsRouter = require("./routes/api/ingredients");
const recipesRouter = require("./routes/api/recipes");
const subscribeRoutes = require("./routes/api/subscribe");
const authRouter = require("./routes/api/auth");
const shopingListRouter = require("./routes/api/shopping-list");
const ownRecipesRouter = require('./routes/api/ownRecipes')
const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/favorites", favoritesRouter);
app.use("/api/ingredients", ingredientsRouter);
app.use("/api/recipes", recipesRouter);
app.use('/api/ownRecipes', ownRecipesRouter)
app.use("/api/subscribe", subscribeRoutes);
app.use("/api/auth", authRouter);
app.use("/api/shopping-list", shopingListRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});
app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
