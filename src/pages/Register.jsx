import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      ho_va_ten: "",
      sdt: "",
      email: "",
      password: "",
      facebook: "",
      noi_o: "",
      ten_truong: "",
    },
    validationSchema: Yup.object({
      ho_va_ten: Yup.string().required("Vui lòng nhập họ và tên"),
      sdt: Yup.string()
        .matches(/^[0-9]{10}$/, "Số điện thoại không hợp lệ")
        .required("Vui lòng nhập số điện thoại , 10 số "),
      email: Yup.string()
        .email("Email không hợp lệ")
        .required("Vui lòng nhập email"),
        password: Yup.string()
        .required("Vui lòng nhập mật khẩu")
        .min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
      facebook: Yup.string(),
      noi_o: Yup.string().required("Vui lòng chọn nơi ở"),
      ten_truong: Yup.string().required("Vui lòng chọn trường THPT"),
    }),

    onSubmit: async (values) => {
      setLoading(true);

      try {
        const response = await fetch("http://localhost:5601/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ho_va_ten: values.ho_va_ten,
            sdt: values.sdt,
            email: values.email,
            password: values.password,
            facebook: values.facebook,
            noi_o: values.noi_o,
            ten_truong: values.ten_truong,
          }),
        });
        const data = await response.json();

        if (!response.ok) {
          toast.error('Lỗi ký lỗi , ' + data?.detail)
          throw new Error(
            data?.message ||
              "Đăng ký thất bại! Vui lòng kiểm tra lại thông tin."
          );
        }
        toast.success('Đăng ký thành công')
        navigate("/login");
      } catch (error) {
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-center text-blue-600">
          ĐĂNG KÝ HỆ THỐNG HỖ TRỢ ÔN TẬP MÔN TOÁN LỚP 12 KỲ THI THPT NĂM 2025
        </h2>

        <form onSubmit={formik.handleSubmit} className="mt-4 space-y-3">
          {/* Họ và tên */}
          <div>
            <input
              type="text"
              name="ho_va_ten"
              placeholder="Họ và tên"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              value={formik.values.ho_va_ten}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.ho_va_ten && formik.errors.ho_va_ten && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.fullName}
              </p>
            )}
          </div>

          {/* Số điện thoại */}
          <div>
            <input
              type="text"
              name="sdt"
              placeholder="Số điện thoại"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              value={formik.values.sdt}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.sdt && formik.errors.sdt && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.sdt}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>

          {/* password */}
          <div>
            <input
              type="password"
              name="password"
              placeholder="Mật khẩu"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.password}
              </p>
            )}
          </div>

          {/* Facebook */}
          <div>
            <input
              type="text"
              name="facebook"
              placeholder="Facebook"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              value={formik.values.facebook}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.facebook && formik.errors.facebook && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.facebook}
              </p>
            )}
          </div>

          {/* Nơi ở */}
          <div>
            <select
              name="noi_o"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              value={formik.values.noi_o}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="">Chọn nơi ở</option>
              <option value="hanoi">Hà Nội</option>
              <option value="hcm">TP. Hồ Chí Minh</option>
              <option value="danang">Đà Nẵng</option>
            </select>
            {formik.touched.noi_o && formik.errors.noi_o && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.noi_o}</p>
            )}
          </div>

          {/* Trường THPT */}
          <div>
            <select
              name="ten_truong"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              value={formik.values.ten_truong}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="">Chọn trường THPT</option>
              <option value="thpt1">THPT A</option>
              <option value="thpt2">THPT B</option>
              <option value="thpt3">THPT C</option>
            </select>
            {formik.touched.ten_truong && formik.errors.ten_truong && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.ten_truong}
              </p>
            )}
          </div>

          {/* Nút Đăng ký & Đăng nhập */}
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="w-52 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
            >
              Đăng Ký
            </button>

            <Link to={"/login"}>
              <span className="underline text-gray-600 font-medium">
                Bạn đã có tài khoản?
              </span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
