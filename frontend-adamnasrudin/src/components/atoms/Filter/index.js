import React from "react";
import "./filter.scss";

const Filter = ({ label, title, change, ...rest }) => {
  const Ops = () => {
    if (title === "year") {
      return (
        <select className="filter-item" {...rest}>
          <option value={change}>{change}</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
        </select>
      );
    }
    if (title === "dataPerPage") {
      return (
        <select className="filter-item" {...rest}>
          <option value={change}>{change}</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </select>
      );
    }

    return (
      <select className="filter-item" {...rest}>
        <option value={change}>{change}</option>
        <option value="2020">2020</option>
        <option value="2019">2019</option>
      </select>
    );
  };
  return (
    <div className="filter-wrapper">
      <p className="filter-label">{label}</p>
      <Ops />
    </div>
  );
};

export default Filter;
