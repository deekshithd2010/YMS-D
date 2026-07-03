import React from 'react'
import Heading1 from '../components/Heading1'
import Box1 from '../components/Box1'
import Card2 from '../components/Card2'
import {Flex, SimpleGrid, VStack} from "@chakra-ui/react"
import Instructorcard from '../components/Instructorcard'
import TC1 from '../components/TC1'
import TP1 from '../components/TP1'
function Instrustors() {
  return (
    <>
    <Flex w="100%" bg={{ base: "#285430", lg: "none" }} justifyContent="center">
        <VStack marginBlock={{ base: 100, sm: 180, lg: 50 }} gap="5px">
          <TC1
            heading1="OUR RESOURCE PERSONS"
            heading2="YOGA COURSES"
            fs={{ base: 28, sm: 32, lg: 32 }}
            lh="43px"
            al="center"
            c={{ base: "#FFFFFF", lg: "#000000" }}
            fw={{ base: 700, lg: 500 }}
          />
          <TP1
            heading="Qualified and Committed Resource Persons Having Wide 
            Range of Expertise in Yogic Science"
            fs={{ base: 16, sm: 20, lg: 16 }}
            lh="20px"
            al="center"
            c={{ base: "#FFFFFF", lg: "#000000" }}
            fw={{ base: 300, lg: 400 }}
          />
        </VStack>
      </Flex>

      <SimpleGrid
        justifyItems="center"
        columns={{ base: 2, sm: 3 }}
        marginBlock={{ base: "35px", sm: "35px", md: "80px", lg: "100px" }}
        rowGap={{ base: "30px", sm: "50px", md: "80px", lg: "100px" }}
        columnGap={{ base: "30px", sm: "30px", md: "50px", lg: "80px" }}
      >
<Instructorcard bg={("images/Instructors/Instructors1.png")} name="Yoru" role="Session Teacher" roledetail="PGDYT,PGDAV" />
<Instructorcard bg={("images/Instructors/Instructors2.png")} name="Pheonix" role="SessionTeacher" roledetail="PGDYT,DVEd" />
<Instructorcard bg={("images/Instructors/Instructors3.png")} name="Astra" role="Session Teacher" roledetail="PGDYT,Astanga Yoga" />
<Instructorcard bg={("images/Instructors/Instructors4.png")} name="Omen" role="Course Teacher" roledetail="PGDYT,Hata Yoga" />
<Instructorcard bg={("images/Instructors/Instructors5.png")} name="Viper" role="Course Teacher" roledetail="PGDYT,Hata Yoga,YMIC" />
<Instructorcard bg={("images/Instructors/Instructors6.png")} name="Raze" role="Course Teacher" roledetail="PGDYT,AVTC,PMIC" />

</SimpleGrid>
    </>
  )
}

export default Instrustors
