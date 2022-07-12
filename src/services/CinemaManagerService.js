import { GROUPID } from "../util/SystemSetting/SystemSetting";
import baseService from "./baseService";

class CinemaManagerService extends baseService {
  constructor() {
    super();
  }
  getSystemCinemaService = () => {
    return this.get(
      `QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUPID}`
    );
  };
  layThongTinLichChieuPhim = (maPhim) => {
    return this.get(`QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`);
  };
  getListLogoHeThongRap = () => {
    return this.get(`QuanLyRap/LayThongTinHeThongRap`);
  };
  layThongTinCumRapTheoHeTHong = (maHeThongRap) => {
    return this.get(
      `QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`
    );
  };
}

let cinemaManagerService = new CinemaManagerService();

export default cinemaManagerService;
