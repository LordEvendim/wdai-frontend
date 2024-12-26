import { Box, Button, HStack } from "@chakra-ui/react";
import { useNavigate } from "@tanstack/react-router";
import React from "react";

interface ProductPreviewProps {
  id: number;
  name: string;
  description: string;
  price: number;
}

export const ProductPreview: React.FC<ProductPreviewProps> = ({
  description,
  id,
  name,
  price,
}) => {
  const navigate = useNavigate();

  return (
    <Box
      background={"gray.50"}
      padding={"10px"}
      borderRadius={"10px"}
      boxShadow={"sm"}
    >
      <Box
        height={"200px"}
        width={"200px"}
        background={"gray.200"}
        borderRadius={"10px"}
        w={"full"}
      />
      <HStack justify={"space-between"} mt={"10px"}>
        <Box fontWeight={"bold"}>{name}</Box>
        <Box>{price}$</Box>
      </HStack>
      <Box fontSize={"sm"} color={"gray.700"} mt={"10px"}>
        {description}
      </Box>
      <Button onClick={() => navigate({ to: `/products/${id}` })} mt={"10px"}>
        Details
      </Button>
    </Box>
  );
};
