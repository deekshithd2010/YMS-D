import { Flex, HStack, VStack } from "@chakra-ui/react";
import React from "react";
import Pic from "../components/Pic";
import TextC from "../components/TextC";
import TextP from "../components/TextP";
import TextS from "../components/TextS";
import Banner from "../assets/Banner.mp4";

function Home1() {
  return (
    <>
      <VStack gap="20px">
        <Flex
          w="100%"
          bg={{ base: "#285430", md: "#000000" }}
          justifyContent="center"
        >
          <Flex
            display={{
              base: "none",
              md: "flex",
            }}
          >
            <video src={Banner} autoPlay loop muted />
          </Flex>
          <Flex>
            <Pic
              mb={{ base: 65, sm: 95 }}
              src="images\Vector 11.png"
              d={{
                base: "block",
                md: "none",
              }}
            />
          </Flex>
        </Flex>
        <TextC
          heading="YOGI’S LOUNGE"
          fs={{ base: 24, sm: 28, lg: 48 }}
          lh="65px"
          fw={{ base: 700, lg: 500 }}
        />
        <VStack
          gap="10px"
          paddingInline={{ base: "35px", sm: "50px", lg: "80px" }}
        >
          <TextP
            heading="Welcome to our yoga website, where we want to assist you in discovering the transformational power of yoga. Whether you're new to yoga or a seasoned practitioner, our website has a multitude of materials to help you on your path to increased health, balance, and inner peace. "
            al="justify"
            fw="400"
            fs={{ base: 16, sm: 20, lg: 16 }}
            lh="24px"
          />
          <TextP
            heading="Yoga courses, workshops, and retreats to meet your needs and interests may be found here. Our skilled teachers provide a variety of methods to help you improve your practise and explore new pathways of self-discovery, from gentle, restorative practises to vigorous vinyasa flows. "
            al="justify"
            fw="400"
            fs={{ base: 16, sm: 20, lg: 16 }}
            lh="24px"
          />
          <TextP
            heading="Our website, in addition to lessons, has a lot of material about yoga philosophy, anatomy, and meditation. Whether you're interested in the history of yoga or want to learn more about the mind-body connection, our articles and resources are a great place to start. "
            al="justify"
            fw="400"
            fs={{ base: 16, sm: 20, lg: 16 }}
            lh="24px"
          />
          <TextP
            heading="We believe that yoga is for everyone, and we work hard to provide an inclusive and inviting environment where everyone may feel at ease developing their practise. We're dedicated to instilling a feeling of belonging and connection among our members, and we're excited to go on this adventure with you. "
            al="justify"
            fw="400"
            fs={{ base: 16, sm: 20, lg: 16 }}
            lh="24px"
          />
        </VStack>
        <TextS
          heading="|| Yogaha Chitta Vritti Nirodhaha ||"
          al="justify"
          fw="400"
          fs={{ base: "20px", sm: "32px" }}
          lh={{ base: "25px", sm: "39px" }}
        />
        <TextP
          heading='“Yoga is defined as restraint of fluctuations in the consciousness. It is the art of studying the behaviour of consciousness" -BKS Iyengar'
          al="center"
          fw="400"
          fs={{ base: 16, sm: 20, lg: 24 }}
          lh={{ base: "24px", sm: "30px", lg: "36px" }}
        />
      </VStack>
    </>
  );
}

export default Home1;
