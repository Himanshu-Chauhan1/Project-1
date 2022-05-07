const express = require('express');
const router = express.Router();
const authorController = require("../Controllers/authorController")
const blogController = require("../Controllers/blogController")
const authentication = require("../middleware/authentication")
const authorisation = require("../middleware/authorisation")



router.post("/createAuthor", authorController.createAuthor)

router.post("/createBlog", authentication.authentication1, blogController.createBlog)

router.get("/blogs/get", authentication.authentication1, blogController.GetFilteredBlog)

router.put("/blog/:blogId", authentication.authentication1, authorisation.authorisation2, blogController.updateBlog)

router.delete("/blogs/:blogId", authentication.authentication1, authorisation.authorisation2, blogController.DeleteBlogById)

router.delete("/blogs", authentication.authentication1, blogController.DeleteBlogByQuery)

//-----------Phase_2,APIs----------------------------
router.post("/login", authorController.loginAuthor)




module.exports = router