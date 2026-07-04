import React, { useState, useEffect } from "react";
import {
  VStack, HStack, Box, Flex, SimpleGrid, Text, IconButton, Input,
  useToast, Spinner, Button
} from "@chakra-ui/react";
import { DeleteIcon, AddIcon } from "@chakra-ui/icons";
import TextP from "./TextP";
import axios from "axios";

function ManageCoursesView() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ code: "", name: "", description: "", duration: "", fee: "" });
  const token = localStorage.getItem("token") || localStorage.getItem("accessToken");
  const toast = useToast();

  useEffect(() => { fetchCourses(); }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get("/ymsapi/courses/");
      setCourses(res.data || []);
    } catch (err) {
      toast({ title: "Error loading courses", status: "error", duration: 3000, isClosable: true });
    } finally { setLoading(false); }
  };

  const resetForm = () => {
    setForm({ code: "", name: "", description: "", duration: "", fee: "" });
    setShowAdd(false);
    setEditId(null);
  };

  const handleSave = async () => {
    if (!form.code || !form.name) {
      toast({ title: "Code and Name are required", status: "warning", duration: 3000, isClosable: true });
      return;
    }
    const payload = { ...form, fee: form.fee ? parseFloat(form.fee) : null };
    try {
      if (editId) {
        await axios.put(`/ymsapi/courses/${editId}/`, payload, { headers: { Authorization: `Bearer ${token}` } });
        toast({ title: "Course updated", status: "success", duration: 2000, isClosable: true });
      } else {
        await axios.post("/ymsapi/courses/", payload, { headers: { Authorization: `Bearer ${token}` } });
        toast({ title: "Course created", status: "success", duration: 2000, isClosable: true });
      }
      resetForm();
      fetchCourses();
    } catch (err) {
      toast({ title: err.response?.data?.detail || "Error saving course", status: "error", duration: 3000, isClosable: true });
    }
  };

  const handleEdit = (c) => {
    setForm({ code: c.code, name: c.name, description: c.description || "", duration: c.duration || "", fee: c.fee || "" });
    setEditId(c.id);
    setShowAdd(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this course?")) return;
    try {
      await axios.delete(`/ymsapi/courses/${id}/`, { headers: { Authorization: `Bearer ${token}` } });
      toast({ title: "Course deleted", status: "success", duration: 2000, isClosable: true });
      fetchCourses();
    } catch (err) {
      toast({ title: "Error deleting course", status: "error", duration: 3000, isClosable: true });
    }
  };

  const toggleActive = async (c) => {
    try {
      await axios.put(`/ymsapi/courses/${c.id}/`, { is_active: !c.is_active }, { headers: { Authorization: `Bearer ${token}` } });
      fetchCourses();
    } catch (err) {
      toast({ title: "Error updating status", status: "error", duration: 3000, isClosable: true });
    }
  };

  if (loading) {
    return <Flex justify="center" align="center" h="300px"><Spinner size="xl" color="#285430" thickness="4px" /></Flex>;
  }

  return (
    <VStack gap="20px" width="100%" align="stretch">
      <HStack justify="space-between" align="center">
        <TextP heading="Manage Courses" fw="600" fs="24px" lh="36px" />
        <Button leftIcon={<AddIcon />} bg="#285430" color="white" fontFamily="Poppins" fontSize="14px"
          _hover={{ bg: "#CEEDC7", color: "#000" }} onClick={() => { resetForm(); setShowAdd(true); }} size="sm" borderRadius="8px">
          Add Course
        </Button>
      </HStack>

      {showAdd && (
        <Box bg="white" p="24px" borderRadius="10px" border="1px solid #CEEDC7">
          <TextP heading={editId ? "Edit Course" : "New Course"} fw="500" fs="18px" lh="28px" />
          <SimpleGrid columns={{ base: 1, md: 2 }} gap="16px" mt="16px">
            <Box>
              <Text fontFamily="Poppins" fontSize="13px" fontWeight="500" mb="4px">Course Code *</Text>
              <Input value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })}
                placeholder="e.g. PGDYT" fontFamily="Poppins" fontSize="14px" borderRadius="6px" />
            </Box>
            <Box>
              <Text fontFamily="Poppins" fontSize="13px" fontWeight="500" mb="4px">Course Name *</Text>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Post Graduation Diploma in Yoga Therapy" fontFamily="Poppins" fontSize="14px" borderRadius="6px" />
            </Box>
            <Box>
              <Text fontFamily="Poppins" fontSize="13px" fontWeight="500" mb="4px">Duration</Text>
              <Input value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })}
                placeholder="e.g. 1 Year" fontFamily="Poppins" fontSize="14px" borderRadius="6px" />
            </Box>
            <Box>
              <Text fontFamily="Poppins" fontSize="13px" fontWeight="500" mb="4px">Fee (₹)</Text>
              <Input type="number" value={form.fee} onChange={(e) => setForm({ ...form, fee: e.target.value })}
                placeholder="e.g. 25000" fontFamily="Poppins" fontSize="14px" borderRadius="6px" />
            </Box>
            <Box gridColumn={{ md: "span 2" }}>
              <Text fontFamily="Poppins" fontSize="13px" fontWeight="500" mb="4px">Description</Text>
              <Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Course description" fontFamily="Poppins" fontSize="14px" borderRadius="6px" />
            </Box>
          </SimpleGrid>
          <HStack mt="16px" justify="flex-end" gap="12px">
            <Button variant="outline" fontFamily="Poppins" fontSize="14px" onClick={resetForm} borderRadius="6px">Cancel</Button>
            <Button bg="#285430" color="white" fontFamily="Poppins" fontSize="14px" _hover={{ bg: "#CEEDC7", color: "#000" }}
              onClick={handleSave} borderRadius="6px">{editId ? "Update" : "Create"}</Button>
          </HStack>
        </Box>
      )}

      {courses.length === 0 ? (
        <Box p="40px" textAlign="center" bg="white" borderRadius="10px" border="1px solid #E2E8F0">
          <TextP heading="No courses created yet. Click 'Add Course' to start." fw="400" fs="16px" lh="24px" />
        </Box>
      ) : (
        <VStack gap="10px" width="100%">
          {courses.map((c) => (
            <Flex key={c.id} width="100%" bg="white" borderRadius="10px" p="16px" border="1px solid #E2E8F0"
              align="center" justify="space-between" _hover={{ boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }} transition="all 0.2s"
              direction={{ base: "column", md: "row" }} gap="12px">
              <VStack align="start" gap="2px" flex="1">
                <HStack>
                  <Box bg="#285430" color="white" borderRadius="6px" px="10px" py="2px" fontFamily="Poppins" fontSize="13px" fontWeight="600">
                    {c.code}
                  </Box>
                  <Text fontFamily="Poppins" fontSize="16px" fontWeight="600">{c.name}</Text>
                </HStack>
                <HStack gap="16px">
                  {c.duration && <Text fontFamily="Poppins" fontSize="13px" color="#666">⏱ {c.duration}</Text>}
                  {c.fee && <Text fontFamily="Poppins" fontSize="13px" color="#285430" fontWeight="500">₹{c.fee.toLocaleString()}</Text>}
                </HStack>
                {c.description && <Text fontFamily="Poppins" fontSize="13px" color="#999">{c.description}</Text>}
              </VStack>
              <HStack gap="8px">
                <Box bg={c.is_active ? "#ECFDF3" : "#FEF3F2"} color={c.is_active ? "#285430" : "#B42318"}
                  borderRadius="20px" px="12px" py="2px" fontFamily="Poppins" fontSize="12px" fontWeight="500"
                  cursor="pointer" onClick={() => toggleActive(c)}>
                  {c.is_active ? "Active" : "Inactive"}
                </Box>
                <Button size="sm" variant="ghost" fontFamily="Poppins" fontSize="13px" onClick={() => handleEdit(c)}>Edit</Button>
                <IconButton size="sm" variant="ghost" icon={<DeleteIcon />} aria-label="Delete"
                  onClick={() => handleDelete(c.id)} _hover={{ color: "red.500" }} />
              </HStack>
            </Flex>
          ))}
        </VStack>
      )}
    </VStack>
  );
}

export default ManageCoursesView;
