import { Button,} from "@chakra-ui/react";
import React from "react";
import PropTypes from "prop-types";

function Button2(props) {
  return (
    <div>
      <Button
      bg="#D2D2D2"
      borderRadius="5px"
      height={props.h}
      width={props.w}
      fontSize="16px"
      lineHeight="24px"
      color= "#000000"
      fontFamily= 'Poppins'
      fontStyle='normal'
      letterSpacing= '-2%'
        _hover={{ bg: "#9A9A9A", color: "#FFFFFF" }}
        onClick={props.onClick}
      >
        {props.name}
      </Button>
    </div>
  );
}

Button2.propTypes = {};

export default Button2;
