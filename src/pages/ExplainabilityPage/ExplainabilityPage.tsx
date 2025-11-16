import { Box, Container, VStack, Heading, Text } from '@chakra-ui/react';
import './ExplainabilityPageStyles.css';

export default function ExplainabilityPage() {
  return (
    <Box className="explainability-page">
      <Container maxW="container.xl" py={8}>
        <VStack gap={8} align="stretch">
          <Box textAlign="center">
            <Heading size="2xl" color="blue.800" mb={4}>
              Model Explainability
            </Heading>
            <Text fontSize="lg" color="gray.700">
              Understand how the model makes its predictions
            </Text>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
