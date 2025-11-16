import { Box, Container, VStack, Heading, Text } from '@chakra-ui/react';
import LocalInsights from '../../components/LocalInsights/LocalInsights';
import GlobalInsights from '../../components/GlobalInsights/GlobalInsights';
import './ExplainabilityPageStyles.css';
import ChatBot from '../../components/ChatBot/ChatBot';

export default function ExplainabilityPage() {
  return (
    <Box className="explainability-page">
      <Container className='explainability-container' maxW="full" py={8}>
        <VStack gap={8} align="stretch">
          <Box textAlign="center">
            <Heading size="2xl" color="blue.800" mb={1}>
              Model Explainability
            </Heading>
            <Text fontSize="md" color="gray.700">
              Understand how the model makes its predictions
            </Text>
          </Box>

          <GlobalInsights />
          <LocalInsights />
          <ChatBot />
        </VStack>
      </Container>
    </Box>
  );
}
