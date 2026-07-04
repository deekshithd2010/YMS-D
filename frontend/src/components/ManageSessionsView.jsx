import React, { useState, useEffect } from "react";
import {
  VStack, HStack, Box, Flex, SimpleGrid, Text, IconButton, Input,
  Select, useToast, Spinner, Button
} from "@chakra-ui/react";
import { DeleteIcon, AddIcon } from "@chakra-ui/icons";
import TextP from "./TextP";
import axios from "axios";

function ManageSessionsView() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ name: "", slot_time: "", description: "", max_capacity: 30 });
  const token = localStorage.getItem("token") || localStorage.getItem("accessToken");
  const toast = useToast();

  useEffect(() => { fetchSessions(); }, []);

  const fetchSessions = async () => {
    try {
      const res = await axios.get("/ymsapi/sessions/");
      setSessions(res.data || []);
    } catch (err) {
      toast({ title: "Error loading sessions", status: "error", duration: 3000, isClosable: true });
    } finally { setLoading(false); }
  };

  const resetForm = () => {
    setForm({ name: "", slot_time: "", description: "", max_capacity: 30 });
    setShowAdd(false);
    setEditId(null);
  };

  const handleSave = async () => {
    if (!form.name || !form.slot_time) {
      toast({ title: "Name and Slot Time are required", status: "warning", duration: 3000, isClosable: true });
      return;
    }
    try {
      if (editId) {
        await axios.put(`/ymsapi/sessions/${editId}/`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast({ title: "Session updated", status: "success", duration: 2000, isClosable: true });
      } else {
        await axios.post("/ymsapi/sessions/", form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast({ title: "Session created", status: "success", duration: 2000, isClosable: true });
      }
      resetForm();
      fetchSessions();
    } catch (err) {
      toast({ title: err.response?.data?.detail || "Error saving session", status: "error", duration: 3000, isClosable: true });
    }
  };

  const handleEdit = (s) => {
    setForm({ name: s.name, slot_time: s.slot_time, description: s.description || "", max_capacity: s.max_capacity });
    setEditId(s.id);
    setShowAdd(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this session slot?")) return;
    try {
      await axios.delete(`/ymsapi/sessions/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast({ title: "Session deleted", status: "success", duration: 2000, isClosable: true });
      fetchSessions();
    } catch (err) {
      toast({ title: "Error deleting session", status: "error", duration: 3000, isClosable: true });
    }
  };

  const toggleActive = async (s) => {
    try {
      await axios.put(`/ymsapi/sessions/${s.id}/`, { is_active: !s.is_active }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchSessions();
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
        <TextP heading="Manage Sessions" fw="600" fs="24px" lh="36px" />
        <Button
          leftIcon={<AddIcon />}
          bg="#285430"
          color="white"
          fontFamily="Poppins"
          fontSize="14px"
          _hover={{ bg: "#CEEDC7", color: "#000" }}
          onClick={() => { resetForm(); setShowAdd(true); }}
          size="sm"
          borderRadius="8px"
        >
          Add Session
        </Button>
      </HStack>

      {/* Add/Edit Form */}
      {showAdd && (
        <Box bg="white" p="24px" borderRadius="10px" border="1px solid #CEEDC7">
          <TextP heading={editId ? "Edit Session" : "New Session"} fw="500" fs="18px" lh="28px" />
          <SimpleGrid columns={{ base: 1, md: 2 }} gap="16px" mt="16px">
            <Box>
              <Text fontFamily="Poppins" fontSize="13px" fontWeight="500" mb="4px">Session Name *</Text>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Morning Yoga" fontFamily="Poppins" fontSize="14px" borderRadius="6px" />
            </Box>
            <Box>
              <Text fontFamily="Poppins" fontSize="13px" fontWeight="500" mb="4px">Slot Time *</Text>
              <Input value={form.slot_time} onChange={(e) => setForm({ ...form, slot_time: e.target.value })}
                placeholder="e.g. 6:00 AM TO 7:00 AM" fontFamily="Poppins" fontSize="14px" borderRadius="6px" />
            </Box>
            <Box>
              <Text fontFamily="Poppins" fontSize="13px" fontWeight="500" mb="4px">Description</Text>
              <Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Session description" fontFamily="Poppins" fontSize="14px" borderRadius="6px" />
            </Box>
            <Box>
              <Text fontFamily="Poppins" fontSize="13px" fontWeight="500" mb="4px">Max Capacity</Text>
              <Input type="number" value={form.max_capacity} onChange={(e) => setForm({ ...form, max_capacity: parseInt(e.target.value) || 30 })}
                fontFamily="Poppins" fontSize="14px" borderRadius="6px" />
            </Box>
          </SimpleGrid>
          <HStack mt="16px" justify="flex-end" gap="12px">
            <Button variant="outline" fontFamily="Poppins" fontSize="14px" onClick={resetForm} borderRadius="6px">Cancel</Button>
            <Button bg="#285430" color="white" fontFamily="Poppins" fontSize="14px" _hover={{ bg: "#CEEDC7", color: "#000" }}
              onClick={handleSave} borderRadius="6px">{editId ? "Update" : "Create"}</Button>
          </HStack>
        </Box>
      )}

      {/* Sessions List */}
      {sessions.length === 0 ? (
        <Box p="40px" textAlign="center" bg="white" borderRadius="10px" border="1px solid #E2E8F0">
          <TextP heading="No sessions created yet. Click 'Add Session' to start." fw="400" fs="16px" lh="24px" />
        </Box>
      ) : (
        <VStack gap="10px" width="100%">
          {sessions.map((s) => (
            <Flex key={s.id} width="100%" bg="white" borderRadius="10px" p="16px" border="1px solid #E2E8F0"
              align="center" justify="space-between" _hover={{ boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }} transition="all 0.2s">
              <VStack align="start" gap="2px" flex="1">
                <Text fontFamily="Poppins" fontSize="16px" fontWeight="600">{s.name}</Text>
                <Text fontFamily="Poppins" fontSize="14px" color="#666">🕐 {s.slot_time}</Text>
                {s.description && <Text fontFamily="Poppins" fontSize="13px" color="#999">{s.description}</Text>}
              </VStack>
              <HStack gap="8px">
                <Box
                  bg={s.is_active ? "#ECFDF3" : "#FEF3F2"}
                  color={s.is_active ? "#285430" : "#B42318"}
                  borderRadius="20px" px="12px" py="2px"
                  fontFamily="Poppins" fontSize="12px" fontWeight="500"
                  cursor="pointer" onClick={() => toggleActive(s)}
                >
                  {s.is_active ? "Active" : "Inactive"}
                </Box>
                <Text fontFamily="Poppins" fontSize="12px" color="#999">Cap: {s.max_capacity}</Text>
                <Button size="sm" variant="ghost" fontFamily="Poppins" fontSize="13px" onClick={() => handleEdit(s)}>Edit</Button>
                <IconButton size="sm" variant="ghost" icon={<DeleteIcon />} aria-label="Delete"
                  onClick={() => handleDelete(s.id)} _hover={{ color: "red.500" }} />
              </HStack>
            </Flex>
          ))}
        </VStack>
      )}
    </VStack>
  );
}

export default ManageSessionsView;
