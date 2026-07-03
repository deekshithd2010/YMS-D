import React from "react";
import PropTypes from "prop-types";
import { Text } from "@chakra-ui/react";
function Text2(props) {
  return (
    <>
      <Text
        fontFamily="Poppins"
        fontStyle="normal"
        fontWeight='300'
        fontSize={props.fs}
        letterSpacing="-0.02em"
        lineHeight={props.lh}
        color="#4D4D4D"
        
      >
        {props.heading}
        <b>{props.heading2}</b>
      </Text>
    </>
  );
}

Text2.propTypes = {};

export default Text2;
