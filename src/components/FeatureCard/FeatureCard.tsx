import { Box, Heading, Text, VStack, Card } from '@chakra-ui/react';
import type { IconType } from 'react-icons';
import './FeatureCard.css';

interface FeatureCardProps {
  icon: IconType;
  title: string;
  description: string;
  iconColor: string;
}

export default function FeatureCard({ icon: Icon, title, description, iconColor }: FeatureCardProps) {
  return (
    <Card.Root>
      <Card.Body className="feature-card">
        <VStack gap={4}>
          <Box className="feature-icon" color={iconColor}>
            <Icon />
          </Box>
          <Heading size="lg" className="feature-title">
            {title}
          </Heading>
          <Text className="feature-description">
            {description}
          </Text>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
}
