import React from "react";
import Contactcard from "../components/Contactcard";
import { SimpleGrid, AspectRatio, Flex } from "@chakra-ui/react";
function Contact() {
  return (
    <>
      <SimpleGrid
        w="100%"
        h="100%"
        columns={{ sm: 1, md: 1, lg: 2 }}
        justifyItems="center"
        alignItems="center"
        marginBlock="50px"
      >
        <Contactcard />
        <Flex display={{base:"none",lg:"block"}}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3898.0013833715007!2d76.60668597474985!3d12.315693387942632!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baf7ae8dc415ad3%3A0x184c7019463905ee!2sJSS%20Polytechnic!5e0!3m2!1sen!2sin!4v1684947101622!5m2!1sen!2sin"
          width="700"
          height="800"
          style={{border:"0.5px solid #000000", borderRadius:"10px"}}
          // referrerPolicy="no-referrer-when-downgrade"
        ></iframe></Flex>
      </SimpleGrid>
    </>
  );
}

export default Contact;
