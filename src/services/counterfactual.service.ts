const API_BASE_URL = 'http://0.0.0.0:8000';

type CounterfactualOutput = {
    model: string;
    counterfactual: Counterfactual;
}

type Counterfactual = {
    "current_prediction": number,
    "current_probability": number,
    "top_feature": string,
    "current_value": number,
    "shap_value": number,
    "suggestion": string,
    "suggested_value": number,
    "explanation": string
}

/**
 * Counterfactual Service for interacting with the counterfactual API
 */
class CounterfactualService {
  /**
   * Generate counterfactual explanations
   * @param input - The input data for generating counterfactuals
   * @returns Promise with the counterfactual response
   */
  async generateCounterfactual(): Promise<CounterfactualOutput> {
    try {
      const response = await fetch(`${API_BASE_URL}/ml/explain_shap_counterfactual`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Counterfactual generation failed: ${response.statusText}`);
      }

      const data: CounterfactualOutput = await response.json();
      return data;
    } catch (error) {
      console.error('Error generating counterfactual:', error);
      throw error;
    }
  }
}

export const counterfactualService = new CounterfactualService();