import { Box, Heading, VStack } from '@chakra-ui/react';
import './LocalInsights.css';
import LimeExplanationSplitChart from '../charts/LimeExplanationChart';
import AiText from '../AiText/AiText';
import { useState, useEffect, useCallback } from 'react';

interface LocalInsightsProps {
  onLoadComplete?: () => void;
}

export default function LocalInsights({ onLoadComplete }: LocalInsightsProps) {
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
    <Box className="local-insights-container">
      <VStack gap={4} align="stretch">
        <Heading size="lg" color="blue.700">
          Local Insights
        </Heading>
        <LimeExplanationSplitChart onLoadComplete={handleChartLoad} />
        <AiText URL="http://localhost:8000/ai/text/local" shouldLoad={chartLoaded} onLoadComplete={handleTextLoad} />
      </VStack>
    </Box>
  );
}
