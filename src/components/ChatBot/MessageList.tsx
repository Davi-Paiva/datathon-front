import { Box, VStack } from '@chakra-ui/react';
import MessageBubble from './MessageBubble';
import type { Message } from './ChatBot';

interface MessageListProps {
  messages: Message[];
  loading: boolean;
}

export default function MessageList({ messages, loading }: MessageListProps) {
  return (
    <Box className="messages-container">
      <VStack gap={3} align="stretch">
        {messages.map((message, index) => (
          <MessageBubble key={index} message={message} />
        ))}
        {loading && (
          <MessageBubble 
            message={{ role: 'assistant', content: 'Thinking...' }} 
          />
        )}
      </VStack>
    </Box>
  );
}
