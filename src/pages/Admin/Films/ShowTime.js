import React, { useEffect, useState } from "react";
import { Button, DatePicker, Form, Input, InputNumber } from "antd";
import { Select } from "antd";
import { withFormik } from "formik";
import * as Yup from "yup";
import { connect, useDispatch } from "react-redux";
import moment from "moment";
import cinemaManagerService from "../../../services/CinemaManagerService";
import { STATUS_CODE } from "../../../util/SystemSetting/SystemSetting";
import quanLyDatVe from "../../../services/QuanLyDatVe";
import openNotificationWithIcon from "../../../util/SystemSetting/Notification";
const { Option } = Select;

function ShowTime(props) {
  const { values, touched, errors, handleChange, handleSubmit, setFieldValue } =
    props;
  const [state, setState] = useState({
    heThongRap: [],
    cumRapChieu: [],
  });
  const dispatch = useDispatch();

  useEffect(() => {
    async function getHeThongCumRap() {
      try {
        let { data, status } =
          await cinemaManagerService.getSystemCinemaService();
        if (status === STATUS_CODE.SUCCESS) {
          setState({
            ...state,
            heThongRap: data.content,
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
    getHeThongCumRap();
  }, []);
  const handleChangeInputNumber = (name) => {
    return (value) => {
      setFieldValue(name, value);
    };
  };
  const handleOk = (value) => {
    setFieldValue(
      "ngayChieuGioChieu",
      moment(value).format("DD/MM/YYYY hh:mm:ss")
    );
  };
  const handleChangeHeThongRap = async (value) => {
    // console.log(value);
    try {
      let { data, status } =
        await cinemaManagerService.layThongTinCumRapTheoHeTHong(value);
      if (status === STATUS_CODE.SUCCESS) {
        setState({
          ...state,
          cumRapChieu: data.content,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className="site-layout-background"
      style={{
        padding: 24,
      }}
    >
      <h2 className="text-4xl">
        Tạo lịch trình chiếu - {props.match.params.tenPhim}
      </h2>

      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        size={"default"}
        onSubmitCapture={handleSubmit}
      >
        <Form.Item label="Hệ Thống Rạp">
          <Select
            options={state.heThongRap.map((item, index) => ({
              label: item.tenHeThongRap,
              value: item.maHeThongRap,
            }))}
            style={{ width: 400 }}
            onChange={handleChangeHeThongRap}
          ></Select>
        </Form.Item>
        <Form.Item label="Cụm Rạp">
          <Select
            options={state.cumRapChieu.map((item, index) => ({
              label: item.tenCumRap,
              value: item.maCumRap,
            }))}
            style={{ width: 400 }}
            onChange={(value) => {
              setFieldValue("maRap", value);
            }}
          ></Select>
          {errors.maRap && touched.maRap && (
            <span className="text-red-700 ml-4">{errors.maRap}</span>
          )}
        </Form.Item>
        <Form.Item label="Ngày Chiếu Giờ Chiếu">
          <DatePicker
            format="DD/MM/YYYY HH:mm:ss"
            showTime={{ defaultValue: moment("00:00:00", "HH:mm:ss") }}
            onOk={handleOk}
          />
          {errors.ngayChieuGioChieu && touched.ngayChieuGioChieu && (
            <span className="text-red-700 ml-4">
              {errors.ngayChieuGioChieu}
            </span>
          )}
        </Form.Item>
        <Form.Item label="Giá Vé">
          <InputNumber
            min={75000}
            onChange={handleChangeInputNumber("giaVe")}
          />
          {errors.giaVe && touched.giaVe && (
            <span className="text-red-700 ml-4">{errors.giaVe}</span>
          )}
        </Form.Item>

        <Form.Item label="Tác Vụ">
          <Button htmlType="submit" type="primary">
            Tạo lịch chiếu
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

const ShowTimeFormik = withFormik({
  mapPropsToValues: (props) => {
    return {
      maPhim: props.match.params.id,
      ngayChieuGioChieu: "",
      maRap: "",
      giaVe: "",
    };
  },
  validationSchema: Yup.object().shape({
    maRap: Yup.string().required("Bạn chưa nhập Cụm Rạp"),
    ngayChieuGioChieu: Yup.string().required("Bạn chưa nhập Ngày Khởi Chiếu"),
    giaVe: Yup.number().required("Bạn chưa nhập Giá Vé"),
  }),
  handleSubmit: async (values, { props, setSubmitting }) => {
    try {
      let { status } = await quanLyDatVe.taoLichChieu(values);
      if (status === STATUS_CODE.SUCCESS) {
        openNotificationWithIcon("success", "Tạo lịch chiếu thành công");
      }
    } catch (err) {
      openNotificationWithIcon("error", "Tạo lịch chiếu thất bại");

      console.log(err);
    }

    setSubmitting(true);
  },
  displayName: "ShowTime",
})(ShowTime);

export default connect()(ShowTimeFormik);
