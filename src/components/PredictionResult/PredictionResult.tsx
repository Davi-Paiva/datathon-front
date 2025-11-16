import { Box, Button, Heading, Text, VStack } from '@chakra-ui/react';
import './PredictionResult.css';

interface PredictionResultProps {
  prediction: number;
}

export default function PredictionResult({ prediction }: PredictionResultProps) {
  const isWin = prediction === 1;
  
  return (
    <Box className={`prediction-result ${isWin ? 'win' : 'lose'}`}>
      <VStack gap={6}>
        <Box className="result-icon">
          {isWin ? '🎉' : '❌'}
        </Box>
        <Heading size="2xl" fontWeight="black" className="result-heading">
          {isWin ? 'WIN' : 'LOSE'}
        </Heading>
        <Box className="prediction-badge">
          <Text fontSize="sm" fontWeight="semibold" color="gray.600">
            Prediction Value
          </Text>
          <Text fontSize="2xl" fontWeight="bold" color={isWin ? 'green.600' : 'red.600'}>
            {prediction}
          </Text>
        </Box>
        <Button 
          colorScheme={isWin ? 'green' : 'red'} 
          size="lg"
          width="full"
          maxW="300px"
          className="understand-button"
        >
          Understand the Results
        </Button>
      </VStack>
    </Box>
  );
}
