import { Box, Heading, Text, HStack, Grid } from '@chakra-ui/react';

interface ClassMetricsProps {
  className: string;
  icon: React.ReactNode;
  precision: string;
  recall: string;
  f1Score: string;
  support: string;
  color: string;
}

export default function ClassMetrics({ className, icon, precision, recall, f1Score, support, color }: ClassMetricsProps) {
  return (
    <Box className="class-metrics" style={{ borderLeftColor: color }}>
      <HStack gap={2} mb={3}>
        <Box fontSize="2xl" color={color}>
          {icon}
        </Box>
        <Heading size="md" color={color}>
          {className}
        </Heading>
      </HStack>
      <Grid templateColumns="repeat(2, 1fr)" gap={3}>
        <Box>
          <Text fontSize="xs" color="gray.600">Precision</Text>
          <Text fontSize="lg" fontWeight="bold">{precision}</Text>
        </Box>
        <Box>
          <Text fontSize="xs" color="gray.600">Recall</Text>
          <Text fontSize="lg" fontWeight="bold">{recall}</Text>
        </Box>
        <Box>
          <Text fontSize="xs" color="gray.600">F1-Score</Text>
          <Text fontSize="lg" fontWeight="bold">{f1Score}</Text>
        </Box>
        <Box>
          <Text fontSize="xs" color="gray.600">Support</Text>
          <Text fontSize="lg" fontWeight="bold">{support}</Text>
        </Box>
      </Grid>
    </Box>
  );
}
