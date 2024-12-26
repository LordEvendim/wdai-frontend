import { NavigationBar } from "@/components/custom/NavigationBar";
import { Box } from "@chakra-ui/react";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <NavigationBar />
      <Box w={"80%"} mx={"auto"}>
        <Outlet />
      </Box>
      <TanStackRouterDevtools />
    </>
  ),
});
