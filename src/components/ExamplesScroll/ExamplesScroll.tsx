import { Box, Card, Text, Flex, Heading, IconButton } from '@chakra-ui/react';
import { FaCopy } from 'react-icons/fa';
import data_examples from '../../data/example_data';
import { toaster } from '../ui/toaster';
import './ExamplesScroll.css';

export default function ExamplesScroll() {
  const handleCopy = (example: Record<string, number>) => {
    const jsonString = JSON.stringify(example, null, 2);
    navigator.clipboard.writeText(jsonString).then(() => {
      toaster.create({
        title: 'Copied to clipboard!',
        type: 'success',
        duration: 2000,
      });
    });
  };

  return (
    <Box className="examples-scroll-container">
      {Object.entries(data_examples).map(([key, example]) => (
        <Card.Root key={key} className="example-card">
          <Card.Body p={2}>
            <Flex gap={2} align="center" wrap="nowrap">
              <Box className="example-title" flexShrink={0}>
                <Heading size="sm" color="blue.600">
                  {key.replace('_', ' ').toUpperCase()}
                </Heading>
              </Box>
              {Object.entries(example).map(([field, value]) => (
                <Box key={field} className="example-field" flexShrink={0}>
                  <Text fontSize="9px" color="gray.600" fontWeight="semibold" truncate>
                    {field.replace(/_/g, ' ')}
                  </Text>
                  <Text fontSize="xs" fontWeight="bold">
                    {typeof value === 'number' ? value.toFixed(3) : value}
                  </Text>
                </Box>
              ))}
              <IconButton
                aria-label="Copy to clipboard"
                size="sm"
                className="copy-button"
                onClick={() => handleCopy(example)}
                colorScheme="blue"
                flexShrink={0}
              >
                <FaCopy />
              </IconButton>
            </Flex>
          </Card.Body>
        </Card.Root>
      ))}
    </Box>
  );
}
