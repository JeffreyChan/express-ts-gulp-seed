/// <reference path="./../typings/index.d.ts" />

import express = require("express");
import path = require("path");
import bootMiddleware = require("./api/middlewares/base");

var app = express();
let port = parseInt(process.env.PORT, 10) || 2000;
app.set("port", port);

app.use(express.static(path.join(__dirname, 'public')));
app.use((req: express.Request, res: express.Response) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.use(bootMiddleware.configuration);

app.listen(port, () => {
    console.log("Node app is running at localhost:" + port);
});

