import React, { useState } from "react";
import Textbox from "./Textbox";
import TextP from "./TextP";
import Text2 from "./Text2";
import Check from "./Check";
import Button1 from "./Button1";
import { Card, HStack, VStack, useToast } from "@chakra-ui/react";
import Passwordbox from "./Passwordbox";
import { HTTP } from '../axios';

import { useNavigate } from "react-router-dom";

function Signupcard() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const toast = useToast();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        title: "Validation Error",
        description: "Passwords do not match!",
        status: "warning",
        duration: 3000,
        isClosable: true
      });
      return;
    }
    try {
      const response = await HTTP.post('/ymsapi/register/', { username, password, email });
      console.log(response.data);
      toast({
        title: "Registration Successful",
        description: "Account created! Please login.",
        status: "success",
        duration: 4000,
        isClosable: true
      });
      navigate('/Login');
    } catch (error) {
      console.error(error);
      toast({
        title: "Registration Failed",
        description: error.response?.data?.detail || "Something went wrong. Please try again.",
        status: "error",
        duration: 4000,
        isClosable: true
      });
    }
  };

  return (
    <>
              <form onSubmit={handleRegister}>

      <Card
        w={{ base: 320, sm: 510, md: 510, lg: 505 }}
        h={{ base: 900, sm: 900, md: 900, lg: 760 }}
        bg="#FFFFFF"
        boxShadow="0px 4px 64px rgba(0, 0, 0, 0.05)"
        border="0.5px solid #878787"
        borderRadius="10px"
        boxSizing="border-box"
      >
        <VStack
          marginLeft={{ base: "20px", sm: "35px" }}
          marginTop={{ base: "35px", sm: "15px" }}
          align="left"
        >
          <TextP heading="Welcome !" fw="300" fs="25px" lh="38px" />
          <TextP heading="Sign up to" fw="600" fs="31px" lh="46px" />
          <TextP heading="Yogi's Lounge" fw="400" fs="16px" lh="24px" />
          <br />
          <TextP heading="Email" fw="400" fs="16px" lh="24px" />
          <Textbox
            w={{ base: 275, sm: 430, md: 430, lg: 423 }}
            ty="email"
            ph="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextP heading="Username" fw="400" fs="16px" lh="24px" />
          <Textbox
            w={{ base: 275, sm: 430, md: 430, lg: 423 }}
            ty="text"
            ph="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextP heading="Password" fw="400" fs="16px" lh="24px" />
          <Passwordbox
            w={{ base: 275, sm: 430, md: 430, lg: 423 }}
            ph="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <TextP heading="ConfirmPassword" fw="400" fs="16px" lh="24px" />
          <Passwordbox
            w={{ base: 275, sm: 430, md: 430, lg: 423 }}
            ph="Confirm your Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <br />
          <Button1 type="submit" name="Register" h="58px" w={{ base: 275, sm: 430, md: 430, lg: 423 }} />
        </VStack>
        <br />
        <HStack justifyContent="center">
          <Text2 heading="Already have an Account ? " fs="16px" lh="24px" />
          <TextP heading2="Signin" fw="300" fs="16px" lh="24px" />
        </HStack>
      </Card>
      </form>
    </>
  );
}

export default Signupcard;
