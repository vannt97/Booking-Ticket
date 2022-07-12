import React, { useEffect } from "react";
import { CustomCard } from "@tsamantanis/react-glassmorphism";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { StarFilled } from "@ant-design/icons";
import { Radio, Space, Tabs } from "antd";
import "@tsamantanis/react-glassmorphism/dist/index.css";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  getSystemCinema,
  layThongTinLichChieuPhimAction,
} from "../../redux/actions/CinemaManagementAction";

const { TabPane } = Tabs;

export default function Detail(props) {
  const dispatch = useDispatch();
  const { movieDetail } = useSelector((state) => state.MovieManagementReducer);
  let classActive = movieDetail.heThongRapChieu == "" ? "" : "bg-white";
  const { t } = useTranslation();

  // console.log(classActive);
  useEffect(() => {
    let { id } = props.match.params;
    dispatch(layThongTinLichChieuPhimAction(id));
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${movieDetail?.hinhAnh})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100% ",
        minHeight: "100vh",
        backgroundPosition: "center",
      }}
    >
      <CustomCard
        style={{ minHeight: "100vh", padding: "0" }}
        effectColor="#000" // required
        color="#000" // default color is white
        blur={40} // default blur value is 10px
        borderRadius={1} // default border radius value is 10px
      >
        <div className="container mx-auto pt-10">
          <div className="grid grid-cols-4">
            <img
              src={movieDetail?.hinhAnh}
              alt={movieDetail.biDanh}
              className="rounded-lg"
              style={{
                width: 260,
                height: 380,
              }}
            />
            <div className="p-4 text-white col-span-2">
              <p>
                {t("Ngày khởi chiếu")}:{" "}
                {moment(movieDetail.ngayKhoiChieu).format("DD/MM/YYYY")}
              </p>
              <h2 className="text-4xl text-white">{movieDetail.tenPhim}</h2>
              <span className="text-xl ">{t("Nội dung")}</span>
              <p className="mt-3">{movieDetail.moTa}</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className={`c100 p${movieDetail.danhGia * 10} `}>
                <span className="text-black">{movieDetail.danhGia}/10</span>
                <div className="slice">
                  <div className="bar"></div>
                  <div className="fill"></div>
                </div>
              </div>
              <div className="text-center">
                <span className="">{t("Đánh Giá")}</span>
                <div className=" ">
                  <StarFilled style={{ color: "yellow", marginRight: "5px" }} />
                  <StarFilled style={{ color: "yellow", marginRight: "5px" }} />
                  <StarFilled style={{ color: "yellow", marginRight: "5px" }} />
                  <StarFilled style={{ color: "yellow", marginRight: "5px" }} />
                  <StarFilled style={{ color: "yellow", marginRight: "5px" }} />
                </div>
              </div>
            </div>
          </div>
          <div className={`mt-10 ${classActive} p-5`}>
            <Tabs defaultActiveKey="1">
              <TabPane tab={t("Lịch Chiếu")} key="1">
                <Tabs tabPosition={"left"}>
                  {movieDetail.heThongRapChieu?.map((htr, index) => {
                    return (
                      <TabPane
                        tab={
                          <img
                            src={htr.logo}
                            alt={htr.logo}
                            className="rounded-full"
                            style={{ width: 50, height: 50 }}
                          />
                        }
                        key={index}
                      >
                        {htr.cumRapChieu.map((rapChieu, index_child) => {
                          return (
                            <div className="flex" key={index_child}>
                              <img
                                src={rapChieu.hinhAnh}
                                alt={rapChieu.hinhAnh}
                                style={{ width: 70, height: 70 }}
                              />
                              <div className="ml-3">
                                <p className="m-0 font-bold">
                                  {rapChieu.tenCumRap}
                                </p>
                                <p>{rapChieu.diaChi}</p>
                                <div className="grid grid-cols-4 gap-2">
                                  {rapChieu.lichChieuPhim.map(
                                    (lichChieu, index_child) => {
                                      return (
                                        <NavLink
                                          to={`/checkout/${lichChieu.maLichChieu}`}
                                          key={index_child}
                                          className="border-2 border-blue-500 rounded-md text-center px-3 "
                                        >
                                          {moment(
                                            lichChieu.ngayChieuGioChieu
                                          ).format("hh:mm A")}
                                        </NavLink>
                                      );
                                    }
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </TabPane>
                    );
                  })}
                </Tabs>
              </TabPane>
              <TabPane tab={t("Thông tin")} key={2}></TabPane>
              <TabPane tab={t("Đánh Giá")} key={3}></TabPane>
            </Tabs>
          </div>
        </div>
      </CustomCard>
    </div>
  );
}
