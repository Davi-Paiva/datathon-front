import { useState, useRef, useEffect } from 'react';
import { Box, Container, VStack, Heading } from '@chakra-ui/react';
import type { PredictionInput, PredictionResponse } from '../../types/prediction.types';
import mlService from '../../services/ml.service';
import { toaster } from '../../components/ui/toaster';
import './PredictionPageStyles.css';
import ExamplesScroll from '../../components/ExamplesScroll/ExamplesScroll';
import PredictionForm from '../../components/PredictionForm/PredictionForm';
import PredictionResult from '../../components/PredictionResult/PredictionResult';

export default function PredictionPage() {
  const [exampleData, setExampleData] = useState<PredictionInput | undefined>(undefined);
  const [prediction, setPrediction] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prediction !== null) {
      setTimeout(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth'
        });
      }, 150);
    }
  }, [prediction]);

  const handleLoadExample = (example: Record<string, number>) => {
    setExampleData(example as unknown as PredictionInput);
    setPrediction(null);
  };

  const handlePredict = async (data: PredictionInput) => {
    setLoading(true);
    try {
      const response: PredictionResponse = await mlService.predict(data);
      setPrediction(response.prediction);
      toaster.create({
        title: 'Prediction successful!',
        type: 'success',
        duration: 3000,
      });
    } catch (error) {
      toaster.create({
        title: 'Prediction failed',
        description: error instanceof Error ? error.message : 'Unknown error',
        type: 'error',
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="prediction-page">
      <Container maxW="full" py={8} px={0}>
        <VStack gap={8} align="stretch">
          <Box>
            <Heading size="lg" color="blue.700" textAlign="center" mb={4}>
              Example Data
            </Heading>
            <ExamplesScroll onLoadExample={handleLoadExample} />
          </Box>
          
          <PredictionForm 
            exampleData={exampleData} 
            onPredict={handlePredict}
            loading={loading}
          />
          
          {prediction !== null && (
            <Box ref={resultRef}>
              <PredictionResult prediction={prediction} />
            </Box>
          )}
        </VStack>
      </Container>
    </Box>
  );
}
