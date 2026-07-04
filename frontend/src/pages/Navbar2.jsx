import {
  Flex,
  Box,
  SimpleGrid,
  Spacer,
  Image,
  IconButton,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import Navbutton from "../components/Navbutton";
import Pic from "../components/Pic";
import Button2 from "../components/Button2";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Link, useLocation } from "react-router-dom";
import Menu from "./Menu";
import Button1 from "../components/Button1";
import axios from "axios";

function Navbar2() {
  const [show, setShow] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isInstructor, setIsInstructor] = useState(false);
  const location = useLocation();

  if (location.pathname.startsWith("/Admin") || location.pathname.startsWith("/Instructor")) {
    return null;
  }

  // Sync login status, instructor privileges, and admin privileges with route changes
  useEffect(() => {
    const token = localStorage.getItem('token') || localStorage.getItem('accessToken');
    setIsLoggedIn(!!token);

    if (token) {
      axios.get('/ymsapi/profile/', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        setIsAdmin(!!res.data.is_admin);
        setIsInstructor(!!res.data.is_instructor);
      })
      .catch(() => {
        setIsAdmin(false);
        setIsInstructor(false);
      });
    } else {
      setIsAdmin(false);
      setIsInstructor(false);
    }
  }, [location]);

  const showNav = () => {
    setShow(!show);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/';
  };

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
        justifyContent="center"
        flexDirection="row"
      >
        <Link to="/"> <Navbutton d="grid" name="HOME" /></Link>
        <Link to="/Yogasessions"><Navbutton d="grid" name="YOGA SESSION" /></Link>
        <Link to="/YogaCourses"><Navbutton d="grid" name="YOGA COURSES" /></Link>
        <Link to="/YogaForms"><Navbutton d="grid" name="YOGIC FORMS" /></Link>

        <Box display="grid"> <Pic src="\images\Logo.png" w="200px" h="80px" d="grid" /></Box>
        <Link to="/Instructors"><Navbutton d={{ base: 'none', sm: 'none', md: 'none', lg: "grid", xl: "grid" }} name="INSTRUCTORS" /></Link>
        <Link to="/Contact"><Navbutton d={{ base: 'none', sm: 'none', md: 'none', lg: "grid", xl: "grid" }} name="CONTACT US" /></Link>
        {isInstructor && (
          <Link to="/Instructor"><Navbutton d={{ base: 'none', sm: 'none', md: 'none', lg: "grid", xl: "grid" }} name="INSTRUCTOR" /></Link>
        )}
        {isAdmin && (
          <Link to="/Admin"><Navbutton d={{ base: 'none', sm: 'none', md: 'none', lg: "grid", xl: "grid" }} name="ADMIN" /></Link>
        )}

        {isAdmin ? null : !isLoggedIn ? (
          <>
            <Link to="/Login">
              <Box
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
                <Button1
                  name="Login"
                  bg="#285430"
                  br="7.5px"
                  h="45px"
                  w="120px"
                  fs="14px"
                  lh="21px"
                  d={{ base: 'none', sm: 'none', md: 'none', lg: "grid", xl: "grid" }}
                  c="#FFFFFF"
                />
              </Box>
            </Link>
            <Link to="/Signup">
              <Box
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
                  name="Sign up"
                  bg="#D9D9D9"
                  br="7.5px"
                  h="45px"
                  w="120px"
                  fs="14px"
                  lh="21px"
                  c="#000000"
                />
              </Box>
            </Link>
          </>
        ) : (
          <>
            <Box w="155px" h="80px" align="center">
              <Link to="/Profile">
                <Image
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
                />
              </Link>
            </Box>
            <Box
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
              onClick={handleLogout}
              cursor="pointer"
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
              />
            </Box>
          </>
        )}
      </Flex>

      {/* phone view */}
      <SimpleGrid
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
        <Pic src="\images\Logo.png" w="155px" h="80px" d="grid" />
        <Spacer />
        <IconButton
          icon={<HamburgerIcon w="38px" h="32px" />}
          margin="20px"
          aria-label="Open Menu"
          size="lg"
          bg="unset"
          onClick={showNav}
        />
      </SimpleGrid>

      {show && (
        <Menu
          onClose={() => setShow(false)}
          isLoggedIn={isLoggedIn}
          isAdmin={isAdmin}
          isInstructor={isInstructor}
          handleLogout={handleLogout}
        />
      )}
    </>
  );
}

export default Navbar2;
