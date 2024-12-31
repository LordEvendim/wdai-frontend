import { NavigationBar } from "@/components/custom/NavigationBar";
import { Toaster } from "@/components/ui/toaster";
import { useSession } from "@/hooks/api/useSession";
import { Box } from "@chakra-ui/react";
import { createRootRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { useEffect } from "react";

export const Route = createRootRoute({
  component: () => {
    const { session, isLoading } = useSession();
    const navigate = useNavigate();

    useEffect(() => {
      if (!session && !isLoading) {
        navigate({ to: "/login" });
      }
    }, [session, isLoading]);

    return (
      <>
        <Toaster />
        <NavigationBar />
        <Box w={"80%"} mx={"auto"}>
          <Outlet />
        </Box>
        <TanStackRouterDevtools />
      </>
    );
  },
});
