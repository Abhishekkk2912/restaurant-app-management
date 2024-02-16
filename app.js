const express = require("express");
//rest object
const server = express();
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDb = require("./config/database");
//dotenv configuration
dotenv.config(); //if path is not in root folder then ({"path":./select folder/select file}).

connectDb();

//middlewares
server.use(cors());
server.use(express.json());
server.use(morgan("dev"));

//routes
//URL-http://localhost:8080
server.use("/api/v1/auth", require("./routes/authRoutes"));
server.use("/api/v1/user", require("./routes/userRoutes"));
server.use("/api/v1/restaurant", require("./routes/restaurantRoutes"));
server.use("/api/v1/category", require("./routes/categoryRoutes"));
server.use("/api/v1/food",require("./routes/foodRoutes"));
server.get("/", (req, res) => {
  return res.status(200).send("<h1>Welcome to food server</h1>");
});

const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`); //for dynamic use ``.
});
