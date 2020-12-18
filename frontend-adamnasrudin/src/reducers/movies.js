import {
  FIND_DATA_MOVIES,
  FIND_PAGE_MOVIES,
  FIND_MOVIE,
} from "../utils/constant";

const defaultStateMovie = {
  movie: {},
};
const defaultStateMovies = {
  dataMovie: [],
  page: {
    currentPage: 1,
    totalPage: 1,
    dataPerPage: 1,
    totalData: 0,
  },
};

export function findMovieById(state = defaultStateMovie, action) {
  if (action.type === FIND_MOVIE) {
    return {
      ...state,
      movie: action.payload,
    };
  }

  return state;
}

export function findMovies(state = defaultStateMovies, action) {
  if (action.type === FIND_DATA_MOVIES) {
    return {
      ...state,
      dataMovie: action.payload,
    };
  }

  if (action.type === FIND_PAGE_MOVIES) {
    return {
      ...state,
      page: action.payload,
    };
  }

  return state;
}
