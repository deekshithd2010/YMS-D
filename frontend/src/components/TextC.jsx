import React from 'react'
import PropTypes from 'prop-types'
import {Text} from '@chakra-ui/react'
function TextC(props) {
  return (
    <>
      <Text
        fontFamily='Cinzel-Regular'
        fontStyle='normal'
        fontWeight={props.fw}
        fontSize={props.fs}
        letterSpacing="-0.02em"
        lineHeight={props.lh}
        color='#000000'
        textAlign={props.al}
        paddingTop={props.pt}

      >{props.heading}</Text>
    
    </>
  )
}

TextC.propTypes = {

}

export default TextC

