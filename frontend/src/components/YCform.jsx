import React from 'react'
import PropTypes from 'prop-types'
import TextP from './TextP'
import { Box, Flex, HStack, SimpleGrid, VStack } from '@chakra-ui/react'
import TC1 from './TC1'
import Textbox2 from './Textbox2'
import Check from './Check'
import Button1 from './Button1'
import Button2 from './Button2'
function YCform(props) {
  return (
    <>
      <VStack gap="35px" marginBottom="50px">
        <Flex w="100%" h="100%" bg="#285430" justifyContent="center">
          <VStack marginBlock={{ base: 100, sm: 180, lg: "105px" }} gap="5px">
            <TC1
              heading={props.coursename}
              fs={{ base: 28, sm: 32, lg: 32 }}
              lh={{ base: "32px", sm: "43px", lg: "24px" }}
              c="#FFFFFF"
              al="center"
              fw="700"
            />
            <TC1
              heading={props.course}
              fs={{ base: 28, sm: 32, lg: 32 }}
              lh="28px"
              c="#FFFFFF"
              al="center"
              fw="700"
            />
            
          </VStack>
        </Flex>
        <SimpleGrid
          justifyItems="center"
          columns={{ base: 1, sm: 2 }}
          columnGap="90px"
          rowGap="30px"
          boxShadow="0px 4px 64px rgba(0, 0, 0, 0.05)"
          border={{ base: "none", lg: "0.6px solid #000000" }}
          borderRadius="10px"
          boxSizing="border-box"
          paddingBlock={{ base: "30px", sm: "50px" }}
          paddingInline={{ base: "30px", sm: "65px" }}
        >
          <VStack gap="30px">
            <div>
              <TextP heading="Name" fw="400" fs="16px" lh="24px" />
              <Textbox2 w="300px" h="48px" ty="text" ph="Name" />
            </div>
            <div>
              <TextP heading="Date of Birth" fw="400" fs="16px" lh="24px" />
              <Textbox2 w="300px" h="48px" ty="date" ph="Date of Birth" />
            </div>

            <div>
              <TextP heading="Email" fw="400" fs="16px" lh="24px" />
              <Textbox2 w="300px" h="48px" ty="email" ph="Email" />
            </div>
            <div>
              <TextP heading="Phone no." fw="400" fs="16px" lh="24px" />
              <Textbox2 w="300px" h="48px" ty="number" ph="Phone no" />
            </div>
            <Box justifyContent="left" w="100%">
              <TextP heading="Gender" fw="400" fs="16px" lh="24px" al="left" />
              <VStack align="left">
                <Check cs="green" title="Male" />
                <Check cs="green" title="Female" />
              </VStack>
            </Box>
          </VStack>
          <VStack gap="35px">
            <div>
              <TextP heading="Address" fw="400" fs="16px" lh="24px" />
              <Textbox2 w="300px" h="48px" ty="text" ph="Address" />
            </div>
            <div>
              <TextP heading="City" fw="400" fs="16px" lh="24px" />
              <Textbox2 w="300px" h="48px" ty="text" ph="City" />
            </div>
            <div>
              <TextP heading="Postal/Zip-Code" fw="400" fs="16px" lh="24px" />
              <Textbox2 w="300px" h="48px" ty="text" ph="Postal/Zip-Code" />
            </div>
            <div>
              <TextP heading="Country" fw="400" fs="16px" lh="24px" />
              <Textbox2 w="300px" h="48px" ty="text" ph="Country" />
            </div>
            <HStack gap="40px">
              <Button1 name="Submit" h="48px" w="130px" />
              <Button2 name="Clear" h="48px" w="130px" />
            </HStack>
          </VStack>
        </SimpleGrid>
      </VStack>
    </>
  )
}

YCform.propTypes = {

}

export default YCform

