import { useEffect, useState } from "react";
import { Box, Text, SkeletonText } from "@chakra-ui/react";
import { aiService } from "../../services/ai.service";
import "./AIText.css";

interface AiTextProps {
  URL: string;
  shouldLoad?: boolean;
}

export default function AiText({ URL, shouldLoad = true }: AiTextProps) {
  const [text, setText] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!shouldLoad) return;

    const fetchText = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await aiService.getText(URL);
        setText(result);
      } catch (err: any) {
        console.error(err);
        setError(err.message ?? "Error loading explanation");
      } finally {
        setLoading(false);
      }
    };

    fetchText();
  }, [URL, shouldLoad]);

  if (!shouldLoad || loading) {
    return (
      <Box as="blockquote" className="ai-text-container">
        <SkeletonText noOfLines={10}/>
      </Box>
    );
  }

  if (error) {
    return (
      <Text className="ai-text-error">
        Error loading explanation: {error}
      </Text>
    );
  }

  if (!text) return null;

  // Parse text and convert **text** to bold
  const formatText = (input: string) => {
    const parts = input.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        const boldText = part.slice(2, -2);
        return <strong key={index}>{boldText}</strong>;
      }
      return part;
    });
  };

  return (
    <Box as="blockquote" className="ai-text-container">
      {formatText(text)}
    </Box>
  );
}
