import { Box, Container, VStack } from '@chakra-ui/react';
import './PredictionPageStyles.css';
import ExamplesScroll from '../../components/ExamplesScroll/ExamplesScroll';

export default function PredictionPage() {
  return (
    <Box className="prediction-page">
      <Container maxW="full" py={8} px={0}>
        <VStack gap={6} px={150}>
          <ExamplesScroll />
        </VStack>
      </Container>
    </Box>
  );
}
