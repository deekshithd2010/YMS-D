import React from "react";
import PropTypes from "prop-types";
import { Flex, HStack, IconButton, SimpleGrid } from "@chakra-ui/react";
import { EditIcon } from '@chakra-ui/icons'
import TextP from "./TextP";
import Pending1 from "./Pending1";
import Paid from "./Paid";

function Box2(props) {
  const isPaid = props.paymentStatus?.toLowerCase() === "paid";

  return (
    <div style={{ marginBottom: "15px" }}>
      <Flex
        w={{ base: "300px", sm: "600px", lg: "800px" }}
        h={{ base: "auto", lg: "50px" }}
        border="0.6px solid #000000"
        borderRadius="5px"
        justifyContent="space-evenly"
        padding="5px"
      >
        <SimpleGrid
          columns={{ base: 1, lg: 3 }}
          marginBlock="5px"
          alignItems="center"
          justifyItems="center"
          columnGap="50px"
          width="100%"
        >
          <TextP heading={props.batchTime || "Timing not specified"} fw="300" fs="16px" lh="28px" />
          <HStack>
            <TextP heading="Registered" fw="400" fs="16px" lh="28px" />
          </HStack>
          {isPaid ? <Paid /> : <Pending1 />}
        </SimpleGrid>
      </Flex>
    </div>
  );
}

Box2.propTypes = {
  batchTime: PropTypes.string,
  paymentStatus: PropTypes.string,
};

export default Box2;
