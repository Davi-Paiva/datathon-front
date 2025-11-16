import { Box, Heading, Text } from '@chakra-ui/react';

export default function ChatHeader() {
  return (
    <Box className="chatbot-header">
      <Heading size="lg" color="blue.700">
        AI Assistant
      </Heading>
      <Text color="gray.600" fontSize="sm">
        Ask questions about your predictions and model insights
      </Text>
    </Box>
  );
}
