import { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Input,
  Button,
  VStack,
  HStack,
  Grid,
  Card,
  Fieldset,
  Alert,
  Spinner,
} from '@chakra-ui/react';
import { Field } from '../../components/ui/field';
import mlService from '../../services/ml.service';
import type { PredictionInput } from '../../types/prediction.types';
import './PredictionPageStyles.css';

export default function PredictionPage() {
  const [formData, setFormData] = useState<PredictionInput>({
    product_A_sold_in_the_past: 0,
    product_B_sold_in_the_past: 0,
    product_A_recommended: 0,
    product_A: 0,
    product_C: 0,
    product_D: 0,
    cust_hitrate: 0,
    cust_interactions: 0,
    cust_contracts: 0,
    opp_month: 0,
    opp_old: 0,
    competitor_Z: 0,
    competitor_X: 0,
    competitor_Y: 0,
  });

  const [prediction, setPrediction] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: keyof PredictionInput, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: parseFloat(value) || 0,
    }));
    console.log(formData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPrediction(null);

    try {
      const response = await mlService.predict(formData);
      setPrediction(response.prediction);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      product_A_sold_in_the_past: 0,
      product_B_sold_in_the_past: 0,
      product_A_recommended: 0,
      product_A: 0,
      product_C: 0,
      product_D: 0,
      cust_hitrate: 0,
      cust_interactions: 0,
      cust_contracts: 0,
      opp_month: 0,
      opp_old: 0,
      competitor_Z: 0,
      competitor_X: 0,
      competitor_Y: 0,
    });
    setPrediction(null);
    setError(null);
  };

  const formatFieldName = (field: string) => {
    return field
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <Box className="prediction-page">
      <Container maxW="container.xl" className="prediction-container">
        <VStack gap={6} align="stretch">
          {/* Header */}
          <Box className="prediction-header">
            <Heading className="prediction-title">
              ML Prediction System
            </Heading>
            <Text className="prediction-subtitle">
              Enter the input parameters to get a prediction from our machine learning model
            </Text>
          </Box>

          {/* Main Content */}
          <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={6}>
            {/* Form Card */}
            <Card.Root className="form-card">
              <Card.Body p={6}>
                <form onSubmit={handleSubmit}>
                  <Fieldset.Root>
                    <Fieldset.Legend fontSize="xl" fontWeight="bold" mb={4}>
                      Input Parameters
                    </Fieldset.Legend>

                    <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4}>
                      {/* Product Fields */}
                      <Box gridColumn={{ base: '1', md: 'span 2' }}>
                        <Text fontSize="md" fontWeight="semibold" color="blue.500" mb={3}>
                          Product Information
                        </Text>
                      </Box>
                      
                      <Field label={formatFieldName('product_A_sold_in_the_past')}>
                        <Input
                          type="number"
                          step="any"
                          value={formData.product_A_sold_in_the_past}
                          onChange={(e) => handleInputChange('product_A_sold_in_the_past', e.target.value)}
                        />
                      </Field>

                      <Field label={formatFieldName('product_B_sold_in_the_past')}>
                        <Input
                          type="number"
                          step="any"
                          value={formData.product_B_sold_in_the_past}
                          onChange={(e) => handleInputChange('product_B_sold_in_the_past', e.target.value)}
                        />
                      </Field>

                      <Field label={formatFieldName('product_A_recommended')}>
                        <Input
                          type="number"
                          step="any"
                          value={formData.product_A_recommended}
                          onChange={(e) => handleInputChange('product_A_recommended', e.target.value)}
                        />
                      </Field>

                      <Field label={formatFieldName('product_A')}>
                        <Input
                          type="number"
                          step="any"
                          value={formData.product_A}
                          onChange={(e) => handleInputChange('product_A', e.target.value)}
                        />
                      </Field>

                      <Field label={formatFieldName('product_C')}>
                        <Input
                          type="number"
                          step="any"
                          value={formData.product_C}
                          onChange={(e) => handleInputChange('product_C', e.target.value)}
                        />
                      </Field>

                      <Field label={formatFieldName('product_D')}>
                        <Input
                          type="number"
                          step="any"
                          value={formData.product_D}
                          onChange={(e) => handleInputChange('product_D', e.target.value)}
                        />
                      </Field>

                      {/* Customer Fields */}
                      <Box gridColumn={{ base: '1', md: 'span 2' }} mt={4}>
                        <Text fontSize="md" fontWeight="semibold" color="green.500" mb={3}>
                          Customer Information
                        </Text>
                      </Box>

                      <Field label={formatFieldName('cust_hitrate')}>
                        <Input
                          type="number"
                          step="any"
                          value={formData.cust_hitrate}
                          onChange={(e) => handleInputChange('cust_hitrate', e.target.value)}
                        />
                      </Field>

                      <Field label={formatFieldName('cust_interactions')}>
                        <Input
                          type="number"
                          step="any"
                          value={formData.cust_interactions}
                          onChange={(e) => handleInputChange('cust_interactions', e.target.value)}
                        />
                      </Field>

                      <Field label={formatFieldName('cust_contracts')}>
                        <Input
                          type="number"
                          step="any"
                          value={formData.cust_contracts}
                          onChange={(e) => handleInputChange('cust_contracts', e.target.value)}
                        />
                      </Field>

                      {/* Opportunity Fields */}
                      <Box gridColumn={{ base: '1', md: 'span 2' }} mt={4}>
                        <Text fontSize="md" fontWeight="semibold" color="purple.500" mb={3}>
                          Opportunity Information
                        </Text>
                      </Box>

                      <Field label={formatFieldName('opp_month')}>
                        <Input
                          type="number"
                          step="any"
                          value={formData.opp_month}
                          onChange={(e) => handleInputChange('opp_month', e.target.value)}
                        />
                      </Field>

                      <Field label={formatFieldName('opp_old')}>
                        <Input
                          type="number"
                          step="any"
                          value={formData.opp_old}
                          onChange={(e) => handleInputChange('opp_old', e.target.value)}
                        />
                      </Field>

                      {/* Competitor Fields */}
                      <Box gridColumn={{ base: '1', md: 'span 2' }} mt={4}>
                        <Text fontSize="md" fontWeight="semibold" color="orange.500" mb={3}>
                          Competitor Information
                        </Text>
                      </Box>

                      <Field label={formatFieldName('competitor_Z')}>
                        <Input
                          type="number"
                          step="1"
                          value={formData.competitor_Z}
                          onChange={(e) => handleInputChange('competitor_Z', e.target.value)}
                        />
                      </Field>

                      <Field label={formatFieldName('competitor_X')}>
                        <Input
                          type="number"
                          step="1"
                          value={formData.competitor_X}
                          onChange={(e) => handleInputChange('competitor_X', e.target.value)}
                        />
                      </Field>

                      <Field label={formatFieldName('competitor_Y')}>
                        <Input
                          type="number"
                          step="1"
                          value={formData.competitor_Y}
                          onChange={(e) => handleInputChange('competitor_Y', e.target.value)}
                        />
                      </Field>
                    </Grid>

                    {/* Action Buttons */}
                    <HStack mt={6} justify="flex-end" gap={3}>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleReset}
                        colorPalette="gray"
                      >
                        Reset
                      </Button>
                      <Button
                        type="submit"
                        colorPalette="blue"
                        loading={loading}
                        loadingText="Predicting..."
                      >
                        Get Prediction
                      </Button>
                    </HStack>
                  </Fieldset.Root>
                </form>
              </Card.Body>
            </Card.Root>

            {/* Results Card */}
            <VStack gap={4} align="stretch">
              <Card.Root bg="white" shadow="lg">
                <Card.Body p={6}>
                  <Heading size="lg" mb={4}>
                    Prediction Result
                  </Heading>

                  {loading && (
                    <VStack gap={3} py={8}>
                      <Spinner size="xl" color="blue.500" />
                      <Text color="gray.600">Processing prediction...</Text>
                    </VStack>
                  )}

                  {error && (
                    <Alert.Root status="error">
                      <Alert.Indicator />
                      <Alert.Title>Error</Alert.Title>
                      <Alert.Description>{error}</Alert.Description>
                    </Alert.Root>
                  )}

                  {prediction !== null && !loading && !error && (
                    <Box textAlign="center" py={6}>
                      <Text fontSize="sm" color="gray.600" mb={2}>
                        Predicted Value
                      </Text>
                      <Box
                        fontSize="6xl"
                        fontWeight="bold"
                        color="blue.600"
                        mb={2}
                      >
                        {prediction}
                      </Box>
                      <Alert.Root status="success" mt={4}>
                        <Alert.Indicator />
                        <Alert.Description>
                          Prediction completed successfully!
                        </Alert.Description>
                      </Alert.Root>
                    </Box>
                  )}

                  {prediction === null && !loading && !error && (
                    <Box textAlign="center" py={8} color="gray.500">
                      <Text fontSize="lg">
                        Fill in the form and click "Get Prediction" to see results
                      </Text>
                    </Box>
                  )}
                </Card.Body>
              </Card.Root>

              {/* Info Card */}
              <Card.Root bg="blue.50" borderColor="blue.200" borderWidth="1px">
                <Card.Body p={4}>
                  <Heading size="sm" mb={2} color="blue.700">
                    ℹ️ About This Model
                  </Heading>
                  <Text fontSize="sm" color="blue.900">
                    This machine learning model analyzes product, customer, opportunity, 
                    and competitor data to generate predictions. All fields are required 
                    for accurate results.
                  </Text>
                </Card.Body>
              </Card.Root>
            </VStack>
          </Grid>
        </VStack>
      </Container>
    </Box>
  );
}
