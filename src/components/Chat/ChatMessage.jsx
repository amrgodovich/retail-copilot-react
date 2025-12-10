export default function ChatMessage({ message }) {
  return (
    <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[70%] rounded-lg px-4 py-2 ${
        message.role === 'user' 
          ? 'bg-blue-600 text-white' 
          : 'bg-white border border-gray-200 text-gray-800'
      }`}>
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        <span className="text-xs opacity-70 mt-1 block">
          {message.timestamp}
        </span>
      </div>
    </div>
  );
}