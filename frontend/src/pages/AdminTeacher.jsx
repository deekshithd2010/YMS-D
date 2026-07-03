import { Flex, HStack, VStack } from '@chakra-ui/react'
import React from 'react'
import TP1 from '../components/TP1'
import TextP from '../components/TextP'
import { MinusIcon } from '@chakra-ui/icons'
import Teacherinfo from '../components/Teacherinfo'

function AdminTeacher() {
  return (
    <>
     <Flex
    columns={2}
    >
      <Flex
        bg="#285430"
        h="1000px"
        w={{ base: "300px", sm:"200px", lg: "300px" }}
        paddingTop={{ base: "80px", lg: "160px" }}
        paddingBottom={{ base: "900px", lg: "360px" }}
        paddingInline={{ base: "10px", lg: "90px" }}
        alignItems="center"
        justifyContent="center"
      >
        <VStack gap="45px">
           <TP1
            heading="Edit Studets"
            fs={{ base:"12px", lg:"16px" }}
            lh={{ base:"16px", lg:"26px" }}
            al="center"
            c="#FFFFFF"
            fw={{ base: 300, lg: 500 }}
          />
           <TP1
            heading="Edit Teachers"
            fs={{ base:"12px", lg:"16px" }}
            lh={{ base:"16px", lg:"26px" }}
            al="center"
            c="#FFFFFF"
            fw={{ base: 300, lg: 500 }}
          />
           <TP1
            heading="Add Teachers"
            fs={{ base:"12px", lg:"16px" }}
            lh={{ base:"16px", lg:"26px" }}
            al="center"
            c="#FFFFFF"
            fw={{ base: 300, lg: 500 }}
          />
        </VStack>
      </Flex>
      <Flex >
   <Teacherinfo/>
      </Flex>

      </Flex> 
    </>
  )
}

export default AdminTeacher
