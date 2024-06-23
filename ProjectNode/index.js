const express = require("express");
const app = express();
app.use(express.json());

const coursesRouter = require("./routes/route");
app.use('/api/courses',coursesRouter); // localhost / => /api/courses   routes

app.listen(5000, () => {
  console.log("Example app listening on port 5000!");
});
