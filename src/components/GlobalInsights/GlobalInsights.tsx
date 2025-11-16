import { Box, Heading, VStack } from '@chakra-ui/react';
import './GlobalInsights.css';
import ShapFeatureImportanceChart from '../charts/ShapFeatureImportanceChart';
import AiText from '../AiText/AiText';
import { useState, useEffect, useCallback } from 'react';

interface GlobalInsightsProps {
  shouldLoad?: boolean;
  onLoadComplete?: () => void;
}

export default function GlobalInsights({ shouldLoad = false, onLoadComplete }: GlobalInsightsProps) {
  const [chartLoaded, setChartLoaded] = useState(false);
  const [textLoaded, setTextLoaded] = useState(false);

  useEffect(() => {
    if (chartLoaded && textLoaded && onLoadComplete) {
      onLoadComplete();
    }
  }, [chartLoaded, textLoaded, onLoadComplete]);

  const handleChartLoad = useCallback(() => {
    setChartLoaded(true);
  }, []);

  const handleTextLoad = useCallback(() => {
    setTextLoaded(true);
  }, []);

  return (
    <Box className="global-insights-container">
      <VStack gap={4} align="stretch">
        <Heading size="lg" color="blue.700">
          Global Insights
        </Heading>
        <ShapFeatureImportanceChart shouldLoad={shouldLoad} onLoadComplete={handleChartLoad} />
        <AiText URL="http://localhost:8000/ai/text/global" shouldLoad={chartLoaded} onLoadComplete={handleTextLoad} />
      </VStack>
    </Box>
  );
}
