import { Flex, HStack, IconButton, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import PropTypes from "prop-types";
import TextP from "./TextP";
import Paid from "./Paid";
import Pending1 from "./Pending1";

function Box3(props) {
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
          columnGap="50px"
          justifyItems="center"
          width="100%"
        >
          <TextP heading={props.courseCode || "Course"} fw="300" fs="16px" lh="28px" />
          <TextP heading={props.courseName || "Resources"} fw="300" fs="14px" lh="28px" />
          {isPaid ? <Paid /> : <Pending1 />}
        </SimpleGrid>
      </Flex>
    </div>
  );
}

Box3.propTypes = {
  courseCode: PropTypes.string,
  courseName: PropTypes.string,
  paymentStatus: PropTypes.string,
};

export default Box3;
