const express = require("express");
const router = express.Router();
const publications = require("../services/publications");

router.post("/register", async function (req, res, next) {
    try {
      res.status(201).json(await publications.register(req.body));
    } catch (err) {
      console.error(`Error while registering user `, err.message);
      next(err);
    }
  });
router.put("/update", async function (req, res, next) {
 
  try {
    res.status(201).json(await publications.update(req.body));
  } catch (err) {
    console.error(`Error while registering user `, err.message);
    next(err);
  }
});  
router.get("/get/:id", async function (req, res, next) {
  try {
    res.json(await publications.getPublications(req.params.id));
  } catch (err) {
    console.error(`Error reading data`, err.message);
    next(err);
  }
});
router.delete("/remove/:id", async function (req, res, next) {
  try {
    res.json(await publications.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting data`, err.message);
    next(err);
  }
});

module.exports = router;