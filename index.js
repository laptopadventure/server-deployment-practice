// Line 1 to 10 - credit to David Souther's https://github.com/DavidSouther/js401n21lab1

"use strict";

require("dotenv").config();
const port = process.env.PORT ?? 3000;

const server = require("./server.js");
server.start(port);
