import React from "react";
import PropTypes from "prop-types";
import {Checkbox} from '@chakra-ui/react'
function Check(props) {
  return (
    <>
      <Checkbox
        fontFamily="Poppins"
        fontStyle="normal"
        fontWeight="400"
        fontSize="12px"
        lh="18px"
        textColor="#000000"
        colorScheme={props.cs}
      >
        {props.title}
      </Checkbox>
    </>
  );
}

Check.propTypes = {};

export default Check;
