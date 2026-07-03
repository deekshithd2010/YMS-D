import React from "react";
import PropTypes from "prop-types";
import { Box, Flex, SimpleGrid, VStack } from "@chakra-ui/react";
import Textbox2 from "./Textbox2";
import TextP from "./TextP";
import Button1 from "./Button1";
import TP1 from "./TP1";
function AddStud(props) {
  return (
    <>
      <Flex columns={2}>
        <Flex
          bg="#285430"
          w={{ base: "150px", sm: "200px", lg: "300px" }}
          paddingTop={{ base: "80px", lg: "100px" }}
          paddingBottom={{ base: "90px", lg: "360px" }}
          paddingInline={{ base: "10px", lg: "90px" }}
          alignItems="flex-start"
          justifyContent="center"
        >
          <VStack gap="45px">
            
            <TP1
              heading="Edit Teachers"
              fs={{ base: "12px", lg: "16px" }}
              lh={{ base: "16px", lg: "26px" }}
              al="center"
              c="#FFFFFF"
              fw={{ base: 300, lg: 500 }}
            />
            <TP1
              heading="Edit Students"
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
          <SimpleGrid
            justifyItems="center"
            columns={{ base: 1, lg: 2 }}
            columnGap="90px"
            rowGap="30px"
            paddingBlock={{ base: "30px", lg: "220px" }}
            paddingInline={{ base: "30px", lg: "160px" }}
            alignContent="center"
          >
            <VStack gap="30px">
              <div>
                <TextP heading="Name" fw="400" fs="16px" lh="24px" />
                <Textbox2 w={{base:"200px", lg:"300px"}} h="48px" ty="text" ph="Name" />
              </div>

              <div>
                <TextP heading="Email" fw="400" fs="16px" lh="24px" />
                <Textbox2 w={{base:"200px", lg:"300px"}} h="48px" ty="email" ph="Email" />
              </div>
              <div>
                <TextP heading="Phone no." fw="400" fs="16px" lh="24px" />
                <Textbox2 w={{base:"200px", lg:"300px"}} h="48px" ty="number" ph="Phone no" />
              </div>
              <div>
                <TextP heading="Gender" fw="400" fs="16px" lh="24px" />
                <Textbox2 w={{base:"200px", lg:"300px"}} h="48px" ty="number" ph="Gender" />
              </div>
            </VStack>
            <VStack gap="30px">
              <div>
                <TextP heading="Address" fw="400" fs="16px" lh="24px" />
                <Textbox2 w={{base:"200px", lg:"300px"}} h="48px" ty="text" ph="Address" />
              </div>
              <div>
                <TextP heading="City" fw="400" fs="16px" lh="24px" />
                <Textbox2 w={{base:"200px", lg:"300px"}} h="48px" ty="text" ph="City" />
              </div>
              <div>
                <TextP heading="Postal/Zip-Code" fw="400" fs="16px" lh="24px" />
                <Textbox2 w={{base:"200px", lg:"300px"}} h="48px" ty="text" ph="Postal/Zip-Code" />
              </div>
              <div>
                <TextP heading="Country" fw="400" fs="16px" lh="24px" />
                <Textbox2 w={{base:"200px", lg:"300px"}} h="48px" ty="text" ph="Country" />
              </div>
              <Button1 name="Save" h="48px" w="130px" />
            </VStack>
          </SimpleGrid>
        </Flex>
      </Flex>
    </>
  );
}

AddStud.propTypes = {};

export default AddStud;
