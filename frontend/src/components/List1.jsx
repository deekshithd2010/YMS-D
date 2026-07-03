import {
    List,
    ListItem,
    ListIcon,
    OrderedList,
    UnorderedList,
    Flex,
    VStack,
    Box
  } from '@chakra-ui/react'

import React from 'react'
import PropTypes from 'prop-types'

function List1(props) {
  return (
    <>
    
       <List fontFamily="EB Garamond" fontStyle="normal" fontWeight="500" fontSize="16px" textAlign="justify" color="#000000" lineHeight="160%" display="flex">
       <UnorderedList padding="0px" >
        <ListItem>{props.title1}</ListItem>
        <ListItem>{props.title2}</ListItem>
        <ListItem>{props.title3}</ListItem>
        <ListItem>{props.title4}</ListItem>
        <ListItem>{props.title5}</ListItem>
        <ListItem>{props.title6}</ListItem>
        <ListItem>{props.title7}</ListItem>
        <ListItem>{props.title8}</ListItem>
       </UnorderedList>
       </List>
       
    </>
  )
}

List1.propTypes = {

}

export default List1

