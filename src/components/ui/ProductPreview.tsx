import { Box } from "@chakra-ui/react";
import React from "react";

interface ProductPreviewProps {
  id: number;
  name: string;
  description: string;
}

export const ProductPreview: React.FC<ProductPreviewProps> = ({
  description,
  id,
  name,
}) => {
  return (
    <Box>
      <Box
        height={"200px"}
        width={"200px"}
        background={"gray.200"}
        borderRadius={"30px"}
      />
      <Box>{name}</Box>
      <Box>{description}</Box>
    </Box>
  );
};
