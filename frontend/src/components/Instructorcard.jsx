import React from "react";
import PropTypes from "prop-types";
import { Box, Card, Flex, HStack, IconButton, Image } from "@chakra-ui/react";
import TextP from "./TextP";
import Pic from "./Pic";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { color } from "framer-motion";

function Instructorcard(props) {
  return (
    <>
      <Flex
        w={{ base: "160px", sm: "180px", md: "220px", lg: "280px" }}
        h={{ base: "160px", sm: "180px", md: "220px", lg: "280px" }}
        display="flex"
        backgroundSize="cover"
        backgroundImage={props.bg}
        justifyContent="center"
        padding="5px"
      >
        <Flex
          w={{ base: "120px", sm: "140px", md: "180px", lg: "210px" }}
          h={{ base: "60px", sm: "80px", md: "100px", lg: "100px" }}
          bg="#FFFFFF"
          opacity="90%"
          alignSelf="end"
          paddingInline="5px"
          direction="column"
        >
          <TextP
            heading={props.name}
            fw="400"
            fs={{ base: "12px", sm: "16px", lg: "20px" }}
            lh={{ base: "16px", sm: "20px", lg: "30px" }}
            al="center"
          />
          <TextP
            heading={props.role}
            fw="300"
            fs={{ base: "6px", sm: "8px", lg: "12px" }}
            lh={{ base: "10px", sm: "14px", lg: "18px" }}
            al="left"
          />
          <TextP
            heading={props.roledetail}
            fw="300"
            fs={{ base: "8px", sm: "10px", lg: "12px" }}
            lh={{ base: "10px", sm: "14px", lg: "18px" }}
            al="left"
          />
          <HStack justifyItems="left" alignSelf="flex-end">
            <IconButton
              bg="unset"
              icon={<FaLinkedinIn color="#000000" size="15px" />}
              borderRadius="100%"
              size="20px"
            />
            <IconButton
              bg="unset"
              icon={<FaTwitter color="#000000" size="15px" />}
              borderRadius="100%"
              size="20px"

            />
            <IconButton
              bg="unset"
              icon={<FaFacebookF color="#000000" size="15px"  />}
              borderRadius="100%"
              size="20px"

            />
          </HStack>
        </Flex>
      </Flex>
    </>
  );
}

Instructorcard.propTypes = {};

export default Instructorcard;
