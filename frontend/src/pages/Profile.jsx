import React from "react";
import TextP from "../components/TextP";
import Textbox2 from "../components/Textbox2";
import Button1 from "../components/Button1";
import Button2 from "../components/Button2";
import Check from "../components/Check";
import {
  HStack,
  Flex,
  SimpleGrid,
  VStack,
  Box,
  Spacer,
  Card,
} from "@chakra-ui/react";
import Pic from "../components/Pic";
import Yogaprofile from "./Yogaprofile";
import TextC from "../components/TextC";
function Profile() {
  return (
    <>
      <TextC
        heading="PERESNOL PROFILE"
        fs={{ base: 24, sm: 28, lg: 48 }}
        lh="65px"
        fw={{ base: 700, lg: 500 }}
        al ="center"
        pt="30px"
      />
      <Flex w="100%" h="100%" bg="#F6F6F6">
        <Box
          justifyItems="center"
          bg="#FFFFFF"
          width={{ base: "400px", sm: "1000px", lg: "1500px" }}
          border={{ base: "none", sm: "0.6px solid #000000" }}
          borderRadius="10px"
          boxSizing="border-box"
          marginBottom="80px"
          marginInline={{ base: "0px", sm: "150px", lg: "200" }}
        >
          <SimpleGrid
            justifyItems="center"
            columns={{ base: 1, sm: 1, lg: 3 }}
            columnGap="90px"
            rowGap="30px"
            paddingBlock={{ base: "30px", sm: "50px" }}
            paddingInline={{ base: "30px", sm: "65px" }}
          >
            <Pic
              w="130px"
              h="130px"
              src="public\images\profile.jpg"
              br="100%"
            />

            <VStack gap="10px">
              <div>
                <TextP heading="Name" fw="400" fs="16px" lh="24px" />
                <Textbox2 w="300px" h="48px" ty="text" ph="Name" />
              </div>
              <div>
                <TextP heading="Email" fw="400" fs="16px" lh="24px" />
                <Textbox2 w="300px" h="48px" ty="text" ph="Email" />
              </div>
              <div>
                <TextP heading="DOB" fw="400" fs="16px" lh="24px" />
                <Textbox2 w="300px" h="48px" ty="text" ph="DOB" />
              </div>
              <Box justifyContent="left" w="100%">
                <TextP
                  heading="Gender"
                  fw="400"
                  fs="16px"
                  lh="24px"
                  al="left"
                />
                <VStack align="left">
                  <Check cs="green" title="Male" />
                  <Check cs="green" title="Female" />
                </VStack>
              </Box>
              <div>
                <TextP heading="Address" fw="400" fs="16px" lh="24px" />
                <Textbox2 w="300px" h="48px" ty="text" ph="Address" />
              </div>
              <div>
                <TextP heading="Pincode" fw="400" fs="16px" lh="24px" />
                <Textbox2 w="300px" h="48px" ty="text" ph="Pincode" />
              </div>
            </VStack>
            <VStack gap="10px">
              <Spacer />
              <div>
                <TextP heading="City" fw="400" fs="16px" lh="24px" />
                <Textbox2 w="300px" h="48px" ty="text" ph="City" />
              </div>
              <div>
                <TextP heading="State" fw="400" fs="16px" lh="24px" />
                <Textbox2 w="300px" h="48px" ty="text" ph="State" />
              </div>
            </VStack>
          </SimpleGrid>
          <HStack
            gap="30px"
            paddingBottom="30px"
            paddingInline="45px"
            justifyContent="end"
          >
            <Button1 name="Edit" h="48px" w="130px" />
            <Button2 name="Save" h="48px" w="130px" />
          </HStack>
        </Box>
      </Flex>
      <TextC
        heading="YOGA PROFILE"
        fs={{ base: 24, sm: 28, lg: 48 }}
        lh="65px"
        fw={{ base: 700, lg: 500 }}
        al ="center"
        pt="30px"
      />
      <Yogaprofile />
    </>
  );
}

export default Profile;
