import React from "react";
import { NavLink } from "react-router-dom";
import { useFormik, withFormik } from "formik";
import { connect } from "react-redux";
import * as Yup from "yup";
import { loginAction } from "../../redux/actions/UserManagementAction";
function Login(props) {
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    props;

  return (
    <div className="lg:w-1/2 xl:max-w-screen-sm">
      <div className="py-12 bg-indigo-100 lg:bg-white flex justify-center lg:justify-start lg:px-12">
        <div className="cursor-pointer flex items-center">
          <div>
            <svg
              className="w-10 text-indigo-500"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              version="1.1"
              id="Layer_1"
              x="0px"
              y="0px"
              viewBox="0 0 225 225"
              style={{ enableBackground: "new 0 0 225 225" }}
              xmlSpace="preserve"
            >
              <style
                type="text/css"
                dangerouslySetInnerHTML={{
                  __html:
                    "\n                                    .st0{fill:none;stroke:currentColor;stroke-width:20;stroke-linecap:round;stroke-miterlimit:3;}\n                                ",
                }}
              />
              <g transform="matrix( 1, 0, 0, 1, 0,0) ">
                <g>
                  <path
                    id="Layer0_0_1_STROKES"
                    className="st0"
                    d="M173.8,151.5l13.6-13.6 M35.4,89.9l29.1-29 M89.4,34.9v1 M137.4,187.9l-0.6-0.4     M36.6,138.7l0.2-0.2 M56.1,169.1l27.7-27.6 M63.8,111.5l74.3-74.4 M87.1,188.1L187.6,87.6 M110.8,114.5l57.8-57.8"
                  />
                </g>
              </g>
            </svg>
          </div>
          <div className="text-2xl text-indigo-800 tracking-wide ml-2 font-semibold">
            <a href="/" className="text-indigo-800">
              Trang Chủ
            </a>
          </div>
        </div>
      </div>
      <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
        <h2
          className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
              xl:text-bold"
        >
          Đăng Nhập
        </h2>
        <div className="mt-12">
          <form onSubmit={handleSubmit}>
            <div>
              <div className="text-sm font-bold text-gray-700 tracking-wide">
                Tài Khoản
              </div>
              <input
                className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                type="text"
                placeholder="mike"
                name="taiKhoan"
                onChange={handleChange}
              />
              {errors.taiKhoan && touched.taiKhoan && (
                <span className="text-red-700">{errors.taiKhoan}</span>
              )}
            </div>
            <div className="mt-8">
              <div className="flex justify-between items-center">
                <div className="text-sm font-bold text-gray-700 tracking-wide">
                  Mật Khẩu
                </div>
                <div>
                  <a
                    className="text-xs font-display font-semibold text-indigo-600 hover:text-indigo-800
                                  cursor-pointer"
                  >
                    Quên mật khẩu?
                  </a>
                </div>
              </div>
              <input
                className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                type="password"
                name="matKhau"
                placeholder="nhập mật khảu của bạn"
                onChange={handleChange}
              />
              {errors.matKhau && touched.matKhau && (
                <span className="text-red-700">{errors.matKhau}</span>
              )}
            </div>
            <div className="mt-10">
              <button
                type="submit"
                className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                          font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                          shadow-lg"
              >
                Đăng Nhập
              </button>
            </div>
          </form>
          <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
            Chưa có tài khoản ?{" "}
            <NavLink
              to="/signup"
              className="cursor-pointer text-indigo-600 hover:text-indigo-800"
            >
              Đăng ký
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
const LoginFormik = withFormik({
  mapPropsToValues: () => {
    return {
      matKhau: "",
      taiKhoan: "",
    };
  },
  validationSchema: Yup.object().shape({
    taiKhoan: Yup.string().required("Bạn chưa nhập tài khoản"),

    matKhau: Yup.string().required("Bạn chưa nhập mật khẩu"),
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    // let { email, passWord } = values;
    setSubmitting(true);
    props.dispatch(loginAction(values));
  },
  displayName: "Login",
})(Login);

export default connect()(LoginFormik);
