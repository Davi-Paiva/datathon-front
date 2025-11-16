import { useState, useEffect } from 'react';
import { Box, Button, Grid, Heading, Input, VStack } from '@chakra-ui/react';
import { Field } from '../ui/field';
import type { PredictionInput } from '../../types/prediction.types';
import { fieldLabels, initialFormData } from '../../utils/PredictionFormUtils';
import './PredictionForm.css';

interface PredictionFormProps {
  exampleData?: PredictionInput;
  onPredict: (data: PredictionInput) => void;
  loading: boolean;
}

export default function PredictionForm({ exampleData, onPredict, loading }: PredictionFormProps) {
  const [formData, setFormData] = useState<PredictionInput>({
    ...initialFormData,
  });

  useEffect(() => {
    if (exampleData) {
      setFormData(exampleData);
    }
  }, [exampleData]);

  const handleInputChange = (field: keyof PredictionInput, value: string) => {
    if (value === '' || value === '-' || /^-?\d*\.?\d*$/.test(value)) {
      setFormData((prev) => ({
        ...prev,
        [field]: value === '' || value === '-' ? 0 : parseFloat(value) || 0,
      }));
    }
  };

  const handleSubmit = () => {
    onPredict(formData);
  };

  return (
    <Box className="prediction-form-container">
      <VStack gap={6} align="stretch">
        <Heading size="lg" color="blue.700" textAlign="center">
          Make a Prediction
        </Heading>

        <Box className="form-grid">
          <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={4}>
            {Object.entries(formData).map(([key, value]) => (
              <Field key={key} label={fieldLabels[key as keyof PredictionInput]}>
                <Input
                  value={value}
                  onChange={(e) => handleInputChange(key as keyof PredictionInput, e.target.value)}
                  size="sm"
                  p={4}
                  placeholder="0.00000"
                />
              </Field>
            ))}
          </Grid>
        </Box>

        <Button
          onClick={handleSubmit}
          loading={loading}
          colorScheme="blue"
          size="lg"
          width="full"
          disabled={loading}
        >
          {loading ? 'Predicting...' : 'Predict'}
        </Button>
      </VStack>
    </Box>
  );
}
