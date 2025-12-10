import { useEffect, useState } from "react";
import ChatContainer from "./components/Chat/ChatContainer";
import SidebarContainer from "./components/Sidebar/SidebarContainer";
import ApiKeyModal from "./components/Auth/ApiKeyModal";
import { setKey } from "./services/api";



export default function App() {
  const [sidebarData, setSidebarData] = useState({
    sql: "",
    citations: [],
    explanation: "",
    mode: "",
    history: "",
  });

  const [sessionId, setSessionId] = useState(null);
  const [apiLoaded, setApiLoaded] = useState(false);

  useEffect(() => {
    const id = localStorage.getItem("session_id");
    if (id) {
      setSessionId(id);
      setApiLoaded(true);
    }
  }, []);

  const handleApiKey = async (api_key) => {
    const res = await setKey(api_key);

    if (res.session_id) {
      localStorage.setItem("session_id", res.session_id);
      localStorage.setItem("api_key", api_key);
      setSessionId(res.session_id);
      setApiLoaded(true);
    }
  };

  if (!apiLoaded) {
    return <ApiKeyModal onSubmit={handleApiKey} />;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <ChatContainer
        sessionId={sessionId}
        onData={setSidebarData}
      />
      <SidebarContainer
        sql={sidebarData.sql}
        citations={sidebarData.citations}
        explanation={sidebarData.explanation}
        mode={sidebarData.mode}
      />
    </div>
  );
}
