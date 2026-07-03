import { SimpleGrid } from "@chakra-ui/react";
import Pic from "../components/Pic";
import React from "react";
import Logincard from "../components/Logincard";


export default function Login() {
  
  return (
    <>
      <SimpleGrid
        w="100%"
        h="100%"
        columns={{ sm: 0, md: 1, lg: 2, xl: 2 }}
        justifyItems="center"
        alignItems="center"
        marginBlock="50px"
      >
        <Logincard />
        <Pic
          src="\images\Group 3150.svg"
          d={{ base: "none", sm: "none", md: "none", lg: "grid", xl: "grid" }}
        ></Pic>
      </SimpleGrid>
    </>
  );
}
