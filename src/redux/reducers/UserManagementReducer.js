import { USER_LOGIN } from "../../util/SystemSetting/SystemSetting";
import {
  GET_INFO_USER,
  GET_USER_LOGIN,
  LAY_DANH_SACH_NGUOI_DUNG,
  LAY_THONG_TIN_NGUOI_DUNG,
} from "../types/UserManagementType";

let user = {};
if (localStorage.getItem(USER_LOGIN)) {
  user = JSON.parse(localStorage.getItem(USER_LOGIN));
}
let stateDefault = {
  userLogin: user,
  thongTinTaiKhoan: {},
  listUser: [],
  thongTinNguoiDung: {},
};

const UserManagementReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_USER_LOGIN: {
      return { ...state, userLogin: { ...action.userLogin } };
    }
    case GET_INFO_USER: {
      return { ...state, thongTinTaiKhoan: { ...action.thongTinTaiKhoan } };
    }
    case LAY_DANH_SACH_NGUOI_DUNG: {
      return { ...state, listUser: [...action.listUser] };
    }
    case LAY_THONG_TIN_NGUOI_DUNG: {
      return { ...state, thongTinNguoiDung: { ...action.thongTinNguoiDung } };
    }
    default:
      return { ...state };
  }
};

export default UserManagementReducer;
