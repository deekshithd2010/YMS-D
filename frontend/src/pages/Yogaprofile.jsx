import React from "react";
import PropTypes from "prop-types";
import { Flex, Box, VStack } from "@chakra-ui/react";
import TextP from "../components/TextP";
import TP1 from "../components/TP1";
import Box2 from "../components/Box2";
import Box3 from "../components/Box3";
import Pic from "../components/Pic";

function Yogaprofile(props) {
  const hasSessions = props.sessions && props.sessions.length > 0;
  const hasCourses = props.courses && props.courses.length > 0;

  return (
    <>
      <Flex w="100%" h="100%" bg="#F6F6F6">
        <Box
          justifyItems="center"
          bg="#FFFFFF"
          width="100%"
          border={{ base: "none", lg: "0.6px solid #000000" }}
          borderRadius={{ base: "none", lg: "10px" }}
          boxSizing="border-box"
          marginBottom={{ base: "none", lg: "80px" }}
          marginInline={{ base: "0px", lg: "200px" }}
          rowGap="50px"
        >
          <Flex
            bg="#285430"
            paddingBlock="60px"
            borderRadius={{ base: "none", lg: "10px" }}
            direction="column"
            alignItems="center"
            width="100%"
          >
            <Pic
              w="130px"
              h="130px"
              src="\images\profile.jpg"
              br="100%"
            />
            <TP1
              heading={props.userName || "Yogi Member"}
              fw="400"
              fs="20px"
              lh="28px"
              c="#FFFFFF"
            />
          </Flex>
          
          <VStack gap="20px" marginBlock="50px" width="100%">
            {/* Sessions section */}
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <TextP heading="Yoga Session Enrollments" fw="400" fs="20px" lh="36px" al="center" />
              {hasSessions ? (
                props.sessions.map((session) => (
                  <Box2
                    key={session.id}
                    batchTime={session.batch_time}
                    paymentStatus={session.payment_status}
                  />
                ))
              ) : (
                <TextP heading="Not registered in any yoga sessions yet." fw="300" fs="14px" lh="28px" al="center" />
              )}
            </div>

            {/* Courses section */}
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
              <TextP heading="Yoga Course Enrollments" fw="400" fs="20px" lh="36px" al="center" />
              {hasCourses ? (
                props.courses.map((course) => (
                  <Box3
                    key={course.id}
                    courseCode={course.course_code}
                    courseName={course.course_name}
                    paymentStatus={course.payment_status}
                  />
                ))
              ) : (
                <TextP heading="Not registered in any yoga courses yet." fw="300" fs="14px" lh="28px" al="center" />
              )}
            </div>
          </VStack>
        </Box>
      </Flex>
    </>
  );
}

Yogaprofile.propTypes = {
  userName: PropTypes.string,
  sessions: PropTypes.array,
  courses: PropTypes.array,
};

export default Yogaprofile;
