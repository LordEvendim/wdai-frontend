import { useGetOrders } from "@/hooks/api/useGetOrders";
import { Box, Center, HStack } from "@chakra-ui/react";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/orders")({
  component: RouteComponent,
});

function RouteComponent() {
  const { orders } = useGetOrders();

  if (!orders || orders.length === 0) {
    return (
      <Box w={"60%"} mx={"auto"} mt={"100px"}>
        <Box
          fontWeight={"bold"}
          fontSize={"2xl"}
          color={"gray.200"}
          textAlign={"center"}
        >
          No orders :(
        </Box>
      </Box>
    );
  }

  return (
    <Box w={"60%"} mx={"auto"} mt={"50px"}>
      <Box>
        {orders?.map((item) => (
          <HStack
            key={item.order_id}
            justifyContent={"space-between"}
            mb={"10px"}
            background={"gray.50"}
            boxShadow={"sm"}
            p={"15px"}
            borderRadius={"10px"}
          >
            <Box>{item.order_id}</Box>
            <Box>{item.product_id}</Box>
            <Box>{item.quantity}</Box>
          </HStack>
        ))}
      </Box>
    </Box>
  );
}
