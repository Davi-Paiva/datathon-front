const API_BASE_URL = 'http://0.0.0.0:8000';

class AIService {
  /**
   * Get AI-generated insights
   * @returns Promise with the insights response
   */
  async getInsights(question: string): Promise<{ answer: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/ai/answer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch insights: ${response.statusText}`);
      }

      const data: { answer: string } = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching AI insights:', error);
      throw error;
    }
  }
}

export const aiService = new AIService();