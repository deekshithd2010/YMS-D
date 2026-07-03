import React from "react";
import PropTypes from "prop-types";
import { Flex, HStack, IconButton, SimpleGrid } from "@chakra-ui/react";
import { EditIcon } from '@chakra-ui/icons'
import TextP from "./TextP";
import Pending1 from "./Pending1";
function Box2(props) {
  return (
    <div>
      <Flex
        w={{ base: "300px", sm:"600px", lg: "800px" }}
        h={{base:"200px", lg:"50px"}}
        border="0.6px solid #000000"
        justifyContent="space-evenly"
      >
        <SimpleGrid columns={{base:1, lg:3}} marginBlock="5px" alignItems="center" justifyItems="center" columnGap="50px">
          <TextP heading="6 : 00 AM - 7 : 00 Am" fw="300" fs="16px" lh="28px"  />
          <HStack>
            <TextP heading="Change Timing" fw="300" fs="16px" lh="28px"  />
            <IconButton 
            icon={<EditIcon/>} alignSelf="center" />
          </HStack>
          <Pending1 />
          </SimpleGrid>
                </Flex>
    </div>
  );
}

Box2.propTypes = {};

export default Box2;
