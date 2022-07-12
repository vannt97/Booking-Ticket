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
  capNhatThongTinNguoiDungAction,
  layDanhSachLoaiNguoiDungAction,
} from "../../redux/actions/UserManagementAction";

function EditUser(props) {
  const [loaiNguoiDung, setLoaiNguoiDung] = useState([]);
  const [user, setUser] = useState({});
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = props;
  useEffect(() => {
    // const layDanhSachNguoiDungAction = async () => {
    //   let { data, status } =
    //     await userManagerService.layDanhSachLoaiNguoiDung();
    //   if (status === STATUS_CODE.SUCCESS) {
    //     setLoaiNguoiDung(data.content);
    //   }
    // };
    const layThongTinNguoiDung = async () => {
      let { data, status } = await userManagerService.timKiemNguoiDung(
        props.match.params.taiKhoan
      );
      if (status === STATUS_CODE.SUCCESS) {
        setUser({ ...data.content[0] });
        for (let key in data.content[0]) {
          setFieldValue(key, data.content[0][key]);
        }
      }
    };
    layDanhSachLoaiNguoiDungAction()
      .then((res) => {
        setLoaiNguoiDung(res);
      })
      .catch((err) => {
        setLoaiNguoiDung([]);
      });
    layThongTinNguoiDung();
  }, []);
  const handleChangeInput = (key) => {
    return (e) => {
      user[key] = e.target.value;
      setUser({ ...user });
      setFieldValue(key, e.target.value);
    };
  };
  return (
    <div
      className="site-layout-background"
      style={{
        padding: 24,
      }}
    >
      <h2 className="text-4xl">Chỉnh Sửa Account</h2>

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
              <Input
                disabled
                name="email"
                onChange={handleChangeInput("email")}
                value={user.email}
              />
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
              <Input
                disabled
                name="taiKhoan"
                onChange={handleChangeInput("taiKhoan")}
                value={user.taiKhoan}
              />
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
              <Input
                name="hoTen"
                onChange={handleChangeInput("hoTen")}
                value={user.hoTen}
              />
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
              <Input
                name="soDt"
                onChange={handleChangeInput("soDt")}
                value={user.soDt}
              />
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
                  user[`maLoaiNguoiDung`] = value;
                  setUser({ ...user });
                  setFieldValue("maLoaiNguoiDung", value);
                }}
                value={user.maLoaiNguoiDung}
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
              <Input
                type="password"
                name="matKhau"
                onChange={handleChangeInput("matKhau")}
                value={user.matKhau}
              />
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

const EditUserFormik = withFormik({
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
    props.dispatch(capNhatThongTinNguoiDungAction(values));
    setSubmitting(true);
  },
  displayName: "EditUser",
})(EditUser);

export default connect()(EditUserFormik);
