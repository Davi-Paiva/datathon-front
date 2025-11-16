import { useState } from 'react';
import { Box, VStack } from '@chakra-ui/react';
import './ChatBot.css';
import { aiService } from '../../services/ai.service';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import ChatInput from './ChatInput';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    if (!isExpanded) {
      setIsExpanded(true);
    }

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    aiService.getInsights(input)
      .then((response) => {
        const botMessage: Message = {
          role: 'assistant',
          content: response.answer,
        };
        setMessages((prev) => [...prev, botMessage]);
      })
      .catch(() => {
        const errorMessage: Message = {
          role: 'assistant',
          content: 'Sorry, something went wrong. Please try again later.',
        };
        setMessages((prev) => [...prev, errorMessage]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Box className={`chatbot-container ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <VStack gap={4} align="stretch" height="100%">
        {isExpanded && (
          <>
            <ChatHeader />
            <MessageList messages={messages} loading={loading} />
          </>
        )}
        
        <ChatInput
          value={input}
          onChange={setInput}
          onSend={handleSend}
          loading={loading}
          isExpanded={isExpanded}
        />
      </VStack>
    </Box>
  );
}
