import React, { useState, useEffect } from "react";
import { Flex, HStack, VStack, Card, SimpleGrid, Box } from "@chakra-ui/react";
import TextP from "../components/TextP";
import TP1 from "../components/TP1";
import { MinusIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Component Panel Imports
import Admin2 from "./Admin2";
import AdminTeacher from "./AdminTeacher";
import AddStud from "../components/AddStud";
import AddTeacher from "../components/AddTeacher";

function Admin() {
  const [view, setView] = useState("students"); // "students", "teachers", "add_student", "add_teacher"
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("token") || localStorage.getItem("accessToken");

  useEffect(() => {
    if (!token) {
      alert("Admin authorization required.");
      navigate("/Login");
      return;
    }
    checkAdminStatus();
  }, [token]);

  const checkAdminStatus = async () => {
    try {
      const response = await axios.get("/ymsapi/profile/", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.is_admin) {
        setIsAdmin(true);
      } else {
        alert("Access denied. Admin privileges required.");
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      navigate("/Login");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Box padding="100px" textAlign="center">Loading Admin Panel...</Box>;
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <>
      <Flex direction={{ base: "column", lg: "row" }} width="100%">
        {/* Admin Sidebar Navigation */}
        <Flex
          bg="#285430"
          h={{ base: "auto", lg: "1000px" }}
          w={{ base: "100%", lg: "300px" }}
          paddingTop={{ base: "20px", lg: "120px" }}
          paddingBottom={{ base: "20px", lg: "120px" }}
          paddingInline="20px"
          alignItems="center"
          justifyContent="center"
        >
          <VStack gap="35px" width="100%">
            <Box
              onClick={() => setView("students")}
              cursor="pointer"
              width="100%"
              bg={view === "students" ? "rgba(255,255,255,0.15)" : "transparent"}
              borderRadius="5px"
              padding="10px"
            >
              <TP1
                heading="View Students"
                fs="16px"
                lh="26px"
                al="center"
                c="#FFFFFF"
                fw={view === "students" ? "600" : "400"}
              />
            </Box>
            
            <Box
              onClick={() => setView("teachers")}
              cursor="pointer"
              width="100%"
              bg={view === "teachers" ? "rgba(255,255,255,0.15)" : "transparent"}
              borderRadius="5px"
              padding="10px"
            >
              <TP1
                heading="View Teachers"
                fs="16px"
                lh="26px"
                al="center"
                c="#FFFFFF"
                fw={view === "teachers" ? "600" : "400"}
              />
            </Box>

            <Box
              onClick={() => setView("add_student")}
              cursor="pointer"
              width="100%"
              bg={view === "add_student" ? "rgba(255,255,255,0.15)" : "transparent"}
              borderRadius="5px"
              padding="10px"
            >
              <TP1
                heading="Add Students"
                fs="16px"
                lh="26px"
                al="center"
                c="#FFFFFF"
                fw={view === "add_student" ? "600" : "400"}
              />
            </Box>

            <Box
              onClick={() => setView("add_teacher")}
              cursor="pointer"
              width="100%"
              bg={view === "add_teacher" ? "rgba(255,255,255,0.15)" : "transparent"}
              borderRadius="5px"
              padding="10px"
            >
              <TP1
                heading="Add Teachers"
                fs="16px"
                lh="26px"
                al="center"
                c="#FFFFFF"
                fw={view === "add_teacher" ? "600" : "400"}
              />
            </Box>
          </VStack>
        </Flex>

        {/* Content Pane */}
        <Flex flex="1" padding="40px" bg="#F6F6F6" direction="column">
          {view === "students" && <Admin2 />}
          {view === "teachers" && <AdminTeacher />}
          {view === "add_student" && <AddStud onSuccess={() => setView("students")} />}
          {view === "add_teacher" && <AddTeacher onSuccess={() => setView("teachers")} />}
        </Flex>
      </Flex>
    </>
  );
}

export default Admin;
