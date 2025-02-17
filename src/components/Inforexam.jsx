import React from "react";

const Inforexam = () => {
  const links = [
    { link: "https://example.com/de-thi-1", year: 2023, name: "Đề thi Toán" },
    { link: "https://example.com/de-thi-2", year: 2022, name: "Đề thi Văn" },
    { link: "https://example.com/de-thi-3", year: 2021, name: "Đề thi Anh" },
    { link: "https://example.com/de-thi-4", year: 2020, name: "Đề thi Lý" },
    { link: "https://example.com/de-thi-5", year: 2019, name: "Đề thi Hóa" },
    { link: "https://example.com/de-thi-6", year: 2018, name: "Đề thi Sinh" },
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
  ];
  return (
    <div>
      <div className="mx-2">
        <div className="text-2xl bg-blue-500 text-white rounded-t-md text-center font-medium py-2">
          Tham khảo đề thi năm nay
        </div>
        <div className="py-2 px-2 flex flex-col gap-3 bg-gray-100 rounded-b-md">
          {links.map((item, index) => (
            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline hover:text-blue-800 flex justify-between items-center p-2 border-b border-gray-300"
            >
              <span>📄 {item.name}</span>
              <span className="text-gray-500 text-sm">{item.year}</span>
            </a>
          ))}
        </div>
      </div>

      <div className="mx-2 my-2">
        <div className="text-2xl  rounded-t-md text-center font-medium py-2">
         Có thể bạn quan tâm
        </div>
        <div className="  py-2 px-2 flex flex-col  rounded-b-md">
          {linksQA.map((item, index) => (
            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline hover:text-blue-800 flex justify-between items-center p-2 "
            >
              <span><p className="inline-block text-red-500">* </p> {item.name}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Inforexam;
