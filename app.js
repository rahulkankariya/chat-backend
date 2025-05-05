const express = require("express");
const path = require("path");
const middleware = require('./api/middleware/middleware')
require("dotenv").config();

const v1Routes = require("./api/routes/v1/v1");

const app = express();
app.get('/favicon.ico', (req, res) => res.status(204).end());
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.resolve("./public")));
app.use(middleware.verifyToken)
// Register API Routes
app.use("/api/v1", v1Routes);

module.exports = app;
