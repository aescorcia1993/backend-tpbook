const express = require("express");
const router = express.Router();
const comments = require("../services/comments");

router.post("/register", async function (req, res, next) {
    try {
      res.status(201).json(await comments.register(req.body));
    } catch (err) {
      console.error(`Error while registering comments `, err.message);
      next(err);
    }
  });

router.put("/update", async function (req, res, next) {
  try {
    res.status(201).json(await comments.update(req.body));
  } catch (err) {
    console.error(`Error while registering comments `, err.message);
    next(err);
  }
});

router.get("/get/:id", async function (req, res, next) {
  try {
    res.json(await comments.getComments(req.params.id));
  } catch (err) {
    console.error(`Error reading data`, err.message);
    next(err);
  }
});

router.get("/getCommentsByPublication/:id", async function (req, res, next) {
  try {
    res.json(await comments.getCommentsByPostId(req.params.id));
  } catch (err) {
    console.error(`Error reading data`, err.message);
    next(err);
  }
});

router.delete("/remove/:id", async function (req, res, next) {
  try {
    res.json(await comments.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting data`, err.message);
    next(err);
  }
});

module.exports = router;