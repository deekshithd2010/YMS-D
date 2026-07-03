import React from 'react'
import PropTypes from 'prop-types'
import { Text } from '@chakra-ui/react'
function TP1(props) {
  return (
    <>
      <Text
        fontFamily='Poppins'
        fontStyle='normal'
        fontWeight={props.fw}
        fontSize={props.fs}
        letterSpacing="-0.02em"
        lineHeight={props.lh}
        color={props.c}
        textAlign={props.al}
        opacity={props.op}
      >{props.heading}</Text>
    </>
  )
}

TP1.propTypes = {

}

export default TP1

