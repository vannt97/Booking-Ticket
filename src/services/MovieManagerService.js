import { GROUPID } from "../util/SystemSetting/SystemSetting";
import baseService from "./baseService";

class MovieManagerService extends baseService {
  constructor() {
    super();
  }
  getListBannerService = () => {
    return this.get("QuanLyPhim/LayDanhSachBanner");
  };
  getListMovieService = (tenPhim = "") => {
    if (tenPhim !== "") {
      return this.get(
        `QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}&tenPhim=${tenPhim}`
      );
    }
    return this.get(`QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}`);
  };
  themPhimUpLoadHinh = (formData) => {
    return this.postAuthorization("QuanLyPhim/ThemPhimUploadHinh", formData);
  };
  layThongTinPhim = (maPhim) => {
    return this.getAuthorization(`QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`);
  };
  capNhatPhimUpLoad = (formData) => {
    return this.postAuthorization("QuanLyPhim/CapNhatPhimUpload", formData);
  };
  xoaPhim = (maPhim) => {
    return this.delete(`QuanLyPhim/XoaPhim?MaPhim=${maPhim}`);
  };
}

let movieManagerService = new MovieManagerService();

export default movieManagerService;
