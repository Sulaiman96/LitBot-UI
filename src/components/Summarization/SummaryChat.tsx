const SummaryChat = () => {
  return (
    <div className="flex flex-col h-full bg-bone-light rounded-xl border border-gray-200 p-4">
      <div className="flex-1 overflow-y-auto space-y-4 mb-3">
        {/* AI message */}
        <div className="flex items-start space-x-2">
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center font-bold text-gray-700">M</div>
          <div>
            <div className="bg-white rounded shadow px-3 py-2 text-sm max-w-xs mb-1">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
            </div>
            <div className="text-xs text-gray-500">Guides how LitBot serves researchers by fine-tuning the model to academic niches and ensuring the results meet the quality, rigour and integrity researchers expect. Plays a key role in aligning the tool with the real needs of the research community.</div>
          </div>
        </div>
        {/* User message */}
        <div className="flex items-start space-x-2 flex-row-reverse">
          <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center font-bold text-white">U</div>
          <div>
            <div className="bg-gray-100 rounded shadow px-3 py-2 text-sm max-w-xs mb-1">
              Can you summarize the methodology?
            </div>
          </div>
        </div>
        {/* AI message */}
        <div className="flex items-start space-x-2">
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center font-bold text-gray-700">M</div>
          <div>
            <div className="bg-white rounded shadow px-3 py-2 text-sm max-w-xs mb-1">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
            </div>
            <div className="text-xs text-gray-500">Guides how LitBot serves researchers by fine-tuning the model to academic niches and ensuring the results meet the quality, rigour and integrity researchers expect. Plays a key role in aligning the tool with the real needs of the research community.</div>
          </div>
        </div>
      </div>
      <form className="flex items-center mt-auto">
        <input
          type="text"
          placeholder="Ask about this summary..."
          className="flex-1 rounded-l px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-bone-dark text-sm"
        />
        <button type="submit" className="bg-gray-700 text-white px-4 py-2 rounded-r hover:bg-gray-800 transition">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" /></svg>
        </button>
      </form>
    </div>
  );
};

export default SummaryChat;
