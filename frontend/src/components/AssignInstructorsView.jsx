import React, { useState, useEffect } from "react";
import {
  VStack, HStack, Box, Flex, SimpleGrid, Text, IconButton, Input,
  Select, useToast, Spinner, Button
} from "@chakra-ui/react";
import { DeleteIcon, AddIcon } from "@chakra-ui/icons";
import TextP from "./TextP";
import axios from "axios";

function AssignInstructorsView() {
  const [assignments, setAssignments] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ teacher_id: "", assignment_type: "session", assignment_value: "" });
  const token = localStorage.getItem("token") || localStorage.getItem("accessToken");
  const toast = useToast();

  useEffect(() => {
    Promise.all([fetchAssignments(), fetchTeachers()]).then(() => setLoading(false));
  }, []);

  const fetchAssignments = async () => {
    try {
      const res = await axios.get("/ymsapi/admin/assignments/", { headers: { Authorization: `Bearer ${token}` } });
      setAssignments(res.data || []);
    } catch (err) { console.error(err); }
  };

  const fetchTeachers = async () => {
    try {
      const res = await axios.get("/ymsapi/teachers/");
      setTeachers(res.data || []);
    } catch (err) { console.error(err); }
  };

  const handleAssign = async () => {
    if (!form.teacher_id || !form.assignment_value) {
      toast({ title: "Select an instructor and enter a value", status: "warning", duration: 3000, isClosable: true });
      return;
    }
    try {
      await axios.post("/ymsapi/admin/assign-instructor/", {
        teacher_id: parseInt(form.teacher_id),
        assignment_type: form.assignment_type,
        assignment_value: form.assignment_value,
      }, { headers: { Authorization: `Bearer ${token}` } });
      toast({ title: "Instructor assigned successfully", status: "success", duration: 2000, isClosable: true });
      setForm({ teacher_id: "", assignment_type: "session", assignment_value: "" });
      fetchAssignments();
    } catch (err) {
      const errorMsg = typeof err.response?.data?.detail === "string" 
        ? err.response.data.detail 
        : (Array.isArray(err.response?.data?.detail) 
           ? err.response.data.detail.map(e => `${e.loc[e.loc.length - 1]}: ${e.msg}`).join(", ") 
           : "Error assigning instructor");
      toast({ title: errorMsg, status: "error", duration: 3000, isClosable: true });
    }
  };

  const handleRemove = async (id) => {
    if (!window.confirm("Remove this assignment?")) return;
    try {
      await axios.delete(`/ymsapi/admin/unassign-instructor/${id}/`, { headers: { Authorization: `Bearer ${token}` } });
      toast({ title: "Assignment removed", status: "success", duration: 2000, isClosable: true });
      fetchAssignments();
    } catch (err) {
      toast({ title: "Error removing assignment", status: "error", duration: 3000, isClosable: true });
    }
  };

  if (loading) {
    return <Flex justify="center" align="center" h="300px"><Spinner size="xl" color="#285430" thickness="4px" /></Flex>;
  }

  return (
    <VStack gap="24px" width="100%" align="stretch">
      <TextP heading="Assign Instructors" fw="600" fs="24px" lh="36px" />

      {/* Assignment Form */}
      <Box bg="white" p="24px" borderRadius="10px" border="1px solid #CEEDC7">
        <TextP heading="New Assignment" fw="500" fs="18px" lh="28px" />
        <SimpleGrid columns={{ base: 1, md: 4 }} gap="16px" mt="16px" alignItems="end">
          <Box>
            <Text fontFamily="Poppins" fontSize="13px" fontWeight="500" mb="4px">Instructor</Text>
            <Select value={form.teacher_id} onChange={(e) => setForm({ ...form, teacher_id: e.target.value })}
              placeholder="Select instructor" fontFamily="Poppins" fontSize="14px" borderRadius="6px">
              {teachers.map((t) => (
                <option key={t.id} value={t.id}>{t.name} ({t.role || "Instructor"})</option>
              ))}
            </Select>
          </Box>
          <Box>
            <Text fontFamily="Poppins" fontSize="13px" fontWeight="500" mb="4px">Type</Text>
            <Select value={form.assignment_type} onChange={(e) => setForm({ ...form, assignment_type: e.target.value })}
              fontFamily="Poppins" fontSize="14px" borderRadius="6px">
              <option value="session">Session</option>
              <option value="course">Course</option>
            </Select>
          </Box>
          <Box>
            <Text fontFamily="Poppins" fontSize="13px" fontWeight="500" mb="4px">
              {form.assignment_type === "session" ? "Batch Time" : "Course Code"}
            </Text>
            <Input value={form.assignment_value} onChange={(e) => setForm({ ...form, assignment_value: e.target.value })}
              placeholder={form.assignment_type === "session" ? "e.g. 6:00 AM TO 7:00 AM" : "e.g. PGDYT"}
              fontFamily="Poppins" fontSize="14px" borderRadius="6px" />
          </Box>
          <Button leftIcon={<AddIcon />} bg="#285430" color="white" fontFamily="Poppins" fontSize="14px"
            _hover={{ bg: "#CEEDC7", color: "#000" }} onClick={handleAssign} borderRadius="6px" h="40px">
            Assign
          </Button>
        </SimpleGrid>
      </Box>

      {/* Current Assignments */}
      <TextP heading="Current Assignments" fw="500" fs="18px" lh="28px" />
      {assignments.length === 0 ? (
        <Box p="40px" textAlign="center" bg="white" borderRadius="10px" border="1px solid #E2E8F0">
          <TextP heading="No instructor assignments yet." fw="400" fs="16px" lh="24px" />
        </Box>
      ) : (
        <VStack gap="10px" width="100%">
          {assignments.map((a) => (
            <Flex key={a.id} width="100%" bg="white" borderRadius="10px" p="16px" border="1px solid #E2E8F0"
              align="center" justify="space-between" _hover={{ boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }} transition="all 0.2s">
              <HStack gap="16px" flex="1" flexWrap="wrap">
                <Box bg="#285430" color="white" borderRadius="6px" px="10px" py="2px" fontFamily="Poppins" fontSize="13px" fontWeight="600">
                  {a.teacher_name || `Teacher #${a.teacher_id}`}
                </Box>
                <Box bg={a.assignment_type === "session" ? "#ECFDF3" : "#E8F4FD"} borderRadius="20px" px="12px" py="2px"
                  fontFamily="Poppins" fontSize="12px" fontWeight="500"
                  color={a.assignment_type === "session" ? "#285430" : "#1A73E8"}>
                  {a.assignment_type === "session" ? "🕐 Session" : "📚 Course"}
                </Box>
                <Text fontFamily="Poppins" fontSize="14px" fontWeight="500">{a.assignment_value}</Text>
              </HStack>
              <IconButton size="sm" variant="ghost" icon={<DeleteIcon />} aria-label="Remove"
                onClick={() => handleRemove(a.id)} _hover={{ color: "red.500" }} />
            </Flex>
          ))}
        </VStack>
      )}
    </VStack>
  );
}

export default AssignInstructorsView;
