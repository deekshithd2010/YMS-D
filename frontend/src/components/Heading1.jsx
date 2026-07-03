import { Text } from "@chakra-ui/react";

import React from "react";
import PropTypes from "prop-types";

function Heading1(props) {
  return (
    <div>
      <Text
      display={props.d}
      position={props.p}
        width={props.w}
        height={props.h}
        left={props.l}
        top={props.t}
        fontFamily={props.ff}
        fontStyle={props.fst}
        fontWeight={props.fw}
        fontSize={props.fs}
        letterSpacing="-0.02em"
        lineHeight={props.lh}
        padding="unset"
        color={props.c}
        type={props.ty}
        right={props.r}
        bottom={props.b}
        variant={props.v}
        listStyleType="bullet"
        textAlign={props.ta}
        justifyContent={props.jc}
        justifyItems={props.ji}
        justifySelf={props.js}
        alignContent={props.ac}
        alignItems={props.ai}
        paddingLeft={props.pl}
      >{props.heading}<b>{props.heading2}</b></Text>
    </div>
  );
}

Heading1.propTypes = {};

export default Heading1 ;
