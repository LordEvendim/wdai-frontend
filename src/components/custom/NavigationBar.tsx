import { useLogout } from "@/hooks/api/useLogout";
import { useSession } from "@/hooks/api/useSession";
import { useCart } from "@/hooks/useCart";
import { Box, Flex, HStack, Spinner } from "@chakra-ui/react";
import { Link, useNavigate } from "@tanstack/react-router";
import React from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Button } from "../ui/button";

interface NavigationBarProps {}

export const NavigationBar: React.FC<NavigationBarProps> = ({}) => {
  const navigate = useNavigate();
  const { isLoading, session } = useSession();
  const { logout, isPending: isLoggingOut } = useLogout();

  const items = useCart((state) => state.items);

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        navigate({ to: "/login" });
      },
    });
  };

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
          {isLoading && <Spinner />}

          {session ? (
            <>
              <Button
                onClick={() => navigate({ to: "/orders" })}
                variant={"ghost"}
              >
                Orders
              </Button>
              <Button
                variant={"ghost"}
                onClick={() => navigate({ to: "/cart" })}
              >
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
              <Button onClick={() => handleLogout()} loading={isLoggingOut}>
                Logout
              </Button>
            </>
          ) : (
            <Button onClick={() => navigate({ to: "/login" })}>Login</Button>
          )}
        </HStack>
      </Flex>
    </Box>
  );
};
