import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

type tabOptions = 'chat' | 'source' | 'summary'
type WindowSwitcherProps = {
  activeTab: tabOptions;
  setActiveTab: (tab: tabOptions) => void;
};

const WindowSwitcher = ({ activeTab, setActiveTab }: WindowSwitcherProps) => {
  const handleTabChange = (value: tabOptions) => {
    setActiveTab(value)
    // console.log(value)
  }

  return (
    <Tabs
      defaultValue={activeTab}
      className="p-.5 w-fit rounded-lg row-1 bg-bone-light"
      onValueChange={(value: tabOptions) => handleTabChange(value)}
    >
      <TabsList className="bg-transparent">
        {/* Chat Tab: always visible */}
        <TabsTrigger
          value="chat"
          className={`px-10 ${activeTab === 'chat' ? 'bg-white text-neutral-darkest' : 'text-neutral-dark'}`}
        >
          Chat
        </TabsTrigger>
        {/* Source Tab: always visible */}
        <TabsTrigger
          value="source"
          className={`px-10 ${activeTab === 'source' ? 'bg-white text-neutral-darkest' : 'text-neutral-dark'}`}
        >
          Source
        </TabsTrigger>
        {/* Summary Tab: only visible on mobile (below md) */}
        <TabsTrigger
          value="summary"
          className={`px-10 md:hidden ${activeTab === 'summary' ? 'bg-white text-neutral-darkest' : 'text-neutral-dark'}`}
        >
          Summary
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

export default WindowSwitcher;
