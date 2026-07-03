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
      <SimpleGrid columns={6} gap="20px" display={{ base: "none", lg: "flex" }} width="100%" alignItems="center">
        <VStack w="200px" align="left">
          <HStack paddingBlock="10px" h="80px">
            <Pic w="45px" h="45px" src={props.image || "/images/profile.jpg"} br="100%" />
            <TextP heading={props.name || "Teacher"} fw="400" fs="16px" lh="24px" />
          </HStack>
        </VStack>

        <VStack w="220px">
          <Flex paddingBlock="10px" h="80px" alignItems="center">
            <TextP heading={props.email || ""} fw="300" fs="14px" lh="28px" />
          </Flex>
        </VStack>

        <VStack w="180px">
          <Flex paddingBlock="10px" h="80px" alignItems="center">
            <TextP heading={props.role || "Instructor"} fw="400" fs="16px" lh="28px" />
          </Flex>
        </VStack>

        <VStack w="180px">
          <Flex paddingBlock="10px" h="80px" alignItems="center">
            <TextP heading={props.roleDetails || "General"} fw="400" fs="16px" lh="28px" />
          </Flex>
        </VStack>

        <VStack>
          <Spacer />
          <Flex paddingBlock="10px" h="80px" alignItems="center">
            <HStack>
              <IconButton
                bg="none"
                icon={<DeleteIcon />}
                aria-label="Delete Teacher"
                onClick={() => props.onDelete && props.onDelete(props.id)}
                _hover={{ color: "red.500" }}
              />
            </HStack>
          </Flex>
        </VStack>
      </SimpleGrid>
    </>
  );
}

Teacherinfo.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  email: PropTypes.string,
  role: PropTypes.string,
  roleDetails: PropTypes.string,
  image: PropTypes.string,
  onDelete: PropTypes.func,
};

export default Teacherinfo;
