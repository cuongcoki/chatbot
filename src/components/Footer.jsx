import React, { useEffect, useState } from "react";

const Footer = () => {
  const cards = [
    {
      id: 1,  
      title: "Luyện thi đại học môn toán THPT Quốc Gia 2017",
      content: "Thầy Hiểu dạy code",
      link: "https://www.youtube.com/watch?v=aV0IUk3XTTE&list=PLCNq3aFxQlTzTYP0qTe-RQy7pHSdPoaPr",
    },
    {
      id: 2,
      title: "CHỮA ĐỀ MINH HỌA 2023 - MÔN TOÁN",
      content: "Thầy Hiểu dạy code",
      link: "https://www.youtube.com/watch?v=Y6NRT1h4ttM&list=PLXYp7Odn5ED8jj_ROzHTVt5H4NNYZtY66",
    },
    {
      id: 3,
      title: "Ứng Dụng Đạo Hàm Giải Quyết Bài Toán Thực Tế",
      content: "Thầy Hiểu dạy code",
      link: "https://www.youtube.com/watch?v=DYFeDU9oFG4",
    },
    {
      id: 4,
      title: "Chữa chi tiết đề Minh Họa THPTQG năm 2025 môn Toán",
      content: "Thầy Hiểu dạy code",
      link: "https://www.youtube.com/watch?v=uj2i_KjgS4g",
    },
    {
      id: 5,
      title: "CHỮA CHI TIẾT ĐỀ MINH HỌA ĐGNL ĐHQG HÀ NỘI 2025 MÔN ĐỊNH LƯỢNG ",
      content: "Thầy Hiểu dạy code",
      link: "https://www.youtube.com/watch?v=39m9dycOhtA",
    },
  ];

  const [tracking, setTracking] = useState({});

  const fetchTracking = async () => {
    try {
      const response = await fetch(`http://localhost:5601/tracking`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Lỗi khi lấy dữ liệu.");
      }

      const data = await response.json();
      setTracking(data);
    } catch (error) {
      console.error("Lỗi API:", error);
    }
  };

  useEffect(() => {
    fetchTracking();
  }, []);


  const cutString = (str) => {
    if (typeof str !== "string") {
      throw new Error("Tham số đầu vào phải là chuỗi!");
    }
    
    return str.length > 7 ? str.substring(0, 15) + "..." : str;
  };

  return (
    <div className="relative">
      <div className="absolute font-medium -top-9 left-3 bg-blue-500 w-36 text-center px-2 py-2 text-white rounded-md">
        Học qua video
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 border-orange-300 border-4 p-4 shadow-md">
        {cards.map((card) => {
          const videoId = card.link.split("v=")[1]?.split("&")[0]; // Tách video ID
          return (
            <div
              key={card.id}
              className="bg-white shadow-md p-4 rounded-lg border border-gray-200 h-52 flex flex-col justify-between"
            >
            <a href={card.link} target="_blank" rel="noopener noreferrer">  <h3 className="text-lg font-semibold hover:text-blue-700 hover:underline">{cutString(card.title)}</h3></a>
              {/* <p className="text-gray-600">{card.content}</p> */}
              {videoId && (
                <iframe
                  className="w-full h-32 rounded-md"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title="YouTube video"
                  allowFullScreen
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="bg-blue-500 p-4 text-center flex items-center justify-between">
        <p className="text-sm text-white">© Copyright @GIRC</p>
        <div className="flex justify-center items-center gap-4 text-white">
          <p>
            👤 Đang online:{" "}
            <span className="font-semibold">{tracking.Active_user || 0}</span>
          </p>
          <p>
            📊 Số lượt truy cập:{" "}
            <span className="font-semibold">{tracking.Total_visit || 0}</span>
          </p>
        </div>
        <div className="flex justify-center gap-6 text-white">
          <a href="#" className="hover:underline">
            Facebook
          </a>
          <a href="#" className="hover:underline">
            YouTube
          </a>
          <a href="#" className="hover:underline">
            TikTok
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
