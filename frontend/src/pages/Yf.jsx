import React from "react";
import TC1 from "../components/TC1";
import Card2 from "../components/Card2";
import { SimpleGrid, Flex } from "@chakra-ui/react";

function Yf() {
  return (
    <>
      <Flex
        paddingBlock={{ base: 100, sm: 180, lg: 50 }}
        w="100%"
        bg={{ base: "#285430", lg: "none" }}
        justifyContent="center"
      >
        <TC1
          heading1="OUR OCEAN OF YOGIC FORMS "
          heading2="YOGA FORMS "
          fs={{ base: 28, sm: 32, lg: 32 }}
          lh="43px"
          al="center"
          c={{ base: "#FFFFFF", lg: "#000000" }}
          fw={{ base: 700, lg: 500 }}
        />
      </Flex>
      <SimpleGrid
        // w="100%"
        // h="100%"
        justifyItems="center"
        columns={{ base: 2, sm: 3, md: 3, lg: 4 }}
        marginBlock={{ base: "35px", sm: "35px", md: "80px", lg: "40px" }}
        rowGap={{ base: "30px", sm: "50px", md: "80px", lg: "100px" }}
        columnGap={{ base: "30px", sm: "30px", md: "50px", lg: "80px" }}
      >
        <Card2 src="images\YF\YF1.png" title="Hata Yoga" />

        <Card2 src="images\YF\YF2.png" title="Advanced Yoga Practice" />
        <Card2 src="images\YF\YF3.png" title="Ashtangha Yoga" />
        <Card2 src="images\YF\YF4.png" title="Rhythmic Yoga" />
        <Card2 src="images\YF\YF5.png" title="Free flow Yoga" />
        <Card2 src="images\YF\YF6.png" title="Yoga Therapy" />
        <Card2 src="images\YF\YF7.png" title="Rope & Mallakambha Yoga" />
        <Card2 src="images\YF\YF8.png" title="Probe & Anti-gravity Yoga" />
        <Card2 src="images\YF\YF9.png" title="Shat Kriyas" />
      </SimpleGrid>
    </>
  );
}

export default Yf;
