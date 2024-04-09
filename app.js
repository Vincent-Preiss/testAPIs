const fs = require("fs");
const express = require("express");

const objectHandlerFactory = require("./Routes/ObjectHandlerFactory");
const app = express();

app.use(express.json());

const config = JSON.parse(fs.readFileSync(`./Routes/routes.json`));

for ({ path, objectName } of config) {
  const objectRouter = express.Router();
  app.use(`/api/v1/${objectName}`, objectRouter);
  objectHandlerFactory(path, objectRouter);
}

const port = 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
