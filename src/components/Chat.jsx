import { useState, useRef, useEffect } from "react";
import {
  getAccessToken,
  getUserAuth,
  getCurrentSessionID,
} from "../hooks/userAuth";
import { useChat } from "../hooks/ChatContext";
import "katex/dist/katex.min.css";
import Latex from "react-latex-next";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import remarkMath from "remark-math";
const Chat = () => {
  const chatRef = useRef(null);
  // const [user, setUser] = useState("");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [messagesData, setMessagesData] = useState([]);
  const { sessionId } = useChat();
  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
    fetchMessages();
  }, [sessionId]);

  //=============================================================== [Call API getChatStore chat] ===============================================================

  const fetchMessages = async () => {
    try {
      const response = await fetch(
        `http://localhost:5601/chat/session/${
          sessionId == null ? getCurrentSessionID() : sessionId
        }`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAccessToken()}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Lỗi khi lấy dữ liệu chat.");
      }

      const data = await response.json();
      console.log("data", data);
    
      setMessages(data);
      setMessagesData(data.messages);
    } catch (error) {
      console.error("Lỗi API:", error);
    }
  };
  console.log(getCurrentSessionID());
  console.log(getAccessToken());

  //=============================================================== [Call API sendMessage chat] ===============================================================
  const sendMessage = async () => {
    //input
    if (!input.trim()) return;
    const newMessage = { role: "user", content: input };
    setMessagesData((prev) => [...prev, newMessage]);
    setInput("");

    //call api
    try {
      const response = await fetch(
        `http://localhost:5601/query?session_id=${
          sessionId == null ? getCurrentSessionID() : sessionId
        }&text=${encodeURIComponent(input)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAccessToken()}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Lỗi khi lấy dữ liệu chat.");
      }

      const data = await response.json();

      setMessagesData((prev) => [
        ...prev,
        { role: "bot", content: data.reply },
      ]);
      fetchMessages();
    } catch (error) {
      console.error("Lỗi API:", error);
    }
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messagesData]); // Chỉ cuộn khi có tin nhắn mới

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Tháng bắt đầu từ 0
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    // return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

    return `${hours}:${minutes}:${seconds}`;
  };
  const formattedData = (data) => {
    if (typeof data === "string") {
      return data
        .split("\n") // Tách từng dòng
        .filter((line) => line.trim()) // Loại bỏ dòng trống
        .join("\n\n"); // Nối lại với khoảng cách 2 dòng để dễ đọc
    } else {
      return JSON.stringify(data, null, 2); // Nếu là object, format JSON cho đẹp
    }
  };
  const formatLatexContent = (content) => {
    return content
      .replace(/\\\[/g, "$$")  // Chuyển tất cả \[ thành $$
      .replace(/\\\]/g, "$$")  // Chuyển tất cả \] thành $$
      .replace(/\\\(/g, "$")   // Chuyển tất cả \( thành $
      .replace(/\\\)/g, "$");  // Chuyển tất cả \) thành $
  };
  
  return (
    <div className=" flex items-center justify-center">
      <div className="bg-white  rounded-lg max-w-lg w-full">
        {/* Header */}
        <div className="p-4 border-b bg-orange-300 text-white rounded-t-lg  text-center">
          <span className="text-2xl font-semibold ">
            Tôi là chuyên gia toán
          </span>
        </div>

        {/* Chat Body */}
        <div className="h-96">
          <div
            ref={chatRef}
            className="p-4 max-h-96 overflow-y-auto overflow-hidde no-scrollbar "
          >
            {messagesData.map((msg, index) => (
              <span>
                <span
                  key={index}
                  className={`mb-2 flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <p
                    className={`py-2 px-4 max-w-[75%] rounded-lg break-words ${
                      msg.role === "user"
                        ? "bg-blue-500 text-white" // Tin nhắn user: xanh
                        : "bg-gray-200 text-gray-700" // Tin nhắn bot: xám
                    }`}
                  >
                    {msg.content ? (
                      <ReactMarkdown
                        // children={msg.content}
                        children={formatLatexContent(msg.content)}
                        remarkPlugins={[remarkMath]} 
                        rehypePlugins={[rehypeKatex]}
                        className="markdown"
                      />
                      // <Latex>{formattedData(msg.content)}</Latex>  
                    ) : (
                      <p>Đang tải...</p>
                    )}
                  </p>
                </span>
                <p
                  key={index}
                  className={`mb-2 flex text-gray-500 text-xs ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <i> {formatDate(msg.timestamp)}</i>
                </p>
              </span>
            ))}
            {/* Phần tử ẩn để cuộn xuống */}
            {/* <div ref={chatRef} /> */}
          </div>
        </div>

        {/* Input */}
        <p className="text-gray-700 text-sm">Tin nhắn: </p>
        <div className="py-3 flex shadow-md p-2 relative rounded-b-md">
          <p className="text-gray-700 absolute top-10 right-2">
            nhấn enter để gửi tin nhắn
          </p>
          <input
            type="text"
            placeholder="Bạn muốn hỏi gì ạ..."
            onChange={(e) => setInput(e.target.value)}
            value={input}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-none"
          />
          {/* <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300"
          >
            gửi
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Chat;
