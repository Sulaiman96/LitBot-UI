import {useState} from 'react';
import {Button} from "@/components/ui/button.tsx";
import FeedbackCommentDialog from './FeedbackCommentDialog'; // Import the new dialog component

// Define an enum or union type for clarity
type FeedbackStatus = 'liked' | 'disliked' | null;

const FeedbackButtons = ({summaryId}: { summaryId: string }) => {
	const [feedback, setFeedback] = useState<FeedbackStatus>(null); // Stores the actively selected feedback type
	const [isDialogMOpen, setIsDialogMOpen] = useState(false); // Controls dialog visibility
	const [pendingFeedbackType, setPendingFeedbackType] = useState<FeedbackStatus>(null); // Stores the type clicked before dialog opens

	// Helper function to handle the initial click and open the dialog
	const handleFeedbackButtonClick = (type: 'like' | 'dislike') => {
		// Optimistic UI: Immediately update the button's visual state
		setFeedback(type === 'like' ? 'liked' : 'disliked');
		setPendingFeedbackType(type === 'like' ? 'liked' : 'disliked'); // Store for the dialog

		// Open the dialog
		setIsDialogMOpen(true);
	};

	// This function is called by the FeedbackCommentDialog when it successfully sends feedback
	// or fails to send feedback.
	const handleCommentDialogFeedbackSent = (success: boolean) => {
		if (!success) {
			// If the comment submission failed, revert the optimistic UI change
			setFeedback(null); // Or previous state if you want more complex rollback
			setPendingFeedbackType(null);
		}
		// If successful, the `feedback` state is already correctly set by optimistic update
		// No need to change `feedback` here if it was successful, just reset pending.
		setPendingFeedbackType(null);
	};

	// If the user closes the dialog without submitting, revert the optimistic UI
	const handleDialogClose = () => {
		setIsDialogMOpen(false);
		// Revert the button's optimistic state if no comment was sent
		// This is important if the user decides NOT to send feedback from the dialog
		setFeedback(null);
		setPendingFeedbackType(null);
	};


	return (
		<div className="feedback-button flex space-x-6 mr-auto">
			<Button
				variant="outline"
				size="icon"
				className={`rounded-full border-2 ${feedback === 'liked' ? 'border-green-700' : 'border-green-500'} cursor-pointer`}
				onClick={() => handleFeedbackButtonClick('like')}
				// Disable if dialog is open to prevent re-clicks
				disabled={isDialogMOpen}
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
					<path
						// Use a darker green when selected, neutral grey when not
						fill={feedback === 'liked' ? "#008000" : "#b0b0b0"}
						d="M21 8q.8 0 1.4.6T23 10v2q0 .175-.05.375t-.1.375l-3 7.05q-.225.5-.75.85T18 21H7V8l6-5.95q.375-.375.888-.437t.987.187t.7.7t.1.925L14.55 8zM9 8.85V19h9l3-7v-2h-9l1.35-5.5zM4 21q-.825 0-1.412-.587T2 19v-9q0-.825.588-1.412T4 8h3v2H4v9h3v2zm5-2V8.85z"
					/>
				</svg>
			</Button>

			<Button
				variant="outline"
				size="icon"
				className={`rounded-full border-2 ${feedback === 'disliked' ? 'border-red-700' : 'border-red-500'} cursor-pointer`}
				onClick={() => handleFeedbackButtonClick('dislike')}
				// Disable if dialog is open
				disabled={isDialogMOpen}
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
					<path
						// Use a darker red when selected, neutral grey when not
						fill={feedback === 'disliked' ? "#cc0000" : "#b0b0b0"}
						d="M3 16q-.8 0-1.4-.6T1 14v-2q0-.175.05-.375t-.1-.375l3-7.05q.225-.5.75-.85T6 3h11v13l-6 5.95q-.375.375-.888.438t-.987-.188t-.7-.7t-.1-.925L9.45 16zm12-.85V5H6l-3 7v2h9l-1.35 5.5zM20 3q.825 0 1.413.588T22 5v9q0 .825-.587 1.413T20 16h-3v-2h3V5h-3V3zm-5 2v10.15z"
					/>
				</svg>
			</Button>

			{/* Render the dialog component */}
			{isDialogMOpen && pendingFeedbackType && ( // Only render if dialog is open and a type is selected
				<FeedbackCommentDialog
					isOpen={isDialogMOpen}
					onClose={handleDialogClose}
					summaryId={summaryId}
					feedbackType={pendingFeedbackType === 'liked' ? 'like' : 'dislike'}
					onFeedbackSent={handleCommentDialogFeedbackSent}
				/>
			)}
		</div>
	);
};

export default FeedbackButtons;