import { Component } from 'lucide-react';

export default function ModePanel({ mode }) {
  
return (
    <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
            <Component className="w-5 h-5 text-cyan-600" />
            <h3 className="font-semibold text-sm text-gray-800">Mode Used</h3>
        </div>
        <div className="space-y-2">
                    <div className="bg-cyan-50 border border-cyan-200 p-3 rounded-lg">
                            <p className="text-sm text-gray-700 leading-relaxed">{mode?.toUpperCase()}</p>
        </div>
    </div>
    </div>
);
}