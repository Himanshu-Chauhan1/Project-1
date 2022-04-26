const express = require("express");
const router = express.Router();

const authorController = require("../controllers/authorController");

router.get("/createAuthors", authorController.authorSchema);


module.exports = router;
