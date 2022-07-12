import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Switch,
} from "antd";
import { withFormik } from "formik";
import * as Yup from "yup";
import { connect, useDispatch } from "react-redux";

import userManagerService from "../../services/UserManagerService";
import { GROUPID, STATUS_CODE } from "../../util/SystemSetting/SystemSetting";
import {
  addUserAction,
  layDanhSachLoaiNguoiDungAction,
} from "../../redux/actions/UserManagementAction";

function AddUser(props) {
  const [loaiNguoiDung, setLoaiNguoiDung] = useState([]);

  useEffect(() => {
    layDanhSachLoaiNguoiDungAction()
      .then((res) => {
        setLoaiNguoiDung(res);
      })
      .catch((err) => {
        setLoaiNguoiDung([]);
      });
  }, []);
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = props;
  //   const handleChangeInput = (name)=>{
  //     return value =>{
  //         setFieldValue
  //     }
  //   }
  return (
    <div
      className="site-layout-background"
      style={{
        padding: 24,
      }}
    >
      <h2 className="text-4xl">Thêm Người Dùng Mới</h2>

      <Form layout="vertical" hideRequiredMark onSubmitCapture={handleSubmit}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Email"
              rules={[
                {
                  required: true,
                  message: "Please enter user name",
                },
              ]}
            >
              <Input name="email" onChange={handleChange} />
              {errors.email && touched.email && (
                <span className="text-red-700">{errors.email}</span>
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Tài Khoản"
              rules={[
                {
                  required: true,
                  message: "Please enter Project Name",
                },
              ]}
            >
              <Input name="taiKhoan" onChange={handleChange} />
              {errors.taiKhoan && touched.taiKhoan && (
                <span className="text-red-700">{errors.taiKhoan}</span>
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Họ Tên"
              rules={[
                {
                  required: true,
                  message: "Please enter user name",
                },
              ]}
            >
              <Input name="hoTen" onChange={handleChange} />
              {errors.hoTen && touched.hoTen && (
                <span className="text-red-700">{errors.hoTen}</span>
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Số Điện Thoại"
              rules={[
                {
                  required: true,
                  message: "Please enter Project Name",
                },
              ]}
            >
              <Input name="soDt" onChange={handleChange} />
              {errors.soDt && touched.soDt && (
                <span className="text-red-700">{errors.soDt}</span>
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Mã Loại Người Dùng"
              rules={[
                {
                  required: true,
                  message: "Please select an owner",
                },
              ]}
            >
              <Select
                onChange={(value) => {
                  return setFieldValue("maLoaiNguoiDung", value);
                }}
                // value={categoryId}
              >
                {loaiNguoiDung.map((item, index) => {
                  return (
                    <Select.Option key={index} value={item.maLoaiNguoiDung}>
                      {item.tenLoai}
                    </Select.Option>
                  );
                })}
              </Select>
              {errors.maLoaiNguoiDung && touched.maLoaiNguoiDung && (
                <span className="text-red-700">{errors.maLoaiNguoiDung}</span>
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Mật Khẩu"
              rules={[
                {
                  required: true,
                  message: "Please enter Creator",
                },
              ]}
            >
              <Input type="password" name="matKhau" onChange={handleChange} />
              {errors.matKhau && touched.matKhau && (
                <span className="text-red-700">{errors.matKhau}</span>
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item>
              <Button htmlType="submit">Đăng Ký User</Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

const AddUserFormik = withFormik({
  mapPropsToValues: () => {
    return {
      email: "",
      taiKhoan: "",
      hoTen: "",
      soDt: "",
      matKhau: "",
      maLoaiNguoiDung: "",
      maNhom: GROUPID,
    };
  },
  validationSchema: Yup.object().shape({
    taiKhoan: Yup.string().required("Bạn chưa nhập Tài Khoản"),
    hoTen: Yup.string().required("Bạn chưa nhập Họ tên"),
    matKhau: Yup.string().required("Bạn chưa nhập mật khẩu"),
    maLoaiNguoiDung: Yup.string().required("Bạn chưa nhập mã loại người dùng"),
    soDt: Yup.string()
      .required("Bạn chưa nhập số điện thoại")
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        "số điện thoại không hợp lệ"
      ),
    email: Yup.string()
      .required("Bạn chưa nhập email")
      .email("email không hợp lệ"),
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    // let { email, passWord } = values;

    props.dispatch(addUserAction(values));
    setSubmitting(true);
  },
  displayName: "AddUser",
})(AddUser);

export default connect()(AddUserFormik);
