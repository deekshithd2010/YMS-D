import { Flex, HStack, IconButton, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import TextP from "./TextP";
import { EditIcon } from "@chakra-ui/icons";
import Paid from "./Paid";
function Box3() {
  return (
    <>
      <Flex
        w={{ base: "300px",sm:"600px", lg: "800px" }}
        h={{base:"200px", lg:"50px"}}
        border="0.6px solid #000000"
        justifyContent="space-evenly"
      >
        <SimpleGrid
          columns={{ base: 1, lg: 3 }}
          marginBlock="5px"
          alignItems="center"
          columnGap="50px"
          justifyItems="center"
        >
          <TextP heading="PGDYT" fw="300" fs="16px" lh="28px" />

          <TextP heading="Resources" fw="300" fs="16px" lh="28px" />

          <Paid />
        </SimpleGrid>
      </Flex>
    </>
  );
}

export default Box3;
