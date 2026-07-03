import React from "react";
import { Flex, SimpleGrid, Text, VStack, Box } from "@chakra-ui/react";
import TC1 from "../components/TC1";
import TP1 from "../components/TP1";
import Cards from "../components/Cards";
import TextP from "../components/TextP.jsx";
import { Link, Outlet } from "react-router-dom";
function Ys() {
  return (
    <>
      <Flex w="100%" bg={{ base: "#285430", lg: "none" }} justifyContent="center">
        <VStack marginBlock={{ base: 100, sm: 180, lg: 50 }} gap="5px">
          <TC1
            heading1="OUR YOGA PRACTICAL SESSION TIMINGS "
            heading2="YOGA PRACTICAL SESSION"
            fs={{ base: 28, sm: 32, lg: 32 }}
            lh="43px"
            al="center"
            c={{ base: "#FFFFFF", lg: "#000000" }}
            fw={{ base: 700, lg: 500 }}
          />
          <TP1
            heading="Monday - Friday"
            fs="20px"
            lh="20px"
            al="center"
            c={{ base: "#FFFFFF", lg: "#000000" }}
            fw="300"
          />
        </VStack>

        {/* </VStack> */}
      </Flex>
      <VStack gap="20px" marginBlock={{ base: "25px", sm: "40px", lg: "36px" }}>
        <TextP
          heading="General Batch(Men & Women)"
          al="center"
          fw="400"
          fs={{ base: 16, sm: 20, lg: 24 }}
          lh={{ base: "24px", sm: "30px", lg: "36px" }}
        />
        <SimpleGrid
          // w="100%"
          // h="100%"
          justifyItems="center"
          columns={{ base: 1, sm: 2 }}
          gridRowGap="20px"
          columnGap="180px"
        >
          <Link to="/6am to 7am"><Cards title="6 : 00 AM - 7 : 00 AM" /></Link>
          <Link to="/7am to 8am"><Cards title="7 : 00 AM - 8 : 00 AM" /></Link>
          <Link to="/8am to 9am"><Cards title="8 : 00 AM - 9 : 00 AM" /></Link>
          <Link to="/4pm to 5pm"><Cards title="4 : 00 PM - 5 : 00 PM" /></Link>
          <Link to="/5pm to 6pm"><Cards title="5 : 00 PM - 6 : 00 PM" /></Link>
          <Link to="/6pm to 7pm"><Cards title="6 : 00 PM - 7 : 00 PM" /></Link>
        </SimpleGrid>
        <TextP
          heading="Womens Batch"
          al="center"
          fw="400"
          fs={{ base: 16, sm: 20, lg: 24 }}
          lh="10px"
        />
        <Link to="/11am to 12:30pm"> <Cards title="11 : 30 AM - 12 : 30 PM" /></Link>
        <TextP
          heading="Advance Batch"
          al="center"
          fw="400"
          fs={{ base: 16, sm: 20, lg: 24 }}
          lh="10px"
        />
        <Link to="/6pm to 7:30pm"><Cards title="6 : 00 PM - 7 : 30 PM" /></Link>
      </VStack>
    </>
  );
}

export default Ys;
