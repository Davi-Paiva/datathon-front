import { useState } from 'react';
import { Box, Button, Heading, Text, VStack } from '@chakra-ui/react';
import { FaMagic, FaLightbulb } from 'react-icons/fa';
import './CounterfactualSection.css';
import { counterfactualService } from '../../services/counterfactual.service';

interface CounterfactualSectionProps {
  prediction: boolean;
}

export default function CounterfactualSection({ prediction }: CounterfactualSectionProps) {
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [explanation, setExplanation] = useState<string | null>(null);

  const onCalculate = async () => {
    try {
      setLoading(true);
      const res = await counterfactualService.generateCounterfactual();
      setSuggestion(res.counterfactual.suggestion);
      setExplanation(res.counterfactual.explanation);
    } catch (error) {
      console.error('Error generating counterfactual:', error);
    } finally {
      setLoading(false);
    }
  };

  if (prediction) {
    return null;
  }

  return (
    <Box className="counterfactual-container">
      <VStack gap={4} align="center">
        <Heading size="lg" color="blue.700" textAlign="center">
          How Could I Turn This Into a Win?
        </Heading>
        
        <Text fontSize="md" color="gray.600" textAlign="center" maxW="600px">
          Discover the minimal changes needed to flip the prediction from Loss to Win. 
          Our counterfactual analysis identifies the smallest adjustments to key features 
          that would lead to a positive outcome.
        </Text>

        <Button
          onClick={onCalculate}
          colorScheme="blue"
          size="lg"
          loading={loading}
          className="calculate-button"
          disabled={loading}
        >
          <FaMagic style={{ marginRight: '0.5rem' }} />
          {loading ? 'Calculating...' : 'Calculate Counterfactual'}
        </Button>

        {suggestion && (
          <Box className="suggestion-box">
            <VStack gap={3} align="stretch">
              <Box display="flex" alignItems="center" gap={2}>
                <FaLightbulb color="#f59e0b" size={24} />
                <Heading size="md" color="orange.700">
                  Suggested Changes
                </Heading>
              </Box>
              <Text fontSize="md" fontWeight="semibold" color="gray.800">
                {suggestion}
              </Text>
            </VStack>
          </Box>
        )}

        {explanation && (
          <Box className="explanation-box">
            <Heading size="sm" color="blue.700" mb={2}>
              Why These Changes?
            </Heading>
            <Text fontSize="sm" color="gray.700" lineHeight="tall">
              {explanation}
            </Text>
          </Box>
        )}

        {!suggestion && !loading && (
          <Box className="info-box">
            <Text fontSize="sm" color="gray.700">
              <strong>What is a counterfactual?</strong> It shows you what would need to change 
              in your data to achieve a different prediction. This helps you understand which 
              features are most actionable and how to improve your chances of winning.
            </Text>
          </Box>
        )}
      </VStack>
    </Box>
  );
}
