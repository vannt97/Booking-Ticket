import { Tabs } from "antd";
import React, { useState } from "react";
import cssStyle from "./HomeMenu.module.css";
import { NavLink } from "react-router-dom";
import moment from "moment";
import { withTranslation } from "react-i18next";

const { TabPane } = Tabs;
function HomeMenu1(props) {
  const [tabPosition, setTabPosition] = useState("left");

  const renderLichChieuFilm = (lstLichChieuTheoPhim) => {
    return lstLichChieuTheoPhim.map((lichChieu, index) => {
      return (
        <NavLink
          to={`/checkout/${lichChieu.maLichChieu}`}
          key={index}
          className="border-2 border-blue-500 rounded-md text-center"
        >
          {moment(lichChieu.ngayChieuGioChieu).format("hh:mm A")}
        </NavLink>
      );
    });
  };
  const renderDanhSachPhim = (danhSachPhim) => {
    return danhSachPhim.map((movie, index) => {
      let classItem = index === 0 ? "pb-5" : "py-5";
      let lstLichChieuTheoPhim = movie.lstLichChieuTheoPhim.splice(0, 8);
      return (
        <div
          className={`flex ${classItem} border-b-2 border-gray-100`}
          style={{ height: 150 }}
          key={index}
        >
          <img
            src={movie.hinhAnh}
            alt={movie.hinhAnh}
            className={`${cssStyle.sizeImgLarg} rounded-lg mr-4`}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://picsum.photos/75/75";
            }}
          />
          <div className="text-left flex-1">
            <p className="text-base font-bold m-0">{movie.tenPhim}</p>
            <span className="text-xs font-bold">2D Phụ đề</span>
            <div className="grid grid-cols-4 gap-2 ">
              {renderLichChieuFilm(lstLichChieuTheoPhim)}
            </div>
          </div>
        </div>
      );
    });
  };
  const renderCumRap = (systemCinema) => {
    let lstCumRap = systemCinema.lstCumRap.splice(0, 6);
    return lstCumRap.map((cinema, index_child) => {
      let danhSachPhim = cinema.danhSachPhim.splice(0, 4);
      return (
        <TabPane
          tab={
            <div className="flex">
              <img
                src={cinema.hinhAnh}
                alt={cinema.hinhAnh}
                className={cssStyle.sizeImg}
              />
              <div className="text-left ml-2">
                <p className="m-0 text-xs">{cinema.tenCumRap}</p>
                <p className="m-0 text-xs">
                  {cinema.diaChi.length > 40
                    ? `${cinema.diaChi.slice(0, 40)}...`
                    : cinema.diaChi}
                </p>
                <span className="text-red-700 text-xs">[Chi Tiết]</span>
              </div>
            </div>
          }
          key={index_child}
        >
          {renderDanhSachPhim(danhSachPhim)}
        </TabPane>
      );
    });
  };
  const renderSystemCinema = () => {
    return props.systemsCinema.map((systemCinema, index) => {
      return (
        <TabPane
          tab={
            <img
              src={systemCinema.logo}
              alt={systemCinema.maHeThongRap}
              className={cssStyle.sizeImg}
            />
          }
          key={index}
        >
          <Tabs tabPosition={tabPosition}>{renderCumRap(systemCinema)}</Tabs>
        </TabPane>
      );
    });
  };
  const changeTabPosition = (e) => {
    setTabPosition(e.target.value);
  };
  return (
    <>
      <h2 className="text-center text-3xl text-red-700 mb-10">
        {props.t("Lịch Chiếu Phim")}
      </h2>
      <Tabs tabPosition={tabPosition}>{renderSystemCinema()}</Tabs>
    </>
  );
}
const HomeMenu = React.memo(HomeMenu1);

export default withTranslation()(HomeMenu);
