import { useFilterStore } from "@/hooks/useSearch";
import { HStack, Input } from "@chakra-ui/react";
import React from "react";

interface ProductPreviewProps {}

export const ProductBrowse: React.FC<ProductPreviewProps> = ({}) => {
  const setFilter = useFilterStore((state) => state.setFilter);
  const filter = useFilterStore((state) => state.filter);

  return (
    <HStack>
      <Input
        placeholder="Search..."
        borderRadius={"10px"}
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      {/* <Button borderRadius={"10px"} variant={"subtle"}>
        Search
      </Button> */}
    </HStack>
  );
};
