import { Box, Button, Input, HStack, Text } from '@chakra-ui/react';
import { FaPaperPlane } from 'react-icons/fa';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  loading: boolean;
  isExpanded: boolean;
}

export default function ChatInput({ value, onChange, onSend, loading, isExpanded }: ChatInputProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <Box className="input-container">
      {!isExpanded && (
        <Text color="gray.600" fontSize="sm" mb={2} textAlign="center">
          💬 Ask the AI Assistant anything about your predictions
        </Text>
      )}
      <HStack gap={2}>
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={isExpanded ? "Ask a follow-up..." : "Ask me anything..."}
          size="lg"
          disabled={loading}
          className="chat-input"
        />
        <Button
          onClick={onSend}
          colorScheme="blue"
          size="lg"
          disabled={loading || !value.trim()}
          flexShrink={0}
          className="send-button"
        >
          <FaPaperPlane />
        </Button>
      </HStack>
    </Box>
  );
}
