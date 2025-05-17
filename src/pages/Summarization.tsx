import { useState} from "react";
import SummarizationSteps from "@/components/Summarization/SummarizationSteps";
import UploadPanel from "@/components/Summarization/UploadPanel";
import WindowSwitcher from "@/components/Summarization/WindowSwitcher";
import SummaryChat from "@/components/Summarization/SummaryChat";
import FileSourceWindow from "@/components/Summarization/FileSourceWindow";
import SummarizationResult from "@/components/Summarization/SummarizationResult";
import {supabase} from "@/lib/supabase.ts";
import {toast} from "sonner";

const Summarization = () => {
    const [step, setStep] = useState(1); // 1 = upload, 2 = summary
    const [activeTab, setActiveTab] = useState<'chat' | 'source'>('source');
    const [file, setFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const summaryUrl = `${import.meta.env.VITE_DEV_BACKEND_URL}/summarise/summarise-file`;

    /**
     * In one case the user uploads a file, in another case the file is already uploaded
     * If the file is already uploaded to supabase, and we need it on the frontend, we need to get the signed url and pass it to both the backend and our fileSourceWindow
     * If the file has just been uploaded to our frontend, we only need to get the signed url and can keep the file in local state
     * @param file
     */
    const requestFile = async ( file: File) => {
        setIsLoading(true);
        const { data, error } = await supabase
            .storage
            .from('pdf-papers')
            .createSignedUrl(file.name, 60);

        const summaryRequestModel = {
            signedUrl: data.signedUrl
        }
        if (error) {
            console.error(error.message)
        } else {
            // Send the newly created signed URL to the backend
            try {
                fetch(summaryUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    },
                    body: JSON.stringify(data),
                })
                  .then(() => {
                      setIsLoading(false);
                  });
            } catch (error) {
                console.error('Error retrieving summary:', error);
                toast('An error occurred during generating the summary. Please try again.');
            }
            // Pass the signed URL to fileSourceWindow component
        }
        setStep(2);
    }

    const progressStep = () => {
        setStep(step + 1);
        setIsLoading(true)
    }

    return (
        <div className="summarization-page bg-neutral-lightest min-h-screen flex flex-col items-center py-8 px-20">
            <h1 className="page-title font-taviraj text-3xl md:text-4xl mt-13 mb-10">AI Research Assistant</h1>
            <SummarizationSteps activeStep={step} />
            {step === 1 ? (
                <UploadPanel onContinue={requestFile} onUpload={progressStep}/>
            ) : (
                <div className="w-full grid grid-cols-2 grid-rows-[2rem_1fr] md:grid-cols-2 gap-y-2 gap-x-8 items-start">
                    <WindowSwitcher activeTab={activeTab} setActiveTab={setActiveTab} />
                    <div className="h-[32rem] col-1 row-2">
                        {activeTab === 'chat' ? <SummaryChat /> : <FileSourceWindow />}
                    </div>
                    <div className="text-neutral-darkest text-nunito bg-bone-light row-1 px-10 col-2 py-.5 rounded-lg  h-full w-fit">Summary</div>
                    <div className="h-full col-2 row-2">
                        <SummarizationResult />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Summarization;