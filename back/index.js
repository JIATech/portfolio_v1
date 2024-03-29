const express = require("express");
const slash = require("express-slash");
const app = express();
const cors = require("cors");
const {
  errorHandler,
  ormErrorHandler,
  boomErrorHandler,
  logErrors,
} = require("./middleware/error.handler");
const router = require("./routers/global.routers");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logErrors);
app.use(boomErrorHandler);
app.use(ormErrorHandler);
app.use(errorHandler);

app.use("/api/v1", router);
app.use(slash());

app.listen(3000, () => console.log("Server ready"));
