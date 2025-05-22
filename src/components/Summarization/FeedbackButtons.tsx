import { useState } from 'react';
import { Button } from "@/components/ui/button.tsx";
import makeProtectedRequest from '@/lib/utils.ts'; // Assuming this handles the fetch and potential refresh
import { toast } from "sonner";

// Define an enum or union type for clarity
type FeedbackStatus = 'liked' | 'disliked' | null;

const FeedbackButtons = ({ summaryId }: { summaryId: string }) => {
	const [feedback, setFeedback] = useState<FeedbackStatus>(null);
	const [isLoading, setIsLoading] = useState(false);

	const handleClick = async (type: 'like' | 'dislike') => {
		// Prevent multiple clicks while a request is in progress
		if (isLoading) {
			return;
		}

		setIsLoading(true);
		const previousFeedback = feedback; // Store previous state for potential rollback

		// OPTIMISTIC UI UPDATE: Immediately update the SVG fill
		setFeedback(type === 'like' ? 'liked' : 'disliked');

		try {
			const url = `${import.meta.env.VITE_DEV_BACKEND_URL}/summary/${summaryId}`;
			// Adjust makeProtectedRequest if it needs more arguments for POST body (e.g., specific feedback data)
			const response = await makeProtectedRequest(url,'POST');

			// Assuming makeProtectedRequest returns null or throws an error on failure
			if (response && response.ok) { // Check if the response was successful (e.g., response.ok for fetch)
				toast.success('Feedback sent successfully!');
			} else {
				// GRACEFUL FAILURE HANDLING: Revert UI if request was not successful
				setFeedback(previousFeedback); // Revert to the state before the click
				toast.error('Failed to send feedback. Please try again.');
				// Log the error for debugging if needed
				console.error('Feedback request failed:', response);
			}
		} catch (error) {
			// GRACEFUL FAILURE HANDLING: Revert UI if an error occurred during the fetch
			setFeedback(previousFeedback); // Revert to the state before the click
			toast.error('An error occurred. Please check your network and try again.');
			console.error('Error during feedback request:', error);
		} finally {
			setIsLoading(false); // Re-enable buttons
		}
	};

	return (
		<div className="feedback-button flex space-x-6 mr-auto">
			<Button
				variant="outline"
				size="icon"
				className={`rounded-full border-2 ${feedback === 'liked' ? 'border-green-700' : 'border-green-500'} cursor-pointer`}
				onClick={() => handleClick('like')}
				disabled={isLoading} // Disable button while loading
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
					<path
						fill={feedback === 'liked' ? "#008000" : "#b0b0b0"} // Darker green when filled, grey when not selected
						d="M21 8q.8 0 1.4.6T23 10v2q0 .175-.05.375t-.1.375l-3 7.05q-.225.5-.75.85T18 21H7V8l6-5.95q.375-.375.888-.437t.987.187t.7.7t.1.925L14.55 8zM9 8.85V19h9l3-7v-2h-9l1.35-5.5zM4 21q-.825 0-1.412-.587T2 19v-9q0-.825.588-1.412T4 8h3v2H4v9h3v2zm5-2V8.85z"
					/>
				</svg>
			</Button>

			<Button
				variant="outline"
				size="icon"
				className={`rounded-full border-2 ${feedback === 'disliked' ? 'border-red-700' : 'border-red-500'} cursor-pointer`}
				onClick={() => handleClick('dislike')}
				disabled={isLoading} // Disable button while loading
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
					<path
						fill={feedback === 'disliked' ? "#cc0000" : "#b0b0b0"} // Darker red when filled, grey when not selected
						d="M3 16q-.8 0-1.4-.6T1 14v-2q0-.175.05-.375t-.1-.375l3-7.05q.225-.5.75-.85T6 3h11v13l-6 5.95q-.375.375-.888.438t-.987-.188t-.7-.7t-.1-.925L9.45 16zm12-.85V5H6l-3 7v2h9l-1.35 5.5zM20 3q.825 0 1.413.588T22 5v9q0 .825-.587 1.413T20 16h-3v-2h3V5h-3V3zm-5 2v10.15z"
					/>
				</svg>
			</Button>
		</div>
	);
};

export default FeedbackButtons;