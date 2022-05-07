const jwt = require("jsonwebtoken");
const AuthorModel = require("../models/authorModel")


const createAuthor = async function(req, res) {
    try {
        let data = req.body
        if (Object.keys(data).length != 0) {
            if (!data.firstname) {
                return res.status(400).send({ status: false, data: "FirstName is required" })
            }
            if (!data.lastname) {
                return res.status(400).send({ status: false, data: "lastName is required" })
            }
            if (!data.title) {
                return res.status(400).send({ status: false, data: "Tittle is required" })
            }
            if (!data.email) {
                return res.status(400).send({ status: false, data: "Email is required" })
            }
            let isRegisteredEmail = await AuthorModel.find({ email: data.email });
            if (isRegisteredEmail.length != 0) {
                return res
                    .status(400)
                    .send({ status: false, message: "email id already registered" });
            }
            if (!data.password) {
                return res.status(400).send({ status: false, data: "Password is required" })
            }
            let author = req.body
            let authorCreated = await AuthorModel.create(author)
            res.status(200).send({ status: true, data: authorCreated })
        } else {
            return res.status(400).send({ msg: "Bad request" });
        }
    } catch (err) {
        res.status(500).send({ status: false, err: err.message });
    }
}




const loginAuthor = async function(req, res) {
    let email = req.body.email;
    let password = req.body.password;
    try {
        let author = await AuthorModel.findOne({ email: email, password: password });
        if (!author)
            return res.status(400).send({
                status: false,
                msg: "username or the password is not corerct",
            });


        let token = jwt.sign({
                authorId: author._id.toString(),
                batch: "brillientCoders",
                organisation: "RSPtechnologies",
            },
            "RSPtechnologies-brillientCoders"
        );
        res.header("x-Api-Key", token);
        res.status(200).send({ status: true, data: token });

    } catch (err) {
        res.status(500).send({ msg: "server error", error: err.message });
    }
}








module.exports.createAuthor = createAuthor
module.exports.loginAuthor = loginAuthor