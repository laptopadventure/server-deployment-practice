"use strict";

const express = require("express");

const hello = (req, res) => {
    res.status(200).send("Hello, World");
};

const data = (req, res) => {
    res.status(200).send({
        name: "David",
        role: "Instructor",
    });
};

const app = express();

app.get("/", hello);

app.get("/data", data);

// ---

function start(port) {
    app.listen(port, () => console.log(`Server listening on port ${port}`));
}

module.exports = {
    app,
    start,
};
