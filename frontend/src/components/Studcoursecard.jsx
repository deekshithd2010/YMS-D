import React from "react";
import PropTypes from "prop-types";
import { Card, HStack, IconButton, VStack } from "@chakra-ui/react";
import Pic from "./Pic";
import TextP from "./TextP";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import Paid from "./Paid";
function Studcoursecard(props) {
  return (
    <>
      <Card
        w="200px"
        h="200px"
        bg="#F6F6F6"
        border="0.6px solid #000000"
        borderRadius="10px"
        display={{ base: "flex", lg: "none" }}
        alignItems="center"
        padding="10px"
      >
        <Pic w="35px" h="35px" src="public\images\profile.jpg" br="100%" />
        <TextP heading="Name" fw="300" fs="12px" lh="24px" />
        
        <VStack >
          <TextP
            heading="deekshithdekshi@gmail.com"
            fw="300"
            fs="10px"
            lh="16px"
          />
          <TextP heading="PGDYT" fw="500" fs="12px" lh="16px" />
          <Paid />
        </VStack>
        <br/>
        <HStack>
          <IconButton bg="none" size="sm" icon={<DeleteIcon />} />
              <IconButton bg="none" size="sm" icon={<EditIcon />} />
        </HStack>
      </Card>
    </>
  );
}

Studcoursecard.propTypes = {};

export default Studcoursecard;
