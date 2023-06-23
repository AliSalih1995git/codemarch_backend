const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const UserRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", UserRoutes);
app.use("/api/task", taskRoutes);

//DB setup
mongoose.set("strictQuery", false);
const connectDatabase = () => {
  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
    })
    .then(() => console.log("Database connected successfully"))
    .catch((err) => console.log("Error connecting to mongodb", err));
};
connectDatabase();

const port = process.env.PORT || 5053;
app.listen(port, () => console.log(`Server running at port ${port}`));
