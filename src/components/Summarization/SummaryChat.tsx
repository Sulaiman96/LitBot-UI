import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
const SummaryChat = () => {
  return (
    <div className="flex flex-col h-full bg-bone-light rounded-xl p-4">
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
      <Separator decorative className="bg-neutral-darkest opacity-20"/>
      <form className="flex items-center mt-auto relative py-7">
        <Input
          type="text"
          placeholder="Ask about this summary..."
          className="flex-1 rounded-full px-3 py-3 border border-gray-300 focus:outline-none bg-neutral-lightest focus:ring-2 focus:ring-bone-dark text-sm"
        />
        <Button type="submit" size="icon" className="bg-transparent absolute bottom-0 right-0 mb-7 rounded-full hover:bg-gray-400 transition">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
            <path fill="black" d="M4 18.5v-13L19.423 12zM5 17l11.85-5L5 7v3.885L9.846 12L5 13.116zm0 0V7z"/>
          </svg>
        </Button>
      </form>
    </div>
  );
};

export default SummaryChat;
