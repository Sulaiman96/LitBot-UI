const SummarizationResult = () => {
  return (
    <div className="relative h-full bg-bone-light rounded-xl border border-gray-200 p-6 flex flex-col">
      <div className="mb-2 font-semibold text-gray-700">Summary</div>
      <div className="flex-1 overflow-y-auto bg-white rounded p-4 text-sm text-gray-700">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer justo leo, interdum nec neque id, lobortis rutrum mauris. Nullam suscipit molestie odio. Nunc blandit orci id turpis condimentum lobortis. Donec fringilla gravida risus in eleifend. Donec et velit suscipit, venenatis odio quis, finibus velit. Praesent et commodo libero. Pellentesque dictum dolor, efficitur ac rutrum lobortis, consequat quis velit. Nunc eu euismod risus, non luctus diam. Nunc pharetra tortor in ante ullamcorper, a scelerisque sem vehicula. Praesent ut molestie est. Phasellus malesuada ac nec erat dictum, a imperdiet turpis ullamcorper. Nam tincidunt ullamcorper sem, vel malesuada ipsum.
        <br /><br />
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer justo leo, interdum nec neque id, lobortis rutrum mauris. Nullam suscipit molestie odio. Nunc blandit orci id turpis condimentum lobortis. Donec fringilla gravida risus in eleifend. Donec et velit suscipit, venenatis odio quis, finibus velit. Praesent et commodo libero. Pellentesque dictum dolor, efficitur ac rutrum lobortis, consequat quis velit. Nunc eu euismod risus, non luctus diam. Nunc pharetra tortor in ante ullamcorper, a scelerisque sem vehicula. Praesent ut molestie est. Phasellus malesuada ac nec erat dictum, a imperdiet turpis ullamcorper. Nam tincidunt ullamcorper sem, vel malesuada ipsum.
      </div>
      <div className="absolute bottom-4 right-4 flex space-x-2">
        {/* Refresh */}
        <button className="bg-gray-200 hover:bg-gray-300 p-2 rounded-full" title="Refresh">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582M20 20v-5h-.581M5.635 19A9 9 0 1 1 19 5.635" /></svg>
        </button>
        {/* Download */}
        <button className="bg-gray-200 hover:bg-gray-300 p-2 rounded-full" title="Download">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12" /></svg>
        </button>
        {/* Copy */}
        <button className="bg-gray-200 hover:bg-gray-300 p-2 rounded-full" title="Copy">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="13" height="13" x="9" y="9" rx="2" /><path d="M5 15V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10" /></svg>
        </button>
      </div>
    </div>
  );
};

export default SummarizationResult;
