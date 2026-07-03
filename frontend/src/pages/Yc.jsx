import React from "react";
import Card2 from "../components/Card2";
import { Flex, SimpleGrid, VStack } from "@chakra-ui/react";
import TC1 from "../components/TC1";
import TP1 from "../components/TP1";
import { Link } from "react-router-dom";
function Yc() {
  return (
    <>
      <Flex
        w="100%"
        bg={{ base: "#285430", lg: "none" }}
        justifyContent="center"
      >
        <VStack marginBlock={{ base: 100, sm: 180, lg: 50 }} gap="5px">
          <TC1
            heading1="OUR YOGA COURSES"
            heading2="YOGA COURSES"
            fs={{ base: 28, sm: 32, lg: 32 }}
            lh="43px"
            al="center"
            c={{ base: "#FFFFFF", lg: "#000000" }}
            fw={{ base: 700, lg: 500 }}
          />
          <TP1
            heading="Building Professional and Holistic Yoga Graduates, Therapists and Trainers"
            fs={{ base: 16, sm: 20, lg: 16 }}
            lh="20px"
            al="center"
            c={{ base: "#FFFFFF", lg: "#000000" }}
            fw={{ base: 300, lg: 400 }}
          />
        </VStack>
      </Flex>

      <SimpleGrid
        // w="100%"
        // h="100%"
        justifyItems="center"
        columns={{ base: 2, sm: 3, md: 3, lg: 4 }}
        marginBlock={{ base: "35px", sm: "35px", md: "80px", lg: "100px" }}
        rowGap={{ base: "30px", sm: "50px", md: "80px", lg: "100px" }}
        columnGap={{ base: "30px", sm: "30px", md: "50px", lg: "80px" }}
      >
        <Link to="/PGDYTform">
          <Card2
            src="images\YC\YC1.png"
            title="Post Graduation Diploma in Yoga Therapy(PGDYT)"
            title2="Duration: 1 year"
          />
        </Link>
        <Link to="/PGDAVform">
          <Card2
            src="images\YC\YC2.png"
            title="Post Graduation Diploma in Ashtanga Vinyasa (PGDAV)"
            title2="Duration: 1 year"
          />
        </Link>

        <Link to="/PGDYEdform">
          <Card2
            src="images\YC\YC3.png"
            title="Post Graduation Diploma in Yoga Education (PGDYEd)"
            title2="Duration: 1 year"
          />
        </Link>

        <Link to="/DYEdform">
          <Card2
            src="images\YC\YC4.png"
            title="Diploma in Yoga Education (DYEd)"
            title2="Duration: 1 year"
          />
        </Link>
        <Link to="/TTC ASHTANGA VINYASA form">
          <Card2
            src="images\YC\YC5.png"
            title="TTC-200Hrs & TTC-500Hrs Ashtanga Vinyasa"
          />
        </Link>

        <Link to="/AVTCform">
          <Card2
            src="images\YC\YC6.png"
            title="Ashtanga Vinyasa Training Course (AVTC)"
            title2="Duration: 1 Month"
          />
        </Link>

        <Link to="/PMICform">
          <Card2
            src="images\YC\YC7.png"
            title="Pranayama & Meditation Course (PMIC) - Short term"
            title2="Duration: 1 Month"
          />
        </Link>
        <Link to="/YICform">
          <Card2
            src="images\YC\YC8.png"
            title="Yoga Instructor Course (YIC) - Short term "
            title2="Duration: 1 Month"
          />
        </Link>

        <Link to="/TTC HATA YOGA form">
          <Card2
            src="images\YC\YC9.png"
            title="TTC-200Hrs & TTC-500Hrs Hatha Yoga"
            title2="Duration: 1 year"
          />
        </Link>

        <Link to="/RPL-PMKVYform">
          <Card2
            src="images\YC\YC10.png"
            title="Recognition of Prior Learning (RPL - PMKVY)"
            title2="Duration: 1 year"
          />
        </Link>
      </SimpleGrid>
    </>
  );
}

export default Yc;
