const { validationResult } = require("express-validator");
const db = require("../../models");
const Model = db.movie;
const Op = db.Sequelize.Op;

module.exports = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = new Error("Input value tidak sesuai");
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;
  }
  const id = req.params.id;

  Model.findByPk(id)
    .then((data) => {
      if (data == null) {
        res.status(404).json({
          status: "Error",
          message: `data with id ${id}, not found`,
        });
      } else {
        res.status(200).json({
          status: "Success",
          message: `Find by id ${id} successfully`,
          data: data,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        status: "Error",
        message: err.message,
      });
    });
};
