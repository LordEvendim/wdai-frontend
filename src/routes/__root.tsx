import { Button } from "@/components/ui/button";
import { Box, Flex } from "@chakra-ui/react";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <Box w={"full"}>
        <Flex
          justifyContent={"space-between"}
          alignItems={"center"}
          w={"80%"}
          h={"60px"}
          mx={"auto"}
        >
          <Box fontWeight={"black"} color={"gray.800"}>
            Simple Shop
          </Box>
          <Box>
            <Button>Login</Button>
          </Box>
        </Flex>
      </Box>
      <Box w={"80%"} mx={"auto"}>
        <Outlet />
      </Box>
      <TanStackRouterDevtools />
    </>
  ),
});
