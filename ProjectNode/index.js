const express = require("express");
const app = express();
app.use(express.json());

const mongoose = require("mongoose");
const url =
  "mongodb+srv://abdelrhmanmohamedshata:AbdElrhman@mango-db.65s9p3e.mongodb.net/codeZone?retryWrites=true&w=majority&appName=mango-db";
mongoose
  .connect(url)
  .then((res) => {
    console.log("Connected to MongoDB Successfully");
  })
  .catch((err) => {
    console.log("Error : ", err);
  });

// const main = async () => {
//   await client.connect(); // connect to MongoDB
//   console.log("Connected to MongoDB Successfully");
//   const db = client.db("codeZone"); // choose database to interact with
//   const collection = db.collection("courses"); // choose collection to interact with
//   const data = await collection.find().toArray(); // get query data from collection
//   console.log("Data", data);
// };

const coursesRouter = require("./routes/route");
app.use("/api/courses", coursesRouter); // localhost / => /api/courses   routes

app.listen(5000, () => {
  console.log("Example app listening on port 5000!");
});
