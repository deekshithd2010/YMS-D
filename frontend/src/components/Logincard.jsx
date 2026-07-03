import React, { useState } from "react";
import PropTypes from "prop-types";
import { Card, HStack, VStack } from "@chakra-ui/react";
import Button1 from "./Button1";
import TextP from "./TextP";
import Check from "./Check";
import Text2 from "./Text2";
import Textbox from "./Textbox";
import Passwordbox from "./Passwordbox";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Logincard(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/ymsapi/login/', { username, password });
      console.log(response.data);
      // Handle successful login, e.g., store token in local storage and redirect
      history.push('/Home');
    } catch (error) {
      console.error(error);
      // Handle error, e.g., display error message
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
            <Text2 heading="Forgot Password ?" fs="12px" lh="18px" />
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
