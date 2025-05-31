import React, {useState} from 'react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";
import makeProtectedRequest from '@/lib/utils.ts';

// Define prop types for clarity
interface FeedbackCommentDialogProps {
	isOpen: boolean;
	onClose: () => void;
	summaryId: string;
	feedbackType: 'like' | 'dislike'; // The type of feedback chosen by the user
	onFeedbackSent: (success: boolean) => void; // Callback for parent to handle UI updates
}

const FeedbackCommentDialog: React.FC<FeedbackCommentDialogProps> = (
	{
		isOpen,
		onClose,
		summaryId,
		feedbackType,
		onFeedbackSent,
	}) => {
	const [comment, setComment] = useState('');
	const [isSending, setIsSending] = useState(false);

	const feedbackUrl = `${import.meta.env.VITE_DEV_BACKEND_URL}/summary/${summaryId}/feedback`;

	const handleSendFeedback = async (shouldSendComment: boolean) => {
		setIsSending(true);
		try {
			const response = await makeProtectedRequest(
				feedbackUrl,
				'POST',
				{
					'Content-Type': 'application/json'
				},
				(shouldSendComment && {
					...( comment ? { comment: comment.trim() } : undefined ), // Send trimmed comment string if it exists otherwise send empty object for the body
				})
			);

			if (response && response.ok) {
				toast.success('Feedback sent successfully!');
				onFeedbackSent(true); // Notify parent of success
				onClose(); // Close the dialog
				setComment(''); // Clear comment for next use
			} else {
				toast.error('Failed to send feedback. Please try again.');
				onFeedbackSent(false); // Notify parent of failure
				console.error('Feedback request failed:', response);
			}
		} catch (error) {
			toast.error('An error occurred. Please check your network and try again.');
			onFeedbackSent(false); // Notify parent of failure
			console.error('Error sending feedback', error);
		} finally {
			setIsSending(false);
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[425px]" onInteractOutside={() => handleSendFeedback(false)}>
				<DialogHeader>
					<DialogTitle>Provide Feedback</DialogTitle>
					<DialogDescription>
						You selected "{feedbackType === 'like' ? 'Thumbs Up' : 'Thumbs Down'}".
						Optionally, leave a comment below.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<Input
						id="comment"
						placeholder="Optional comment..."
						className="col-span-4"
						value={comment}
						onChange={(e) => setComment(e.target.value)}
						disabled={isSending}
					/>
				</div>
				<DialogFooter>
					<Button variant="outline" onClick={()=> handleSendFeedback(false)} disabled={isSending}>
						Cancel
					</Button>
					<Button type="submit" className='bg-outer-space text-bone-lighter' onClick={()=> handleSendFeedback(true)} disabled={isSending}>
						{isSending ? 'Sending...' : 'Send Feedback'}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default FeedbackCommentDialog;