import { BookOpen } from 'lucide-react';

export default function CitationPanel({ citations }) {
  return (
   <div className="mb-6">
     <div className="flex items-center gap-2 mb-4">
       <BookOpen className="w-4 h-4 text-purple-600"/>
       <h3 className="font-semibold text-sm text-gray-700">Sources & Citations</h3>
     </div>
     <div className="space-y-3">
        {citations.map((citation, idx) => (
         <div key={idx} className="bg-purple-50 rounded-lg p-4 border border-blue-100">
           <div className="font-medium text-blue-900 mb-2">{citation.filename}</div>
           <div className="text-sm text-gray-700 leading-relaxed">{citation.text}</div>
         </div>
        ))}
     </div>
   </div>
  );
}