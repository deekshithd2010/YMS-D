import { ButtonGroup, Button } from "@chakra-ui/react";

import React from "react";
import PropTypes from "prop-types";

function Button1(props) {
  return (
    <>
      <Button
        bg="#285430"
        borderRadius="5px"
        height={props.h}
        width={props.w}
        fontSize="16px"
        lineHeight="24px"
        color="#FFFFFF"
        fontFamily="Poppins"
        fontStyle="normal"
        letterSpacing="-2%"
        _hover={{ bg: "#CEEDC7", color: "#000000" }}
        type={props.type}
        onSubmit={props.onSubmit}
      >
        {props.name}
      </Button>
    </>
  );
}

Button1.propTypes = {};

export default Button1;
