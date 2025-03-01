import React from "react";

const Inforexam = () => {
  const links = [
    {
      link: "https://example.com/de-thi-1",
      year: 2024,
      name: "Đề thi Toán",
      DapAn: true,
    },
    {
      link: "https://example.com/de-thi-1",
      year: 2023,
      name: "Đề thi Toán",
      DapAn: true,
    },
    {
      link: "https://example.com/de-thi-2",
      year: 2022,
      name: "Đề thi Toán",
      DapAn: false,
    },
    {
      link: "https://example.com/de-thi-3",
      year: 2021,
      name: "Đề thi Toán",
      DapAn: true,
    },
    {
      link: "https://example.com/de-thi-4",
      year: 2020,
      name: "Đề thi Toán",
      DapAn: false,
    },
    {
      link: "https://example.com/de-thi-5",
      year: 2019,
      name: "Đề thi Toán",
      DapAn: true,
    },
    {
      link: "https://example.com/de-thi-6",
      year: 2018,
      name: "Đề thi Toán",
      DapAn: false,
    },
  ];


  const fakeData = [
    {
      id: 1,
      name: "Trợ lý hóa",
      link: "https://example.com/chatbottaon",
      co: "sắp có"
    },
    {
      id: 2,
      name: "Trợ lý sinh",
      link: "https://example.com/ai-hotro-hoc",
      co: "sắp có"
    },
    {
      id: 3,
      name: "Trợ lý anh",
      link: "https://example.com/gpt-app",
      co: "sắp có"
    },
    {
      id: 4,
      name: "Trợ lý vật lý",
      link: "https://example.com/smart-tech",
      co: "sắp có"
    },
    {
      id: 5,
      name: "Trợ lý văn",
      link: "https://example.com/machine-learning",
      co: "sắp có"
    },
  ];


  const linksQA = [
    {
      link: "https://example.com/de-thi-1",
      name: "Tuyền sinh công nghệ thông tin",
    },
    {
      link: "https://example.com/de-thi-1",
      name: "Tuyền sinh chuyên ngành công nghệ & và đổi mới sáng tạo",
    },
    {
      link: "https://example.com/de-thi-1",
      name: "Cơ hội học đại học chỉ với chi phí 0 đồng",
    },
    {
      link: "https://example.com/de-thi-1",
      name: "Cơ hội học đại học chỉ với chi phí 0 đồng",
    },
    {
      link: "https://example.com/de-thi-1",
      name: "Cơ hội học đại học chỉ với chi phí 0 đồng",
    },
  ];

  return (
    <div className="w-full px-2 sm:px-4 md:px-0 flex justify-center">
      <div className="flex flex-col gap-4 sm:gap-6 max-w-lg w-full">
        {/* First Card */}
        <div className="relative shadow-xl w-full">
          <div className="relative z-20 bg-green-700 rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20 p-2 sm:p-3 flex justify-center items-center">
            <div className="w-full">
              {/* Tiêu đề */}
              <div className="text-lg sm:text-xl p-2 rounded-3xl text-center font-semibold text-gray-200 shadow-md py-2">
                Các trợ lý học tập
              </div>

              {/* Danh sách lịch sử */}
              <div className="h-64 sm:h-80 md:h-96 no-scrollbar overflow-y-auto rounded-b-lg scroll-smooth shadow-md py-2 sm:py-3 px-2 sm:px-4 flex flex-col gap-2 sm:gap-4">
                {fakeData.map((item, index) => (
                  <a
                    key={index}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-200 hover:underline w-full p-2 border-b border-gray-300"
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                      <span className="text-sm sm:text-base ">{item.name}</span>
                      <span className="text-sm sm:text-base mt-3 w-[30%] text-red-500 bg-white px-2 py-1 rounded-3xl ">{item.co}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute -inset-1 bg-green-500 rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 z-10"></div>
        </div>

        {/* Second Card */}
        <div className="relative shadow-xl w-full">
          <div className="relative z-20 bg-green-700 rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20 p-2 sm:p-3 flex justify-center items-center">
            <div className="w-full">
              <div className="mx-0 sm:mx-2">
                <div className="text-lg sm:text-xl p-2 rounded-3xl text-center font-semibold text-gray-200 shadow-md py-2">
                  Có thể bạn quan tâm
                </div>

                <div className="h-48 sm:h-[162px] no-scrollbar overflow-y-auto rounded-b-lg scroll-smooth shadow-md py-2 sm:py-3 px-2 sm:px-4 flex flex-col gap-2 sm:gap-4">
                  {linksQA.map((item, index) => (
                    <a
                      key={index}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline text-white hover:text-blue-800 flex justify-between items-center text-sm sm:text-base"
                    >
                      <span>
                        <p className="inline-block text-red-500">* </p> {item.name}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -inset-1 bg-green-500 rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 z-10"></div>
        </div>
      </div>
    </div>
  );
};

export default Inforexam;