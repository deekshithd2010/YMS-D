import React from "react";
import PropTypes from "prop-types";
import {
  ButtonGroup,
  Box,
  Heading,
  Input,
  LinkBox,
  Button,
  Text,
  Container,
  HStack,
  Link,
  Card,
  Flex,
} from "@chakra-ui/react";
import { color } from "framer-motion";

function Navbutton(props) {
  return (
    <>
      <div>
        <Box
        
          background="#FFFFFF"
          width={{base:"full",lg:"155px"}}
          height="80px"
          justifyContent="center"
         
          textAlign="center"
          alignItems="center"
          fontFamily="Cinzel-Regular"
          fontStyle="normal"
          fontWeight="500"
          fontSize="16px"
          letterSpacing="-0.02em%"
          lineHeight="22px"
          color="#1E1E1E"
          display={props.d}
          
          _hover={{
            bg: "#1E1E1E",
            borderBottom: "5px solid #285430",
            color: "#FFFFFF",
          }}
          
        >
          {props.name}
         
          

        </Box>
      </div>
    </>
  );
}

Navbutton.propTypes = {};

export default Navbutton;
