import { Input, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import userManagerService from "../../services/UserManagerService";
import { GROUPID, STATUS_CODE } from "../../util/SystemSetting/SystemSetting";
import HomeCarousel from "../Home/HomeCarousel/HomeCarousel";
import { withFormik } from "formik";
import * as Yup from "yup";
import { EditOutlined } from "@ant-design/icons";
import {
  capNhatThongTinNguoiDungProfileAction,
  getThongTinTaiKhoanAction,
  layThongTinNguoiDungAction,
} from "../../redux/actions/UserManagementAction";
const { TabPane } = Tabs;
const onChange = (key) => {
  console.log(key);
};

function Profile(props) {
  const { userLogin } = useSelector((state) => state.UserManagementReducer);
  const { thongTinTaiKhoan } = useSelector(
    (state) => state.UserManagementReducer
  );
  const dispatch = useDispatch();

  const [user, setUser] = useState({});

  const [visibleHoTen, setvisibleHoTen] = useState(false);
  const [visibleMatKhau, setvisibleMatKhau] = useState(false);
  const [visibleSdt, setvisibleSdt] = useState(false);
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = props;
  let { email, taiKhoan, hoTen, soDt, matKhau } = values;
  useEffect(() => {
    dispatch(layThongTinNguoiDungAction(userLogin.taiKhoan));
    dispatch(getThongTinTaiKhoanAction());
  }, []);

  return (
    <>
      <HomeCarousel />
      <div className="container mx-auto py-10">
        <Tabs defaultActiveKey="1" onChange={onChange}>
          <TabPane tab={<span>Thông Tin Cá Nhân</span>} key="1">
            <form
              className="p-4 grid grid-cols-2 gap-4"
              onSubmitCapture={handleSubmit}
            >
              <div>
                <span className="">Email:</span> <span>{email}</span>
              </div>
              <div>
                <span className="">Tài Khoản:</span>
                <span>{taiKhoan}</span>
              </div>
              <div>
                <span className="">Họ tên:</span>
                {visibleHoTen ? (
                  <input
                    name="hoTen"
                    onChange={handleChange}
                    className="border border-black ml-3 px-2"
                    value={hoTen}
                  />
                ) : (
                  <>
                    <span>{hoTen}</span>
                    <span
                      className="ml-3 cursor-pointer "
                      onClick={() => {
                        setvisibleHoTen(true);
                      }}
                    >
                      <EditOutlined />
                    </span>
                  </>
                )}
              </div>
              <div>
                <span className="">Mật Khẩu:</span>
                {visibleMatKhau ? (
                  <input
                    name="matKhau"
                    onChange={handleChange}
                    className="border border-black ml-3 px-2"
                    value={matKhau}
                  />
                ) : (
                  <>
                    <span>{matKhau}</span>
                    <span
                      className="ml-3 cursor-pointer "
                      onClick={() => {
                        setvisibleMatKhau(true);
                      }}
                    >
                      <EditOutlined />
                    </span>
                  </>
                )}
              </div>
              <div>
                <span className="">Số điện thoại:</span>{" "}
                {visibleSdt ? (
                  <input
                    name="soDt"
                    onChange={handleChange}
                    className="border border-black ml-3 px-2"
                    value={soDt}
                  />
                ) : (
                  <>
                    <span>{soDt}</span>
                    <span
                      className="ml-3 cursor-pointer "
                      onClick={() => {
                        setvisibleSdt(true);
                      }}
                    >
                      <EditOutlined />
                    </span>
                  </>
                )}
              </div>
              <div></div>
              <div></div>
              <div>
                <button
                  type="submit"
                  className="bg-blue-700 px-4 py-2 text-white"
                  onClick={() => {
                    setvisibleHoTen(false);
                    setvisibleMatKhau(false);
                    setvisibleSdt(false);
                  }}
                >
                  Cập Nhật
                </button>
              </div>
            </form>
          </TabPane>
          <TabPane tab={<span>Lịch Sử Đặt Vé</span>} key="2">
            {thongTinTaiKhoan.thongTinDatVe?.map((info, index) => {
              return (
                <div className="grid grid-cols-9 mb-4" key={index}>
                  <div className="text-right ">
                    <img
                      src={info.hinhAnh}
                      alt="hinh-anh-rap"
                      style={{ width: 120, height: 150 }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://picsum.photos/90/90";
                      }}
                    />
                  </div>
                  <div className="col-span-7 ml-3">
                    <h3 className="text-3xl font-bold">{info.tenPhim}</h3>
                    <p>Địa điểm: {info.danhSachGhe[0]?.tenHeThongRap} </p>
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
              );
            })}
          </TabPane>
        </Tabs>
      </div>
    </>
  );
}

const ProfileFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    let { email, taiKhoan, hoTen, soDt, matKhau, maLoaiNguoiDung } =
      props.thongTinNguoiDung;
    return {
      email,
      taiKhoan,
      hoTen,
      soDt,
      matKhau,
      maLoaiNguoiDung,
      maNhom: GROUPID,
    };
  },
  validationSchema: Yup.object().shape({
    // taiKhoan: Yup.string().required("Bạn chưa nhập Tài Khoản"),
    hoTen: Yup.string().required("Bạn chưa nhập Họ tên"),
    matKhau: Yup.string().required("Bạn chưa nhập mật khẩu"),
    // maLoaiNguoiDung: Yup.string().required("Bạn chưa nhập mã loại người dùng"),
    soDt: Yup.string()
      .required("Bạn chưa nhập số điện thoại")
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        "số điện thoại không hợp lệ"
      ),
    // email: Yup.string()
    //   .required("Bạn chưa nhập email")
    //   .email("email không hợp lệ"),
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    // let { email, passWord } = values;
    // props.dispatch(capNhatThongTinNguoiDungAction(values));
    props.dispatch(capNhatThongTinNguoiDungProfileAction(values));
    setSubmitting(true);
  },
  displayName: "Profile",
})(Profile);

const mapPropsToState = (state) => {
  return {
    thongTinNguoiDung: state.UserManagementReducer.thongTinNguoiDung,
  };
};
export default connect(mapPropsToState)(ProfileFormik);
