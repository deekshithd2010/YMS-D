import { Card, CardBody, Text, Image } from "@chakra-ui/react";

import React from "react";
import PropTypes from "prop-types";

function Cards(props) {
  return (
    <>
      <Card 
        width={{base:'300px',sm:'300px',md:'300px',lg:'550px',xl:'550px'}}
        height="65px"
        background="#285430"
        boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
        borderRadius="5px"
        fontFamily="Poppins"
        fontStyle="normal"
        fontWeight="500"
        fontSize="24px"
        letterSpacing="-0.02em"
        lineHeight="50px"
        color="#FFFFFF"
        textAlign="center"
        alignItems="center"
        display="grid"
        _hover={{ bg: "#CEEDC7", color:"#000000" }}
       
      >
          <Image src={props.src} alt={props.alt} borderRadius={props.br} />
      {props.title}
      </Card>
    </>
  );
}

Cards.propTypes = {};

export default Cards;
