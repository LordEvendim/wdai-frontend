import { ProductPreview } from "@/components/ui/ProductPreview";
import { Box } from "@chakra-ui/react";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

const products = [
  {
    productId: 1,
    name: "Product 1",
    description: "Description 1",
  },
  {
    productId: 2,
    name: "Product 2",
    description: "Description 2",
  },
  {
    productId: 3,
    name: "Product 3",
    description: "Description 3",
  },
  {
    productId: 4,
    name: "Product 4",
    description: "Description 4",
  },
];

function Index() {
  return (
    <Box>
      {products.map((product) => (
        <ProductPreview
          key={product.productId}
          id={product.productId}
          name={product.name}
          description={product.description}
        />
      ))}
    </Box>
  );
}
