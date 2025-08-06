import { useState } from "react";
import SummarizationSteps from "@/components/Summarization/SummarizationSteps";
import UploadPanel from "@/components/Summarization/UploadPanel";
import WindowSwitcher from "@/components/Summarization/WindowSwitcher";
import SummaryChat from "@/components/Summarization/SummaryChat";
import FileSourceWindow from "@/components/Summarization/FileSourceWindow";
import SummarizationResult from "@/components/Summarization/SummarizationResult";
import { supabase } from "@/lib/supabase.ts";
import { toast } from "sonner";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import makeProtectedRequest from "@/lib/utils.ts"; // Ensure this path is correct

type BucketFilePath = string;
type UploadedFile = { id: string; name: string };

const Summarization = () => {
	const [step, setStep] = useState(1); // 1 = upload, 2 = summary
	const [activeTab, setActiveTab] = useState<'chat' | 'source' | 'summary'>('source');
	const [signedUrl, setSignedUrl] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [summaryText, setSummaryText] = useState<string | null>(null);
	const [currentSummaryId, setCurrentSummaryId] = useState<string | null>(null);
	const [currentFile, setCurrentFile] = useState<UploadedFile | BucketFilePath | null>(null);

	const summaryUrl = `${import.meta.env.VITE_DEV_BACKEND_URL}/summarise/summarise-file`;

	const fetchSummaryForFile = async (file: UploadedFile | BucketFilePath) => {
		setIsLoading(true);
		setSummaryText(null); // Clear previous summary
		setCurrentSummaryId(null); // Clear previous summary ID
		setCurrentFile(file); // Store the current file for refresh

		const filePath = typeof file === 'string' ? file : file.name;

		const { data: signedUrlData, error: signedUrlError } = await supabase
			.storage
			.from('pdf-papers') // Ensure this is your correct bucket name
			.createSignedUrl(filePath, 60 * 5); // Signed URL valid for 5 minutes

		if (signedUrlError) {
			console.error("Error creating signed URL:", signedUrlError.message);
			toast.error('Failed to prepare file for summarization. Please try again.');
			setIsLoading(false);
			return;
		}

		if (signedUrlData) {
			setSignedUrl(signedUrlData.signedUrl);
			try {
				const summaryResponse = await makeProtectedRequest(
					summaryUrl,
					'POST',
					{ 'Content-Type': 'application/json' },
					{ signedUrl: signedUrlData.signedUrl }
				);

				if (summaryResponse && summaryResponse.summary && summaryResponse.summaryId) {
					setSummaryText(summaryResponse.summary);
					setCurrentSummaryId(summaryResponse.summaryId);
					setStep(2);
					toast.success("Summary generated successfully!");
				} else {
					// Handle cases where response is not as expected
					console.error('Invalid summary response:', summaryResponse);
					toast.error('Failed to retrieve summary. The response was not in the expected format.');
				}
			} catch (error) {
				console.error('Error retrieving summary:', error);
				toast.error('An error occurred while generating the summary. Please try again.');
			} finally {
				setIsLoading(false);
			}
		}
	};

	const handleRefreshSummary = () => {
		if (currentFile) {
			toast.info("Refreshing summary...");
			fetchSummaryForFile(currentFile);
		} else {
			toast.error("No file has been summarized yet to refresh.");
			// Optionally, reset to step 1 or handle as appropriate
			// setStep(1);
		}
	};

	return (
		<div className="summarization-page bg-neutral-lightest min-h-screen flex flex-col items-center py-8 px-2 md:px-20">
			<h1 className="page-title font-taviraj text-3xl md:text-4xl mt-13 mb-10">AI Research Assistant</h1>
			<SummarizationSteps activeStep={step} />
			{step === 1 ? (
				<UploadPanel onContinue={fetchSummaryForFile} onUpload={fetchSummaryForFile} />
			) : (
				<>
					{/* Desktop layout (md+) */}
					<div className="hidden md:grid w-full grid-cols-2 grid-rows-[2rem_1fr] gap-y-2 gap-x-8 items-start">
						<WindowSwitcher activeTab={activeTab} setActiveTab={setActiveTab} />
						<div className="h-[32rem] col-1 row-2">
							<div className={`${activeTab === 'chat' ? 'hidden' : ''} h-full`}>
								<FileSourceWindow fileURL={signedUrl} />
							</div>
							<div className={`${activeTab === 'source' ? 'hidden' : ''} h-full`}>
								<SummaryChat summaryId={currentSummaryId} />
							</div>
						</div>
						<Tabs defaultValue="summary" className="p-.5 w-fit rounded-lg row-1 col-start-2 bg-bone-light">
							<TabsList className="bg-transparent">
								<TabsTrigger value="summary" className={'px-10 bg-white text-neutral-darkest'}>Summary</TabsTrigger>
							</TabsList>
						</Tabs>
						<div className="col-start-2 row-start-2 h-full">
							<SummarizationResult
								summary={summaryText}
								summaryId={currentSummaryId}
								isLoading={isLoading}
								onRefresh={handleRefreshSummary}
							/>
						</div>
					</div>
					{/* Mobile layout (<md) */}
					<div className="block md:hidden w-full">
						<WindowSwitcher activeTab={activeTab} setActiveTab={setActiveTab} />
						<div className="mt-2">
							{activeTab === 'chat' && (
								<SummaryChat summaryId={currentSummaryId} />
							)}
							{activeTab === 'source' && (
								<FileSourceWindow fileURL={signedUrl} />
							)}
							{activeTab === 'summary' && (
								<SummarizationResult
									summary={summaryText}
									summaryId={currentSummaryId}
									isLoading={isLoading}
									onRefresh={handleRefreshSummary}
								/>
							)}
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default Summarization;