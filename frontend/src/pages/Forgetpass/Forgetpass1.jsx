import React, { useState } from "react";
import TextP from "../../components/TextP";
import { Flex, Box, VStack } from "@chakra-ui/react";
import Textbox from "../../components/Textbox";
import Button1 from "../../components/Button1";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Forgetpass1() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter your email.");
      return;
    }
    try {
      const response = await axios.post("/ymsapi/forgot-password/", { email });
      alert(response.data.message || "OTP sent successfully. Please check your email / console.");
      localStorage.setItem("resetEmail", email);
      navigate("/VerifyOTP");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.detail || "Could not request password reset. Check your email.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Flex
          paddingBlock={{ base: "180px", sm: "285px" }}
          paddingInline={{ base: "70px", sm: "320px" }}
          w="100%"
          justifyContent="center"
          textAlign="center"
        >
          <VStack gap="30px">
            <TextP heading="Enter Email" fw="400" fs="32px" lh="48px" />
            <TextP
              heading="Enter the email address associated with your account and we'll send you an OTP code to reset your password."
              fw="300"
              fs={{ base: "16px", md: "20px" }}
              lh={{ base: "24px", md: "30px" }}
            />
            <Box>
              <TextP heading="Email" fw="400" fs="16px" lh="24px" al="left" />
              <Textbox
                w={{ base: 275, sm: 430, md: 430, lg: 423 }}
                ty="email"
                ph="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>
            <Button1
              type="submit"
              name="Submit"
              h="58px"
              w={{ base: 275, sm: 430, md: 430, lg: 423 }}
            />
          </VStack>
        </Flex>
      </form>
    </>
  );
}

export default Forgetpass1;
