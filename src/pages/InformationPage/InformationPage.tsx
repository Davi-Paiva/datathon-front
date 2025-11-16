import { Container, VStack, Heading, Box } from '@chakra-ui/react';
import MlIntroduction from '../../components/MlIntroduction/MlIntroduction';
import './InformationPage.css';

export default function InformationPage() {
  return (
    <Box height="calc(100vh - 72px)" overflow="hidden" display="flex" flexDirection="column">
      <Container maxW="full" px={0} flex="1" display="flex" flexDirection="column">
        <VStack gap={4} align="stretch" height="100%" py={4}>
          <Box textAlign="center">
            <Heading size="xl" color="blue.700">
              Model Information
            </Heading>
          </Box>
          <Box px={8} flex="1" overflow="auto">
            <MlIntroduction />
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
