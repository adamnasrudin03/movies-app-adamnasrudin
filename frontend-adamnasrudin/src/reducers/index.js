import { combineReducers } from "redux";
import { findMovieById, findMovies } from "./movies";

export default combineReducers({
  findMovieById,
  findMovies,
});
