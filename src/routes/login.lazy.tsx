import { toaster } from "@/components/ui/toaster";
import { Box, Input, Button, VStack, Flex } from "@chakra-ui/react";
import { createLazyFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createLazyFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (!email.includes("@") || !email.includes(".")) {
      return toaster.create({
        type: "error",
        title: "Invalid email",
        description: "Please enter a valid email",
      });
    }

    if (!email || !password) {
      return toaster.create({
        type: "error",
        title: "Invliad credentials",
        description: "Please enter valid credentials",
      });
    }

    console.log(email, password);
    toaster.create({
      type: "success",
      title: "Valid credentails",
      description: email + " " + password,
    });
    navigate({ to: "/" });
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
    >
      <VStack gap={"20px"} w={"full"}>
        <Box w={"full"}>
          <Box fontSize={"sm"} ml={"5px"} mb={"2px"}>
            Email
          </Box>
          <Input
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
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
          onClick={() => navigate({ to: "/register" })}
          p={0}
          ml={"5px"}
          mt={"8px"}
        >
          I don't have an account
        </Button>
      </Flex>
    </Box>
  );
}
