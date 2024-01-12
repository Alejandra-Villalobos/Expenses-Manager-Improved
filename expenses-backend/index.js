const express = require("express");
const cors = require("cors");
const app = express();

const authRouter = require("./routes/auth");

app.use(express.json());
app.use(cors());

const port = 8080;

app.use(authRouter);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});