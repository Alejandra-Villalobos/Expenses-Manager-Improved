const express = require("express");
const cors = require("cors");
const app = express();

const authRouter = require("./routes/auth");
const bankRouter = require("./routes/bank");
const incomeRouter = require("./routes/income");
const outcomeRouter = require("./routes/outcome");

app.use(express.json());
app.use(cors());

const port = 8080;

app.use(authRouter);
app.use(bankRouter);
app.use(incomeRouter);
app.use(outcomeRouter);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});