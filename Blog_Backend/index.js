const express = require("express");
const cors = require("cors");
require("dotenv").config();
const fileUpload = require('express-fileupload')

const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const {connectDB} = require('./db/connectDB')

const app = express();

app.use(cors({
  origin: '*', // Replace this with the origin of your frontend
}))
app.use(express.json());
app.use(fileUpload({
  useTempFiles: true,
  limits: { fileSize: 10 * 1024 * 1024 } // 10 MB limit
}));

app.post("/api/upload", (req, res) => {
  clg(req)
  res.status(200).json("File has been uploaded");
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);

const main = async() => {
  try {
      await connectDB(process.env.MONGO_URL)
      app.listen(5000, () => {
        console.log("listen on 8000.");
      });
  } catch (error) {
    console.log(error)
  }
}

main()

