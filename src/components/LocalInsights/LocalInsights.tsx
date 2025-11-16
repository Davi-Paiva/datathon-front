import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import './LocalInsights.css';

export default function LocalInsights() {
  return (
    <Box className="local-insights-container">
      <VStack gap={4} align="stretch">
        <Heading size="lg" color="blue.700">
          Local Insights
        </Heading>
        <Text color="gray.600">
          Understand how individual predictions are made for specific instances
        </Text>
        {/* Content will be added here */}
      </VStack>
    </Box>
  );
}
