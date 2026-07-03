import React from "react";
import { Flex, Box, VStack } from "@chakra-ui/react";
import TextP from "../components/TextP";
import TP1 from "../components/TP1";
import Box2 from "../components/Box2";
import Box3 from "../components/Box3";
import Pic from "../components/Pic";
function Yogaprofile() {
  return (
    <>
      <Flex w="100%" h="100%" bg="#F6F6F6">
        <Box
          justifyItems="center"
          bg="#FFFFFF"
          width="100%"
          border={{ base: "none", lg: "0.6px solid #000000" }}
          borderRadius={{base:"none", lg:"10px"}}
          boxSizing="border-box"
          marginBottom={{base:"none", lg:"80px"}}
          marginInline={{ base: "0px", lg: "200px" }}
          rowGap="50px"
        >
          <Flex
            bg="#285430"
            paddingBlock="60px"
            borderRadius={{base:"none", lg:"10px"}}
            direction="column"
            alignItems="center"
          >
            <Pic
              w="130px"
              h="130px"
              src="public\images\profile.jpg"
              br="100%"
            />
            <TP1
              heading="Deekshith D"
              fw="400"
              fs="20px"
              lh="28px"
              c="#FFFFFF"
            />
          </Flex>
          <VStack gap="20px" marginBlock="50px">
            <div>
              <TextP heading="Yoga Session" fw="400" fs="20px" lh="36px" al="center" />
              <Box2 />
            </div>
            <div>
              <TextP heading="Yoga Course" fw="400" fs="20px" lh="36px" al="center" />
              <Box3 />
            </div>
          </VStack>
        </Box>
      </Flex>
    </>
  );
}

export default Yogaprofile;
