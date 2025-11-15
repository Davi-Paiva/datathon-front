import { Heading, Text, Button, VStack, Card } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import './CTASection.css';

export default function CTASection() {
  const navigate = useNavigate();

  return (
    <Card.Root className="cta-section">
      <Card.Body className="cta-content">
        <VStack gap={4}>
          <Heading size="2xl" className="cta-title">
            Ready to Get Started?
          </Heading>
          <Text fontSize="lg" className="cta-description">
            Input your data and receive predictions in seconds
          </Text>
          <Button
            size="lg"
            onClick={() => navigate('/predict')}
            className="cta-button"
          >
            Try It Now
          </Button>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
}
