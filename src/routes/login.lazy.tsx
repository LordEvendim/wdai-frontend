import { Box, Flex, Input, VStack } from "@chakra-ui/react";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { toaster } from "@/components/ui/toaster";
import { useLogin } from "@/hooks/api/useLogin";

export const Route = createLazyFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const { isPending, login } = useLogin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (!username || !password) {
      return toaster.create({
        type: "error",
        title: "Invliad credentials",
        description: "Please enter valid credentials",
      });
    }

    login(
      { username, password },
      {
        onError: () => {
          toaster.create({
            type: "error",
            title: "Invalid credentials",
            description: "Please enter valid credentials",
          });
        },
        onSuccess: () => {
          toaster.create({
            type: "success",
            title: "Valid credentails",
            description: "Logged in successfully",
          });
          void navigate({ to: "/" });
        },
      }
    );
  };

  return (
    <Box
      maxW="sm"
      mx="auto"
      mt={10}
      p={5}
      pb={"8px"}
      borderWidth={"1px"}
      borderRadius="lg"
      boxShadow={"md"}
      background={"white"}
    >
      <VStack gap={"20px"} w={"full"}>
        <Box w={"full"}>
          <Box fontSize={"sm"} ml={"5px"} mb={"2px"}>
            Username
          </Box>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Box>
        <Box w={"full"}>
          <Box fontSize={"sm"} ml={"5px"} mb={"2px"}>
            Password
          </Box>
          <Input
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
        <Button
          type="submit"
          colorScheme="teal"
          width="full"
          onClick={(e) => handleLogin(e)}
          loading={isPending}
        >
          Login
        </Button>
      </VStack>
      <Flex w={"full"} alignItems={"start"}>
        <Button
          variant={"ghost"}
          fontSize={"13px"}
          h={"20px"}
          color={"gray.400"}
          onClick={() => void navigate({ to: "/register" })}
          p={0}
          ml={"5px"}
          mt={"8px"}
        >
          I don&apos;t have an account
        </Button>
      </Flex>
    </Box>
  );
}
