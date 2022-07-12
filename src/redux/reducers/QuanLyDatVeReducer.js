import ThongTinPhongVe from "../../_core/Modules/ThongTinPhongVe";
import {
  CHANGE_TAB,
  CHANGE_TAB_ACTIVE,
  DAT_GHE,
  LAY_DANH_SACH_PHONG_VE,
  RESET_DANH_SACH_GHE_CHON,
} from "../types/QuanLyDatVeType";

let stateDefault = {
  thongTinPhongVe: new ThongTinPhongVe(),
  danhSachGheDangChon: [],
  tabActive: "1",
};

const QuanLyDatVeReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case LAY_DANH_SACH_PHONG_VE: {
      return { ...state, thongTinPhongVe: { ...action.thongTinPhongVe } };
    }
    case DAT_GHE: {
      let danhSachGheDangChonUpdate = [...state.danhSachGheDangChon];
      let index = danhSachGheDangChonUpdate.findIndex(
        (item) => item.maGhe === action.gheDangDat.maGhe
      );
      if (index != -1) {
        danhSachGheDangChonUpdate.splice(index, 1);
      } else {
        danhSachGheDangChonUpdate.push(action.gheDangDat);
      }
      return { ...state, danhSachGheDangChon: danhSachGheDangChonUpdate };
    }
    case CHANGE_TAB_ACTIVE: {
      return { ...state, tabActive: "2" };
    }
    case CHANGE_TAB: {
      return { ...state, tabActive: action.tabActive };
    }
    case RESET_DANH_SACH_GHE_CHON: {
      return { ...state, danhSachGheDangChon: [] };
    }
    default:
      return { ...state };
  }
};

export default QuanLyDatVeReducer;
