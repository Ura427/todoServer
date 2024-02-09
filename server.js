const express = require("express");

const PORT = 5000;
const todoRouter = require("./routes/todos_router");

const app = express();

app.use(express.json());
app.use("/api", todoRouter);


app.listen(PORT, () => console.log(`Listen to http://localhost:${PORT}`));
