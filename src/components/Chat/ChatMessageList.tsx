import { useEffect, useRef } from 'react';
import type { ChatMessage as ChatMessageType } from '@/types/chat'; // Adjust path if needed
import ChatMessage from './ChatMessage';

interface ChatMessageListProps {
	messages: ChatMessageType[];
	isLoadingAiResponse: boolean;
}

const ChatMessageList = ({ messages, isLoadingAiResponse }: ChatMessageListProps) => {
	const messagesEndRef = useRef<null | HTMLDivElement>(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(scrollToBottom, [messages, isLoadingAiResponse]);

	return (
		<div className="flex-1 overflow-y-auto space-y-4 mb-3 p-2">
			{messages.map((msg) => (
				<ChatMessage key={msg.id} message={msg} />
			))}
			{isLoadingAiResponse && (
				<div className="flex items-start space-x-2">
					<div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center font-bold text-sm shrink-0">AI</div>
					<div className="bg-white rounded-lg shadow px-3 py-2 text-sm">
						<div className="flex items-center space-x-1">
							<div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-75"></div>
							<div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></div>
							<div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-300"></div>
						</div>
					</div>
				</div>
			)}
			<div ref={messagesEndRef} />
		</div>
	);
};

export default ChatMessageList;