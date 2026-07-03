import React from "react";
import PropTypes from "prop-types";
import {
  Flex,
  HStack,
  IconButton,
  SimpleGrid,
  Spacer,
  VStack,
} from "@chakra-ui/react";
import TextP from "./TextP";
import Pic from "./Pic";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
function Teacherinfo(props) {
  return (
    <>
      <SimpleGrid columns={6} gap="20px" display={{ base: "none", lg: "flex" }} paddingBlock="100px">
        <VStack w="270px">
          <TextP heading="Name" fw="500" fs="20px" lh="28px" al="center" />
          <HStack paddingBlock="10px" h="80px">
            <Pic w="45px" h="45px" src="public\images\profile.jpg" br="100%" />
            <TextP heading="Name" fw="400" fs="16px" lh="24px" />
          </HStack>
        </VStack>
        <VStack w="220px">
          <TextP heading="Email" fw="500" fs="20px" lh="28px" al="center" />
          <Flex paddingBlock="10px" h="80px" alignItems="center">
            <TextP
              heading="deekshithdekshi@gmail.com"
              fw="300"
              fs="14px"
              lh="28px"
            />
          </Flex>
        </VStack>

        <VStack w="200px">
          <TextP heading="Role" fw="500" fs="20px" lh="28px" al="center" />
          <Flex paddingBlock="10px" h="80px" alignItems="center">
            <TextP heading="Session Teacher" fw="400" fs="16px" lh="28px" />
          </Flex>
        </VStack>

        <VStack w="200px">
          <TextP
            heading="Role Details"
            fw="500"
            fs="20px"
            lh="28px"
            al="center"
          />
          <Flex paddingBlock="10px" h="80px" alignItems="center">
            <TextP heading="PGDYT" fw="400" fs="16px" lh="28px" />
          </Flex>
        </VStack>
        <VStack>
<br/>
          <Flex paddingBlock="10px" h="80px" alignItems="center">
            <HStack>
              <IconButton bg="none" icon={<DeleteIcon />} />
              <IconButton bg="none" icon={<EditIcon />} />
            </HStack>
          </Flex>
        </VStack>
      </SimpleGrid>
    </>
  );
}

Teacherinfo.propTypes = {};

export default Teacherinfo;
