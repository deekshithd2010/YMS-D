import React from 'react'
import PropTypes from 'prop-types'
import { Input } from '@chakra-ui/react'
function Textbox2(props) {
  return (
    <>
       <Input
        w={props.w}
        h={props.h}
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
        />
    </>
  )
}

Textbox2.propTypes = {

}

export default Textbox2

