const express = require("express");
const app = express();
const router = require("./routers/global.routers");

app.use("/api/v1", router);

app.listen(3000, () => console.log("Server ready"));
