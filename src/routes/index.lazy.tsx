import { ProductBrowse } from "@/components/custom/ProductBrowse";
import { ProductPreview } from "@/components/custom/ProductPreview";
import { useGetProducts } from "@/hooks/api/useGetProducts";
import { useFilterStore } from "@/hooks/useSearch";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const { products } = useGetProducts();
  const filter = useFilterStore((state) => state.filter);

  return (
    <Box mt={"50px"}>
      <ProductBrowse />
      <SimpleGrid columns={4} gap={"20px"} mt={"15px"}>
        {products
          ?.filter((product) => product.name.includes(filter))
          .map((product) => (
            <ProductPreview
              key={product.product_id}
              id={product.product_id}
              name={product.name}
              description={product.description}
              price={product.price}
            />
          ))}
      </SimpleGrid>
    </Box>
  );
}
