import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import './GlobalInsights.css';

export default function GlobalInsights() {
  return (
    <Box className="global-insights-container">
      <VStack gap={4} align="stretch">
        <Heading size="lg" color="blue.700">
          Global Insights
        </Heading>
        <Text color="gray.600">
          Explore overall model behavior and feature importance across all predictions
        </Text>
        {/* Content will be added here */}
      </VStack>
    </Box>
  );
}
