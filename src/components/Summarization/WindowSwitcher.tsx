type WindowSwitcherProps = {
  activeTab: 'chat' | 'source';
  setActiveTab: (tab: 'chat' | 'source') => void;
};

const WindowSwitcher = ({ activeTab, setActiveTab }: WindowSwitcherProps) => (
  <div className="flex space-x-2 mb-3">
    <button
      className={`px-4 py-1 rounded-t font-semibold text-sm transition border-b-2 ${activeTab === 'chat' ? 'border-bone-dark bg-white' : 'border-transparent bg-bone-light text-gray-500'}`}
      onClick={() => setActiveTab('chat')}
    >
      Chat
    </button>
    <button
      className={`px-4 py-1 rounded-t font-semibold text-sm transition border-b-2 ${activeTab === 'source' ? 'border-bone-dark bg-white' : 'border-transparent bg-bone-light text-gray-500'}`}
      onClick={() => setActiveTab('source')}
    >
      Source
    </button>
  </div>
);

export default WindowSwitcher;
