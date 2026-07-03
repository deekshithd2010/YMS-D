import React from 'react'
import PropTypes from 'prop-types'
import {Text} from '@chakra-ui/react'
function Text1(props) {
  return (
    <>
        <Text
        fontFamily='Poppins'
        fontStyle='normal'
        fontWeight={props.fw}
        fontSize={props.fs}
        letterSpacing="-0.02em"
        lineHeight={props.lh}
        color='#000000'
        textAlign={props.al}
        alignSelf={props.as}
        padding={props.pd}
      >{props.heading}<b>{props.heading2}</b></Text>
    </>
  )
}

Text1.propTypes = {

}

export default Text1

