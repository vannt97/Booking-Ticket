import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { history } from "../../../../App";
import {
  TOKEN,
  USER_LOGIN,
} from "../../../../util/SystemSetting/SystemSetting";
import { useTranslation } from "react-i18next";
import { Popover } from "antd";
import { GET_USER_LOGIN } from "../../../../redux/types/UserManagementType";

export default function Header() {
  let { userLogin } = useSelector((state) => state.UserManagementReducer);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  return (
    <header className="px-4  fixed  w-full bg-black text-white z-10">
      <div className="container flex justify-between h-16 mx-auto">
        <NavLink
          rel="noopener noreferrer"
          to="/"
          aria-label="Back to homepage"
          className="flex items-center p-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 32 32"
            className="w-8 h-8 dark:text-violet-400"
          >
            <path d="M27.912 7.289l-10.324-5.961c-0.455-0.268-1.002-0.425-1.588-0.425s-1.133 0.158-1.604 0.433l0.015-0.008-10.324 5.961c-0.955 0.561-1.586 1.582-1.588 2.75v11.922c0.002 1.168 0.635 2.189 1.574 2.742l0.016 0.008 10.322 5.961c0.455 0.267 1.004 0.425 1.59 0.425 0.584 0 1.131-0.158 1.602-0.433l-0.014 0.008 10.322-5.961c0.955-0.561 1.586-1.582 1.588-2.75v-11.922c-0.002-1.168-0.633-2.189-1.573-2.742zM27.383 21.961c0 0.389-0.211 0.73-0.526 0.914l-0.004 0.002-10.324 5.961c-0.152 0.088-0.334 0.142-0.53 0.142s-0.377-0.053-0.535-0.145l0.005 0.002-10.324-5.961c-0.319-0.186-0.529-0.527-0.529-0.916v-11.922c0-0.389 0.211-0.73 0.526-0.914l0.004-0.002 10.324-5.961c0.152-0.090 0.334-0.143 0.53-0.143s0.377 0.053 0.535 0.144l-0.006-0.002 10.324 5.961c0.319 0.185 0.529 0.527 0.529 0.916z"></path>
            <path d="M22.094 19.451h-0.758c-0.188 0-0.363 0.049-0.515 0.135l0.006-0.004-4.574 2.512-5.282-3.049v-6.082l5.282-3.051 4.576 2.504c0.146 0.082 0.323 0.131 0.508 0.131h0.758c0.293 0 0.529-0.239 0.529-0.531v-0.716c0-0.2-0.11-0.373-0.271-0.463l-0.004-0.002-5.078-2.777c-0.293-0.164-0.645-0.26-1.015-0.26-0.39 0-0.756 0.106-1.070 0.289l0.010-0.006-5.281 3.049c-0.636 0.375-1.056 1.055-1.059 1.834v6.082c0 0.779 0.422 1.461 1.049 1.828l0.009 0.006 5.281 3.049c0.305 0.178 0.67 0.284 1.061 0.284 0.373 0 0.723-0.098 1.027-0.265l-0.012 0.006 5.080-2.787c0.166-0.091 0.276-0.265 0.276-0.465v-0.716c0-0.293-0.238-0.529-0.529-0.529z"></path>
          </svg>
        </NavLink>
        <ul className="items-stretch hidden space-x-3 lg:flex">
          <li className="flex">
            <NavLink
              rel="noopener noreferrer"
              to="/home"
              className="flex items-center px-4 -mb-1 text-white"
              activeClassName="border-b-4 border-indigo-500"
            >
              {t("Trang Chủ")}
            </NavLink>
          </li>
          <li className="flex">
            <NavLink
              rel="noopener noreferrer"
              to="/home"
              className="flex items-center px-4 -mb-1 text-white "
              activeClassName="border-b-4 border-indigo-500"
            >
              {t("Tin Tức")}
            </NavLink>
          </li>
          <li className="flex">
            <NavLink
              rel="noopener noreferrer"
              to="/home"
              className="flex items-center px-4 -mb-1 text-white "
              activeClassName="border-b-4 border-indigo-500"
            >
              {t("Liên Hệ")}
            </NavLink>
          </li>
        </ul>
        {localStorage.getItem(USER_LOGIN) ? (
          <Popover
            placement="bottomRight"
            content={() => {
              return (
                <div className="flex flex-col text-left">
                  <NavLink to="/profile" className="text-left mb-2 text-black">
                    Profile
                  </NavLink>
                  <NavLink to="/admin" className="text-left mb-2 text-black">
                    Admin
                  </NavLink>
                  <button
                    className="text-left"
                    onClick={() => {
                      localStorage.setItem(TOKEN, "");
                      localStorage.setItem(USER_LOGIN, "");
                      dispatch({ type: GET_USER_LOGIN, userLogin: {} });
                    }}
                  >
                    Đăng Xuất
                  </button>
                </div>
              );
            }}
            trigger="click"
          >
            <div className="items-center flex-shrink-0 hidden lg:flex mr-5 cursor-pointer">
              <img
                src="https://picsum.photos/50/50"
                alt="hinh anh"
                className="rounded-full"
                style={{ width: 40, height: 40 }}
              />
              <p className="ml-4 mb-0">{userLogin?.hoTen}</p>
            </div>
          </Popover>
        ) : (
          <div className="items-center flex-shrink-0 hidden lg:flex">
            <button
              onClick={() => {
                history.push("/login");
              }}
              className="self-center px-8 py-3 rounded"
            >
              Đăng Nhập
            </button>
            <button
              onClick={() => {
                history.push("/signup");
              }}
              className="self-center px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-gray-900"
            >
              Đăng Ký
            </button>
          </div>
        )}

        <button className="p-4 lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 dark:text-gray-100"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
    </header>
  );
}
