const express = require("express");
const router = express.Router();
const profile = require("../services/profile");

router.post("/register", async function (req, res, next) {
    try {
      res.status(201).json(await profile.register(req.body));
    } catch (err) {
      console.error(`Error while registering user`, err.message);
      next(err);
    }
  });
router.put("/update", async function (req, res, next) {
  try {
    res.status(201).json(await profile.update(req.body));
  } catch (err) {
    console.error(`Error while registering user `, err.message);
    next(err);
  }
});  
router.get("/get/:id", async function (req, res, next) {
  try {
    res.json(await profile.getProfile(req.params.id));
  } catch (err) {
    console.error(`Error reading data`, err.message);
    next(err);
  }
});
router.delete("/remove/:id", async function (req, res, next) {
  try {
    res.json(await profile.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting data`, err.message);
    next(err);
  }
});
module.exports = router;