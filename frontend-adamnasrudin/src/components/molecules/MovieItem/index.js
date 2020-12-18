import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Gap } from "../../atoms";
import "./moviesItem.scss";

const MovieItem = (props) => {
  const history = useHistory();
  const { image, title, like, showTime, id } = props;
  return (
    <div className="blog-item">
      <img className="image-thumb" src={image} alt="post" />
      <div className="content-detail">
        <div className="title-wrapper">
          <p className="title">{title}</p>
          <div className="like-wrapper">
            <p className="like">{like} likes</p>
          </div>
        </div>
        <p className="showTime">{showTime}</p>
        <Gap height={20} />
        <Button
          title="View Detail"
          onClick={() => history.push(`/movies/${id}`)}
        />
      </div>
    </div>
  );
};

export default MovieItem;
