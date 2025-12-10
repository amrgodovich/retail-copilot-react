import { useState } from "react";

export default function ApiKeyModal({ onSubmit }) {
  const [key, setKey] = useState("");

  const handleSubmit = () => {
    if (!key.trim()) return;
    onSubmit(key);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-3">Enter Your API Key</h2>
        <p className="text-sm text-gray-600 mb-3">
          Your key is required to initialize the Retail Analytics Copilot.
        </p>

        <input
          type="password"
          placeholder="Gemini API key"
          className="w-full border px-3 py-2 rounded mb-4"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded-lg"
        >
          Save & Continue
        </button>
      </div>
    </div>
  );
}
