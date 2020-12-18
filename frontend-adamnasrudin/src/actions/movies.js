import {
  FIND_DATA_MOVIES,
  FIND_PAGE_MOVIES,
  FIND_MOVIE,
} from "../utils/constant";

import { commonAxios } from "../utils/apiUtils";

export const findById = (id) => (dispatch) => {
  commonAxios
    .get(`movies/${id}`)
    .then((result) => {
      const responseAPI = result.data;
      dispatch({ type: FIND_MOVIE, payload: responseAPI });
    })
    .catch((error) => {
      console.log("ERROR : ", error);
    });
};

export const findAll = (search, filter, currentPage, perPage) => (dispatch) => {
  commonAxios
    .get(
      `movies?title=${search}&showTime=${filter}&page=${currentPage}&perPage=${perPage}`
    )
    .then((result) => {
      const responseAPI = result.data;
      dispatch({ type: FIND_DATA_MOVIES, payload: responseAPI });

      dispatch({
        type: FIND_PAGE_MOVIES,
        payload: {
          currentPage: result.current_page,
          totalPage: result.total_page,
          dataPerPage: result.data_perPage,
          totalData: result.total_data,
        },
      });
    })
    .catch((err) => {
      console.log("error: ", err);
    });
};
