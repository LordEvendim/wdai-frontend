import { ProductBrowse } from "@/components/custom/ProductBrowse";
import { ProductPreview } from "@/components/custom/ProductPreview";
import { useFilterStore } from "@/hooks/useSearch";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

const products = [
  {
    productId: 1,
    name: "Product 1",
    description: "Description 1",
    price: 100,
  },
  {
    productId: 2,
    name: "Product 2",
    description: "Description 2",
    price: 200,
  },
  {
    productId: 3,
    name: "Product 3",
    description: "Description 3",
    price: 300,
  },
  {
    productId: 4,
    name: "Product 4",
    description: "Description 4",
    price: 400,
  },
];

function Index() {
  const filter = useFilterStore((state) => state.filter);

  return (
    <Box mt={"50px"}>
      <ProductBrowse />
      <SimpleGrid columns={4} gap={"20px"} mt={"15px"}>
        {products
          .filter((product) => product.name.includes(filter))
          .map((product) => (
            <ProductPreview
              key={product.productId}
              id={product.productId}
              name={product.name}
              description={product.description}
              price={product.price}
            />
          ))}
      </SimpleGrid>
    </Box>
  );
}
