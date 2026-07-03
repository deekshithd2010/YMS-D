import {
  Flex,
  Box,
  SimpleGrid,
  Spacer,
  Image,
  IconButton,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Navbutton from "../components/Navbutton";
import Pic from "../components/Pic";
import Button2 from "../components/Button2";
import { HamburgerIcon,CloseIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import Menu from "./Menu";
import Button1 from "../components/Button1";
function Navbar2() {
const [show,setShow]=useState(false)
const showNav = () =>{
  if(show == true)
  {
    setShow(false)
  }
  else
  {
    setShow(true)
  }
}
  return (
    <>

      <Flex
        width="100%"
        height="80px"
        left="0px"
        top="0px"
        background="#FFFFFF"
        boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
        display={{
          base: "none",
          sm: "none",
          md: "none",
          lg: "flex",
          xl: "flex",
        }}
        columns={{ xl: 9, lg: 9, md: 9, sm: 0 }}
        justifyContent="center"
        flexDirection="row"
      >
       <Link to="/"> <Navbutton d="grid" name="HOME" /></Link>
        <Link to="/Yogasessions"><Navbutton d="grid" name="YOGA SESSION" /></Link>
        <Link to="/YogaCourses"><Navbutton d="grid" name="YOGA COURSES" /></Link>
        <Link to="/YogaForms"><Navbutton d="grid" name="YOGIC FORMS" /></Link>

       <Box display="grid"> <Pic src="\images\Logo.png" w="200px" h="80px" d="grid" /></Box>
       <Link to="/Instructors"><Navbutton  d={{base:'none',sm:'none',md:'none',lg:"grid",xl:"grid"}} name="INSTRUCTORS" /></Link>
       <Link to="/Contact"><Navbutton  d={{base:'none',sm:'none',md:'none',lg:"grid",xl:"grid"}} name="CONTACT US" /></Link>

       <Link to="/Login">  <Box
          width="155px"
          height="80px"
          alignContent="center"
          justifyContent="center"
          display={{
            base: "none",
            sm: "none",
            md: "none",
            lg: "grid",
            xl: "grid",
          }}
        >         <Button1
            name="Login"
            bg="#285430"
            br="7.5px"
            h="45px"
            w="120px"
            fs="14px"
            lh="21px"
            d={{base:'none',sm:'none',md:'none',lg:"grid",xl:"grid"}}
            c="#FFFFFF"
          ></Button1>
        </Box></Link>
        <Link to="/Signup"><Box
          width="155px"
          height="80px"
          alignContent="center"
          justifyContent="center"
          display={{
            base: "none",
            sm: "none",
            md: "none",
            lg: "grid",
            xl: "grid",
          }}
        >         <Button2
            name="Sign up"
            bg="#D9D9D9"
            br="7.5px"
            h="45px"
            w="120px"
            fs="14px"
            lh="21px"
            c="#000000"
          ></Button2>
        </Box></Link> 


        {/* <Box w="155px" h="80px" align="center">
        <Link to="/Profile"> <Image
            src="\images\profile.jpg"
            borderRadius="100%"
            width="45px"
            height="45px"
            marginBlock="17px"
            display={{
              base: "none",
              sm: "none",
              md: "none",
              lg: "flex",
              xl: "flex",
            }}
          /></Link>
        </Box>
      <Link to="/"><Box
          width="155px"
          height="80px"
          alignContent="center"
          justifyContent="center"
          display={{
            base: "none",
            sm: "none",
            md: "none",
            lg: "grid",
            xl: "grid",
          }}
        >
          <Button2
            name="Logout"
            bg="#D9D9D9"
            br="7.5px"
            h="45px"
            w="135px"
            fs="14px"
            lh="21px"
            c="#000000"
          ></Button2>
        </Box></Link> */}
        
      </Flex>

      {/* phone view */}
      
      <SimpleGrid
        // minChildWidth="155px"
        width="100%"
        height="80px"
        left="0px"
        top="0px"
        background="#FFFFFF"
        boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
        display={{
          base: "flex",
          sm: "flex",
          md: "flex",
          lg: "none",
          xl: "none",
        }}
      >
     
        {<Pic src="\images\Logo.png" w="155px" h="80px" d="grid" />}
<Spacer/>

 <IconButton
          icon={<HamburgerIcon w="38px" h="32px" />}
          margin="20px"
          aria-label="Open Menu"
          size="lg"
          bg="unset"
          onClick={showNav}

        />
 
     
         {/* <IconButton
          icon={<CloseIcon w="38px" h="32px" />}
          margin="20px"
          aria-label="Open Menu"
          size="lg"
          bg="unset"
          onClick={()=>setShow(false)}
        /> */}
       
      </SimpleGrid>
      {
          show && (<Menu onClose={() => setShow(false)}/>)
        }
    </>
  );
}

export default Navbar2;
