import type {ChatMessage as ChatMessageType} from '@/types/chat';

interface ChatMessageProps {
	message: ChatMessageType;
}

const ChatMessage = ({message}: ChatMessageProps) => {
	const isUser = message.sender === 'user';

	return (
		<div className={`flex items-end gap-2 ${isUser ? 'flex-row-reverse' : ''} w-full`}>
			<div
				className={`w-8 h-8 rounded-full self-end flex items-center justify-center font-bold text-base shrink-0
        ${isUser ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
			>
				{isUser ? 'M' : 'AI'}
			</div>
			<div className={`rounded-2xl shadow px-4 py-2 text-sm max-w-[70%] break-words
      ${isUser ? 'bg-blue-100 text-blue-900' : 'bg-white text-gray-800 border border-gray-200'}`}
			>
				{message.text}
				{message.timestamp && (
					<div className={`text-xs mt-1 ${isUser ? 'text-blue-400 text-right' : 'text-gray-400'}`}>
						{typeof message.timestamp === 'string'
							? new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
							: message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
					</div>
				)}
			</div>
		</div>
	);
};

export default ChatMessage;