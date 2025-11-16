import { Box, Text } from '@chakra-ui/react';
import type { Message } from './ChatBot';

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  return (
    <Box className={`message ${message.role}`}>
      <Text fontSize="sm">{message.content}</Text>
    </Box>
  );
}
