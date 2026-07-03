import React from 'react'
import PropTypes from 'prop-types'
import { Text } from '@chakra-ui/react'
function TextEB(props) {
  return (
    <>
        <Text
        fontFamily='EB Garamond'
        fontStyle='normal'
        fontWeight={props.fw}
        fontSize={props.fs}
        letterSpacing="-0.02em"
        lineHeight={props.lh}
        color='#000000'
      >{props.heading}</Text>
    </>
  )
}

TextEB.propTypes = {

}

export default TextEB

