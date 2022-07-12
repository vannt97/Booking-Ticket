import cinemaManagerService from "../../services/CinemaManagerService";
import { STATUS_CODE } from "../../util/SystemSetting/SystemSetting";
import {
  GET_LIST_LOGO_HE_THONG_RAP,
  GET_SYSTEMS_CINEMA,
  LAYT_THONG_TIN_LICH_CHIEU_PHIM,
} from "../types/CinemaManagementType";

export const getSystemCinema = () => {
  return async (dispatch) => {
    try {
      let { data, status } =
        await cinemaManagerService.getSystemCinemaService();
      if (status === STATUS_CODE.SUCCESS) {
        dispatch({ type: GET_SYSTEMS_CINEMA, systemsCinema: data.content });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const layThongTinLichChieuPhimAction = (maPhim) => {
  return async (dispatch) => {
    try {
      let { data, status } =
        await cinemaManagerService.layThongTinLichChieuPhim(maPhim);

      if (status === STATUS_CODE.SUCCESS) {
        dispatch({
          type: LAYT_THONG_TIN_LICH_CHIEU_PHIM,
          movieDetail: data.content,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const getListLogoHeThongRapAction = () => {
  return async (dispatch) => {
    try {
      let { data, status } = await cinemaManagerService.getListLogoHeThongRap();
      if (status === STATUS_CODE.SUCCESS) {
        dispatch({
          type: GET_LIST_LOGO_HE_THONG_RAP,
          listLogoHeThongRap: data.content,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};
