import React from "react";
import PropTypes from "prop-types";
import { Text } from "@chakra-ui/react";
function TC1(props) {
  return (
    <>
      <Text
        fontFamily="Cinzel-Regular"
        fontStyle="normal"
        fontWeight={props.fw}
        fontSize={props.fs}
        letterSpacing="-0.02em"
        lineHeight={props.lh}
        color={props.c}
        textAlign={props.al}
      >
        {props.heading}
 <Text display={{base:"none", md:"block"}}>{props.heading1}</Text>     
<Text display={{base:"block", md:"none"}}>{props.heading2}</Text>
      </Text>
    </>
  );
}

TC1.propTypes = {};

export default TC1;
