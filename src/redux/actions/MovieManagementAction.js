import movieManagerService from "../../services/MovieManagerService";
import { STATUS_CODE } from "../../util/SystemSetting/SystemSetting";
import {
  GET_LIST_MOVIE,
  GET_LIST_MOVIE_COMING_SOON,
  GET_LIST_MOVIE_DANG_CHIEU,
  LAY_THONG_TIN_PHIM,
} from "../types/MovieManagemenType";
import { history } from "../../App";
import openNotificationWithIcon from "../../util/SystemSetting/Notification";

export const getListMovie = (tenPhim = "") => {
  return async (dispatch) => {
    try {
      let { data, status } = await movieManagerService.getListMovieService(
        tenPhim
      );
      dispatch({ type: GET_LIST_MOVIE, listMovie: data.content });
    } catch (err) {
      console.log(err);
    }
  };
};

export const getListMoiveSCAction = () => {
  return {
    type: GET_LIST_MOVIE_COMING_SOON,
  };
};
export const getListMoiveDCAction = () => {
  return {
    type: GET_LIST_MOVIE_DANG_CHIEU,
  };
};

export const themPhimUpLoadHinhAction = (formData) => {
  return async (dispatch) => {
    try {
      let { status } = await movieManagerService.themPhimUpLoadHinh(formData);
      if (status === STATUS_CODE.SUCCESS) {
        openNotificationWithIcon("success", "Thêm phim thành công");
        history.push("/admin/films");
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const layThongTinPhimAction = (maPhim) => {
  return async (dispatch) => {
    try {
      let { data, status } = await movieManagerService.layThongTinPhim(maPhim);

      if (status === STATUS_CODE.SUCCESS) {
        dispatch({ type: LAY_THONG_TIN_PHIM, thongTinPhim: data.content });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const capNhatPhimUpLoadAction = (formData) => {
  return async (dispatch) => {
    try {
      let { status } = await movieManagerService.capNhatPhimUpLoad(formData);
      if (status === STATUS_CODE.SUCCESS) {
        openNotificationWithIcon("success", "Cập nhật thành công");
        history.push("/admin/films");
      }
    } catch (err) {
      openNotificationWithIcon("error", "cập nhật thất bại");

      console.log(err);
    }
  };
};

export const xoaPhimAction = (maPhim) => {
  return async (dispatch) => {
    try {
      let { status } = await movieManagerService.xoaPhim(maPhim);
      if (status === STATUS_CODE.SUCCESS) {
        openNotificationWithIcon("success", "Xóa thành công");
        dispatch(getListMovie());
      }
    } catch (err) {
      console.log(err);
    }
  };
};
