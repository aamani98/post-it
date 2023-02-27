const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

const app = express();

const authRoute = require("./routes/authRoute");

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoute);

__dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname + "/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}
const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then((conn) => {
    console.log("Connected to DB...");
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));
  })
  .catch((err) => {
    console.log(err.code);
    process.exit(1);
  });
