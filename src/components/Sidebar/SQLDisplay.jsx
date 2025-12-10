import { Database } from 'lucide-react';

export default function SQLDisplay({ sql }) {
  if (!sql) return null;
  
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-2">
        <Database className="w-4 h-4 text-blue-600" />
        <h3 className="font-semibold text-sm text-gray-700">Generated SQL</h3>
      </div>
      <div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-xs overflow-x-auto">
        <pre>{sql}</pre>
      </div>
    </div>
  );
}