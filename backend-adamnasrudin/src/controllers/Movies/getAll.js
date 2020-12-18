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

  const currentPage = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 10;
  let offset = 0;
  if (currentPage == 1) {
    offset = 0;
  } else if (currentPage == 2) {
    offset = perPage;
  } else {
    offset = currentPage * perPage - perPage;
  }

  let title = req.query.title;
  let showTime = req.query.showTime;

  title = title ? { title: { [Op.like]: `%${title}%` } } : null;
  showTime = showTime ? { showTime: { [Op.like]: `%${showTime}%` } } : null;

  Model.findAndCountAll({
    limit: parseInt(perPage),
    offset: offset,
    where: title || showTime,
  })
    .then((data) => {
      res.status(200).json({
        status: "Success",
        message: "Find All successfully",
        data: data.rows,
        total_data: data.count,
        data_perPage: perPage,
        current_page: currentPage,
        total_page:
          Math.ceil(data.count / perPage) == 0
            ? currentPage
            : Math.ceil(data.count / perPage),
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: "Error",
        message: err.message,
      });
    });
};
