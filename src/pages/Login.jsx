import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { setUserAuth } from "../hooks/userAuth";
import toast from "react-hot-toast";
import { useAuth } from "../auth/AuthContext";
const Login = () => {
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false); // Thêm state cho "Ghi nhớ đăng nhập"
  const navigate = useNavigate();
  const { loginUser } = useAuth();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Vui lòng nhập tài khoản"),
      password: Yup.string().required("Vui lòng nhập mật khẩu"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      console.log(values);
      try {
        const response = await fetch("http://localhost:5601/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: values.email, password: values.password }),
        });

        if (!response.ok) {
          console.log("Đăng nhập thất bại", data);
          throw new Error("Đăng nhập thất bại! Vui lòng kiểm tra lại thông tin.");
        }

        const data = await response.json();
        if (data?.access_token) {
          loginUser(data.user, data.access_token); 
          setUserAuth(data.user, data.access_token, data.session_id);
          toast.success("Đăng nhập thành công");
          setTimeout(() => navigate("/"), 1000); 
        }
      } catch (error) {
        toast.error('Lỗi đăng nhập , hãy kiểm trả lại mật khẩu và tài khoản')
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-center text-blue-600">
          ĐĂNG NHẬP HỆ THỐNG HỖ TRỢ ÔN TẬP MÔN TOÁN LỚP 12 KỲ THI THPT NĂM 2025
        </h2>

        <form onSubmit={formik.handleSubmit} className="mt-4 space-y-3">
          {/* Tài khoản */}
          <div>
            <input
              type="text"
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

          {/* Mật khẩu */}
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
              <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
            )}
          </div>

          {/* Ghi nhớ đăng nhập */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="mr-2"
            />
            <label htmlFor="rememberMe" className="text-gray-600 text-sm">
              Ghi nhớ đăng nhập
            </label>
          </div>

          {/* Nút Đăng nhập & Đăng ký */}
          <div className="flex justify-between items-center">
            <button
              type="submit"
              disabled={loading}
              className={`w-52 py-2 rounded-md transition ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              {loading ? "Đang đăng nhập..." : "Đăng Nhập"}
            </button>

            <Link to="/register">
              <span className="underline text-gray-600 font-medium">
                Bạn chưa có tài khoản?
              </span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
