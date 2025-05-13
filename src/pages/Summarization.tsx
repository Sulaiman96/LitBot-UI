import { useState } from "react";
import SummarizationSteps from "@/components/Summarization/SummarizationSteps";
import UploadPanel from "@/components/Summarization/UploadPanel";
import WindowSwitcher from "@/components/Summarization/WindowSwitcher";
import SummaryChat from "@/components/Summarization/SummaryChat";
import FileSourceWindow from "@/components/Summarization/FileSourceWindow";
import SummarizationResult from "@/components/Summarization/SummarizationResult";

const Summarization = () => {
    const [step, setStep] = useState(1); // 1 = upload, 2 = summary
    const [activeTab, setActiveTab] = useState<'chat' | 'source'>('chat');

    return (
        <div className="summarization-page bg-neutral-lightest min-h-screen flex flex-col items-center py-8 px-20">
            <h1 className="page-title font-taviraj text-3xl md:text-4xl mt-13 mb-10">AI Research Assistant</h1>
            <SummarizationSteps activeStep={step} />
            {step === 1 ? (
                <UploadPanel onContinue={() => setStep(2)} />
            ) : (
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    <div className="flex flex-col">
                        <WindowSwitcher activeTab={activeTab} setActiveTab={setActiveTab} />
                        <div className="h-[32rem]">
                            {activeTab === 'chat' ? <SummaryChat /> : <FileSourceWindow />}
                        </div>
                    </div>
                    <div className="h-[32rem]">
                        <SummarizationResult />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Summarization;