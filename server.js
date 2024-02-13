const express = require("express");
const cors = require("cors");
const PORT = 5000;
const todoRouter = require("./routes/todos_router");

const app = express();


app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(express.json());
app.use("/api", todoRouter);

app.listen(PORT, () => console.log(`Listen to http://localhost:${PORT}`));
