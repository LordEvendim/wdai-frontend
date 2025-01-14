import { Box, Button, HStack, Image } from "@chakra-ui/react";
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
        background={"gray.100"}
        borderRadius={"10px"}
        w={"full"}
        position={"relative"}
        borderWidth={"1px"}
        borderColor={"gray.200"}
        overflow={"hidden"}
      >
        {/* <Center
          color={"gray.200"}
          top={"50%"}
          left={"50%"}
          position={"absolute"}
          transform={"translate(-50%, -50%)"}
        >
          <FaCamera size={"30px"} />
        </Center> */}
        <Image
          src={`https://picsum.photos/seed/${Math.floor(Math.random() * 100)}/400/300/`}
          w={"full"}
          h={"full"}
        />
      </Box>
      <HStack justify={"space-between"} mt={"10px"}>
        <Box
          fontWeight={"bold"}
          fontSize={"sm"}
          height={"40px"}
          overflow={"hidden"}
        >
          {name}
        </Box>
      </HStack>
      <Box fontSize={"smaller"} color={"gray.700"} mt={"10px"} h={"50px"}>
        {[...description.slice(0, 50), "..."].join("")}
      </Box>
      <HStack
        justifyContent={"space-between"}
        alignItems={"center"}
        mt={"10px"}
      >
        <Button onClick={() => void navigate({ to: `/products/${id}` })}>
          Details
        </Button>
        <Box fontSize={"md"} fontWeight={"black"} color={"gray.600"}>
          {price}$
        </Box>
      </HStack>
    </Box>
  );
};
