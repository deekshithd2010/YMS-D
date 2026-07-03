import React from "react";
import PropTypes from "prop-types";
import TextP from "./TextP";
import Pic from "./Pic";
import {
  Flex,
  HStack,
  IconButton,
  SimpleGrid,
  Spacer,
  VStack,
} from "@chakra-ui/react";
import Paid from "./Paid";
import Pending1 from "./Pending1";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

function Sessionstudinfo(props) {
  const isPaid = props.feesStatus?.toLowerCase() === "paid";

  return (
    <>
      <SimpleGrid columns={6} gap="20px" display={{ base: "none", lg: "flex" }} width="100%" alignItems="center">
        <VStack w="200px" align="left">
          <HStack paddingBlock="10px" h="80px">
            <Pic w="45px" h="45px" src={props.profileImage || "/images/profile.jpg"} br="100%" />
            <TextP heading={props.name || "Student"} fw="400" fs="16px" lh="24px" />
          </HStack>
        </VStack>

        <VStack w="120px" alignItems="center">
          <Flex paddingBlock="10px" h="80px" alignItems="center">
            {isPaid ? <Paid /> : <Pending1 />}
          </Flex>
        </VStack>

        <VStack w="200px">
          <Flex paddingBlock="10px" h="80px" alignItems="center">
            <TextP heading={props.batchTiming || "N/A"} fw="400" fs="14px" lh="28px" />
          </Flex>
        </VStack>

        <VStack w="220px">
          <Flex paddingBlock="10px" h="80px" alignItems="center">
            <TextP heading={props.email || ""} fw="300" fs="14px" lh="28px" />
          </Flex>
        </VStack>

        <VStack w="150px">
          <Flex paddingBlock="10px" h="80px" alignItems="center">
            <TextP heading={props.subscription || "Monthly"} fw="400" fs="16px" lh="28px" />
          </Flex>
        </VStack>

        <VStack>
          <Spacer />
          <Flex paddingBlock="10px" h="80px" alignItems="center">
            <HStack>
              <IconButton
                bg="none"
                icon={<DeleteIcon />}
                aria-label="Delete Student"
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

Sessionstudinfo.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  email: PropTypes.string,
  feesStatus: PropTypes.string,
  batchTiming: PropTypes.string,
  subscription: PropTypes.string,
  profileImage: PropTypes.string,
  onDelete: PropTypes.func,
};

export default Sessionstudinfo;
