import { Brain } from 'lucide-react';

export default function ExplainationsPanel({ Explainations }) {
  if (Explainations.length === 0) return null;
  
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-2">
        <Brain className="w-5 h-5 text-green-600" />
        <h3 className="font-semibold text-sm text-gray-800">Explainations</h3>
      </div>
      <div className="space-y-2">
        {Explainations.map((insight, idx) => (
          <div key={idx} className="bg-green-50 border border-green-200 p-3 rounded-lg">
            <p className="text-sm text-gray-700 leading-relaxed">{insight}</p>
          </div>
        ))}
      </div>
    </div>
  );
}