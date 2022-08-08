const express = require("express");
require("express-async-errors");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();
const connectDB = require("./DB/connect");
const morgan = require("morgan");

const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};

//middleware
const errorHanlerMidldeWare = require("./Middleware/errorHandler");
const notFoundMiddleware = require("./Middleware/NotFoundMiddleware");

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

//Router
const authRutes = require("./Routes/authRoutes");
const conversationRoute = require("./Routes/conversationRoute");
const messageRoute = require("./Routes/MessageRoute");
const usersRoute = require("./Routes/usersRoute");

//Middleware
app.use(express.json());
app.use(cors(corsOptions));

//Router
app.use("/", authRutes);
app.use("/", conversationRoute);
app.use("/", messageRoute);
app.use("/", usersRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(notFoundMiddleware);
app.use(errorHanlerMidldeWare);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
