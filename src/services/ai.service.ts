const API_BASE_URL = 'http://0.0.0.0:8000';

interface TextResponse {
  text: string;
}

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

  /**
   * Get AI-generated text from a specific endpoint
   * @param url - The endpoint URL to fetch text from
   * @returns Promise with the text response
   */
  async getText(url: string): Promise<string> {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}`);
      }

      const data: TextResponse = await response.json();
      return data.text;
    } catch (error) {
      console.error('Error fetching AI text:', error);
      throw error;
    }
  }
}

export const aiService = new AIService();