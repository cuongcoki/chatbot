import React, { useEffect, useState } from "react";
import { getUserAuth } from "../hooks/userAuth";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Khai báo useNavigate để điều hướng

  useEffect(() => {
    setUser(getUserAuth());
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    localStorage.removeItem("session_id");
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <div className="w-full">
      {/* Thanh tiêu đề */}
      <nav className="mx-auto py-5 flex justify-between items-center shadow-lg bg-orange-300">
        <h1 className="text-3xl font-bold text-center w-full">
          HỆ THỐNG ÔN TẬP MÔN TOÁN LỚP 12 CHO 2K7
        </h1>
      </nav>

      {/* Thông tin người dùng */}
      <div className="flex justify-between items-center border-b-4 px-2 border-orange-300 py-2 border-r-4 border-l-4">
        <p className="text-lg font-semibold">
          Họ và tên học sinh:{" "}
          <span className="font-normal">{user ? user.ho_va_ten : "Chưa đăng nhập"}</span>
        </p>
        <p className="text-lg font-semibold">
          Tỉnh: <span className="font-normal">{user ? user.noi_o : "Không xác định"}</span>
        </p>
        <div className="mt-4">
          {user ? (
            <button
              onClick={handleLogout}
              className="border-2 border-red-500 font-medium text-red-500 px-4 py-2 rounded-md"
            >
              Đăng xuất
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate("/register")}
                className="border-2 border-red-500 font-medium text-red-500 px-4 py-2 rounded-md mr-2"
              >
                Đăng ký
              </button>
              <button
                onClick={() => navigate("/login")}
                className="bg-blue-500 font-medium text-white px-4 py-2 rounded-md"
              >
                Đăng nhập
              </button>
            </>
          )}
        </div>
      </div>

      {/* Thông báo học bổng */}
      <div className="overflow-hidden whitespace-nowrap border-orange-300 py-2 border-r-4 border-l-4 shadow-md">
        <div className="animate-marquee text-xl font-thin text-blue-500">
          <i>
            đăng ký ngay nhận ngay học bổng lên tới{" "}
            <p className="animate-neon inline-block">120 triệu VND</p> tại Đại Học Nông Lâm Thái Nguyên
          </i>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
