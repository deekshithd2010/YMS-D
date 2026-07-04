import React, { useState, useEffect } from "react";
import {
  Flex, Box, VStack, HStack, Text, Icon, useToast, Spinner, SimpleGrid, Accordion,
  AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Divider
} from "@chakra-ui/react";
import { CalendarIcon, InfoIcon, ArrowBackIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import TextP from "../components/TextP";
import axios from "axios";

function InstructorDashboard() {
  const [view, setView] = useState("my_sessions");
  const [loading, setLoading] = useState(true);
  const [isInstructor, setIsInstructor] = useState(false);
  const [teacherProfile, setTeacherProfile] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [enrolledStudents, setEnrolledStudents] = useState({});
  const [loadingStudents, setLoadingStudents] = useState({});
  const navigate = useNavigate();
  const toast = useToast();
  const token = localStorage.getItem("token") || localStorage.getItem("accessToken");

  useEffect(() => {
    checkInstructorStatus();
  }, []);

  const checkInstructorStatus = async () => {
    if (!token) {
      toast({ title: "Please login first", status: "warning", duration: 3000, isClosable: true });
      navigate("/Login");
      return;
    }
    try {
      const res = await axios.get("/ymsapi/profile/", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data && (res.data.is_instructor || res.data.is_admin)) {
        setIsInstructor(true);
        if (res.data.linked_teacher_id) {
          fetchTeacherProfile(res.data.linked_teacher_id);
          fetchAssignments();
        } else if (res.data.is_admin) {
          // Admin can see dashboard but won't have specific assignments
          setLoading(false);
        } else {
          toast({ title: "Error", description: "No linked instructor profile found", status: "error", duration: 3000, isClosable: true });
          setLoading(false);
        }
      } else {
        toast({ title: "Access Denied", description: "Instructor privileges required", status: "error", duration: 3000, isClosable: true });
        navigate("/");
      }
    } catch (err) {
      toast({ title: "Session expired", status: "error", duration: 3000, isClosable: true });
      localStorage.removeItem("token");
      localStorage.removeItem("accessToken");
      navigate("/Login");
    }
  };

  const fetchTeacherProfile = async (teacherId) => {
    try {
      const res = await axios.get(`/ymsapi/teachers/`);
      const matched = res.data.find(t => t.id === teacherId);
      if (matched) {
        setTeacherProfile(matched);
      }
    } catch (err) {
      console.error("Error fetching teacher profile", err);
    }
  };

  const fetchAssignments = async () => {
    try {
      const res = await axios.get("/ymsapi/instructor/my-assignments/", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAssignments(res.data || []);
    } catch (err) {
      toast({ title: "Error loading assignments", status: "error", duration: 3000, isClosable: true });
    } finally {
      setLoading(false);
    }
  };

  const fetchEnrolledStudents = async (type, value) => {
    if (enrolledStudents[value]) return; // already loaded
    setLoadingStudents(prev => ({ ...prev, [value]: true }));
    try {
      const endpoint = type === "session" 
        ? `/ymsapi/instructor/session-students/${encodeURIComponent(value)}/`
        : `/ymsapi/instructor/course-students/${encodeURIComponent(value)}/`;
      
      const res = await axios.get(endpoint, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEnrolledStudents(prev => ({ ...prev, [value]: res.data || [] }));
    } catch (err) {
      toast({ title: `Error loading students for ${value}`, status: "error", duration: 3000, isClosable: true });
    } finally {
      setLoadingStudents(prev => ({ ...prev, [value]: false }));
    }
  };

  const activeAssignments = assignments.filter(a => 
    view === "my_sessions" ? a.assignment_type === "session" : a.assignment_type === "course"
  );

  if (loading) {
    return (
      <Flex minH="80vh" justify="center" align="center" bg="#F6F6F6">
        <Spinner size="xl" color="#285430" thickness="4px" />
      </Flex>
    );
  }

  if (!isInstructor) return null;

  return (
    <Flex minH="calc(100vh - 100px)" bg="#F6F6F6" direction={{ base: "column", lg: "row" }}>
      {/* Sidebar */}
      <Box w={{ base: "100%", lg: "280px" }} bg="#285430" color="white" py="30px" px="16px" flexShrink={0}>
        <Text fontFamily="Cinzel" fontSize="22px" fontWeight="700" mb="5px" pl="16px">Instructor Portal</Text>
        {teacherProfile && (
          <Text fontFamily="Poppins" fontSize="14px" color="#CEEDC7" mb="30px" pl="16px" fontWeight="500">
            Welcome, {teacherProfile.name}
          </Text>
        )}
        <VStack align="stretch" gap="8px">
          <Flex
            align="center" px="16px" py="12px" borderRadius="8px" cursor="pointer"
            bg={view === "my_sessions" ? "rgba(255, 255, 255, 0.15)" : "transparent"}
            _hover={{ bg: "rgba(255, 255, 255, 0.1)" }} transition="all 0.2s"
            onClick={() => setView("my_sessions")}
          >
            <Icon as={CalendarIcon} mr="12px" boxSize={4} />
            <Text fontFamily="Poppins" fontSize="15px" fontWeight={view === "my_sessions" ? "600" : "400"}>My Sessions</Text>
          </Flex>
          <Flex
            align="center" px="16px" py="12px" borderRadius="8px" cursor="pointer"
            bg={view === "my_courses" ? "rgba(255, 255, 255, 0.15)" : "transparent"}
            _hover={{ bg: "rgba(255, 255, 255, 0.1)" }} transition="all 0.2s"
            onClick={() => setView("my_courses")}
          >
            <Icon as={InfoIcon} mr="12px" boxSize={4} />
            <Text fontFamily="Poppins" fontSize="15px" fontWeight={view === "my_courses" ? "600" : "400"}>My Courses</Text>
          </Flex>

          <Divider opacity="0.3" my="10px" />

          <Flex
            align="center" px="16px" py="12px" borderRadius="8px" cursor="pointer"
            _hover={{ bg: "rgba(255, 255, 255, 0.1)" }} transition="all 0.2s"
            onClick={() => navigate("/")}
          >
            <Icon as={ArrowBackIcon} mr="12px" boxSize={4} />
            <Text fontFamily="Poppins" fontSize="15px" fontWeight="400">Go to Website</Text>
          </Flex>

          <Flex
            align="center" px="16px" py="12px" borderRadius="8px" cursor="pointer"
            _hover={{ bg: "rgba(255, 255, 255, 0.1)" }} transition="all 0.2s"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("accessToken");
              localStorage.removeItem("refreshToken");
              toast({ title: "Logged out successfully", status: "success", duration: 2000 });
              navigate("/Login");
            }}
          >
            <Icon as={ArrowBackIcon} mr="12px" boxSize={4} transform="rotate(180deg)" />
            <Text fontFamily="Poppins" fontSize="15px" fontWeight="400">Logout</Text>
          </Flex>
        </VStack>
      </Box>

      {/* Main Content Pane */}
      <Box flex="1" p={{ base: "16px", md: "32px", lg: "40px" }} overflowY="auto">
        <VStack gap="20px" width="100%" align="stretch">
          <TextP heading={view === "my_sessions" ? "My Assigned Sessions" : "My Assigned Courses"} fw="600" fs="24px" lh="36px" />
          
          {activeAssignments.length === 0 ? (
            <Box p="40px" textAlign="center" bg="white" borderRadius="10px" border="1px solid #E2E8F0">
              <TextP heading="No assignments for this category." fw="400" fs="16px" lh="24px" />
            </Box>
          ) : (
            <Accordion allowToggle onChange={(index) => {
              if (index !== -1 && activeAssignments[index]) {
                const item = activeAssignments[index];
                fetchEnrolledStudents(item.assignment_type, item.assignment_value);
              }
            }}>
              {activeAssignments.map((a) => (
                <AccordionItem key={a.id} bg="white" border="1px solid #E2E8F0" borderRadius="10px" mb="12px" overflow="hidden">
                  <h2>
                    <AccordionButton py="16px" px="20px" _hover={{ bg: "gray.50" }}>
                      <Box flex="1" textAlign="left">
                        <HStack gap="12px">
                          <Box bg="#285430" color="white" px="10px" py="2px" borderRadius="6px" fontFamily="Poppins" fontSize="13px" fontWeight="600">
                            {a.assignment_value}
                          </Box>
                          <Text fontFamily="Poppins" fontSize="15px" fontWeight="500" color="#666">
                            {a.assignment_type === "session" ? "Yoga Session Slot" : "Yoga Course"}
                          </Text>
                        </HStack>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4} px="20px">
                    <Text fontFamily="Poppins" fontSize="14px" fontWeight="600" color="#285430" mb="12px">Enrolled Students</Text>
                    
                    {loadingStudents[a.assignment_value] ? (
                      <Flex justify="center" p="20px"><Spinner color="#285430" /></Flex>
                    ) : enrolledStudents[a.assignment_value]?.length === 0 ? (
                      <Text fontFamily="Poppins" fontSize="13px" color="#999">No students enrolled in this yet.</Text>
                    ) : (
                      <VStack align="stretch" gap="8px" mt="8px">
                        {/* Desktop Header */}
                        <SimpleGrid columns={3} bg="gray.100" p="8px 12px" borderRadius="6px" display={{ base: "none", md: "grid" }}>
                          <Text fontFamily="Poppins" fontSize="12px" fontWeight="600">Name</Text>
                          <Text fontFamily="Poppins" fontSize="12px" fontWeight="600">Email</Text>
                          <Text fontFamily="Poppins" fontSize="12px" fontWeight="600">Phone</Text>
                        </SimpleGrid>

                        {enrolledStudents[a.assignment_value]?.map((s) => (
                          <Box key={s.id}>
                            {/* Desktop Row */}
                            <SimpleGrid columns={3} p="8px 12px" borderBottom="1px solid #EEE" display={{ base: "none", md: "grid" }} alignItems="center">
                              <Text fontFamily="Poppins" fontSize="13px" fontWeight="500">{s.name}</Text>
                              <Text fontFamily="Poppins" fontSize="13px" color="#666">{s.email}</Text>
                              <Text fontFamily="Poppins" fontSize="13px">{s.phone || "—"}</Text>
                            </SimpleGrid>

                            {/* Mobile Card */}
                            <Box display={{ base: "block", md: "none" }} p="12px" border="1px solid #EEE" borderRadius="8px" mb="6px">
                              <Text fontFamily="Poppins" fontSize="14px" fontWeight="600">{s.name}</Text>
                              <Text fontFamily="Poppins" fontSize="12px" color="#666">{s.email}</Text>
                              <Text fontFamily="Poppins" fontSize="12px">{s.phone || "—"}</Text>
                            </Box>
                          </Box>
                        ))}
                      </VStack>
                    )}
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </VStack>
      </Box>
    </Flex>
  );
}

export default InstructorDashboard;
