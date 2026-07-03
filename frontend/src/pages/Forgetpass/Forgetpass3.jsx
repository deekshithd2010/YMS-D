import React, { useState } from "react";
import { Flex, VStack } from "@chakra-ui/react";
import TextP from "../../components/TextP";
import Button1 from "../../components/Button1";
import Textbox from "../../components/Textbox";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Forgetpass3() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const email = localStorage.getItem("resetEmail");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      alert("Missing email context. Please start password reset again.");
      navigate("/ForgotPassword");
      return;
    }
    if (!password || !confirmPassword) {
      alert("Please fill in both password fields.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const response = await axios.post("/ymsapi/reset-password/", {
        email,
        new_password: password,
        confirm_password: confirmPassword,
      });
      alert(response.data.message || "Password reset successful! Please login.");
      localStorage.removeItem("resetEmail");
      navigate("/Login");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.detail || "Could not reset password. Try again.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Flex
          paddingBlock={{ base: "180px", sm: "180px" }}
          paddingInline={{ base: "70px", sm: "320px" }}
          w="100%"
          justifyContent="center"
        >
          <VStack gap="30px">
            <TextP heading="New Credentials" fw="400" fs="32px" lh="48px" />
            <div>
              <TextP heading="New Password" fw="400" fs="16px" lh="24px" al="left" />
              <Textbox
                w={{ base: 275, sm: 430, md: 430, lg: 423 }}
                ty="password"
                ph="Enter your new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <TextP heading="Confirm Password" fw="400" fs="16px" lh="24px" al="left" />
              <Textbox
                w={{ base: 275, sm: 430, md: 430, lg: 423 }}
                ty="password"
                ph="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
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

export default Forgetpass3;
