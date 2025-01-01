import { useGetOrders } from "@/hooks/api/useGetOrders";
import { Box, Collapsible, Flex, HStack, Text } from "@chakra-ui/react";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/orders")({
  component: RouteComponent,
});

function RouteComponent() {
  const { orders } = useGetOrders();
  const uniqueOrderIds = [...new Set(orders?.map((order) => order.orderId))];

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
        {uniqueOrderIds?.map((orderId) => {
          const order = orders.filter((order) => order.orderId === orderId);
          const total = orders
            .filter((order) => order.orderId === orderId)
            .reduce((acc, order) => acc + order.price * order.quantity, 0);

          return (
            <Collapsible.Root
              key={orderId}
              justifyContent={"space-between"}
              mb={"10px"}
              background={"gray.50"}
              boxShadow={"sm"}
              p={"15px"}
              borderRadius={"10px"}
            >
              <Collapsible.Trigger paddingY="6px" w={"full"}>
                <HStack justifyContent={"space-between"}>
                  <Box color={"gray.600"}>{order[0].productName}</Box>
                  <Box mr={"10px"}>
                    <Text color={"gray.600"}>{total}$</Text>
                  </Box>
                </HStack>
              </Collapsible.Trigger>
              <Collapsible.Content>
                {orders
                  .filter((order) => order.orderId === orderId)
                  .map((order) => (
                    <Box
                      padding="10px"
                      borderWidth="1px"
                      background={"white"}
                      mt={"6px"}
                      fontSize={"14px"}
                      borderRadius={"8px"}
                    >
                      <Flex justifyContent={"space-between"}>
                        <Box>{order.productName}</Box>
                        <Box>
                          {order.quantity} x {order.price}$
                        </Box>
                      </Flex>
                    </Box>
                  ))}
              </Collapsible.Content>
            </Collapsible.Root>
          );
        })}
      </Box>
    </Box>
  );
}
