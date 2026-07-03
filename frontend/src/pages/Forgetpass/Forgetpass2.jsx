import React from "react";
import { Flex, VStack, HStack, Box } from "@chakra-ui/react";
import TextP from "../../components/TextP";
import Button1 from "../../components/Button1";
import Otp from "../../components/Otp";
function Forgetpass2() {
  return (
    <>
      <Flex
        paddingBlock={{ base: "180px", sm: "285px" }}
        paddingInline={{ base: "40px", sm: "320px" }}
        w="100%"
        justifyContent="center"
        textAlign="center"
      >
        <VStack gap="30px">
          <TextP heading="We’ve Sent an Email" fw="400" fs="32px" lh="48px" />
          <TextP
            heading="You will recive a mail with verification code to reset your password"
            fw="300"
            fs={{ base: "16px", md: "20px" }}
            lh={{ base: "24px", md: "30px" }}
          />
          <Otp />
          <Button1 name="Submit" h="58px" w={{ base: 275, sm: 430, md: 430, lg: 423 }} />
          <TextP heading="Resend Code" fw="400" fs="14px" lh="0px" />
        </VStack>
      </Flex>
    </>
  );
}

export default Forgetpass2;
