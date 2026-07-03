import React from "react";
import Navbutton from "../components/Navbutton";

import {
  Flex,
  Box,
  HStack,
  Spacer,
  SimpleGrid,
  Card,
  Button,
  extendTheme
} from "@chakra-ui/react";
import Pic from "../components/Pic";
import Loginbtn from "../components/Button1";
import Button2 from "../components/Button2";
import Ys from "./Ys";
import Button1 from "../components/Button1";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <SimpleGrid
        minChildWidth="155px"
        width="100%"
        height="80px"
        left="0px"
        top="0px"
        background="#FFFFFF"
        boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
        display={{base:'none',sm:'none',md:'grid',lg:"grid",xl:"grid"}}
        columns={{ xl: 9, lg: 9, md: 9, sm: 0 }}
        justifyContent="center"
      
      >
       <Link to="/"> <Navbutton d="grid" name="HOME" /></Link>
        <Link to="/Yogasessions"><Navbutton d="grid" name="YOGA SESSION" /></Link>
        <Link to="/YogaCourses"><Navbutton d="grid" name="YOGA COURSES" /></Link>
        <Link to="/YogaForms"><Navbutton d="grid" name="YOGIC FORMS" /></Link>

       <Box display="grid"> <Pic src="\images\Logo.png" w="200px" h="80px" d="grid" /></Box>
       <Link to="/Instructors"><Navbutton  d={{base:'none',sm:'none',md:'none',lg:"grid",xl:"grid"}} name="INSTRUCTORS" /></Link>
       <Link to="/Contact"><Navbutton  d={{base:'none',sm:'none',md:'none',lg:"grid",xl:"grid"}} name="CONTACT US" /></Link>
        <Box
          width="155px"
          height="80px"
          alignContent="center"
          justifyContent="center"
          display={{base:'none',sm:'none',md:'none',lg:"grid",xl:"grid"}}
        >
         <Link to="/Login"> <Button1
            name="Login"
            bg="#285430"
            br="7.5px"
            h="45px"
            w="135px"
            fs="14px"
            lh="21px"
            d={{base:'none',sm:'none',md:'none',lg:"grid",xl:"grid"}}
            c="#FFFFFF"
          ></Button1></Link>
        </Box>
        <Box
          width="155px"
          height="80px"
          alignContent="center"
          justifyContent="center"
          display={{base:'none',sm:'none',md:'none',lg:"grid",xl:"grid"}}
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
          ></Button2></Link> 
        </Box>
      </SimpleGrid>
    </>
  );
}

