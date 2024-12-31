import { Button } from "@/components/ui/button";
import { toaster } from "@/components/ui/toaster";
import { useDeleteComment } from "@/hooks/api/useDeleteComment";
import { useGetProduct } from "@/hooks/api/useGetProduct";
import { useGetProdcutComments } from "@/hooks/api/useGetProductComments";
import { usePostComments } from "@/hooks/api/usePostComment";
import { useSession } from "@/hooks/api/useSession";
import { useCart } from "@/hooks/useCart";
import {
  Box,
  Center,
  HStack,
  Input,
  Spinner,
  Textarea,
} from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";

export const Route = createFileRoute("/products/$productId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { productId } = Route.useParams();
  const [comment, setComment] = useState("");
  const { isLoading, product } = useGetProduct(productId);
  const { isLoading: isLoadingComments, comments } =
    useGetProdcutComments(productId);
  const { session } = useSession();
  const { isPending: isDeletingComment, deleteComment } = useDeleteComment();

  const [quantity, setQuantity] = useState(1);

  const addToCart = useCart((state) => state.addItem);
  const removeFromCart = useCart((state) => state.removeItem);
  const { isPending, postComment } = usePostComments(productId);

  const handleRemoveComment = (commentId: number) => {
    if (!session) return;

    deleteComment(
      {
        commentId: commentId,
        prodcutId: productId,
      },
      {
        onError: () => {
          toaster.create({
            title: "Failed to delete comment",
            type: "error",
          });
        },
        onSuccess: () => {
          toaster.create({
            title: "Comment deleted",
            type: "success",
          });
        },
      }
    );
  };

  const handleChangeQuantity = (value: number) => {
    setQuantity(Math.min(Math.max(1, value), product?.units_in_stock ?? 0));
  };
  const handleAddToCart = () => {
    if (!product) return;

    removeFromCart(product.product_id);
    addToCart({
      id: product.product_id,
      name: product.name,
      price: product.price,
      quantity,
    });

    toaster.create({
      title: "Item added to cart",
      type: "success",
    });
  };

  const handlePostComment = () => {
    if (!product) return;

    postComment(
      {
        prodcutId: product.product_id,
        text: comment,
      },
      {
        onSuccess: () => {
          toaster.create({
            title: "Comment posted",
            type: "success",
          });
          setComment("");
        },
        onError: () => {
          toaster.create({
            title: "Failed to post comment",
            type: "error",
          });
        },
      }
    );
  };

  if (isLoading) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  return (
    <Box w={"60%"} mx={"auto"} mt={10}>
      <Box fontSize={"2xl"}>{product?.name}</Box>
      <Box fontSize={"xl"} color={"gray.400"}>
        {product?.price}$
      </Box>
      <Box fontSize={"md"} color={"gray.500"} mt={5}>
        {product?.description}
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
          Quantity ({product?.units_in_stock ?? 0} available)
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
          <Button onClick={() => handleAddToCart()}>Add to cart</Button>
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
      {isLoadingComments && <Spinner />}
      {comments?.map((comment) => (
        <Box
          key={comment.comment_id}
          mt={"10px"}
          boxShadow={"xs"}
          p={"10px"}
          borderRadius={"10px"}
          position={"relative"}
        >
          <Box fontSize={"xs"} color={"gray.300"}>
            {comment.user_id}
          </Box>
          <Box>{comment.body}</Box>
          {session &&
            (comment.user_id === session.id || session.role === "admin") && (
              <Button
                position={"absolute"}
                right={"10px"}
                top={"12px"}
                variant={"ghost"}
                color={"gray.500"}
                onClick={() => handleRemoveComment(comment.comment_id)}
                loading={isDeletingComment}
              >
                <FiTrash2 size={"10px"} />
              </Button>
            )}
        </Box>
      ))}
      <Box mt={"20px"}>
        <Box color={"gray.400"} fontSize={"sm"}>
          Your review
        </Box>
        <Textarea
          onChange={(e) => setComment(e.target.value)}
          value={comment}
        />
        <Button
          mt={"10px"}
          loading={isPending}
          onClick={() => handlePostComment()}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}
