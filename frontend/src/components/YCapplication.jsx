import React from "react";
import PropTypes from "prop-types";
import { Flex, SimpleGrid, VStack } from "@chakra-ui/react";
import TextC from "./TextC";
import TextP from "./TextP";
import Button1 from "./Button1";
import { Link } from "react-router-dom";
function YCapplication(props) {
  return (
    <>
      <Flex
        paddingInline={{ base: "20px", md: "80px" }}
        paddingBlock="120px"
        justifyItems="center"
      >
        <VStack gap="20px">
          <TextC
            heading={props.course}
            fs={{ base: "24px", sm: "32px", lg: "64px" }}
            lh={{ base: "24px", sm: "32px", lg: "64px" }}
            fw={{ base: 700, lg: 500 }}
            al="center"
          />
          <SimpleGrid columns={{ base: 1, md: 2 }} columnGap="90px" pt="50px">
            <VStack align="start" gap="50px">
              <VStack align="start">
                <TextC
                  heading="COURSE OVERVIEW"
                  fs={{ base: "20px", sm: "28px", lg: "32px" }}
                  lh={{ base: "28px", sm: "32px", lg: "44px" }}
                  fw="500"
                />
                <TextP
                  heading={props.overview1}
                  fs="16px"
                  lh="26px"
                  fw="400"
                  al="justify"
                />
              </VStack>
              <VStack align="start">
                <TextC
                  heading="COURSE LEARNING OUTCOME"
                  fs={{ base: "20px", sm: "28px", lg: "32px" }}
                  lh={{ base: "28px", sm: "32px", lg: "44px" }}
                  fw="400"
                />
                <TextP
                  heading="At the end of the course student will be able to:"
                  fs="16px"
                  lh="26px"
                  fw="400"
                />
                <TextP
                  heading={<ul>{props.outcome}</ul>}
                  fs="16px"
                  lh="26px"
                  fw="400"
                />
              </VStack>
            </VStack>
            <VStack pt="50px" gap="50px" alignItems="start">
              <TextP
                heading={props.overview2}
                fs="16px"
                lh="26px"
                fw="400"
                al="justify"
              />
              <VStack alignItems="start" gap="30px">
                <TextC
                  heading="ELIGIBILITY PREREQUISITES:"
                  fs={{ base: "20px", sm: "28px", lg: "32px" }}
                  lh={{ base: "28px", sm: "32px", lg: "44px" }}
                  fw="400"
                />
                <TextP
                  heading={props.eligibility}
                  fs="16px"
                  lh="26px"
                  fw="400"
                  al="justify"
                />
              </VStack>
              <VStack alignItems="start" gap="30px">
                <TextC
                  heading="FEE STRUCTURE:"
                  fs={{ base: "20px", sm: "28px", lg: "32px" }}
                  lh={{ base: "28px", sm: "32px", lg: "44px" }}
                  fw="400"
                />
                <TextP
                  heading="For details of the fee structure kindly contact the admissions office at the institute"
                  fs="16px"
                  lh="26px"
                  fw="400"
                  al="justify"
                />
              </VStack>
              <VStack alignItems="start" gap="30px">
                <TextC
                  heading="COURSE DURATION:"
                  fs={{ base: "20px", sm: "28px", lg: "32px" }}
                  lh={{ base: "28px", sm: "32px", lg: "44px" }}
                  fw="400"
                />
                <TextP
                  heading={props.duration}
                  fs="16px"
                  lh="26px"
                  fw="400"
                  al="justify"
                />
              </VStack>
            </VStack>
          </SimpleGrid>
          <Link to={props.link}>
            <Button1 name="Apply here!" h="60px" w="300px" />
          </Link>
        </VStack>
      </Flex>
    </>
  );
}

YCapplication.propTypes = {};

export default YCapplication;
