import React from "react";
import { Flex, HStack, VStack, Card, SimpleGrid } from "@chakra-ui/react";
import TextP from "../components/TextP";
import TP1 from "../components/TP1";
import { MinusIcon } from "@chakra-ui/icons";
import Sessionstudinfo from "../components/Sessionstudinfo";
import Studcoursecard from "../components/Studcoursecard";
import { HTTP } from '../axios';
import { useEffect } from 'react';

function Admin() {

  const getStudentListingAPI = async () => {
    return HTTP.get('ymsapi/stu_list/');
  };

  const studentDetails = async () => {
    try {
      const response = getStudentListingAPI()
      console.log("response data: ", response)
    }
    catch (error)
     {
      console.log(error)
    }
  }
  useEffect(() => {
    getStudentListingAPI()
  }, []);


  return (
    <>
      <Flex columns={2}>
        <Flex
          bg="#285430"
          h="1000px"
          w={{ base: "300px", sm: "200px", lg: "300px" }}
          paddingTop={{ base: "80px", lg: "160px" }}
          paddingBottom={{ base: "900px", lg: "360px" }}
          paddingInline={{ base: "10px", lg: "90px" }}
          alignItems="center"
          justifyContent="center"
        >
          <VStack gap="45px">
            <TP1
              heading="View Students"
              fs={{ base: "12px", lg: "16px" }}
              lh={{ base: "16px", lg: "26px" }}
              al="center"
              c="#FFFFFF"
              fw={{ base: 300, lg: 500 }}
            />
            <TP1
              heading="View Teachers"
              fs={{ base: "12px", lg: "16px" }}
              lh={{ base: "16px", lg: "26px" }}
              al="center"
              c="#FFFFFF"
              fw={{ base: 300, lg: 500 }}
            />
            <TP1
              heading="Add Students"
              fs={{ base: "12px", lg: "16px" }}
              lh={{ base: "16px", lg: "26px" }}
              al="center"
              c="#FFFFFF"
              fw={{ base: 300, lg: 500 }}
            />
            <TP1
              heading="Add Teachers"
              fs={{ base: "12px", lg: "16px" }}
              lh={{ base: "16px", lg: "26px" }}
              al="center"
              c="#FFFFFF"
              fw={{ base: 300, lg: 500 }}
            />
          </VStack>
        </Flex>
        <Flex>
          <VStack gap="40px">
            <HStack alignSelf="start" margin="20px">
              <Card
                w="150px"
                h="40px"
                border="0.5px solid #000000"
                alignItems="center"
                justifyContent="center"
              >
                Yoga Sessions
              </Card>
              <Card
                w="150px"
                h="40px"
                border="0.5px solid #000000"
                alignItems="center"
                justifyContent="center"
              >
                Yoga Courses
              </Card>
            </HStack>
            <Sessionstudinfo />
            <Studcoursecard />
          </VStack>
        </Flex>
      </Flex>
    </>
  );
}

export default Admin;
