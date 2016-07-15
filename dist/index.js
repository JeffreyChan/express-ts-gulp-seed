/// <reference path="./../typings/index.d.ts" />
"use strict";
var express = require("express");
var path = require("path");
var bootMiddleware = require("./api/middlewares/base");
var app = express();
var port = parseInt(process.env.PORT, 10) || 2000;
app.set("port", port);
app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});
app.use(bootMiddleware.configuration);
app.listen(port, function () {
    console.log("Node app is running at localhost:" + port);
});

//# sourceMappingURL=index.js.map
