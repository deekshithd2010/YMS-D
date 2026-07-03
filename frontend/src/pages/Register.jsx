import { VStack, SimpleGrid, Grid, Card, Image, Flex } from "@chakra-ui/react";

import React from "react";
import Pic from "../components/Pic";
import Signupcard from "../components/Signupcard";

function Register() {
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
        <Signupcard />
        <Pic
          src="\images\Vector Registration.svg"
          d={{ base: "none", sm: "none", md: "none", lg: "grid", xl: "grid" }}
        ></Pic>
      </SimpleGrid>
    </>
  );
}

export default Register;
