import quanLyDatVe from "../../services/QuanLyDatVe";
import { STATUS_CODE } from "../../util/SystemSetting/SystemSetting";
import { SHOW_LOADING } from "../types/LoadingTypes";
import {
  CHANGE_TAB_ACTIVE,
  LAY_DANH_SACH_PHONG_VE,
  RESET_DANH_SACH_GHE_CHON,
} from "../types/QuanLyDatVeType";
import { hideLoading, showLoading } from "./LoadingAction";

export const datVeAction = (obj) => {
  return async (dispatch) => {
    try {
      let { status } = await quanLyDatVe.datVe(obj);
      if (status === STATUS_CODE.SUCCESS) {
        await dispatch(layDanhSachPhongVeAction(obj.maLichChieu));
        await dispatch({ type: CHANGE_TAB_ACTIVE });
        await dispatch({ type: RESET_DANH_SACH_GHE_CHON });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const layDanhSachPhongVeAction = (maLichChieu) => {
  return async (dispatch) => {
    try {
      dispatch(showLoading());
      let { data, status } = await quanLyDatVe.layDanhSachPhongVe(maLichChieu);
      if (status === STATUS_CODE.SUCCESS) {
        await dispatch({
          type: LAY_DANH_SACH_PHONG_VE,
          thongTinPhongVe: data.content,
        });
        await dispatch(hideLoading());
      }
    } catch (err) {
      await dispatch(hideLoading());

      console.log(err);
    }
  };
};
