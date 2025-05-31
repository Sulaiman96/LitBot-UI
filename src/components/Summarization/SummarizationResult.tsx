import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import FeedbackButtons from "@/components/Summarization/FeedbackButtons.tsx";

type SummarizationResultProps = {
  summary: string | null;
  summaryId: string | null;
  isLoading: boolean;
  onRefresh: () => void;
};

const SummarizationResult = ({ summary, summaryId, isLoading, onRefresh }: SummarizationResultProps) => {
  const handleCopy = () => {
    if (summary) {
      navigator.clipboard.writeText(summary)
        .then(() => {
          toast("Summary copied to clipboard");
        })
        .catch((err: Error) => {
          toast("Failed to copy summary");
          console.error("Failed to copy summary: ", err);
        });
    } else {
      toast("No summary available to copy.");
    }
  };

  return (
    <div className="relative h-full bg-bone-light rounded-xl p-6 flex flex-col">
      <div
        id="summaryOutput"
        className={`flex-1 p-4 text-sm mb-4 text-left text-neutral-darkest inset-shadow-sm inset-shadow-bone-darkest max-h-[calc(32rem-80px)] overflow-y-auto ${
          isLoading || !summary ? "grid place-content-center" : ""
        }`}
      >
        {isLoading ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25"/>
            <path fill="currentColor" d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z">
              <animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/>
            </path>
          </svg>
        ) : summary ? (
          summary
        ) : (
          <p>No summary available. Please upload or select a file to generate a summary.</p>
        )}
      </div>
      <div className="flex space-x-2 justify-end items-center">
        {summaryId && <FeedbackButtons summaryId={summaryId} />}
        <div className={'text-nunito text-md font-semibold text-neutral-dark mr-2'}>
          Tokens: <span>0/50000</span> {/* This might need dynamic update based on summary length */}
        </div>
        {/* Refresh Button */}
        <Button variant="outline" size="icon" className="rounded-full w-16" onClick={onRefresh} disabled={isLoading}>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 1024 1024"> {/* Adjusted size for consistency */}
            <path stroke-width="2" fill="currentColor" d="M497.408 898.56c-.08-.193-.272-.323-.385-.483l-91.92-143.664c-6.528-10.72-20.688-14.527-31.728-8.512l-8.193 5.04c-11.007 6-10.767 21.537-4.255 32.256l58.927 91.409c-5.024-1.104-10.096-2-15.056-3.296c-103.184-26.993-190.495-96.832-239.535-191.6c-46.336-89.52-55.04-191.695-24.512-287.743c30.512-96.048 99.775-174.464 189.295-220.784c15.248-7.888 21.2-26.64 13.312-41.856c-7.872-15.264-26.64-21.231-41.855-13.327C149.248 135.04 69.12 226.368 33.551 338.24C-16.978 450.144-6.848 569.169 47.12 673.426c57.136 110.336 158.832 191.664 279.024 223.136c1.36.352 2.784.56 4.16.911l-81.311 41.233c-11.008 6.032-14.657 19.631-8.128 30.351l3.152 8.176c6.56 10.72 17.84 14.527 28.815 8.512L484.622 944.4c.193-.128.385-.096.578-.224l9.984-5.456c5.52-3.024 9.168-7.969 10.624-13.505c1.52-5.52.815-11.663-2.448-16.991zm416.496-577.747c-57.056-110.304-155.586-191.63-275.762-223.118c-8.56-2.24-17.311-3.984-26.048-5.712l79.824-40.48c11.008-6.033 17.568-19.632 11.04-30.369l-3.153-8.16c-6.56-10.736-20.752-14.528-31.727-8.528L519.262 80.654c-.176.112-.384.08-.577.208l-9.967 5.472c-5.537 3.04-9.168 7.967-10.624 13.503c-1.52 5.52-.816 11.648 2.464 16.976l5.92 9.712c.096.192.272.305.384.497l91.92 143.648c6.512 10.736 20.688 14.528 31.712 8.513l7.216-5.025c11.008-6 11.727-21.536 5.231-32.24l-59.2-91.856c13.008 2 25.968 4.416 38.624 7.76c103.232 27.04 187.393 96.864 236.4 191.568c46.32 89.519 55.024 191.695 24.48 287.728c-30.511 96.047-96.655 174.448-186.174 220.816c-15.233 7.887-21.168 26.607-13.28 41.87c5.519 10.64 16.335 16.768 27.599 16.768c4.8 0 9.664-1.12 14.272-3.488c104.272-53.936 181.248-145.279 216.816-257.119c35.536-111.904 25.393-230.929-28.574-335.152"/>
          </svg>
        </Button>
        {/* Download Button - unchanged */}
        <Button variant="outline" size="icon" className="rounded-full w-16">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 1024 1024"> {/* Adjusted size */}
            <path stroke-width="2" fill="currentColor" d="M763.024 260C718.4 141.568 622.465 66.559 477.569 66.559c-184.384 0-313.392 136.912-324.479 315.536C64.178 410.527.002 501.215.002 603.935c0 125.744 98.848 231.968 215.823 231.968h28.448c17.664 0 32-14.32 32-32s-14.336-32-32-32h-28.448c-82.304 0-152.832-76.912-152.832-167.968c0-80.464 56.416-153.056 127.184-165.216l29.04-5.008l-2.592-29.344l-.24-.368c.016-155.872 102.607-273.44 261.184-273.44c127.104 0 198.513 62.624 231.553 169.44l6.832 22.032l23.072.497c118.864 2.496 223.088 98.944 223.088 218.784c0 109.056-72.272 230.592-181.713 230.592h-9.104c-17.664 0-32 14.32-32 32s14.336 32 32 32v-.096c160-4.224 252.24-157.088 252.24-294.496c-.032-147.728-115.792-265.743-260.512-281.312zM646.337 775.47c-8.944-9.344-23.407-9.345-32.335-.001l-70.384 77.648V530.973c0-17.664-14.336-32-32-32s-32 14.336-32 32v322.432l-68.112-75.935c-8.944-9.344-23.44-11.344-32.368-2l-8.065 4.416c-8.944 9.376-8.944 24.48 0 33.823l115.504 127.744c.16.16.193.368.336.528l8.096 8.464c4.496 4.689 10.368 7.01 16.288 6.977c5.872.032 11.776-2.288 16.225-6.977l8.095-8.464c.16-.16.24-.335.368-.528L654.417 811.71c8.945-9.344 8.945-20.447 0-29.823z"/>
          </svg>
        </Button>
        {/* Copy Button */}
        <Button variant="outline" size="icon" className="rounded-full w-16" onClick={handleCopy} disabled={isLoading || !summary}>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"> {/* Adjusted size */}
            <path stroke-width="2" fill="currentColor" d="M9.116 17q-.691 0-1.153-.462T7.5 15.385V4.615q0-.69.463-1.153T9.116 3h7.769q.69 0 1.153.462t.462 1.153v10.77q0 .69-.462 1.152T16.884 17zm0-1h7.769q.23 0 .423-.192t.192-.423V4.615q0-.23-.192-.423T16.884 4H9.116q-.231 0-.424.192t-.192.423v10.77q0 .23.192.423t.423.192m-3 4q-.69 0-1.153-.462T4.5 18.385V6.615h1v11.77q0 .23.192.423t.423.192h8.77v1zM8.5 16V4z"/>
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default SummarizationResult;