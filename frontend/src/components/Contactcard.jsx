import React from "react";
import PropTypes from "prop-types";
import { VStack, Card, Box } from "@chakra-ui/react";
import TextP from "../components/TextP.jsx";
import Textbox from "./Textbox.jsx";
import Textbox2 from "./Textbox2.jsx";
import Button1 from "./Button1.jsx";
function Contactcard(props) {
  return (
    <>
      <Card
        w={{ base: 320, sm: 510, md: 510, lg: 505 }}
        h= {{ base: 850, sm: 800, md: 800, lg: 800 }}
        bg="#FFFFFF"
        boxShadow="0px 4px 64px rgba(0, 0, 0, 0.05)"
        border="0.5px solid #878787"
        borderRadius="10px"
        boxSizing="border-box"
      >
        <VStack
          marginLeft={{ base: "20px", sm: "35px" }}
          marginTop={{ base: "50px", sm: "35px" }}
          align="left"
        >
          <TextP heading="Let’s Talk!" fw="600" fs="31px" lh="46px" />
          <TextP heading="Contact us!" fw="400" fs="16px" lh="24px" />
        </VStack>

        <VStack
          marginLeft={{ base: "20px", sm: "35px" }}
          marginTop={{ base: "50px", sm: "35px" }}
          align="left"
          gap="18px"
        >
          <Box>
            <TextP heading="Name" fw="400" fs="16px" lh="24px" />
            <Textbox
              w={{ base: 275, sm: 430, md: 430, lg: 423 }}
              ty="text"
              ph="Enter your name"
            />
          </Box>
          <Box>
            <TextP heading="Email" fw="400" fs="16px" lh="24px" />
            <Textbox
              w={{ base: 275, sm: 430, md: 430, lg: 423 }}
              ty="email"
              ph="Enter your Email"
            />
          </Box>

          <Box>
            <TextP heading="Subject" fw="400" fs="16px" lh="24px" />
            <Textbox
              w={{ base: 275, sm: 430, md: 430, lg: 423 }}
              ty="text"
              ph="Enter your Subject"
            />
          </Box>

          <Box>
            <TextP heading="Message" fw="400" fs="16px" lh="24px" />
            <Textbox2
              w={{ base: 275, sm: 430, md: 430, lg: 423 }}
              h="150px"
              ty="text"
              ph="Enter your message"
            />
          </Box>

          <Button1 name="Submit" h="58px" w={{ base: 275, sm: 430, md: 430, lg: 423 }} />
        </VStack>
      </Card>
    </>
  );
}

Contactcard.propTypes = {};

export default Contactcard;
