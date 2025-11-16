import { useEffect } from "react";
import { Box, Button, Text, VStack, HStack, Heading } from "@chakra-ui/react";
import { FaTimes } from "react-icons/fa";
import "./FeatureDetailsModal.css";
import PdpChart from "../charts/PdpChart";
import AiText from "../AiText/AiText";

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
            {item.feature} Details 
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
        <div
          style={{
            width: "100%",
            height: 420,           // un poco más alto
            background: "#2e2e2e",
            padding: 20,
            color: "#ddd",
            borderRadius: 8,
          }}
        >
          <PdpChart feature={item.feature} />
        </div>
        <div style={{ marginTop: 10 }}>
          <AiText URL="http://localhost:8000/ai/pdp_sentence"/>
        </div>
      </Box>
    </Box>
  );
}
