import { createContext, useContext, useState } from "react";

// Tạo Context
const ChatContext = createContext();

// Provider để bọc ứng dụng
export const ChatProvider = ({ children }) => {
  const [sessionId, setSessionId] = useState(null);

  return (
    <ChatContext.Provider value={{ sessionId, setSessionId }}>
      {children}
    </ChatContext.Provider>
  );
};

// Hook để sử dụng Context
export const useChat = () => {
  return useContext(ChatContext);
};
