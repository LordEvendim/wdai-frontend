import { useCart } from "@/hooks/useCart";
import { Box, Button, HStack, Separator } from "@chakra-ui/react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { IoMdTrash } from "react-icons/io";

export const Route = createLazyFileRoute("/cart")({
  component: RouteComponent,
});

function RouteComponent() {
  const items = useCart((state) => state.items);
  const removeItem = useCart((state) => state.removeItem);

  return (
    <Box w={"60%"} mx={"auto"} mt={"50px"}>
      <Box>
        {items.map((item) => (
          <HStack
            key={item.id}
            justifyContent={"space-between"}
            mb={"10px"}
            background={"gray.50"}
            boxShadow={"sm"}
            p={"15px"}
            borderRadius={"10px"}
          >
            <Box>{item.name}</Box>
            <HStack>
              <Box fontSize={"xs"} mr={"10px"}>
                {item.price} x {item.quantity}
              </Box>
              <Box fontWeight={"bold"}>{item.quantity * item.price}$</Box>
              <Button
                variant={"outline"}
                ml={"10px"}
                onClick={() => removeItem(item.id)}
              >
                <IoMdTrash size={"10px"} />
              </Button>
            </HStack>
          </HStack>
        ))}
      </Box>
      <Separator my={"20px"} w={"95%"} mx={"auto"} />
      <HStack justifyContent={"space-between"} alignItems={"end"}>
        <HStack alignItems={"end"}>
          <Box fontSize={"sm"} mb={"3px"}>
            Total
          </Box>
          <Box fontWeight={"bold"} fontSize={"xl"}>
            {items
              .reduce((acc, item) => acc + item.quantity * item.price, 0)
              .toFixed(2)}
            $
          </Box>
        </HStack>
        <Button>Checkout</Button>
      </HStack>
    </Box>
  );
}
