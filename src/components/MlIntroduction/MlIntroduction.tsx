import { Box, Heading, Text, VStack, HStack, Grid } from '@chakra-ui/react';
import { FaBrain, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import MetricCard from './MetricCard';
import ClassMetrics from './ClassMetrics';
import './MlIntroduction.css';

export default function MlIntroduction() {
  return (
    <Box className="ml-introduction-container">
      <VStack gap={6} align="stretch">
        {/* Header with Icon */}
        <HStack gap={3} justify="center" className="intro-header">
          <FaBrain className="brain-icon" />
          <Heading size="xl" color="blue.700">
            Meet Your ML Model
          </Heading>
        </HStack>

        {/* Introduction Text */}
        <Box className="intro-text-box">
          <Text fontSize="lg" textAlign="center" lineHeight="tall">
            Hello, I am your Machine Learning model, built using <strong>LightGBM</strong>.
            My goal is to predict whether an opportunity will be <strong>won</strong> or <strong>lost</strong>, 
            and to explain clearly why I make each prediction.
          </Text>
        </Box>

        {/* Overall Metrics */}
        <Box className="overall-metrics-section">
          <Heading size="md" mb={4} textAlign="center" color="gray.700">
            Overall Performance
          </Heading>
          <HStack gap={4} justify="center" flexWrap="wrap">
            <MetricCard label="Accuracy" value="81%" color="#3b82f6" />
            <MetricCard label="Macro Avg" value="81%" color="#8b5cf6" />
            <MetricCard label="Weighted Avg" value="81%" color="#ec4899" />
            <MetricCard label="Total Support" value="7,180" color="#10b981" />
          </HStack>
        </Box>

        {/* Class-specific Metrics */}
        <Box className="class-metrics-section">
          <Heading size="md" mb={4} textAlign="center" color="gray.700">
            Class Performance
          </Heading>
          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
            <ClassMetrics
              className="Loss (0)"
              icon={<FaTimesCircle />}
              precision="82%"
              recall="82%"
              f1Score="82%"
              support="3,802"
              color="#ef4444"
            />
            <ClassMetrics
              className="Win (1)"
              icon={<FaCheckCircle />}
              precision="80%"
              recall="80%"
              f1Score="80%"
              support="3,378"
              color="#22c55e"
            />
          </Grid>
        </Box>
      </VStack>
    </Box>
  );
}
