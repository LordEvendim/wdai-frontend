import { useCart } from "@/hooks/useCart";
import { Box, Button, Flex, HStack } from "@chakra-ui/react";
import { Link, useNavigate } from "@tanstack/react-router";
import React from "react";
import { MdOutlineShoppingCart } from "react-icons/md";

interface NavigationBarProps {}

export const NavigationBar: React.FC<NavigationBarProps> = ({}) => {
  const navigate = useNavigate();
  const items = useCart((state) => state.items);

  return (
    <Box w={"full"}>
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        w={"80%"}
        h={"60px"}
        mx={"auto"}
      >
        <Box fontWeight={"black"} color={"gray.800"}>
          <Link to={"/"}>Simple Shop</Link>
        </Box>
        <HStack gap={"20px"}>
          <Button onClick={() => navigate({ to: "/login" })}>Login</Button>
          <Button variant={"ghost"} onClick={() => navigate({ to: "/cart" })}>
            <MdOutlineShoppingCart size={"16px"} />
            {items.length > 0 && (
              <Box
                fontSize={"10px"}
                fontWeight={"black"}
                color={"white"}
                background={"red"}
                w={"15px"}
                h={"15px"}
                borderRadius={"full"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                boxShadow={"md"}
              >
                <Box>{items.length}</Box>
              </Box>
            )}
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};
