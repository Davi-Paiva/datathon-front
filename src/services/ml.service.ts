import type { PredictionInput, PredictionResponse } from '../types/prediction.types';

const API_BASE_URL = 'http://0.0.0.0:8000';

/**
 * ML Service for interacting with the machine learning API
 */
class MLService {
  /**
   * Make a prediction using the ML model
   * @param input - The prediction input data
   * @returns Promise with the prediction response
   */
  async predict(input: PredictionInput): Promise<PredictionResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/ml/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error(`Prediction failed: ${response.statusText}`);
      }

      const data: PredictionResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error making prediction:', error);
      throw error;
    }
  }
}

// Export a singleton instance
export const mlService = new MLService();
export default mlService;
