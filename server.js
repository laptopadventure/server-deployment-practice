"use strict";

const express = require("express");

const { hello } = require("./src/handler/hello");
const { data } = require("./src/handler/data");
const { person } = require("./src/handler/person");
const { logger } = require("./src/middleware/logger");
const { validator } = require("./src/middleware/validator");
const { error404 } = require("./src/error-handlers/404");
const { error500 } = require("./src/error-handlers/500");

const app = express();

//global middleware

app.use(logger);

//routes

app.get("/", hello);
app.get("/data", data);
app.get("/person", validator, person);
app.use(error404);
app.use(error500);

function start(port) {
    app.listen(port, () => console.log(`Server listening on port ${port}`));
}

module.exports = {
    app,
    start,
};
