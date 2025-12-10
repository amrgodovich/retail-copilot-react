export async function setKey(api_key) {
  const res = await fetch("http://localhost:8000/set_key", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ api_key }),
  });

  return res.json(); // returns session_id
}

// export async function askCopilot(session_id, question) {
//   const res = await fetch("http://localhost:8000/ask", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ session_id, question }),
//   });

//   return res.json();
// }
export async function askCopilot(session_id, question) {
  // static response for development
  const staticData = {
    "id": "54e064c2-2f65-42b8-9a62-8c1a254164eb_12-10-25_03-13-15",
    "question": "According to the product policy, what is the return window (days) for unopened Beverages? Return an integer.",
    "mode": "rag",
    "sql_query":"select 14 as return_window_days; \nselect 14 as return_window_days; \nselect 14 as return_window_days; \nselect 14 as return_window_days; \n",
    "rag_chunks": [
        {
            "id": "chunk8",
            "filename": "product_policy",
            "score": 10.119206868473738,
            "text": "# Returns & Policy\n- Perishables (Produce, Seafood, Dairy): 3–7 days.\n- Beverages unopened: 14 days; opened: no returns.\n- Non-perishables: 30 days."
        },
        {
            "id": "chunk0",
            "filename": "catalog",
            "score": 1.671285173461985,
            "text": "# Catalog Snapshot\n- Categories include Beverages, Condiments, Confections, Dairy Products, Grains/Cereals, Meat/Poultry, Produce, Seafood.\n- Products map to categories as in the Northwind DB."
        },
        {
            "id": "chunk7",
            "filename": "marketing_calendar",
            "score": 1.0210397854851472,
            "text": "## Winter Classics 1997\n- Dates: 1997-12-01 to 1997-12-31\n- Notes: Push Dairy Products and Confections for holiday gifting."
        },
        {
            "id": "chunk6",
            "filename": "marketing_calendar",
            "score": 0.9392319024094422,
            "text": "## Summer Beverages 1997\n- Dates: 1997-06-01 to 1997-06-30\n- Notes: Focus on Beverages and Condiments."
        }
    ],
    "final_answer": 14,
    "explanation": "According to the product policy, unopened Beverages have a return window of 14 days.",
    "citations": [
        "product_policy::chunk8",
        "catalog::chunk0"
    ],
    "confidence": 0.6718845466228789,
    "history": ""
  };

  // filter citations to only those present in rag_chunks
  const filteredCitations = staticData.citations.filter(citation => {
    const chunkId = citation.split("::")[1];
    return staticData.rag_chunks.some(c => c.id === chunkId);
  });

  staticData.citations = filteredCitations;
  console.log("Static askCopilot response:", staticData);

  return staticData;
}
