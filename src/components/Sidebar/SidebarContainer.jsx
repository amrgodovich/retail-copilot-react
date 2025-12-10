import SQLDisplay from "./SQLDisplay";
import CitationPanel from "./CitationPanel";
import ExplainationPanel from "./ExplainationPanel";
import ModePanel from "./ModePanel";
import { BarChart3 } from "lucide-react";

export default function SidebarContainer({ mode, sql, citations, explanation }) {
  const hasContent = sql || (citations && citations.length > 0) || explanation;

  return (
    <div className="w-3/5 bg-white overflow-y-auto border-l">
      <div className="p-6">
        <h2 className="text-lg font-bold mb-4">Analysis Details</h2>

        {mode && <ModePanel mode={mode} />}
        {explanation && <ExplainationPanel Explainations={[explanation]} />}
        {citations?.length > 0 && <CitationPanel citations={citations} />}
        {sql && <SQLDisplay sql={sql} />}

        {!hasContent && (
          <div className="text-center py-12 text-gray-400">
            <BarChart3 className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">Query results and citations will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
}
