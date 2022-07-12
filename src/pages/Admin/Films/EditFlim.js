import React, { useEffect, useState } from "react";
import { Button, DatePicker, Form, Input, InputNumber, Switch } from "antd";
import { withFormik } from "formik";
import * as Yup from "yup";
import { connect, useDispatch } from "react-redux";
import moment from "moment";
import { GROUPID } from "../../../util/SystemSetting/SystemSetting";
import {
  capNhatPhimUpLoadAction,
  layThongTinPhimAction,
  themPhimUpLoadHinhAction,
} from "../../../redux/actions/MovieManagementAction";

function EditFilm(props) {
  const [srcState, setSrcState] = useState("");
  const { values, touched, errors, handleChange, handleSubmit, setFieldValue } =
    props;
  let {
    dangChieu,
    danhGia,
    hot,
    moTa,
    ngayKhoiChieu,
    sapChieu,
    tenPhim,
    trailer,
  } = values;
  const dispatch = useDispatch();
  useEffect(() => {
    let { id } = props.match.params;
    dispatch(layThongTinPhimAction(id));
  }, []);
  const handleChangeDate = (name) => {
    return (value) => {
      setFieldValue(name, moment(value).format("DD/MM/YYYY"));
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
      <h2 className="text-4xl">Chỉnh Sửa</h2>

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
          <Input onChange={handleChange} name="tenPhim" value={tenPhim} />
          {errors.tenPhim && touched.tenPhim && (
            <span className="text-red-700">{errors.tenPhim}</span>
          )}
        </Form.Item>
        <Form.Item label="Trailer">
          <Input onChange={handleChange} name="trailer" value={trailer} />
          {errors.trailer && touched.trailer && (
            <span className="text-red-700 ">{errors.trailer}</span>
          )}
        </Form.Item>
        <Form.Item label="Mô Tả">
          <Input onChange={handleChange} name="moTa" value={moTa} />
          {errors.moTa && touched.moTa && (
            <span className="text-red-700">{errors.moTa}</span>
          )}
        </Form.Item>
        <Form.Item label="Ngày Khởi Chiếu">
          {ngayKhoiChieu ? (
            <DatePicker
              format={"DD/MM/YYYY"}
              onChange={handleChangeDate("ngayKhoiChieu")}
              defaultValue={moment(new Date(ngayKhoiChieu), "DD/MM/YYYY")}
            />
          ) : (
            ""
          )}
          {errors.ngayKhoiChieu && touched.ngayKhoiChieu && (
            <span className="text-red-700 ml-5">{errors.ngayKhoiChieu}</span>
          )}
        </Form.Item>
        <Form.Item label="Đang chiếu" valuePropName="checked">
          <Switch
            onChange={handleChangeSwitch("dangChieu")}
            checked={dangChieu}
          />
        </Form.Item>
        <Form.Item label="Sắp chiếu" valuePropName="checked">
          <Switch
            onChange={handleChangeSwitch("sapChieu")}
            checked={sapChieu}
          />
        </Form.Item>
        <Form.Item label="Hot" valuePropName="checked">
          <Switch onChange={handleChangeSwitch("hot")} checked={hot} />
        </Form.Item>
        <Form.Item label="Số Sao">
          <InputNumber
            onChange={handleChangeInputNumber("danhGia")}
            name="danhGia"
            value={danhGia}
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
          <img
            style={{ width: 150, height: 200 }}
            src={srcState === "" ? props.thongTinPhim.hinhAnh : srcState}
            alt="..."
          />
        </Form.Item>
        <Form.Item label="Tác Vụ">
          <Button htmlType="submit" type="primary">
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

const EditFilmFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    let {
      dangChieu,
      danhGia,
      hot,
      moTa,
      ngayKhoiChieu,
      sapChieu,
      tenPhim,
      trailer,
      maPhim,
    } = props.thongTinPhim;
    return {
      maPhim,
      dangChieu,
      danhGia,
      hinhAnh: null,
      hot,
      moTa,
      ngayKhoiChieu,
      sapChieu,
      tenPhim,
      trailer,
      maNhom: GROUPID,
    };
  },
  validationSchema: Yup.object().shape({
    tenPhim: Yup.string().required("Bạn chưa nhập Tên Phim"),
    trailer: Yup.string().required("Bạn chưa nhập trailer"),
    moTa: Yup.string().required("Bạn chưa nhập Mô Tả"),
    ngayKhoiChieu: Yup.string().required("Bạn chưa nhập Ngày Khởi Chiếu"),
    danhGia: Yup.number().required("Bạn chưa nhập Đánh Giá"),
    // hinhAnh: Yup.string().required("Bạn chưa nhập Hình Ảnh"),
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    let formData = new FormData();
    for (let key in values) {
      if (key === "hinhAnh") {
        if (values[key] !== null) {
          formData.append("File", values[key], values[key].name);
        }
      } else {
        formData.append(key, values[key]);
      }
      if (key === "ngayKhoiChieu") {
        formData.append(key, moment(values[key]).format("DD/MM/YYYY"));
      }
    }
    // console.log(values);
    props.dispatch(capNhatPhimUpLoadAction(formData));

    setSubmitting(true);
  },
  displayName: "EditFilm",
})(EditFilm);

const mapStateToProps = (state) => {
  return {
    thongTinPhim: state.MovieManagementReducer.thongTinPhim,
  };
};

export default connect(mapStateToProps)(EditFilmFormik);
