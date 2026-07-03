import React from "react";
import PropTypes from "prop-types";
import { Card, Image, Spacer, Text, VStack } from "@chakra-ui/react";
function Card2(props) {
  return (
    <>
      <Card
        // marginBlock={{ base: "30px", sm: "50px", md: "80px", lg: "100px" }}
        w={{ base: "140px", sm: "160px", md: "200px", lg: "235px" }}
        h={{ base: "140px", sm: "160px", md: "200px", lg: "235px" }}
        bg="#F6F6F6"
        boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
        borderRadius="5px"
        fontFamily="Poppins"
        fontStyle="normal"
        fontWeight="500"
        fontSize={{base:"10px",lg:"16px"}}
        letterSpacing="-0.02em"
        lineHeight={{base:"10px",lg:"20px"}}
        color="#000000"
        textAlign="center"
        alignItems="center"
        verticalAlign="center"
        display="grid"
        _hover={{ bg: "#285430", color: "#FFFFFF" }}
      >
        <Image
          src={props.src}
          alt={props.alt}
          borderRadius="5px"
          w="100%"
          h="100%"
        />

        {props.title}
        <br></br>
        <Text color="#9A9A9A" lineHeight="24pxpx">
          {props.title2}
        </Text>
      </Card>
    </>
  );
}

Card2.propTypes = {};

export default Card2;
