import { LAYT_THONG_TIN_LICH_CHIEU_PHIM } from "../types/CinemaManagementType";
import {
  GET_LIST_MOVIE,
  GET_LIST_MOVIE_COMING_SOON,
  GET_LIST_MOVIE_DANG_CHIEU,
  LAY_THONG_TIN_PHIM,
} from "../types/MovieManagemenType";

const stateInitial = {
  listMovie: [],
  listMovieDefault: [],
  buttonDC: true,
  buttonSC: false,
  movieDetail: {},
  thongTinPhim: {},
};

const MovieManagementReducer = (state = stateInitial, action) => {
  switch (action.type) {
    case GET_LIST_MOVIE_DANG_CHIEU: {
      let arrMovieDC = state.listMovieDefault.filter(
        (item) => item.dangChieu === true
      );
      state.listMovie = [...arrMovieDC];
      state.buttonDC = true;
      state.buttonSC = false;
      return {
        ...state,
      };
    }
    case GET_LIST_MOVIE: {
      state.listMovieDefault = [...action.listMovie];
      let arrMovieDC = state.listMovieDefault.filter(
        (item) => item.dangChieu === true
      );
      state.listMovie = [...arrMovieDC];
      return {
        ...state,
      };
    }
    case GET_LIST_MOVIE_COMING_SOON: {
      let arrMovieSC = state.listMovieDefault.filter(
        (item) => item.sapChieu === true
      );

      state.listMovie = [...arrMovieSC];
      state.buttonDC = false;
      state.buttonSC = true;
      return {
        ...state,
      };
    }
    case LAYT_THONG_TIN_LICH_CHIEU_PHIM: {
      return { ...state, movieDetail: { ...action.movieDetail } };
    }
    case LAY_THONG_TIN_PHIM: {
      return { ...state, thongTinPhim: { ...action.thongTinPhim } };
    }
    default:
      return { ...state };
  }
};

export default MovieManagementReducer;
