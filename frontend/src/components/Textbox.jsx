import { Input } from "@chakra-ui/react";

import React from "react";
import PropTypes from "prop-types";

function Textbox(props) {
  return (
    <>
      <Input
        w={props.w}
        h='70px'
        fontFamily="Poppins"
        fontSize="14px"
        fontStyle="normal"
        fontWeight="400"
        lineHeight="26"
        letterSpacing="-0.02em"
        textAlign="left"
        textIndent="28px"
        color="#000000"
        borderRadius="5px"
        border="0.6px solid #000000"
        type={props.ty}
        placeholder={props.ph}
        value={props.value}
        onChange={props.onChange}
      />
    </>
  );
}

Textbox.propTypes = {};

export default Textbox;
