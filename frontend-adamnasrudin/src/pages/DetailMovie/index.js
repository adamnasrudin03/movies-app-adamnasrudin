import React, { useEffect } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Gap, Link } from "../../components";
import { findById } from "../../actions/movies";
import "./detailMovie.scss";

const DetailMovie = ({ match }) => {
  const { movie } = useSelector((state) => state.findMovieById);

  const dispatch = useDispatch();
  useEffect(() => {
    const id = match.params.id;
    dispatch(findById(id));
  }, [match, dispatch]);

  const history = useHistory();
  const year = new Date(movie.showTime).getFullYear();
  const month = new Date(movie.showTime).getMonth();
  const date = new Date(movie.showTime).getDate();
  const hours = new Date(movie.showTime).getHours();
  const minutes = new Date(movie.showTime).getMinutes();
  const seconds = new Date(movie.showTime).getSeconds();

  const getShowTime = `${year}-${month}-${date} , ${hours}:${minutes}:${seconds} `;

  return (
    <div className="detail-movie-wrapper">
      <img className="img-cover" src={movie.image} alt="thumb" />
      <div className="title-wrapper">
        <p className="movie-title">{movie.title}</p>
        <div className="movie-like">
          <p className="like">{movie.like} likes</p>
        </div>
      </div>
      <p className="movie-showTime">{getShowTime}</p>
      <Gap height={20} />
      <Link
        title="Back to the main page"
        onClick={() => history.push("/movies")}
      />
    </div>
  );
};

export default withRouter(DetailMovie);
