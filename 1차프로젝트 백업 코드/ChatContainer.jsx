import { useState } from "react";
import axios from "axios";

const ChatContainer = () => {
  const [messages, setMessages] = useState([]); // 채팅 메시지 목록
  const [input, setInput] = useState(""); // 사용자 입력
  const [loading, setLoading] = useState(false);

  // 메시지 전송 핸들러
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5001/api/chat", {
        message: input,
      });

      const botMessage = {
        sender: "bot",
        text: res.data.reply,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("챗봇 응답 실패", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "❌ 오류가 발생했어요. 다시 시도해주세요." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="z-30 flex h-[300px] w-xs flex-col rounded-3xl border bg-white p-6 shadow-lg xl:h-[500px] xl:w-[500px]">
      <div className="mb-4 flex-1 space-y-4 overflow-y-auto pr-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[60%] rounded-xl px-4 py-2 text-sm ${
                msg.sender === "user" ? "bg-zik-main text-white" : "bg-gray-200"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="animate-pulse rounded-xl bg-gray-200 px-4 py-2 text-sm text-gray-800">
              챗봇이 응답 중...
            </div>
          </div>
        )}
      </div>

      {/* 입력창 */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 rounded-lg border px-4 py-2 text-sm focus:outline-none"
          placeholder="메시지를 입력하세요..."
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="hover:bg-zik-main/80 bg-zik-main rounded-lg px-2 py-2 text-sm text-white md:px-4"
        >
          전송
        </button>
      </div>
    </section>
  );
};

export default ChatContainer;
