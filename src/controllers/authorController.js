const author_Schema = require("../models/authorModel");

const authorSchema = async function (req, res) {
  let data = req.body;
  const author_data = await author_Schema.create(data);
  res.send({ data: author_data });
};
module.exports.authorSchema = authorSchema;
