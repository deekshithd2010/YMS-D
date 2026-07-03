import { ButtonGroup, Box, Button, background, Flex } from "@chakra-ui/react";
import React from 'react'
import PropTypes from 'prop-types'

function Box1(props) {
  return (
    <div>
      <Box
position= 'absolute'
width= {props.w}
height= {props.h}
left= {props.l}
top={props.t}
background= {props.bg}
border={props.brd}
box-shadow={props.bsh}
borderRadius={props.brr}
boxSizing={props.bsz}
display={props.d}
justifyItems={props.ji}
justifyContent={props.jc}
justifySelf={props.js}></Box>
    </div>
  )
}

Box1.propTypes = {

}

export default Box1

