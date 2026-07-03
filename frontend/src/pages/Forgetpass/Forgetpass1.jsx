import React from "react";
import TextP from "../../components/TextP";
import { Flex, Box, VStack } from "@chakra-ui/react";
import Textbox from "../../components/Textbox";
import Button1 from "../../components/Button1";
function Forgetpass1() {
  return (
    <>
      <Flex
        paddingBlock={{ base: "180px", sm: "285px" }}
        paddingInline={{ base: "70px", sm:"320px"}}
        w="100%"
        justifyContent="center"
        textAlign="center"
      >
        <VStack gap="30px">
          <TextP heading="Enter Email" fw="400" fs="32px" lh="48px" />
          <TextP
            heading="Enter the email address associated with your account and                  
            we'll send you a link to reset your password."
            fw="300"
            fs={{ base: "16px", md: "20px" }}
            lh={{ base: "24px", md: "30px" }}
          />
          <Box>
            <TextP heading="Email" fw="400" fs="16px" lh="24px" al="left"/>
            <Textbox
              w={{ base: 275, sm: 430, md: 430, lg: 423 }}
              ty="email"
              ph="Enter your email"
            />
          </Box>
          <Button1 name="Submit" h="58px" w={{ base: 275, sm: 430, md: 430, lg: 423 }} />

        </VStack>
      </Flex>
    </>
  );
}

export default Forgetpass1;
