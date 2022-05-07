const jwt = require("jsonwebtoken");
const blogModel = require("../models/blogsModel");


const authorisation2 = async function(req, res, next) {
    try {
        let blog = req.params.blogId
        let findBlog = await blogModel.findOne({ _id: blog });
        token = req.headers["x-api-key"]
        if (!token) return res.send[{ status: false, msg: "token must be persent in code" }]


        let decodedToken = jwt.verify(token, "RSPtechnologies-brillientCoders")
        if (!decodedToken) return res.send[{ status: false, msg: "invailed token" }]
        if (findBlog.authId.toString() != decodedToken.authorId) return res.send({ status: false, msg: "user is not allowed to modify other's blog" })
        next()
    } catch (error) {
        res.status(500).send({ msg: "Error", error: error.message })
    }
}

module.exports.authorisation2 = authorisation2