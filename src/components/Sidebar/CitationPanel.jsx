import { BookOpen } from 'lucide-react';

export default function CitationPanel({ citations }) {
  if (citations.length === 0) return null;
  
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-2">
        <BookOpen className="w-4 h-4 text-purple-600" />
        <h3 className="font-semibold text-sm text-gray-700">Sources & Citations</h3>
      </div>
      <div className="space-y-2">
        {citations}
        {citations.map((citation, idx) => (
          <div key={idx} className="bg-purple-50 border border-purple-200 p-3 rounded-lg">
            <p className="text-xs font-semibold text-purple-900 mb-1">{citation.title}</p>
            <p className="text-xs text-gray-600">{citation.excerpt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}