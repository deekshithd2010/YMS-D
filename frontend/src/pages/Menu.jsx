import { Box, Flex, IconButton } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
import React from 'react'
import { Link } from 'react-router-dom'
import Navbutton from '../components/Navbutton'
import Button1 from '../components/Button1'
import Button2 from '../components/Button2'

function Menu({ onClose, isLoggedIn, isAdmin, isInstructor, handleLogout }) {
  return (
    <>
      {/* 50% transparent dark backdrop */}
      <Box
        position="fixed"
        top="0"
        left="0"
        width="100vw"
        height="100vh"
        bg="rgba(0, 0, 0, 0.5)"
        zIndex="998"
        onClick={onClose}
        display={{ base: "block", lg: "none" }}
      />

      {/* Side-aligned Drawer Menu Panel */}
      <Flex
        display={{ base: "flex", lg: "none" }}
        direction="column"
        position="fixed"
        top="0"
        right="0"
        width="280px"
        height="100vh"
        bg="#FFFFFF"
        zIndex="999"
        boxShadow="-8px 0px 16px rgba(0, 0, 0, 0.15)"
        padding="25px"
        gap="15px"
        alignItems="stretch"
      >
        {/* Header inside drawer with close button */}
        <Flex justifyContent="flex-end" marginBottom="10px">
          <IconButton
            icon={<CloseIcon w="12px" h="12px" />}
            onClick={onClose}
            aria-label="Close Menu"
            variant="ghost"
            size="sm"
          />
        </Flex>

        {/* Navigation Links */}
        <Link to="/" onClick={onClose}> <Navbutton d="grid" name="HOME" /></Link>
        <Link to="/Yogasessions" onClick={onClose}><Navbutton d="grid" name="YOGA SESSION" /></Link>
        <Link to="/YogaCourses" onClick={onClose}><Navbutton d="grid" name="YOGA COURSES" /></Link>
        <Link to="/YogaForms" onClick={onClose}><Navbutton d="grid" name="YOGIC FORMS" /></Link>
        <Link to="/Instructors" onClick={onClose}><Navbutton d="grid" name="INSTRUCTORS" /></Link>
        <Link to="/Contact" onClick={onClose}><Navbutton d="grid" name="CONTACT US" /></Link>
        
        {isLoggedIn && (
          <Link to="/Profile" onClick={onClose}>
            <Navbutton d="grid" name="PROFILE" />
          </Link>
        )}

        {isInstructor && (
          <Link to="/Instructor" onClick={onClose}>
            <Navbutton d="grid" name="INSTRUCTOR PANEL" />
          </Link>
        )}

        {isAdmin && (
          <Link to="/Admin" onClick={onClose}>
            <Navbutton d="grid" name="ADMIN PANEL" />
          </Link>
        )}

        <Box borderTop="1px solid #E2E8F0" marginY="10px" />

        {/* Login/Signup vs Logout Buttons */}
        {isAdmin ? null : !isLoggedIn ? (
          <Flex direction="column" gap="10px" marginTop="auto">
            <Link to="/Login" onClick={onClose} style={{ width: '100%' }}>
              <Button1
                name="Login"
                bg="#285430"
                br="7.5px"
                h="45px"
                w="100%"
                fs="14px"
                lh="21px"
                c="#FFFFFF"
                d="grid"
              />
            </Link>
            <Link to="/Signup" onClick={onClose} style={{ width: '100%' }}>
              <Button2
                name="Sign up"
                bg="#D9D9D9"
                br="7.5px"
                h="45px"
                w="100%"
                fs="14px"
                lh="21px"
                c="#000000"
                d="grid"
              />
            </Link>
          </Flex>
        ) : (
          <Flex direction="column" gap="10px" marginTop="auto" onClick={() => { handleLogout(); onClose(); }}>
            <Button2
              name="Logout"
              bg="#D9D9D9"
              br="7.5px"
              h="45px"
              w="100%"
              fs="14px"
              lh="21px"
              c="#000000"
              d="grid"
            />
          </Flex>
        )}
      </Flex>
    </>
  )
}

export default Menu;
