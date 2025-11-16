// src/components/AIText.tsx
import React, { useEffect, useState } from "react";
import { Box, Text, Spinner, VStack } from "@chakra-ui/react";

const TEXT_API_URL = "http://localhost:8000/ai/text/local";

interface LocalTextResponse {
  text: string;
}

const AIText: React.FC = () => {
  const [text, setText] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocalText = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(TEXT_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify({ ...payload si lo necesitas... })
        });

        if (!res.ok) {
          throw new Error(`Error HTTP ${res.status}`);
        }

        const json = (await res.json()) as LocalTextResponse;
        setText(json.text);
      } catch (err: any) {
        console.error(err);
        setError(err.message ?? "Error al cargar explicación local");
      } finally {
        setLoading(false);
      }
    };

    fetchLocalText();
  }, []);

  if (loading) {
    return (
      <VStack align="flex-start" gap={2}>
        <Spinner size="sm" />
        <Text color="gray.600" fontSize="sm">
          Cargando explicación local...
        </Text>
      </VStack>
    );
  }

  if (error) {
    return (
      <Text color="red.400" fontSize="sm">
        Error al cargar explicación local: {error}
      </Text>
    );
  }

  if (!text) return null;

 return (
  <Box
    as="blockquote"
    borderLeftWidth="4px"
    borderColor="blue.400"
    pl={4}
    py={2}
    color="gray.700"
    bg="gray.50"
    rounded="md"
    whiteSpace="pre-line"
    fontSize="sm"
  >
    {text}
  </Box>
    );

};

export default AIText;
