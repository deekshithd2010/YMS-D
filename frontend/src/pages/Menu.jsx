import { Box, Flex, Grid, SimpleGrid } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import Navbutton from '../components/Navbutton'
import Button1 from '../components/Button1'
import Button2 from '../components/Button2'

function Menu() {
  return (
    <>

      <Flex
      display={{base:"grid",lg:"none"}}
      direction="column"
      justifyContent="end"
      bg="unset"
        >

      <Link to="/"> <Navbutton d="grid" name="HOME" /></Link>
        <Link to="/Yogasessions"><Navbutton d="grid" name="YOGA SESSION" /></Link>
        <Link to="/YogaCourses"><Navbutton d="grid" name="YOGA COURSES" /></Link>
        <Link to="/YogaForms"><Navbutton d="grid" name="YOGIC FORMS" /></Link>
       <Link to="/Instructors"><Navbutton d="grid"  name="INSTRUCTORS" /></Link>
       <Link to="/Contact"><Navbutton d="grid" name="CONTACT US" /></Link>
       <Link to="/Profile"><Navbutton d="grid" name="PROFILE" /></Link>

        <Box
          width="155px"
          height="80px"
          alignContent="center"
          justifyContent="center"
          d="grid"
        >
      <Link to="/Login">   <Button1
            name="Login"
            bg="#285430"
            br="7.5px"
            h="45px"
            w="135px"
            fs="14px"
            lh="21px"
            c="#FFFFFF"
            d="grid"
          ></Button1></Link>
        </Box>
        <Box
          width="100%"
          height="80px"
          alignContent="center"
          justifyContent="center"
          d="grid"
        >
         <Link to="/Signup"><Button2
            name="Sign up"
            bg="#D9D9D9"
            br="7.5px"
            h="45px"
            w="135px"
            fs="14px"
            lh="21px"
            c="#000000"
            d="grid"
          ></Button2></Link> 
        </Box>
      </Flex>
      
    </>

  )
}

export default Menu
