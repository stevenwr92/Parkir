const express = require("express");
const app = express();
const cors = require("cors");
const indexController = require("../server/controller/index");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", indexController.getData);

app.post("/create", indexController.input);

module.exports = app;
