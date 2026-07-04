import React, { useState } from "react";
import PropTypes from "prop-types";
import { Card, HStack, VStack, useToast } from "@chakra-ui/react";
import Button1 from "./Button1";
import TextP from "./TextP";
import Check from "./Check";
import Text2 from "./Text2";
import Textbox from "./Textbox";
import Passwordbox from "./Passwordbox";
import { HTTP } from '../axios';
import { useNavigate, Link } from 'react-router-dom';


function Logincard(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await HTTP.post('/ymsapi/login/', { username, password });
      const token = response.data.access_token;
      localStorage.accessToken = token;
      localStorage.token = token;
      
      // Fetch user profile to check role
      const profileRes = await HTTP.get('/ymsapi/profile/', {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast({
        title: "Login Successful",
        description: `Welcome back, ${profileRes.data.name || username}!`,
        status: "success",
        duration: 3000,
        isClosable: true
      });

      if (profileRes.data.is_admin) {
        navigate('/Admin');
      } else if (profileRes.data.is_instructor) {
        navigate('/Instructor');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Login Failed",
        description: error.response?.data?.detail || "Please check your username and password.",
        status: "error",
        duration: 4000,
        isClosable: true
      });
    }
  };
  return (
    <>
          <form onSubmit={handleLogin}>

      <Card
        w={{ base: 320, sm: 510, md: 510, lg: 505 }}
        h="700px"
        bg="#FFFFFF"
        boxShadow="0px 4px 64px rgba(0, 0, 0, 0.05)"
        border="0.5px solid #878787"
        borderRadius="10px"
        boxSizing="border-box"
      >
        <VStack
          marginLeft={{ base: "20px", sm: "35px" }}
          marginTop={{ base: "50px", sm: "35px" }}
          align="left"
        >
          <TextP heading="Welcome !" fw="300" fs="25px" lh="38px" />
          <TextP heading="Sign in to" fw="600" fs="31px" lh="46px" />
          <TextP heading="Yogi's Lounge" fw="400" fs="16px" lh="24px" />
          <br />
          <br />
          <TextP heading="Username" fw="400" fs="16px" lh="24px" />
          <Textbox
           
            w={{ base: 275, sm: 430, md: 430, lg: 423 }}
            ty="text"
            ph="Enter your name"
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
          <HStack gap={{ base: "20px", sm: "160px" }}>
            <Check title="Remember me" />
            <Link to="/ForgotPassword">
              <Text2 heading="Forgot Password ?" fs="12px" lh="18px" />
            </Link>
          </HStack>
          <br />
          <Button1 type="submit" name="Login" h="58px" w={{ base: 275, sm: 430, md: 430, lg: 423 }}  />
        </VStack>
      </Card>
      </form>
    </>
  );
}

Logincard.propTypes = {};

export default Logincard;
