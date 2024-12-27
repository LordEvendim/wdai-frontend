import { Box, Button, HStack, Input, Textarea } from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/products/$productId")({
  component: RouteComponent,
});

// nazwa, opis, funkcje, dostępa ilość, input ilości + przycisk dodania
// do koszyka

const maxAvailable = 10;
const reviewsData = [
  {
    id: 1,
    author: "John Doe",
    content: "Great product, I love it!",
  },
  {
    id: 2,
    author: "Jack Doe",
    content: "I don't like it",
  },
];

function RouteComponent() {
  const { productId } = Route.useParams();
  const [quantity, setQuantity] = useState(1);

  const handleChangeQuantity = (value: number) => {
    setQuantity(Math.min(Math.max(1, value), maxAvailable));
  };

  return (
    <Box w={"60%"} mx={"auto"} mt={10}>
      <Box fontSize={"2xl"}>Product {productId}</Box>
      <Box fontSize={"md"} color={"gray.500"} mt={5}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </Box>
      <Box
        w={"full"}
        mx={"auto"}
        borderColor={"gray.100"}
        borderWidth={"1px"}
        mt={5}
      />
      <Box>
        <Box fontSize={"sm"} color={"gray.500"} mt={5} mb={"5px"}>
          Quantity ({maxAvailable} available)
        </Box>
        <HStack>
          <Box>
            <Input
              type={"number"}
              value={quantity}
              w={"120px"}
              onChange={(e) =>
                handleChangeQuantity(parseInt(e.target.value) ?? 0)
              }
            />
          </Box>
          <Button>Add to cart</Button>
        </HStack>
      </Box>
      <Box
        w={"full"}
        mx={"auto"}
        borderColor={"gray.100"}
        borderWidth={"1px"}
        mt={5}
      />
      <Box
        fontSize={"xl"}
        mt={"20px"}
        ml={"5px"}
        fontWeight={"bold"}
        color={"gray.300"}
      >
        Reviews
      </Box>
      {reviewsData.map((review) => (
        <Box
          key={review.id}
          mt={"10px"}
          boxShadow={"xs"}
          p={"10px"}
          borderRadius={"10px"}
        >
          <Box fontSize={"xs"} color={"gray.300"}>
            {review.author}
          </Box>
          <Box>{review.content}</Box>
        </Box>
      ))}
      <Box mt={"20px"}>
        <Box color={"gray.400"} fontSize={"sm"}>
          Your review
        </Box>
        <Textarea />
        <Button mt={"10px"}>Submit</Button>
      </Box>
    </Box>
  );
}
