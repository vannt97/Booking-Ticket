import { GROUPID } from "../util/SystemSetting/SystemSetting";
import baseService from "./baseService";
class UserManagerService extends baseService {
  constructor() {
    super();
  }
  signUp = (infoUser) => {
    return this.post("QuanLyNguoiDung/DangKy", infoUser);
  };
  getInfoUserLogin = (user) => {
    return this.post(`QuanLyNguoiDung/DangNhap`, user);
  };
  getThongTinTaiKhoan = () => {
    return this.postAuthorizationNotValue("QuanLyNguoiDung/ThongTinTaiKhoan");
  };
  layDanhSachNguoiDung = () => {
    return this.get(`QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}`);
  };
  layDanhSachLoaiNguoiDung = () => {
    return this.get(`QuanLyNguoiDung/LayDanhSachLoaiNguoiDung`);
  };
  themNguoiDung = (infoUser) => {
    return this.postAuthorization(`QuanLyNguoiDung/ThemNguoiDung`, infoUser);
  };
  timKiemNguoiDung = (taiKhoan) => {
    return this.get(
      `QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=${GROUPID}&tuKhoa=${taiKhoan}`
    );
  };
  capNhatThongTinNguoiDung = (obj) => {
    return this.postAuthorization(
      `QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
      obj
    );
  };
  xoaNguoiDung = (taiKhoan) => {
    return this.delete(`QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`);
  };
  capNhatThongTinNguoiDungPut = (obj) => {
    return this.put(`QuanLyNguoiDung/CapNhatThongTinNguoiDung`, obj);
  };
}

let userManagerService = new UserManagerService();
export default userManagerService;
