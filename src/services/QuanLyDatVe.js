import ThongTinDatVe from "../_core/Modules/ThongTinDatVe";
import baseService from "./baseService";
class QuanLyDatVe extends baseService {
  constructor() {
    super();
  }

  layDanhSachPhongVe = (maLichChieu) => {
    return this.get(
      `QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`
    );
  };
  datVe = (obj = new ThongTinDatVe()) => {
    return this.postAuthorization("QuanLyDatVe/DatVe", obj);
  };
  taoLichChieu = (obj) => {
    return this.postAuthorization("QuanLyDatVe/TaoLichChieu", obj);
  };
}

const quanLyDatVe = new QuanLyDatVe();

export default quanLyDatVe;
