import React from "react";
import { Flex,VStack } from "@chakra-ui/react";
import TextP from "../../components/TextP";
import Button1 from "../../components/Button1";
import Textbox from "../../components/Textbox";
function Forgetpass3() {
  return (
    <>
      <Flex
        paddingBlock={{ base: "180px", sm: "180px" }}
        paddingInline={{ base: "70px", sm: "320px" }}
        w="100%"
        justifyContent="center"
      >
        <VStack gap="30px">
          <TextP heading="New Credentitials" fw="400" fs="32px" lh="48px" />
          <div>
           <TextP heading=" New Password" fw="400" fs="16px" lh="24px" al="left"/>
           <Textbox
              w={{ base: 275, sm: 430, md: 430, lg: 423 }}
              ty="password"
              ph="Enter your new password"
            />
          </div>
          <div>
            <TextP heading="Confirm Password" fw="400" fs="16px" lh="24px" al="left" />
            <Textbox
              w={{ base: 275, sm: 430, md: 430, lg: 423 }}
              ty="password"
              ph="Confirm your password"
            />
          </div>
          <Button1 name="Submit" h="58px" w={{ base: 275, sm: 430, md: 430, lg: 423 }} />
        </VStack>
      </Flex>
    </>
  );
}

export default Forgetpass3;
