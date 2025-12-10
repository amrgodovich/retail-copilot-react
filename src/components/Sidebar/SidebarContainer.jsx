import SQLDisplay from "./SQLDisplay";
import CitationPanel from "./CitationPanel";
import ExplainationPanel from "./ExplainationPanel";
import { BarChart3 } from "lucide-react";

export default function SidebarContainer({ sql, citations, explain }) {
  return (
    <div className="w-3/5 bg-white overflow-y-auto border-l">
      <div className="p-6">
        <h2 className="text-lg font-bold mb-4">Analysis Details</h2>

        {explain && <ExplainationPanel Explainations={[explain]} />}
        {citations?.length > 0 && <CitationPanel citations={citations} />}
        {sql && <SQLDisplay sql={sql} />}

        {!sql && (!citations || citations.length === 0) && !explain && (
          <div className="text-center py-12 text-gray-400">
            <BarChart3 className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">Query results and citations will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
}
