import React from "react";
import PropTypes from "prop-types";
import { HStack, PinInput, PinInputField } from "@chakra-ui/react";
function Otp(props) {
  return (
    <>
      <HStack>
        <PinInput placeholder="" fontFamily="Poppins" value={props.value} onChange={props.onChange}>
          <PinInputField
            w="44px"
            h="48px"
            color="#000000"
            borderRadius="4px"
            border="1px solid #949494"
          />
          <PinInputField
            w="44px"
            h="48px"
            color="#000000"
            borderRadius="4px"
            border="1px solid #949494"
          />
          <PinInputField
            w="44px"
            h="48px"
            color="#000000"
            borderRadius="4px"
            border="1px solid #949494"
          />
          <PinInputField
            w="44px"
            h="48px"
            color="#000000"
            borderRadius="4px"
            border="1px solid #949494"
          />
          <PinInputField
            w="44px"
            h="48px"
            color="#000000"
            borderRadius="4px"
            border="1px solid #949494"
          />
          <PinInputField
            w="44px"
            h="48px"
            color="#000000"
            borderRadius="4px"
            border="1px solid #949494"
          />
        </PinInput>
      </HStack>
    </>
  );
}

Otp.propTypes = {};

export default Otp;
