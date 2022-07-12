import React, { useEffect } from "react";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Button, Input, Popconfirm, Space, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getListMovie,
  xoaPhimAction,
} from "../../../redux/actions/MovieManagementAction";
import { history } from "../../../App";
const { Search } = Input;
export default function Flims(props) {
  const dispatch = useDispatch();
  const { listMovie } = useSelector((state) => state.MovieManagementReducer);
  useEffect(() => {
    dispatch(getListMovie());
  }, []);
  const columns = [
    {
      title: "Mã Phim",
      dataIndex: "maPhim",
      sorter: {
        compare: (a, b) => a.maPhim - b.maPhim,
      },
      width: "7%",
    },
    {
      title: "Hình Ảnh",
      dataIndex: "hinhAnh",
      render: (text) => {
        return (
          <img
            src={text}
            alt={text}
            style={{ width: 50, height: 50 }}
            onError={(e) => {
              e.target.onError = null;
              e.target.src = "https://picsum.photos/50/50";
            }}
          />
        );
      },
      width: "7%",
    },
    {
      title: "Tên Phim",
      dataIndex: "tenPhim",
      width: "20%",
    },
    {
      title: "Mô tả",
      dataIndex: "moTa",
      render: (text) => {
        return (
          <span>{text.length > 100 ? `${text.substr(0, 100)}...` : text}</span>
        );
      },
      width: "",
    },
    {
      title: "Action",
      key: "action",
      width: "10%",
      render: (text, record, index) => (
        <Space size="middle">
          <button
            className="btn btn-primary"
            onClick={() => {
              history.push(`/admin/films/editfilm/${record.maPhim}`);
            }}
          >
            <EditOutlined />
          </button>
          <Popconfirm
            title="Are you sure to delete this movie?"
            onConfirm={() => {
              console.log(record);
              dispatch(xoaPhimAction(record.maPhim));
            }}
            okText="Yes"
            cancelText="No"
          >
            <button className="btn btn-danger" onClick={() => {}}>
              <DeleteOutlined />
            </button>
          </Popconfirm>
          <button
            className="btn btn-primary"
            onClick={() => {
              history.push(
                `/admin/films/showtime/${record.maPhim}/${record.tenPhim}`
              );
            }}
          >
            <CalendarOutlined />
          </button>
        </Space>
      ),
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    // console.log("params", pagination, filters, sorter, extra);
  };
  return (
    <div
      className="site-layout-background"
      style={{
        padding: 24,
      }}
    >
      <h2 className="text-4xl">Quản lý phim</h2>
      <Button
        className=""
        onClick={() => {
          history.push("/admin/addfilm");
        }}
      >
        <div className="flex items-center">
          <PlusOutlined />
          <span className="ml-2">Thêm Phim</span>
        </div>
      </Button>
      <Search
        className="mt-3"
        placeholder="nhập tên phim"
        enterButton
        onSearch={(value) => {
          dispatch(getListMovie(value));
        }}
      />
      <div className="mt-4">
        <Table
          rowKey={"maPhim"}
          columns={columns}
          dataSource={listMovie}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
