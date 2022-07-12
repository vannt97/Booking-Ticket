import React, { useRef, useState } from "react";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Popconfirm } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  layDanhSachNguoiDungAction,
  xoaNguoiDungAction,
} from "../../redux/actions/UserManagementAction";
import { history } from "../../App";
const { Search } = Input;
const UserManagement = () => {
  let dispatch = useDispatch();
  let { listUser } = useSelector((state) => state.UserManagementReducer);
  useEffect(() => {
    dispatch(layDanhSachNguoiDungAction());
  }, []);
  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Tài Khoản",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
    },
    {
      title: "Họ Tên",
      key: "hoTen",
      dataIndex: "hoTen",
    },
    {
      title: "Số Điện Thoại",
      key: "soDt",
      dataIndex: "soDt",
    },
    {
      title: "Mật Khẩu",
      key: "matKhau",
      dataIndex: "matKhau",
    },
    {
      title: "Mã Loại Người Dùng",
      key: "maLoaiNguoiDung",
      dataIndex: "maLoaiNguoiDung",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record, index) => {
        return (
          <Space size="middle">
            <button
              className="btn btn-primary"
              onClick={() => {
                history.push(
                  `/admin/usermanagement/edituser/${record.taiKhoan}`
                );
              }}
            >
              <EditOutlined />
            </button>
            <Popconfirm
              title="Are you sure to delete this user?"
              onConfirm={() => {
                dispatch(xoaNguoiDungAction(record.taiKhoan));
              }}
              okText="Yes"
              cancelText="No"
            >
              <button className="btn btn-danger">
                <DeleteOutlined />
              </button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
  return (
    <div
      className="site-layout-background"
      style={{
        padding: 24,
      }}
    >
      <h2 className=" mt-4 text-4xl">User Management</h2>
      <Button
        className="mb-3"
        onClick={() => {
          history.push("/admin/usermanagement/adduser");
        }}
      >
        <div className="flex items-center">
          <PlusOutlined />
          <span className="ml-2">Thêm User</span>
        </div>
      </Button>
      <div>
        <Search
          style={{
            width: "90%",
            marginRight: "10px",
          }}
          placeholder="input search text"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={() => {}}
        />
      </div>
      <br />
      <Table
        columns={columns}
        bordered="true"
        dataSource={listUser}
        rowKey="email"
      />
    </div>
  );
};

export default UserManagement;
