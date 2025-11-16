import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, Container, Heading, VStack } from '@chakra-ui/react';
import LocalInsights from '../../components/LocalInsights/LocalInsights';
import GlobalInsights from '../../components/GlobalInsights/GlobalInsights';
import './ExplainabilityPageStyles.css';
import ChatBot from '../../components/ChatBot/ChatBot';
import CounterfactualSection from '../../components/CounterfactualSection/CounterfactualSection';

export default function ExplainabilityPage() {
  const [searchParams] = useSearchParams();
  const predictionParam = searchParams.get('prediction');
  const prediction = predictionParam === 'true' ? true : predictionParam === 'false' ? false : null;
  
  const [localInsightsComplete, setLocalInsightsComplete] = useState(false);
  const [globalInsightsComplete, setGlobalInsightsComplete] = useState(false);

  const handleLocalInsightsComplete = () => {
    setLocalInsightsComplete(true);
  };

  const handleGlobalInsightsComplete = () => {
    setGlobalInsightsComplete(true);
  };

  return (
    <Container maxW="container.xl" py={8}>
      <VStack gap={8} align="stretch">
        <Box textAlign="center">
          <Heading size="2xl" color="blue.700" mb={2}>
            Model Explainability
          </Heading>
        </Box>

        <LocalInsights onLoadComplete={handleLocalInsightsComplete} />
        <GlobalInsights shouldLoad={localInsightsComplete} onLoadComplete={handleGlobalInsightsComplete} />
        
        {prediction === false && localInsightsComplete && globalInsightsComplete && (
          <CounterfactualSection prediction={prediction} />
        )}
        
        <ChatBot />
      </VStack>
    </Container>
  );
}
