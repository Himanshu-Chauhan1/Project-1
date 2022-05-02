const authorModel = require("../models/authorModel");
const blogModel = require("../models/blogsModel");

//===============POST/blogs====================
const createBlog = async function(req, res) {
    try {
        let data = req.body;
        if (Object.keys(data).length != 0) {
            let authorId = req.body.authId;
            if (!authorId) return res.send({ msg: "authorId is required" });
            let validationAuthorId = await authorModel.findById(authorId);
            if (!validationAuthorId) return res.send({ msg: "enter valid authorId" });

            let blog = req.body;
            let blogCreated = await blogModel.create(blog);
            res.status(201).send({ data: blogCreated });
        } else {
            return res.status(400).send({ msg: "Bad request" });
        }
    } catch (err) {
        res.status(500).send({ status: false, err: err.message });
    }
};

//============GET/blogs===========

const GetFilteredBlog = async function(req, res) {
    try {
        req.query.isDeleted = false
        req.query.isPublished = true
        let filter = req.query

        let getDetails = await blogModel.find(filter)
        if (!getDetails.length) return res.status(404).send({ status: false, msg: "document not Found" })
        res.status(200).send({ status: true, msg: getDetails })
    } catch (err) {
        res.status(500).send({ status: false, err: err.message });
    }
};


//=============== PUT/blogs/:blogId===========

const updateBlog = async function(req, res) {
    try {
        let blogId = req.params.blogId
        let content = req.body
        let blog = await blogModel.findOne({ $and: [{ _id: blogId }, { isDeleted: false }] })
        if (!blog) {
            return res.status(404).send({ msg: "sorry dear we dont have such blog in our record" })
        }
        let updatedBlog = await blogModel.findOneAndUpdate({ _id: blogId }, { $set: content }, { new: true })
        res.status(200).send({ data: updatedBlog })
    } catch (err) {
        res.status(500).send({ status: false, err: err.message });
    }
};

//=============DELETE/blogs/:blogId======================

const DeleteBlogById = async function(req, res) {
        try {
            let BlogId = req.params.blogId;
            let Blog = await blogModel.findById(BlogId);
            if (!Blog) {
                res.status(404).send({ status: false, message: "no such blog exists" });
            }
            let updatedBlog = await blogModel.findOneAndUpdate({ _id: BlogId }, { isDeleted: true }, { new: true });
            res.send({ status: true, data: updatedBlog });

        } catch (err) {
            res.status(500).send({ status: false, err: err.message });
        }
    }
    //===============DELETE/blogs?qureyParams========================

const DeleteBlogByQuery = async function(req, res) {
    try {
        req.query.isPublished = false;
        let data = req.query

        let blogs = await blogModel.updateMany(data, { $set: { isDeleted: true } }, { new: true })

        if (blogs.matchedCount == 0) return res.status(404).send({ status: false, msg: "Document not found" })
        req.query.isDeleted = true
        let blogData = await blogModel.find(req.query)
        res.status(200).send({ status: true, msg: blogData })

    } catch (err) {
        res.status(500).send({ status: false, err: err.message });
    }
};

module.exports.createBlog = createBlog;
module.exports.GetFilteredBlog = GetFilteredBlog;
module.exports.updateBlog = updateBlog;
module.exports.DeleteBlogById = DeleteBlogById;
module.exports.DeleteBlogByQuery = DeleteBlogByQuery;