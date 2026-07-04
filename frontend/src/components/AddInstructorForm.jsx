import React, { useState } from "react";
import {
  VStack, HStack, Box, SimpleGrid, Text, Input, Select, useToast, Button, Flex,
  InputGroup, InputRightElement, IconButton, useClipboard
} from "@chakra-ui/react";
import { CopyIcon, CheckIcon } from "@chakra-ui/icons";
import TextP from "./TextP";
import axios from "axios";

function AddInstructorForm() {
  const [form, setForm] = useState({ username: "", name: "", email: "", phone: "", role: "Session Teacher", role_details: "" });
  const [saving, setSaving] = useState(false);
  const [createdData, setCreatedData] = useState(null);
  const token = localStorage.getItem("token") || localStorage.getItem("accessToken");
  const toast = useToast();
  const { hasCopied, onCopy } = useClipboard(createdData?.temp_password || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.name || !form.email) {
      toast({ title: "Username, Name, and Email are required", status: "warning", duration: 3000, isClosable: true });
      return;
    }
    setSaving(true);
    try {
      const res = await axios.post("/ymsapi/admin/create-instructor/", form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCreatedData(res.data);
      toast({
        title: "Instructor created successfully",
        description: "A teacher profile and linked user account have been created.",
        status: "success", duration: 5000, isClosable: true,
      });
    } catch (err) {
      const errorMsg = typeof err.response?.data?.detail === "string" 
        ? err.response.data.detail 
        : (Array.isArray(err.response?.data?.detail) 
           ? err.response.data.detail.map(e => `${e.loc[e.loc.length - 1]}: ${e.msg}`).join(", ") 
           : "Please check the details");
      toast({
        title: "Error creating instructor",
        description: errorMsg,
        status: "error", duration: 4000, isClosable: true,
      });
    } finally { setSaving(false); }
  };

  const resetForm = () => {
    setForm({ username: "", name: "", email: "", phone: "", role: "Session Teacher", role_details: "" });
    setCreatedData(null);
  };

  return (
    <VStack gap="24px" width="100%" align="stretch">
      <TextP heading="Add Instructor" fw="600" fs="24px" lh="36px" />

      {createdData ? (
        <Box bg="#ECFDF3" p="32px" borderRadius="10px" border="1px solid #CEEDC7" maxW="600px">
          <VStack align="start" gap="16px">
            <HStack color="#285430"><CheckIcon boxSize={6} /><TextP heading="Success! Instructor Added" fw="600" fs="20px" /></HStack>
            <Text fontFamily="Poppins" fontSize="14px" color="#333">Please securely share these login credentials with the instructor. They can reset their password after logging in.</Text>
            
            <Box w="100%" bg="white" p="16px" borderRadius="8px" border="1px solid #E2E8F0">
              <VStack align="start" gap="12px">
                <HStack><Text fontFamily="Poppins" fontWeight="600" w="100px">Username:</Text><Text fontFamily="Poppins">{createdData.username}</Text></HStack>
                <HStack w="100%">
                  <Text fontFamily="Poppins" fontWeight="600" w="100px">Password:</Text>
                  <InputGroup size="md" w="200px">
                    <Input pr="3rem" type="text" value={createdData.temp_password} readOnly bg="gray.50" />
                    <InputRightElement width="3rem">
                      <IconButton h="1.75rem" size="sm" onClick={onCopy} icon={hasCopied ? <CheckIcon color="green.500" /> : <CopyIcon />} aria-label="Copy password" />
                    </InputRightElement>
                  </InputGroup>
                </HStack>
              </VStack>
            </Box>
            <Button onClick={resetForm} bg="#285430" color="white" _hover={{ bg: "#CEEDC7", color: "#000" }}>Add Another Instructor</Button>
          </VStack>
        </Box>
      ) : (
        <Box bg="white" p="32px" borderRadius="10px" border="1px solid #E2E8F0">
          <form onSubmit={handleSubmit}>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap="20px">
              <Box>
                <Text fontFamily="Poppins" fontSize="14px" fontWeight="500" mb="6px">Username (for login) *</Text>
                <Input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })}
                  placeholder="e.g. jdoe_yoga" fontFamily="Poppins" fontSize="14px" borderRadius="6px" h="48px" />
              </Box>
              <Box>
                <Text fontFamily="Poppins" fontSize="14px" fontWeight="500" mb="6px">Full Name *</Text>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Jane Doe" fontFamily="Poppins" fontSize="14px" borderRadius="6px" h="48px" />
              </Box>
              <Box>
                <Text fontFamily="Poppins" fontSize="14px" fontWeight="500" mb="6px">Email *</Text>
                <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="e.g. jane@example.com" fontFamily="Poppins" fontSize="14px" borderRadius="6px" h="48px" />
              </Box>
              <Box>
                <Text fontFamily="Poppins" fontSize="14px" fontWeight="500" mb="6px">Phone Number</Text>
                <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+91 9876543210" fontFamily="Poppins" fontSize="14px" borderRadius="6px" h="48px" />
              </Box>
              <Box>
                <Text fontFamily="Poppins" fontSize="14px" fontWeight="500" mb="6px">Instructor Role</Text>
                <Select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}
                  fontFamily="Poppins" fontSize="14px" borderRadius="6px" h="48px">
                  <option value="Session Teacher">Session Teacher</option>
                  <option value="Course Teacher">Course Teacher</option>
                  <option value="Lead Instructor">Lead Instructor</option>
                </Select>
              </Box>
              <Box>
                <Text fontFamily="Poppins" fontSize="14px" fontWeight="500" mb="6px">Specialization (Role Details)</Text>
                <Input value={form.role_details} onChange={(e) => setForm({ ...form, role_details: e.target.value })}
                  placeholder="e.g. Ashtanga Vinyasa, Hatha Yoga" fontFamily="Poppins" fontSize="14px" borderRadius="6px" h="48px" />
              </Box>
            </SimpleGrid>
            <Flex mt="24px" justify="flex-end">
              <Button type="submit" bg="#285430" color="white" fontFamily="Poppins" fontSize="16px" h="48px" px="32px"
                _hover={{ bg: "#CEEDC7", color: "#000" }} borderRadius="6px" isLoading={saving} loadingText="Creating...">
                Create Instructor
              </Button>
            </Flex>
          </form>
        </Box>
      )}
    </VStack>
  );
}

export default AddInstructorForm;
