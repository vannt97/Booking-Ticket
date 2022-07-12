import React, { useEffect, useState } from "react";
import { Button, DatePicker, Form, Input, InputNumber, Switch } from "antd";
import { withFormik } from "formik";
import * as Yup from "yup";
import { connect, useDispatch } from "react-redux";
import moment from "moment";
import { GROUPID } from "../../../util/SystemSetting/SystemSetting";
import { themPhimUpLoadHinhAction } from "../../../redux/actions/MovieManagementAction";

function Addfilm(props) {
  const [srcState, setSrcState] = useState();
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = props;
  const handleChangeDate = (name) => {
    return (value) => {
      setFieldValue(name, moment(value).format("DD-MM-YYYY"));
    };
  };
  const handleChangeSwitch = (name) => {
    return (value) => {
      setFieldValue(name, value);
    };
  };
  const handleChangeInputNumber = (name) => {
    return (value) => {
      setFieldValue(name, value);
    };
  };
  const handleChangeFile = async (e) => {
    let file = e.target.files[0];
    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/gif" ||
      file.type === "image/png"
    ) {
      let reader = new FileReader();
      await setFieldValue("hinhAnh", file);
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        //   console.log(e.target.result);
        setSrcState(e.target.result);
      };
    }
  };
  return (
    <div
      className="site-layout-background"
      style={{
        padding: 24,
      }}
    >
      <h2 className="text-4xl">Thêm Phim Mới</h2>

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
        <Form.Item label="Tên Phim">
          <Input onChange={handleChange} name="tenPhim" />
          {errors.tenPhim && touched.tenPhim && (
            <span className="text-red-700">{errors.tenPhim}</span>
          )}
        </Form.Item>
        <Form.Item label="Trailer">
          <Input onChange={handleChange} name="trailer" />
          {errors.trailer && touched.trailer && (
            <span className="text-red-700 ">{errors.trailer}</span>
          )}
        </Form.Item>
        <Form.Item label="Mô Tả">
          <Input onChange={handleChange} name="moTa" />
          {errors.moTa && touched.moTa && (
            <span className="text-red-700">{errors.moTa}</span>
          )}
        </Form.Item>
        <Form.Item label="Ngày Khởi Chiếu">
          <DatePicker
            format={"DD/MM/YYYY"}
            onChange={handleChangeDate("ngayKhoiChieu")}
          />
          {errors.ngayKhoiChieu && touched.ngayKhoiChieu && (
            <span className="text-red-700 ml-5">{errors.ngayKhoiChieu}</span>
          )}
        </Form.Item>
        <Form.Item label="Đang chiếu" valuePropName="checked">
          <Switch onChange={handleChangeSwitch("dangChieu")} />
        </Form.Item>
        <Form.Item label="Sắp chiếu" valuePropName="checked">
          <Switch onChange={handleChangeSwitch("sapChieu")} />
        </Form.Item>
        <Form.Item label="Hot" valuePropName="checked">
          <Switch onChange={handleChangeSwitch("hot")} />
        </Form.Item>
        <Form.Item label="Số Sao">
          <InputNumber
            onChange={handleChangeInputNumber("danhGia")}
            name="danhGia"
          />
          {errors.danhGia && touched.danhGia && (
            <span className="text-red-700">{errors.danhGia}</span>
          )}
        </Form.Item>
        <Form.Item label="Hình Ảnh">
          <input
            type="file"
            onChange={handleChangeFile}
            accept="image/png, image/jpeg,image/gif,image/png"
          />
          <br />
          <img style={{ width: 150, height: 200 }} src={srcState} alt="..." />
        </Form.Item>
        <Form.Item label="Tác Vụ">
          <Button htmlType="submit" type="primary">
            Thêm
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

const AddfilmFormik = withFormik({
  mapPropsToValues: () => {
    return {
      dangChieu: false,
      danhGia: "",
      hinhAnh: {},
      hot: false,
      moTa: "",
      ngayKhoiChieu: "",
      sapChieu: false,
      tenPhim: "",
      trailer: "",
      maNhom: GROUPID,
    };
  },
  validationSchema: Yup.object().shape({
    tenPhim: Yup.string().required("Bạn chưa nhập Tên Phim"),
    trailer: Yup.string().required("Bạn chưa nhập trailer"),
    moTa: Yup.string().required("Bạn chưa nhập Mô Tả"),
    ngayKhoiChieu: Yup.string().required("Bạn chưa nhập Ngày Khởi Chiếu"),
    danhGia: Yup.number().required("Bạn chưa nhập Đánh Giá"),
    hinhAnh: Yup.string().required("Bạn chưa nhập Hình Ảnh"),
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    // let { email, passWord } = values;
    let formData = new FormData();
    for (let key in values) {
      if (key === "hinhAnh") {
        formData.append("File", values[key], values[key].name);
      } else {
        formData.append(key, values[key]);
      }
    }
    props.dispatch(themPhimUpLoadHinhAction(formData));
    // console.log(props);
    setSubmitting(true);
  },
  displayName: "Addfilm",
})(Addfilm);

export default connect()(AddfilmFormik);
