import React, { useState, useEffect } from "react";
import { Flex, Box, VStack, HStack, Text, Icon, useToast, Spinner, Divider } from "@chakra-ui/react";
import { CalendarIcon, ViewIcon, EditIcon, AddIcon, SettingsIcon, ArrowBackIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Import all sub-views
import SessionBookingsView from "../components/SessionBookingsView";
import CourseBookingsView from "../components/CourseBookingsView";
import ManageSessionsView from "../components/ManageSessionsView";
import ManageCoursesView from "../components/ManageCoursesView";
import AssignInstructorsView from "../components/AssignInstructorsView";
import AddUserForm from "../components/AddUserForm";
import AddInstructorForm from "../components/AddInstructorForm";

function Admin() {
  const [view, setView] = useState("session_bookings");
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    const token = localStorage.getItem("token") || localStorage.getItem("accessToken");
    if (!token) {
      toast({ title: "Please login first", status: "warning", duration: 3000, isClosable: true });
      navigate("/Login");
      return;
    }
    try {
      const res = await axios.get("/ymsapi/profile/", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data && res.data.is_admin) {
        setIsAdmin(true);
      } else {
        toast({ title: "Access Denied", description: "Admin privileges required", status: "error", duration: 3000, isClosable: true });
        navigate("/");
      }
    } catch (err) {
      toast({ title: "Session expired", status: "error", duration: 3000, isClosable: true });
      localStorage.removeItem("token");
      localStorage.removeItem("accessToken");
      navigate("/Login");
    } finally {
      setLoading(false);
    }
  };

  const navItems = [
    { id: "session_bookings", label: "Session Bookings", icon: CalendarIcon },
    { id: "course_bookings", label: "Course Bookings", icon: ViewIcon },
    { id: "manage_sessions", label: "Manage Sessions", icon: EditIcon },
    { id: "manage_courses", label: "Manage Courses", icon: EditIcon },
    { id: "assign_instructors", label: "Assign Instructors", icon: SettingsIcon },
    { id: "add_user", label: "Add User", icon: AddIcon },
    { id: "add_instructor", label: "Add Instructor", icon: AddIcon },
  ];

  if (loading) {
    return (
      <Flex minH="80vh" justify="center" align="center" bg="#F6F6F6">
        <Spinner size="xl" color="#285430" thickness="4px" />
      </Flex>
    );
  }

  if (!isAdmin) return null;

  return (
    <Flex minH="calc(100vh - 100px)" bg="#F6F6F6" direction={{ base: "column", lg: "row" }}>
      {/* Sidebar */}
      <Box w={{ base: "100%", lg: "280px" }} bg="#285430" color="white" py="30px" px="16px" flexShrink={0}>
        <Text fontFamily="Cinzel" fontSize="24px" fontWeight="700" mb="30px" pl="16px">Admin Panel</Text>
        <VStack align="stretch" gap="8px">
          {navItems.map((item) => (
            <Flex
              key={item.id}
              align="center"
              px="16px"
              py="12px"
              borderRadius="8px"
              cursor="pointer"
              bg={view === item.id ? "rgba(255, 255, 255, 0.15)" : "transparent"}
              _hover={{ bg: "rgba(255, 255, 255, 0.1)" }}
              transition="all 0.2s"
              onClick={() => setView(item.id)}
            >
              <Icon as={item.icon} mr="12px" boxSize={4} />
              <Text fontFamily="Poppins" fontSize="15px" fontWeight={view === item.id ? "600" : "400"}>
                {item.label}
              </Text>
            </Flex>
          ))}
          
          <Divider opacity="0.3" my="10px" />
          
          <Flex
            align="center"
            px="16px"
            py="12px"
            borderRadius="8px"
            cursor="pointer"
            _hover={{ bg: "rgba(255, 255, 255, 0.1)" }}
            transition="all 0.2s"
            onClick={() => navigate("/")}
          >
            <Icon as={ArrowBackIcon} mr="12px" boxSize={4} />
            <Text fontFamily="Poppins" fontSize="15px" fontWeight="400">Go to Website</Text>
          </Flex>

          <Flex
            align="center"
            px="16px"
            py="12px"
            borderRadius="8px"
            cursor="pointer"
            _hover={{ bg: "rgba(255, 255, 255, 0.1)" }}
            transition="all 0.2s"
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
        {view === "session_bookings" && <SessionBookingsView />}
        {view === "course_bookings" && <CourseBookingsView />}
        {view === "manage_sessions" && <ManageSessionsView />}
        {view === "manage_courses" && <ManageCoursesView />}
        {view === "assign_instructors" && <AssignInstructorsView />}
        {view === "add_user" && <AddUserForm />}
        {view === "add_instructor" && <AddInstructorForm />}
      </Box>
    </Flex>
  );
}

export default Admin;
