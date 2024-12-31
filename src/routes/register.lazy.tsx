import { Button } from "@/components/ui/button";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";
import { toaster } from "@/components/ui/toaster";
import { useRegister } from "@/hooks/api/useRegister";
import {
  Box,
  Input,
  VStack,
  Flex,
  createListCollection,
} from "@chakra-ui/react";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

const ROLES_OPTIONS = createListCollection({
  items: [
    { label: "Admin", value: "admin" },
    { label: "User", value: "user" },
  ],
});

export const Route = createLazyFileRoute("/register")({
  component: RouteComponent,
});

function RouteComponent() {
  const [selectedRole, setSelectedRole] = useState<string[]>([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const { isPending, register } = useRegister();

  const navigate = useNavigate();

  const handleRegister = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (!email.includes("@") || !email.includes(".")) {
      return toaster.create({
        type: "error",
        title: "Invalid email",
        description: "Please enter a valid email",
      });
    }

    if (!email || !password || !username) {
      return toaster.create({
        type: "error",
        title: "Invliad credentials",
        description: "Please fill all fields",
      });
    }

    if (password !== passwordRepeat) {
      return toaster.create({
        type: "error",
        title: "Passwords do not match",
        description: "Please enter the same password",
      });
    }

    register(
      { email, password, username, role: selectedRole[0] as "admin" | "user" },
      {
        onSuccess: () => {
          toaster.create({
            type: "success",
            title: "Account created",
            description: "You can now login",
          });
          navigate({ to: "/login" });
        },
        onError: (error) => {
          toaster.create({
            type: "error",
            title: "Error",
            description: error.message,
          });
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
        <Box w={"full"}>
          <Box fontSize={"sm"} ml={"5px"} mb={"2px"}>
            Repeat password
          </Box>
          <Input
            value={passwordRepeat}
            type="password"
            onChange={(e) => setPasswordRepeat(e.target.value)}
          />
        </Box>
        <Box w={"full"}>
          <Box fontSize={"sm"} ml={"5px"} mb={"2px"}>
            Role
          </Box>
          <SelectRoot
            collection={ROLES_OPTIONS}
            value={selectedRole}
            onValueChange={(e) => setSelectedRole(e.value)}
          >
            <SelectLabel />
            <SelectTrigger>
              <SelectValueText />
            </SelectTrigger>
            <SelectContent>
              {ROLES_OPTIONS.items.map((role) => (
                <SelectItem item={role} key={role.value}>
                  {role.label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
        </Box>
        <Button
          type="submit"
          colorScheme="teal"
          width="full"
          onClick={(e) => handleRegister(e)}
          loading={isPending}
        >
          Register
        </Button>
      </VStack>
      <Flex w={"full"} alignItems={"start"}>
        <Button
          variant={"ghost"}
          fontSize={"13px"}
          h={"20px"}
          color={"gray.400"}
          onClick={() => navigate({ to: "/login" })}
          p={0}
          ml={"5px"}
          mt={"8px"}
        >
          I already have an account
        </Button>
      </Flex>
    </Box>
  );
}
