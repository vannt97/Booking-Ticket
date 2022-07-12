import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  datVeAction,
  layDanhSachPhongVeAction,
} from "../../redux/actions/QuanLyDatVeAction";
import { UserOutlined, HomeFilled } from "@ant-design/icons";
import { CHANGE_TAB, DAT_GHE } from "../../redux/types/QuanLyDatVeType";
import ThongTinDatVe from "../../_core/Modules/ThongTinDatVe";
import styleCss from "./CheckOut.module.css";
import { Tabs, Button } from "antd";
import { getThongTinTaiKhoanAction } from "../../redux/actions/UserManagementAction";
import moment from "moment";
import { NavLink } from "react-router-dom";
const operations = (
  <NavLink to="/">
    <HomeFilled style={{ padding: 10, fontSize: 24 }} />
  </NavLink>
);
const { TabPane } = Tabs;
function CheckOut(props) {
  const dispatch = useDispatch();
  const { thongTinPhongVe, danhSachGheDangChon } = useSelector(
    (state) => state.QuanLyDatVeReducer
  );

  const { userLogin } = useSelector((state) => state.UserManagementReducer);
  let { danhSachGhe } = thongTinPhongVe;
  let thongTinPhim = { ...thongTinPhongVe.thongTinPhim };
  useEffect(() => {
    dispatch(layDanhSachPhongVeAction(props.match.params.id));
    dispatch({
      type: CHANGE_TAB,
      tabActive: "1",
    });
  }, []);
  return (
    <div className="grid grid-cols-12 h-screen">
      <div className="col-span-9">
        <div className="w-4/5 p-5   mx-auto">
          <div className="bg-black mt-5" style={{ height: 20 }}></div>
          <div className={styleCss.trapezoid}></div>
          <div className="flex flex-wrap  px-4  lg:px-0 2xl:px-4 justify-center ">
            {danhSachGhe.map((ghe, index) => {
              let classGheDaDat = ghe.daDat === true ? styleCss.gheDaDat : "";
              let classGheVip = ghe.loaiGhe === "Vip" ? styleCss.gheVip : "";
              let classGheDangDat = "";
              let _index = danhSachGheDangChon.findIndex(
                (item) => item.maGhe === ghe.maGhe
              );
              if (_index != -1) {
                classGheDangDat = styleCss.gheDangDat;
              }
              return (
                <button
                  onClick={() => {
                    dispatch({ type: DAT_GHE, gheDangDat: ghe });
                  }}
                  key={index}
                  className={`${styleCss.ghe}  ${classGheDaDat} ${classGheVip} ${classGheDangDat} flex justify-center items-center`}
                >
                  {ghe.daDat ? (
                    ghe.taiKhoanNguoiDat == userLogin.taiKhoan ? (
                      <UserOutlined />
                    ) : (
                      "X"
                    )
                  ) : (
                    ghe.tenGhe
                  )}
                </button>
              );
            })}
          </div>
          <div className={`grid grid-cols-4 gap-3 mt-5 ${styleCss.chuThich}`}>
            <div>
              <span>Ghế Thường</span>
              <div className={`${styleCss.ghe}`}></div>
            </div>
            <div>
              <span>Ghế Vip</span>
              <div className={`${styleCss.ghe} ${styleCss.gheVip}`}></div>
            </div>
            <div>
              <span>Ghế Đang Chọn</span>
              <div className={`${styleCss.ghe} ${styleCss.gheDangDat}`}></div>
            </div>
            <div>
              <span>Ghế Đã Đặt</span>
              <div className={`${styleCss.ghe} ${styleCss.gheDaDat}`}>X</div>
            </div>
            <div>
              <span>Ghế Đã Đạt Của Bạn</span>
              <div className={`${styleCss.ghe} ${styleCss.gheDaDat}`}>
                <UserOutlined />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-3 flex flex-col justify-between shadow-2xl">
        <div className="px-7 py-5">
          <div className="pb-3 text-center text-3xl border-b-2 border-dashed border-gray-600">
            <span className="text-green-700">
              {danhSachGheDangChon
                .reduce((prev, current, index) => {
                  return prev + current.giaVe;
                }, 0)
                .toLocaleString()}
              đ
            </span>
          </div>
          <div className="py-3 border-b-2 border-dashed border-gray-600">
            <p className="m-0 text-xl font-bold">{thongTinPhim.tenPhim}</p>
            <p className="m-0">{thongTinPhim.diaChi}</p>
            <p className="m-0">
              {thongTinPhim.ngayChieu}-{thongTinPhim.gioChieu}
            </p>
          </div>
          <div className="py-3 border-b-2 border-dashed border-gray-600 ">
            {danhSachGheDangChon.map((ghe, index) => {
              return (
                <div className="flex justify-between" key={index}>
                  <span className="text-red-700">Ghế {ghe.tenGhe}</span>
                  <span>{ghe.giaVe.toLocaleString()}đ</span>
                </div>
              );
            })}
          </div>
          <div className="py-3 border-b-2 border-dashed border-gray-600 ">
            <span className="text-gray-500 text-xs">E-Mail</span>
            <p className="m-0 text-lg">{userLogin.email}</p>
          </div>
          <div className="py-3 border-gray-600 ">
            <span className="text-gray-500 text-xs">Phone</span>
            <p className="m-0 text-lg">0374225576</p>
          </div>
        </div>
        <div>
          <p className="px-10 text-center">
            Vé đã mua không thể đổi hoặc hoàn tiền mã vé sẽ được gửi qua tin
            nhắn <span className="text-yellow-700">ZMS</span> (tin nhắn Zalo) và{" "}
            <span className="text-yellow-700">Email</span> đã nhập
          </p>
          <button
            className="bg-slate-800 text-gray-300 w-full py-3 text-xl"
            onClick={() => {
              let thongTinDatVe = new ThongTinDatVe();
              thongTinDatVe.maLichChieu = props.match.params.id;
              thongTinDatVe.danhSachVe = danhSachGheDangChon;
              dispatch(datVeAction(thongTinDatVe));
            }}
          >
            Đặt vé
          </button>
        </div>
      </div>
    </div>
  );
}

export default function (props) {
  let { tabActive } = useSelector((state) => state.QuanLyDatVeReducer);
  const dispatch = useDispatch();
  return (
    <div>
      <Tabs
        tabBarExtraContent={operations}
        defaultActiveKey="1"
        activeKey={tabActive}
        onChange={(key) => {
          dispatch({
            type: CHANGE_TAB,
            tabActive: key,
          });
        }}
      >
        <TabPane
          tab={
            <div className={styleCss.tabBarCustTom}>
              01 CHỌN GHẾ & THANH TOÁN
            </div>
          }
          key="1"
        >
          <CheckOut {...props} />
        </TabPane>
        <TabPane
          tab={<div className={styleCss.tabBarCustTom}>02 KẾT QUẢ ĐẶT VÉ</div>}
          key="2"
        >
          <KetQuaDatVe {...props} />
        </TabPane>
      </Tabs>
    </div>
  );
}

function KetQuaDatVe(props) {
  const dispatch = useDispatch();
  const { thongTinTaiKhoan } = useSelector(
    (state) => state.UserManagementReducer
  );

  useEffect(() => {
    dispatch(getThongTinTaiKhoanAction());
  }, []);
  const renderLichSuDatVe = () => {
    return thongTinTaiKhoan.thongTinDatVe?.map((info, index) => {
      return (
        <div className="p-2 lg:w-1/3 md:w-1/2 w-full" key={index}>
          <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
            <div className="flex-grow">
              <h2 className="text-gray-900 title-font font-medium">
                {info.tenPhim}
              </h2>
              <p className="text-gray-500">
                Giờ chiếu: {moment(info.ngayDat).format("hh:mm - A")} - Ngày
                chiếu: {moment(info.ngayDat).format("DD-MM-YYYY")}
              </p>
              <p>Địa điểm: {info.danhSachGhe[0].tenHeThongRap}</p>
              <div>
                Tên rạp: {info.danhSachGhe[0].tenCumRap} - Ghế đã đặt:{" "}
                {info.danhSachGhe.map((ghe, indexChild) => {
                  return (
                    <span className="text-gray-900" key={indexChild}>
                      [ {ghe.tenGhe} ]
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      );
    });
  };
  return (
    <section className="text-gray-600 body-font">
      <div className="container  py-24 mx-auto" style={{ maxWidth: "1280px" }}>
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Lịch sử đặt vé khách hàng
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            Hãy xem thông tin địa điểm và thời gian để xem phim vui vẻ bạn nhé
          </p>
        </div>
        <div className="flex flex-wrap -m-2">{renderLichSuDatVe()}</div>
      </div>
    </section>
  );
}
