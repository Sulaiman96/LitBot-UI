import React, { useState } from 'react';
import type { ChatMessage as ChatMessageType } from '@/types/chat';
import ChatMessageList from '@/components/Chat/ChatMessageList';
import ChatInput from '@/components/Chat/ChatInput';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid'; // For generating unique message IDs

interface SummaryChatProps {
  summaryId: string | null;
}

const DUMMY_MESSAGES: ChatMessageType[] = [
  {
    id: '1',
    text: 'Hello! How can I help you with your summary today?',
    sender: 'ai',
    timestamp: new Date(),
  },
  {
    id: '2',
    text: 'Can you explain the main findings?',
    sender: 'user',
    timestamp: new Date(),
  },
  {
    id: '3',
    text: 'Certainly! The main findings are that LitBot improves research productivity by 30%.',
    sender: 'ai',
    timestamp: new Date(),
  },
];

const SummaryChat = ({ summaryId }: SummaryChatProps) => {
  const [messages, setMessages] = useState<ChatMessageType[]>(DUMMY_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isLoadingAiResponse, setIsLoadingAiResponse] = useState(false);

  // Helper for streaming effect
  const streamAiMessage = async (fullText: string) => {
    return new Promise<string>((resolve) => {
      let current = '';
      let i = 0;
      const interval = setInterval(() => {
        current += fullText[i];
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last && last.sender === 'ai' && last.text.length < fullText.length) {
            return [
              ...prev.slice(0, -1),
              { ...last, text: current },
            ];
          } else {
            return [
              ...prev,
              {
                id: uuidv4(),
                text: current,
                sender: 'ai',
                timestamp: new Date(),
              },
            ];
          }
        });
        i++;
        if (i >= fullText.length) {
          clearInterval(interval);
          resolve(fullText);
        }
      }, 25); // Adjust speed as needed
    });
  };

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
        return;
      }

      // Simulate backend call and streaming
      // Replace this with your real backend streaming logic
      const mockReply = "This is a simulated streaming response from the LLM. You can replace this with your backend stream.";
      await streamAiMessage(mockReply);
    } catch {
      toast.error('An error occurred while communicating with the AI.');
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: uuidv4(),
          text: "Sorry, I'm having trouble connecting. Please try again later.",
          sender: 'ai',
          timestamp: new Date(),
        },
      ]);
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