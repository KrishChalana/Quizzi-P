const express = require("express");
const dbRouter = require("./db.js");
var cors = require('cors')
const app = express();
app.use(cors())
app.use(dbRouter);

app.listen(8000, () => {
  console.log("listening on 8000 PORT");
});
