import { MinusIcon } from '@chakra-ui/icons'
import { Card, Flex, HStack, VStack, Box } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import TP1 from '../components/TP1'
import TextP from '../components/TextP'
import Sessionstudinfo from '../components/Sessionstudinfo'
import axios from 'axios'

function Admin2() {
  const [students, setStudents] = useState([]);
  const [tab, setTab] = useState("sessions"); // "sessions" or "courses"
  
  const token = localStorage.getItem("token") || localStorage.getItem("accessToken");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      // Use public endpoint ymsapi/stu_list/ or authenticated /students/
      const response = await axios.get('/ymsapi/stu_list/');
      setStudents(response.data || []);
    } catch (error) {
      console.error("Error fetching student list:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student record?")) {
      return;
    }
    try {
      await axios.delete(`/ymsapi/students/${id}/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Student deleted successfully.");
      // Refresh list
      fetchStudents();
    } catch (error) {
      console.error(error);
      alert("Error deleting student.");
    }
  };

  // Filter students based on active tab selection
  // In our schema, session registrations have batch_timing, courses have course code.
  const filteredStudents = students.filter(s => {
    if (tab === "sessions") {
      return !!s.batch_timing;
    } else {
      return !!s.course;
    }
  });

  return (
    <>
      <VStack gap="20px" width="100%" align="stretch">
        <HStack alignSelf="start" marginBlock="20px" gap="20px">
          <Card 
            w="150px" 
            h="40px" 
            border="0.5px solid #000000" 
            alignItems="center" 
            justifyContent="center"
            cursor="pointer"
            bg={tab === "sessions" ? "#285430" : "#FFFFFF"}
            color={tab === "sessions" ? "#FFFFFF" : "#000000"}
            onClick={() => setTab("sessions")}
          >
            Yoga Sessions
          </Card>
          <Card 
            w="150px" 
            h="40px" 
            border="0.5px solid #000000" 
            alignItems="center" 
            justifyContent="center"
            cursor="pointer"
            bg={tab === "courses" ? "#285430" : "#FFFFFF"}
            color={tab === "courses" ? "#FFFFFF" : "#000000"}
            onClick={() => setTab("courses")}
          >
            Yoga Courses
          </Card>
        </HStack>

        {/* Table Header */}
        <HStack gap="100px" display={{base:"none", lg:"flex"}} paddingLeft="20px">
          <TextP heading="Name" fw="500" fs="20px" lh="28px" al="center" />
          <TextP heading="Fees Status" fw="500" fs="20px" lh="28px" al="center" />
          <TextP heading={tab === "sessions" ? "Batch Timings" : "Course Code"} fw="500" fs="20px" lh="28px" al="center" />
          <TextP heading="Email" fw="500" fs="20px" lh="28px" al="center" />
          <TextP heading="Subscription" fw="500" fs="20px" lh="28px" al="center" />
        </HStack>

        <MinusIcon w="full" h="3px" bg="#000000" opacity="30%" alignSelf="center" display={{base:"none", lg:"flex"}} />

        {/* Dynamic Table Rows */}
        <VStack gap="15px" width="100%" align="stretch">
          {filteredStudents.length > 0 ? (
            filteredStudents.map(student => (
              <Sessionstudinfo
                key={student.id}
                id={student.id}
                name={student.name}
                email={student.email}
                feesStatus={student.fees_status}
                batchTiming={tab === "sessions" ? student.batch_timing : student.course}
                subscription={student.subscription_type || "Monthly"}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <Box padding="30px" textAlign="center" bg="#FFFFFF" borderRadius="5px">
              No students enrolled in this category yet.
            </Box>
          )}
        </VStack>
      </VStack>
    </>
  )
}

export default Admin2
