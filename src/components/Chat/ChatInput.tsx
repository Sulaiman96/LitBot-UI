import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatInputProps {
	inputValue: string;
	onInputChange: (value: string) => void;
	onSendMessage: (e: React.FormEvent) => void; // Changed to accept form event
	isLoading: boolean;
}

const ChatInput = ({ inputValue, onInputChange, onSendMessage, isLoading }: ChatInputProps) => {
	return (
		<form onSubmit={onSendMessage} className="flex items-center relative py-3 border-t border-gray-200">
			<Input
				type="text"
				placeholder="Ask about this summary..."
				value={inputValue}
				onChange={(e) => onInputChange(e.target.value)}
				disabled={isLoading}
				className="flex-1 rounded-full px-4 py-3 border-gray-300 focus:outline-none bg-neutral-lightest focus:ring-2 focus:ring-bone-dark text-sm pr-12"
			/>
			<Button
				type="submit"
				size="icon"
				disabled={isLoading || inputValue.trim() === ''}
				className="bg-transparent absolute right-2 bottom-0 mb-3 rounded-full hover:bg-gray-200 transition p-2"
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
					<path fill={isLoading || inputValue.trim() === '' ? 'gray' : 'black'} d="M4 18.5v-13L19.423 12zM5 17l11.85-5L5 7v3.885L9.846 12L5 13.116zm0 0V7z"/>
				</svg>
			</Button>
		</form>
	);
};

export default ChatInput;