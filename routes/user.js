const express = require("express");
const router = express.Router();
const user = require("../services/user");

/* login */
router.post("/login", async function (req, res, next) {
  
  try {
    res.json(await user.login(req.body));
  } catch (err) {
    console.error(`Error while logging user `, err.message);
    next(err);
  }
});

router.post("/register", async function (req, res, next) {
 
  try {
    res.status(201).json(await user.register(req.body));
  } catch (err) {
    console.error(`Error while registering user `, err.message);
    next(err);
  }
});

router.delete("/remove/:id", async function (req, res, next) {
  try {
    res.json(await user.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting data`, err.message);
    next(err);
  }
});

module.exports = router;
