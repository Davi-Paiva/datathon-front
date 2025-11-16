import { Box, Heading, VStack } from '@chakra-ui/react';
import './LocalInsights.css';
import LimeExplanationSplitChart from '../charts/LimeExplanationChart'
import AIText from '../../services/AIText';

export default function LocalInsights() {
  return (
    <Box className="local-insights-container">
      <VStack gap={4} align="stretch">
        <Heading size="lg" color="blue.700">
          Local Insights
        </Heading>
        <LimeExplanationSplitChart />
        <AIText URL="http://localhost:8000/ai/text/local" />
      </VStack>
    </Box>
  );
}
