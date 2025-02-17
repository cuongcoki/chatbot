import React, { useEffect, useState } from "react";
import { getUserAuth, getAccessToken } from "../hooks/userAuth";
import { formatDate } from "../constants";
import { useChat } from "../hooks/ChatContext"; 
import toast from "react-hot-toast";

const Chathistory = () => {
  const [user, setUser] = useState(null);
  const [messagesHistory, setMessagesHistory] = useState([]);
  const { setSessionId,sessionId } = useChat();

  useEffect(() => {
    const authUser = getUserAuth();
    setUser(authUser);
  }, []);

  useEffect(() => {
    if (user) {
      fetchHistoryMessages(user.sub);
    }
  }, [user]);

  //=============================================================== [Call API getHistory chat] =============================================================== 

  const fetchHistoryMessages = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:5601/chat/user/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Lỗi khi lấy dữ liệu chat.");
      }

      const data = await response.json();
      setMessagesHistory(data.title_list);
    } catch (error) {
      console.error("Lỗi API:", error);
    }
  };

  //=============================================================== [Call API createNewSession chat] =============================================================== 

  const createNewSession = async () => {
    
    try {
      const response = await fetch(
        `http://localhost:5601/chat/create_session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAccessToken()}`,
          },
        }
      );
      
      if (!response.ok) {
        throw new Error("Lỗi khi lấy dữ liệu chat.");
      }
      console.log(sessionId);
      const data = await response.json();
      setSessionId(data.session_id);
      fetchHistoryMessages(user.sub);
      toast.success('Tạo chat mới thành công')
    } catch (error) {
      console.error("Lỗi API:", error);
      toast.error("Không tạo được chat mới")
    }
  };

  return (
    <div className="mx-2 ">
      <div className="text-2xl border-2 rounded-t-md text-center font-medium border-orange-300">
        Lịch sử tra cứu học tập
      </div>

      <div className="h-96 overflow-y-auto border-r-2 border-l-2 border-b-2 rounded-b-sm border-orange-300 py-2 px-2 flex flex-col gap-3">
        {messagesHistory.map((item) => (
          <div
            key={item.session_id}
            className={`p-2 bg-white shadow-md rounded-md cursor-pointer transition-opacity duration-300 
              ${sessionId === item.session_id ? "text-orange-300" : "hover:bg-orange-300 hover:text-white"}`}
            onClick={() => setSessionId(item.session_id)}
          >
            <div className="font-medium">{item.title}</div>
            <p className="text-sm mt-1  flex justify-between items-center">
              <i className="text-gray-500">{formatDate(item.timestamp)}</i>{" "}
              <span className="text-orange-500">{item.session_id}</span>
            </p>
          </div>
        ))}
      </div>
      <div className="mt-2">
        <button
          className=" font-medium -top-9  bg-blue-500 w-36 text-center px-2 py-2 text-white rounded-md"
          onClick={createNewSession}
        >
          Chat Mới
        </button>
      </div>
    </div>
  );
};

export default Chathistory;
