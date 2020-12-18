const { validationResult } = require("express-validator");
const db = require("../../models");
const Model = db.movie;

module.exports = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = new Error("Input value tidak sesuai");
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;
  }
  if (!req.body.like) {
    req.body.like = 0;
  }

  if (!req.body.showTime || !req.body.title || !req.body.image) {
    res.status(400).json({
      status: "Error",
      message: "Data cannot be empty!",
    });
    return null;
  }

  Model.create(req.body)
    .then((data) => {
      res.status(201).json({
        status: "Success",
        message: "Create successfully",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: "Error",
        message: err.message,
      });
    });
};
