import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

type tabOptions = 'chat' | 'source'
type WindowSwitcherProps = {
  activeTab: tabOptions;
  setActiveTab: (tab: tabOptions) => void;
};

const WindowSwitcher = ({ activeTab, setActiveTab }: WindowSwitcherProps) => {
  const handleTabChange = ( value: tabOptions ) => {
    setActiveTab(value)
    console.log(value)
  }

  return (
    <Tabs defaultValue="source" className="p-.5 w-fit rounded-lg row-1 bg-bone-light" onValueChange={(value: tabOptions) => handleTabChange(value)}>
      <TabsList className="bg-transparent">
        <TabsTrigger value="chat"
          className={`px-10 ${activeTab === 'chat' ? 'bg-white text-neutral-darkest' : 'text-neutral-dark'}`}
        >
          Chat
        </TabsTrigger>
        <TabsTrigger value="source"
          className={`px-10 ${activeTab === 'source' ? 'bg-white text-neutral-darkest' : 'text-neutral-dark'}`}
        >
          Source
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

export default WindowSwitcher;
