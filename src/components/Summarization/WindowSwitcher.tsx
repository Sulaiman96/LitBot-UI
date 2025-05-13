import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type WindowSwitcherProps = {
  activeTab: 'chat' | 'source';
  setActiveTab: (tab: 'chat' | 'source') => void;
};

const WindowSwitcher = ({ activeTab, setActiveTab }: WindowSwitcherProps) => (
  <Tabs defaultValue="chat" className="p-.5 w-fit mb-2 rounded-lg row-1 bg-bone-light" onValueChange={(value: 'chat' | 'source') => setActiveTab(value)}>
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

export default WindowSwitcher;
