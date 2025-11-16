import { Box, Container, VStack, Grid } from '@chakra-ui/react';
import { FaBrain, FaChartLine, FaRobot } from 'react-icons/fa';
import HeroSection from '../../components/HeroSection/HeroSection';
import FeatureCard from '../../components/FeatureCard/FeatureCard';
import CTASection from '../../components/CTASection/CTASection';
import './HomePage.css';

const features = [
  {
    icon: FaBrain,
    title: 'Advanced AI',
    description: 'State-of-the-art machine learning algorithms trained on comprehensive datasets',
    color: 'blue.500'
  },
  {
    icon: FaChartLine,
    title: 'Data-Driven',
    description: 'Make informed decisions based on statistical analysis and pattern recognition',
    color: 'purple.500'
  },
  {
    icon: FaRobot,
    title: 'Easy to Use',
    description: 'Simple interface for inputting parameters and getting instant predictions',
    color: 'green.500'
  }
];

export default function HomePage() {
  return (
    <Box className="home-page">
      <Container maxW="full" className="home-container">
        <VStack gap={12}>
          <HeroSection />
          
          <Grid 
            templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} 
            gap={6}
            className="features-grid"
          >
            {features.map((feature) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                iconColor={feature.color}
              />
            ))}
          </Grid>

          <CTASection />
        </VStack>
      </Container>
    </Box>
  );
}
