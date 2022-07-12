import userManagerService from "../../services/UserManagerService";
import {
  STATUS_CODE,
  TOKEN,
  USER_LOGIN,
} from "../../util/SystemSetting/SystemSetting";
import { history } from "../../App";
import openNotificationWithIcon from "../../util/SystemSetting/Notification";
import {
  GET_INFO_USER,
  GET_USER_LOGIN,
  LAY_DANH_SACH_NGUOI_DUNG,
  LAY_THONG_TIN_NGUOI_DUNG,
} from "../types/UserManagementType";
export const signUpAction = (infoUser) => {
  return async (dispatch) => {
    try {
      let { status } = await userManagerService.signUp(infoUser);
      if (status === STATUS_CODE.SUCCESS) {
        openNotificationWithIcon("success", "Bạn đã đăng ký thành công");
        history.push("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };
};
// key nay de phan biet giua page login và page profile
export const loginAction = (user, key = "") => {
  return async (dispatch) => {
    try {
      let { data, status } = await userManagerService.getInfoUserLogin(user);
      if (status == STATUS_CODE.SUCCESS) {
        localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));
        localStorage.setItem(TOKEN, JSON.stringify(data.content.accessToken));
        dispatch({ type: GET_USER_LOGIN, userLogin: data.content });
        if (key === "") {
          history.push("/");
        } else {
          // page profile
          // history.push()
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const getThongTinTaiKhoanAction = () => {
  return async (dispatch) => {
    try {
      let { data, status } = await userManagerService.getThongTinTaiKhoan();
      dispatch({ type: GET_INFO_USER, thongTinTaiKhoan: data.content });
    } catch (err) {
      console.log(err);
    }
  };
};

export const layDanhSachNguoiDungAction = () => {
  return async (dispatch) => {
    try {
      let { data, status } = await userManagerService.layDanhSachNguoiDung();
      if (status === STATUS_CODE.SUCCESS) {
        dispatch({ type: LAY_DANH_SACH_NGUOI_DUNG, listUser: data.content });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const addUserAction = (infoUser) => {
  return async (dispatch) => {
    try {
      let { status } = await userManagerService.themNguoiDung(infoUser);
      if (status === STATUS_CODE.SUCCESS) {
        openNotificationWithIcon("success", "Bạn đã đăng ký thành công");

        history.push("/admin");
      }
    } catch (err) {
      openNotificationWithIcon("error", `Bạn đăng ký thất bại`);
      console.log(err);
      console.log(err.response);
    }
  };
};

export const layDanhSachLoaiNguoiDungAction = async () => {
  let { data, status } = await userManagerService.layDanhSachLoaiNguoiDung();
  if (status === STATUS_CODE.SUCCESS) {
    return data.content;
  }
  return "";
};

export const capNhatThongTinNguoiDungAction = (obj) => {
  return async (dispatch) => {
    try {
      let { status } = await userManagerService.capNhatThongTinNguoiDung(obj);
      if (status === STATUS_CODE.SUCCESS) {
        openNotificationWithIcon("success", "Bạn đã chỉnh sửa thành công");
        history.push("/admin");
      }
    } catch (err) {
      openNotificationWithIcon("error", `Bạn chỉnh sửa thất bại`);
      console.log(err);
    }
  };
};

export const xoaNguoiDungAction = (taiKhoan) => {
  return async (dispatch) => {
    try {
      let { status } = await userManagerService.xoaNguoiDung(taiKhoan);
      if (status === STATUS_CODE.SUCCESS) {
        openNotificationWithIcon("success", "Bạn đã xóa thành công");
        dispatch(layDanhSachNguoiDungAction());
      }
    } catch (err) {
      openNotificationWithIcon("error", `${err.response.data.content}`);
    }
  };
};

export const layThongTinNguoiDungAction = (taiKhoan) => {
  return async (dispatch) => {
    try {
      let { data, status } = await userManagerService.timKiemNguoiDung(
        taiKhoan
      );
      if (status === STATUS_CODE.SUCCESS) {
        // openNotificationWithIcon("success", "Bạn đã xóa thành công");
        dispatch({
          type: LAY_THONG_TIN_NGUOI_DUNG,
          thongTinNguoiDung: data.content[0],
        });
      }
    } catch (err) {
      // openNotificationWithIcon("error", `${err.response.data.content}`);
      console.log(err);
    }
  };
};

export const capNhatThongTinNguoiDungProfileAction = (obj) => {
  return async (dispatch) => {
    try {
      let { status } = await userManagerService.capNhatThongTinNguoiDungPut(
        obj
      );
      if (status === STATUS_CODE.SUCCESS) {
        dispatch(layThongTinNguoiDungAction(obj.taiKhoan));
        let user = {
          taiKhoan: obj.taiKhoan,
          matKhau: obj.matKhau,
        };
        dispatch(loginAction(user, user));
      }
    } catch (err) {
      console.log(err);
    }
  };
};
