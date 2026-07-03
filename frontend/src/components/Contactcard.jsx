import React, { useState } from "react";
import PropTypes from "prop-types";
import { VStack, Card, Box } from "@chakra-ui/react";
import TextP from "../components/TextP.jsx";
import Textbox from "./Textbox.jsx";
import Textbox2 from "./Textbox2.jsx";
import Button1 from "./Button1.jsx";
import axios from "axios";

function Contactcard(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !subject || !message) {
      alert("Please fill in all fields.");
      return;
    }
    try {
      const response = await axios.post("/ymsapi/contact/", {
        name,
        email,
        subject,
        message,
      });
      alert(response.data.message || "Message sent successfully!");
      // Reset form
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (error) {
      console.error(error);
      alert("Error sending message. Please try again.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Card
          w={{ base: 320, sm: 510, md: 510, lg: 505 }}
          h={{ base: 850, sm: 800, md: 800, lg: 800 }}
          bg="#FFFFFF"
          boxShadow="0px 4px 64 rgba(0, 0, 0, 0.05)"
          border="0.5px solid #878787"
          borderRadius="10px"
          boxSizing="border-box"
        >
          <VStack
            marginLeft={{ base: "20px", sm: "35px" }}
            marginTop={{ base: "50px", sm: "35px" }}
            align="left"
          >
            <TextP heading="Let’s Talk!" fw="600" fs="31px" lh="46px" />
            <TextP heading="Contact us!" fw="400" fs="16px" lh="24px" />
          </VStack>

          <VStack
            marginLeft={{ base: "20px", sm: "35px" }}
            marginTop={{ base: "50px", sm: "35px" }}
            align="left"
            gap="18px"
          >
            <Box>
              <TextP heading="Name" fw="400" fs="16px" lh="24px" />
              <Textbox
                w={{ base: 275, sm: 430, md: 430, lg: 423 }}
                ty="text"
                ph="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Box>
            <Box>
              <TextP heading="Email" fw="400" fs="16px" lh="24px" />
              <Textbox
                w={{ base: 275, sm: 430, md: 430, lg: 423 }}
                ty="email"
                ph="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>

            <Box>
              <TextP heading="Subject" fw="400" fs="16px" lh="24px" />
              <Textbox
                w={{ base: 275, sm: 430, md: 430, lg: 423 }}
                ty="text"
                ph="Enter your Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </Box>

            <Box>
              <TextP heading="Message" fw="400" fs="16px" lh="24px" />
              <Textbox2
                w={{ base: 275, sm: 430, md: 430, lg: 423 }}
                h="150px"
                ty="text"
                ph="Enter your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </Box>

            <Button1
              type="submit"
              name="Submit"
              h="58px"
              w={{ base: 275, sm: 430, md: 430, lg: 423 }}
            />
          </VStack>
        </Card>
      </form>
    </>
  );
}

Contactcard.propTypes = {};

export default Contactcard;
