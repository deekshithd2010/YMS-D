import React from "react";
import {
  Flex,
  HStack,
  IconButton,
  SimpleGrid,
  Spacer,
  VStack,
} from "@chakra-ui/react";
import Pic from "../components/Pic";
import TP1 from "../components/TP1";
import { MinusIcon } from "@chakra-ui/icons";
import { VscCircleLarge } from "react-icons/vsc";
import { FaLinkedinIn, FaTwitter, FaFacebookF } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";

function Footer() {
  return (
    <>
      <Flex
        w="100%"
        h="100%"
        bg="#285430"
        justifyContent="center"
        align="left"
        display={{ base: "none", sm: "flex" }}
        paddingBlock={{ sm: "60px", lg: "115px" }}
        paddingInline={{ sm: "70px", lg: "180px" }}
      >
        <VStack
          rowGap={{ base: "", sm: "20px", lg: "50px" }}
          w="100%"
          alignItems={{ base: "center", lg: "start" }}
        >
          <SimpleGrid
            justifyItems="center"
            columns={3}
            columnGap={{ base: "", sm: "70px", lg: "135px" }}
          >
            <VStack>
              <Pic src="images\Group 3151.svg" />
              <TP1
                heading="+91 1234567890"
                fs={{ base: 16, sm: 18, lg: 20 }}
                lh="32px"
                al="center"
                c="#FFFFFF"
                fw={{ base: 300, lg: 500 }}
              />
              <TP1
                heading="support@yogis.lounge"
                fs={{ base: 16, sm: 14, lg: 16 }}
                lh="32px"
                al="center"
                c="#FFFFFF"
                fw={{ base: 300, lg: 300 }}
              />
            </VStack>
            <VStack alignItems="start" rowGap="30px">
              <TP1
                heading="Quick Links"
                fs={{ base: 16, sm: 20, lg: 18 }}
                lh="28px"
                c="#FFFFFF"
                fw={{ base: 300, lg: 600 }}
              />

              <Link to="/Yogasessions">
                <TP1
                  heading="Sessions"
                  fs={{ base: 16, sm: 16, lg: 18 }}
                  lh="24px"
                  c="#FFFFFF"
                  op="50%"
                  fw={{ base: 300, lg: 300 }}
                />
              </Link>
              <Link to="/YogaForms">
                <TP1
                  heading="Forms"
                  fs={{ base: 16, sm: 16, lg: 18 }}
                  lh="24px"
                  c="#FFFFFF"
                  op="50%"
                  fw={{ base: 300, lg: 300 }}
                />
              </Link>
            </VStack>
            <VStack alignItems="start" rowGap="30px">
              <Spacer />
              <Link to="/YogaCourses">
                <TP1
                  heading="Courses"
                  fs={{ base: 16, sm: 16, lg: 18 }}
                  lh="24px"
                  c="#FFFFFF"
                  op="50%"
                  fw={{ base: 300, lg: 300 }}
                />
              </Link>
              <Link to="/Instructors">
                <TP1
                  heading="Trainers"
                  fs={{ base: 16, sm: 16, lg: 18 }}
                  lh="24px"
                  c="#FFFFFF"
                  op="50%"
                  fw={{ base: 300, lg: 300 }}
                />
              </Link>
            </VStack>
          </SimpleGrid>
          <MinusIcon w="100%" h="3px" bg="#FFFFFF" opacity="50%" />

          <HStack w="100%" justifyItems="left" gap="20px">
            <IconButton
              bg="unset"
              icon={<FaLinkedinIn color="#FFFFFF" size="20px" />}
              _hover={{ bg: "#000000" }}
              borderRadius="100%"
            />
            <IconButton
              bg="unset"
              icon={<FaTwitter color="#FFFFFF" size="20px" />}
              _hover={{ bg: "#000000" }}
              borderRadius="100%"
            />
            <IconButton
              bg="unset"
              icon={<FaFacebookF color="#FFFFFF" size="20px" />}
              _hover={{ bg: "#000000" }}
              borderRadius="100%"
            />
          </HStack>
        </VStack>
      </Flex>

      {/* Phone view */}

      <Flex
        w="100%"
        h="100%"
        bg="#285430"
        justifyContent="center"
        align="left"
        display={{ base: "flex", sm: "none" }}
        padding="38px"
      >
        <SimpleGrid justifyItems="center" columns={2} columnGap="38px">
          <VStack>
            <Pic src="images\Group 3151.svg" />
            <TP1
              heading="+91 1234567890"
              fs="16px"
              lh="32px"
              al="center"
              c="#FFFFFF"
              fw="500"
            />
            <TP1
              heading="support@yogis.lounge"
              fs="12px"
              lh="32px"
              al="center"
              c="#FFFFFF"
              fw="300"
            />
          </VStack>
          <VStack gap="15px" alignItems="start">
            <TP1
              heading="Quick Links"
              fs="14px"
              lh="28px"
              c="#FFFFFF"
              fw="600"
            />
            <HStack gap="25px">
              <Link to="/Yogasessions">
                <TP1
                  heading="Sessions"
                  fs="12px"
                  lh="18px"
                  c="#FFFFFF"
                  op="50%"
                  fw="300"
                />
              </Link>
              <Link to="/YogaForms">
                <TP1
                  heading="Forms"
                  fs="12px"
                  lh="18px"
                  c="#FFFFFF"
                  op="50%"
                  fw="300"
                />
              </Link>
            </HStack>
            <HStack gap="25px">
              <Link to="/YogaCourses">
                <TP1
                  heading="Courses"
                  fs="12px"
                  lh="18px"
                  c="#FFFFFF"
                  op="50%"
                  fw="300"
                />
              </Link>
              <Link to="/Instructors">
                <TP1
                  heading="Trainers"
                  fs="12px"
                  lh="18px"
                  c="#FFFFFF"
                  op="50%"
                  fw="300"
                />
              </Link>
            </HStack>
            <HStack>
              <IconButton
                bg="unset"
                icon={<FaLinkedinIn color="#FFFFFF" size="20px" />}
                _hover={{ bg: "#000000" }}
                borderRadius="100%"
              />
              <IconButton
                bg="unset"
                icon={<FaTwitter color="#FFFFFF" size="20px" />}
                _hover={{ bg: "#000000" }}
                borderRadius="100%"
              />
              <IconButton
                bg="unset"
                icon={<FaFacebookF color="#FFFFFF" size="20px" />}
                _hover={{ bg: "#000000" }}
                borderRadius="100%"
              />
            </HStack>
          </VStack>
        </SimpleGrid>
      </Flex>
      <Outlet />
    </>
  );
}

export default Footer;
