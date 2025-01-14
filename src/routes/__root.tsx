import { Box } from "@chakra-ui/react";
import { createRootRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { useEffect } from "react";

import { NavigationBar } from "@/components/custom/NavigationBar";
import { Toaster, toaster } from "@/components/ui/toaster";
import { useRefreshToken } from "@/hooks/api/useRefreshToken";

export const Route = createRootRoute({
  component: () => {
    const navigate = useNavigate();
    const { refresh } = useRefreshToken();

    useEffect(() => {
      refresh(undefined, {
        onSuccess: () => {
          toaster.create({
            title: "Success",
            description: "Session refreshed",
            type: "success",
          });

          navigate({ to: "/" });
        },
        onError: () => {
          navigate({ to: "/login" });
        },
      });
    }, []);

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
