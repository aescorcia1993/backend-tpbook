const express = require("express");
const app = express();
const port = 3000;
const userRouter = require("./routes/user");
const profileRouter = require("./routes/profile");
const publicationsRouter = require("./routes/publications");
const commentsRouter =require("./routes/comments");
const bodyParser = require("body-parser");
const cors = require('cors');

app.use(cors())
app.use(express.json({
  limit:"50mb"
}));
app.use(
  express.urlencoded({
    limit:"50mb",
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.json({ message: "Backend Status OK" });
});

app.use("/user", userRouter);
app.use("/profile", profileRouter);
app.use("/publications", publicationsRouter);
app.use("/comments", commentsRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });

  return;
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
