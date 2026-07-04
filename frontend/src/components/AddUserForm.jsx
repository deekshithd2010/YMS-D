import React, { useState } from "react";
import {
  VStack, HStack, Box, SimpleGrid, Text, Input, Select, useToast, Button
} from "@chakra-ui/react";
import TextP from "./TextP";
import axios from "axios";

function AddUserForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("client");
  const [saving, setSaving] = useState(false);
  const token = localStorage.getItem("token") || localStorage.getItem("accessToken");
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      toast({ title: "Username, Email, and Password are required", status: "warning", duration: 3000, isClosable: true });
      return;
    }
    setSaving(true);
    try {
      await axios.post("/ymsapi/admin/create-user/", {
        username, email, password,
        is_instructor: role === "instructor",
      }, { headers: { Authorization: `Bearer ${token}` } });
      toast({
        title: "User created successfully",
        description: `${username} has been added as a ${role}`,
        status: "success", duration: 4000, isClosable: true,
      });
      setUsername(""); setEmail(""); setPassword(""); setRole("client");
    } catch (err) {
      const errorMsg = typeof err.response?.data?.detail === "string" 
        ? err.response.data.detail 
        : (Array.isArray(err.response?.data?.detail) 
           ? err.response.data.detail.map(e => `${e.loc[e.loc.length - 1]}: ${e.msg}`).join(", ") 
           : "Please check the details");
      toast({
        title: "Error creating user",
        description: errorMsg,
        status: "error", duration: 4000, isClosable: true,
      });
    } finally { setSaving(false); }
  };

  return (
    <VStack gap="24px" width="100%" align="stretch">
      <TextP heading="Add User" fw="600" fs="24px" lh="36px" />

      <Box bg="white" p="32px" borderRadius="10px" border="1px solid #E2E8F0" maxW="600px">
        <form onSubmit={handleSubmit}>
          <VStack gap="20px" align="stretch">
            <Box>
              <Text fontFamily="Poppins" fontSize="14px" fontWeight="500" mb="6px">Username *</Text>
              <Input value={username} onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username" fontFamily="Poppins" fontSize="14px" borderRadius="6px"
                border="1px solid #D2D2D2" h="48px" />
            </Box>
            <Box>
              <Text fontFamily="Poppins" fontSize="14px" fontWeight="500" mb="6px">Email *</Text>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address" fontFamily="Poppins" fontSize="14px" borderRadius="6px"
                border="1px solid #D2D2D2" h="48px" />
            </Box>
            <Box>
              <Text fontFamily="Poppins" fontSize="14px" fontWeight="500" mb="6px">Password *</Text>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password" fontFamily="Poppins" fontSize="14px" borderRadius="6px"
                border="1px solid #D2D2D2" h="48px" />
            </Box>
            <Box>
              <Text fontFamily="Poppins" fontSize="14px" fontWeight="500" mb="6px">Role</Text>
              <Select value={role} onChange={(e) => setRole(e.target.value)}
                fontFamily="Poppins" fontSize="14px" borderRadius="6px" border="1px solid #D2D2D2" h="48px">
                <option value="client">Client (Yoga Student)</option>
                <option value="instructor">Instructor</option>
              </Select>
            </Box>
            <Button type="submit" bg="#285430" color="white" fontFamily="Poppins" fontSize="16px" h="48px"
              _hover={{ bg: "#CEEDC7", color: "#000" }} borderRadius="6px" isLoading={saving} loadingText="Creating...">
              Create User
            </Button>
          </VStack>
        </form>
      </Box>
    </VStack>
  );
}

export default AddUserForm;
