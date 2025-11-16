import { Box, Text } from '@chakra-ui/react';

interface MetricCardProps {
  label: string;
  value: string;
  color: string;
}

export default function MetricCard({ label, value, color }: MetricCardProps) {
  return (
    <Box className="metric-card" style={{ borderColor: color }}>
      <Text className="metric-label">{label}</Text>
      <Text className="metric-value" style={{ color }}>{value}</Text>
    </Box>
  );
}
