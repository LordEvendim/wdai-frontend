import { Button } from "@/components/ui/button";
import { toaster } from "@/components/ui/toaster";
import { useCreateOrder } from "@/hooks/api/useCreateOrder";
import { useSession } from "@/hooks/api/useSession";
import { useCart } from "@/hooks/useCart";
import { Box, HStack, Separator } from "@chakra-ui/react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { IoMdTrash } from "react-icons/io";

export const Route = createLazyFileRoute("/cart")({
  component: RouteComponent,
});

function RouteComponent() {
  const items = useCart((state) => state.items);
  const removeItem = useCart((state) => state.removeItem);
  const { createOrder, isPending } = useCreateOrder();
  const { session } = useSession();

  const handleCreateOrder = () => {
    if (!session) {
      return toaster.create({
        title: "Unauthorized",
        description: "You need to login to create an order",
        type: "error",
      });
    }

    createOrder(
      {
        products: items.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
        })),
        userId: session.id,
      },
      {
        onSuccess: () => {
          toaster.create({
            title: "Order created",
            description: "Your order has been created successfully",
            type: "success",
          });
        },
        onError: () => {
          toaster.create({
            title: "Order failed",
            description: "Failed to create order",
            type: "error",
          });
        },
      }
    );
  };

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
        <Button onClick={() => handleCreateOrder()} loading={isPending}>
          Checkout
        </Button>
      </HStack>
    </Box>
  );
}
