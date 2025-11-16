import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import './GlobalInsights.css';
import ShapFeatureImportanceChart from '../charts/ShapFeatureImportanceChart'
import AIText from '../../services/AIText';

export default function GlobalInsights() {
  return (
    <Box className="global-insights-container">
      <VStack gap={4} align="stretch">
        <Heading size="lg" color="blue.700">
          Global Insights
        </Heading>
        <ShapFeatureImportanceChart/>
        <AIText URL="http://localhost:8000/ai/text/global" />
      </VStack>
    </Box>
  );
}
