import React from 'react'
import PropTypes from 'prop-types'
import { Text } from '@chakra-ui/react'
function TextS(props) {
  return (
    <>
      <Text
        fontFamily='Samarkan'
        fontStyle='normal'
        fontWeight={props.fw}
        fontSize={props.fs}
        letterSpacing="-0.02em"
        lineHeight={props.lh}
        color='#000000'
        textAlign={props.al}

      >{props.heading}</Text>
    </>
  )
}

TextS.propTypes = {

}

export default TextS

