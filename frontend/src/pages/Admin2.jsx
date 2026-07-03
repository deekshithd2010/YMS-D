import { MinusIcon } from '@chakra-ui/icons'
import { Card, Flex, HStack, VStack } from '@chakra-ui/react'
import React from 'react'
import TP1 from '../components/TP1'
import TextP from '../components/TextP'
function Admin2() {
  return (
    <>
      <Flex
    columns={2}
    >
      <Flex
        bg="#285430"
        h="1000px"
        w={{ base: "300px", sm:"200px", lg: "300px" }}
        // paddingTop={{ base: "80px", lg: "160px" }}
        paddingBottom={{ base: "900px", lg: "360px" }}
        paddingInline={{ base: "10px", lg: "90px" }}
        alignItems="center"
        justifyContent="center"
      >
        <VStack gap="45px">
          <TP1
            heading="Edit Students"
            fs={{ base:"12px", lg:"16px" }}
            lh={{ base:"16px", lg:"26px" }}
            al="center"
            c="#FFFFFF"
            fw={{ base: 300, lg: 500 }}
          />
           
           <TP1
            heading="Add Students"
            fs={{ base:"12px", lg:"16px" }}
            lh={{ base:"16px", lg:"26px" }}
            al="center"
            c="#FFFFFF"
            fw={{ base: 300, lg: 500 }}
          />
     
        </VStack>
      </Flex>
      <Flex >
        <VStack gap="40px">
        <HStack alignSelf="start" margin="20px">
       <Card w="150px" h="40px" border= "0.5px solid #000000" alignItems="center" justifyContent="center">
        Yoga Sessions
       </Card>
       <Card w="150px" h="40px" border= "0.5px solid #000000" alignItems="center" justifyContent="center">
        Yoga Courses
       </Card>
       </HStack>
       <HStack gap="100px" display={{base:"none", lg:"flex"}} paddingLeft="20px">
       <TextP heading="Name" fw="500" fs="20px" lh="28px" al="center" />
       <TextP heading="Fees Status" fw="500" fs="20px" lh="28px" al="center" />
       <TextP heading="Batch Timings" fw="500" fs="20px" lh="28px" al="center" />
       <TextP heading="Email" fw="500" fs="20px" lh="28px" al="center" />
       <TextP heading="Subscription" fw="500" fs="20px" lh="28px" al="center" />
       </HStack>
       <MinusIcon w="full" h="3px" bg="#000000" opacity="30%" alignSelf="center" display={{base:"none", lg:"flex"}} />
       </VStack>
      </Flex>

      </Flex>
    </>
  )
}

export default Admin2
