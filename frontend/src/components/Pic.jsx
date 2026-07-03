import React from 'react'
import PropTypes from 'prop-types'
import { Image } from '@chakra-ui/react'

function Pic(props) {
  return (
    <>
      <Image
      w={props.w}
      h={props.h}
      padding={props.pd}
        marginBlock={props.mb}
        src={props.src}
        background={props.bg}
        borderRadius={props.br}
        display={props.d}
      ></Image>
    </>
  )
}

Pic.propTypes = {

}

export default Pic

