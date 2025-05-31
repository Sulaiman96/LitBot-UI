import React, { useState } from 'react';
import type { ChatMessage as ChatMessageType } from '@/types/chat';
import ChatMessageList from '@/components/Chat/ChatMessageList';
import ChatInput from '@/components/Chat/ChatInput';
import makeProtectedRequest from '@/lib/utils';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid'; // For generating unique message IDs

interface SummaryChatProps {
  summaryId: string | null;
}

const SummaryChat = ({ summaryId }: SummaryChatProps) => {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoadingAiResponse, setIsLoadingAiResponse] = useState(false);

  const chatApiUrl = `${import.meta.env.VITE_DEV_BACKEND_URL}/api/chat`; // Replace with your actual chat API endpoint

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '' || isLoadingAiResponse) return;

    const userMessage: ChatMessageType = {
      id: uuidv4(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputValue('');
    setIsLoadingAiResponse(true);

    try {
      if (!summaryId) {
        toast.error("Cannot send message: Summary ID is missing.");
        setIsLoadingAiResponse(false);
        // Optionally, add the user message back to input or handle differently
        // setMessages(prev => prev.filter(msg => msg.id !== userMessage.id)); 
        return;
      }

      const response = await makeProtectedRequest(
        chatApiUrl,
        'POST',
        { 'Content-Type': 'application/json' },
        { message: userMessage.text, summaryId: summaryId }
      );

      if (response && response.reply) {
        const aiMessage: ChatMessageType = {
          id: uuidv4(),
          text: response.reply,
          sender: 'ai',
          timestamp: new Date(),
        };
        setMessages((prevMessages) => [...prevMessages, aiMessage]);
      } else {
        console.error('Invalid AI response:', response);
        toast.error('Received an invalid response from the AI.');
        // Optionally add a generic error message to chat
        const errorAiMessage: ChatMessageType = {
          id: uuidv4(),
          text: "Sorry, I couldn't process that. Please try again.",
          sender: 'ai',
          timestamp: new Date(),
        };
        setMessages((prevMessages) => [...prevMessages, errorAiMessage]);
      }
    } catch (error) {
      console.error('Error sending message or fetching AI response:', error);
      toast.error('An error occurred while communicating with the AI.');
      const errorAiMessage: ChatMessageType = {
        id: uuidv4(),
        text: "Sorry, I'm having trouble connecting. Please try again later.",
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, errorAiMessage]);
    } finally {
      setIsLoadingAiResponse(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-bone-light rounded-xl p-4">
      <ChatMessageList messages={messages} isLoadingAiResponse={isLoadingAiResponse} />
      <ChatInput
        inputValue={inputValue}
        onInputChange={setInputValue}
        onSendMessage={handleSendMessage}
        isLoading={isLoadingAiResponse}
      />
    </div>
  );
};

export default SummaryChat;