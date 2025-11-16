import { Box, Heading, VStack } from '@chakra-ui/react';
import './GlobalInsights.css';
import ShapFeatureImportanceChart from '../charts/ShapFeatureImportanceChart';
import AiText from '../AiText/AiText';
import { useState } from 'react';

interface GlobalInsightsProps {
  shouldLoad?: boolean;
}

export default function GlobalInsights({ shouldLoad = false }: GlobalInsightsProps) {
  const [chartLoaded, setChartLoaded] = useState(false);

  const handleChartLoad = () => {
    setChartLoaded(true);
  };

  return (
    <Box className="global-insights-container">
      <VStack gap={4} align="stretch">
        <Heading size="lg" color="blue.700">
          Global Insights
        </Heading>
        <ShapFeatureImportanceChart shouldLoad={shouldLoad} onLoadComplete={handleChartLoad} />
        <AiText URL="http://localhost:8000/ai/text/global" shouldLoad={chartLoaded} />
      </VStack>
    </Box>
  );
}
