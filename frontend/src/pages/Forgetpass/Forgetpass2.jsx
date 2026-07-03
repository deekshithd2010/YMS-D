import React, { useState } from "react";
import { Flex, VStack, HStack, Box } from "@chakra-ui/react";
import TextP from "../../components/TextP";
import Button1 from "../../components/Button1";
import Otp from "../../components/Otp";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Forgetpass2() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const email = localStorage.getItem("resetEmail");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      alert("Missing email context. Please start password reset again.");
      navigate("/ForgotPassword");
      return;
    }
    if (otp.length < 6) {
      alert("Please enter the complete 6-digit code.");
      return;
    }
    try {
      const response = await axios.post("/ymsapi/verify-otp/", { email, otp });
      alert(response.data.message || "OTP verified successfully!");
      navigate("/ResetPassword");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.detail || "Invalid or expired OTP. Please try again.");
    }
  };

  const handleResend = async () => {
    if (!email) return;
    try {
      const response = await axios.post("/ymsapi/forgot-password/", { email });
      alert(response.data.message || "A new OTP code has been sent!");
    } catch (error) {
      console.error(error);
      alert("Failed to resend OTP. Try again.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Flex
          paddingBlock={{ base: "180px", sm: "285px" }}
          paddingInline={{ base: "40px", sm: "320px" }}
          w="100%"
          justifyContent="center"
          textAlign="center"
        >
          <VStack gap="30px">
            <TextP heading="We’ve Sent an Email" fw="400" fs="32px" lh="48px" />
            <TextP
              heading={`We sent a verification code to ${email || "your email"}. Please enter the code below.`}
              fw="300"
              fs={{ base: "16px", md: "20px" }}
              lh={{ base: "24px", md: "30px" }}
            />
            <Otp value={otp} onChange={(val) => setOtp(val)} />
            <Button1
              type="submit"
              name="Submit"
              h="58px"
              w={{ base: 275, sm: 430, md: 430, lg: 423 }}
            />
            <Box onClick={handleResend} cursor="pointer">
              <TextP heading="Resend Code" fw="400" fs="14px" lh="0px" />
            </Box>
          </VStack>
        </Flex>
      </form>
    </>
  );
}

export default Forgetpass2;
