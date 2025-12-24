import { useState, useRef, useEffect } from "react";
import { BarChart3 } from "lucide-react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { askCopilot } from "../../services/api";

export default function ChatContainer({ sessionId = null, onData = () => {} }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! I'm your Retail Analytics Copilot. Ask me anything about your data.",
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const [history, setHistory] = useState("");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

const handleSend = async () => {
  if (!input.trim() || isLoading) return;
  const userMsg = {
    role: "user",
    content: input,
    timestamp: new Date().toLocaleTimeString(),
  };
  setMessages((prev) => [...prev, userMsg]);
  setInput("");
  setIsLoading(true);

  try {
  const res = await askCopilot(sessionId, input);

  if (res.error) {
    const assistantMsg = {
      role: "assistant",
      content: ` Error: ${res.error}`,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages(prev => [...prev, assistantMsg]);
    setIsLoading(false);
    return;
  }

  // update loader text immediately
  setHistory(res.history || "");

  const assistantMsg = {
    role: "assistant",
    content: res.final_answer || res.answer || "(no answer)",
    timestamp: new Date().toLocaleTimeString(),
  };
  setMessages(prev => [...prev, assistantMsg]);

  // citations
  const citationsWithText = (res.citations || []).map(citationRef => {
    const [filename, chunkId] = citationRef.split("::");
    const chunk = res.rag_chunks?.find(c => c.id === chunkId);
    return {
      filename: chunk?.filename || filename,
      text: chunk?.text || "Table from the Database",
    };
  });

  onData({
    sql: res.sql_query || "",
    mode: res.mode || "",
    citations: citationsWithText,
    explanation: res.explanation || res.explain || "",
    history: res.history || "",
  });

} catch (err) {
  console.error(err);
} finally {
  setIsLoading(false);
}

};

  return (
    <div className="w-2/5 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Retail Analytics Copilot</h1>
            <p className="text-sm text-gray-500">AI-powered insights for your retail data</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {messages.map((msg, idx) => (
          <ChatMessage key={idx} message={msg} />
        ))}
        {isLoading && (<div className="flex justify-start mb-4">
            <div className="bg-white border border-gray-200 rounded-lg px-4 py-2">
              <div className="flex gap-2">
                <div className="italic text-gray-400">{history}</div>
              </div>
            </div>
            </div>)}
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="bg-white border border-gray-200 rounded-lg px-4 py-2">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
              </div>
            </div>
            </div>
        )
        }
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <ChatInput value={input} onChange={setInput} onSend={handleSend} isLoading={isLoading} />
    </div>
  );
}
