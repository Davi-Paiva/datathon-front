import { useEffect } from "react";
import { Box, Button, Text, VStack, HStack, Heading } from "@chakra-ui/react";
import { FaTimes } from "react-icons/fa";
import "./FeatureDetailsModal.css";

export interface ShapItem {
  feature: string;
  shap: number;
  importance: number;
}

interface FeatureDetailsModalProps {
  isOpen: boolean;
  item: ShapItem | null;
  onClose: () => void;
}

export default function FeatureDetailsModal({
  isOpen,
  item,
  onClose,
}: FeatureDetailsModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !item) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Box className="modal-overlay" onClick={handleOverlayClick}>
      <Box className="modal-content">
        <HStack justify="space-between" mb={4}>
          <Heading size="lg" color="blue.700">
            Feature Details
          </Heading>
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="modal-close-button"
          >
            <FaTimes />
          </Button>
        </HStack>

        <VStack align="stretch" gap={4}>
          <Box>
            <Text fontWeight="bold" fontSize="sm" color="gray.600" mb={1}>
              Feature:
            </Text>
            <Text fontSize="lg" fontWeight="semibold">
              {item.feature}
            </Text>
          </Box>

          <Box>
            <Text fontWeight="bold" fontSize="sm" color="gray.600" mb={1}>
              Average Importance |SHAP|:
            </Text>
            <Text fontSize="lg" fontWeight="semibold">
              {item.importance.toFixed(4)}
            </Text>
          </Box>

          <Box>
            <Text fontWeight="bold" fontSize="sm" color="gray.600" mb={1}>
              Average SHAP (with sign):
            </Text>
            <Text fontSize="lg" fontWeight="semibold" color={item.shap >= 0 ? "green.600" : "red.600"}>
              {item.shap.toFixed(4)}
            </Text>
          </Box>

          <Box
            bg="blue.50"
            p={4}
            borderRadius="md"
            borderLeft="4px solid"
            borderColor="blue.400"
          >
            <Text fontSize="sm" color="gray.700">
              This feature contributes to the model's predictions. A positive SHAP value indicates
              it pushes predictions toward "Win", while negative values push toward "Loss".
            </Text>
          </Box>
        </VStack>

        <HStack justify="flex-end" mt={6}>
          <Button onClick={onClose} colorScheme="blue" size="lg">
            Close
          </Button>
        </HStack>
      </Box>
    </Box>
  );
}
