import { useState } from 'react';
import { Box, Container, Heading, VStack } from '@chakra-ui/react';
import LocalInsights from '../../components/LocalInsights/LocalInsights';
import GlobalInsights from '../../components/GlobalInsights/GlobalInsights';
import './ExplainabilityPageStyles.css';

export default function ExplainabilityPage() {
  const [localInsightsComplete, setLocalInsightsComplete] = useState(false);

  const handleLocalInsightsComplete = () => {
    setLocalInsightsComplete(true);
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
        <GlobalInsights shouldLoad={localInsightsComplete} />
      </VStack>
    </Container>
  );
}
