import { Heading, Text, Button, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import './HeroSection.css';

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <VStack gap={6} className="hero-section">
      <Heading size="4xl" className="hero-title">
        ML Prediction Platform
      </Heading>
      <Text fontSize="xl" className="hero-description">
        Harness the power of machine learning to make data-driven predictions. 
        Our advanced model analyzes multiple factors to provide accurate forecasts.
      </Text>
      <Button
        size="lg"
        colorPalette="blue"
        onClick={() => navigate('/predict')}
        className="hero-button"
      >
        Start Predicting
      </Button>
    </VStack>
  );
}
