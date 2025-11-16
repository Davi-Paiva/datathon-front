// src/components/FeatureDetailsModal.tsx
import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
} from "@chakra-ui/react";

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

const FeatureDetailsModal: React.FC<FeatureDetailsModalProps> = ({
  isOpen,
  item,
  onClose,
}) => {
  if (!item) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Detalle de la feature</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontWeight="bold">Feature:</Text>
          <Text mb={3}>{item.feature}</Text>

          <Text fontWeight="bold">Importancia media |SHAP|:</Text>
          <Text mb={3}>{item.importance.toFixed(4)}</Text>

          <Text fontWeight="bold">SHAP medio (con signo):</Text>
          <Text mb={3}>{item.shap.toFixed(4)}</Text>

          <Text fontSize="sm" color="gray.600">
            Aquí puedes añadir una explicación más de negocio para esta feature.
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose} colorScheme="blue">
            Cerrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FeatureDetailsModal;
