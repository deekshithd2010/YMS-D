import { Flex, HStack, VStack, Box } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import TextP from '../components/TextP'
import { MinusIcon } from '@chakra-ui/icons'
import Teacherinfo from '../components/Teacherinfo'
import axios from 'axios'

function AdminTeacher() {
  const [teachers, setTeachers] = useState([]);
  const token = localStorage.getItem("token") || localStorage.getItem("accessToken");

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get('/ymsapi/teachers/');
      setTeachers(response.data || []);
    } catch (error) {
      console.error("Error fetching teacher list:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this teacher record?")) {
      return;
    }
    try {
      await axios.delete(`/ymsapi/teachers/${id}/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Teacher record deleted successfully.");
      fetchTeachers(); // reload
    } catch (error) {
      console.error(error);
      alert("Error deleting teacher.");
    }
  };

  return (
    <>
      <VStack gap="20px" width="100%" align="stretch">
        <HStack gap="100px" display={{ base: "none", lg: "flex" }} paddingLeft="20px" paddingTop="20px">
          <TextP heading="Name" fw="500" fs="20px" lh="28px" al="center" />
          <TextP heading="Email" fw="500" fs="20px" lh="28px" al="center" />
          <TextP heading="Role" fw="500" fs="20px" lh="28px" al="center" />
          <TextP heading="Role Details" fw="500" fs="20px" lh="28px" al="center" />
        </HStack>

        <MinusIcon w="full" h="3px" bg="#000000" opacity="30%" alignSelf="center" display={{ base: "none", lg: "flex" }} />

        {/* Dynamic Teacher Rows */}
        <VStack gap="15px" width="100%" align="stretch">
          {teachers.length > 0 ? (
            teachers.map(teacher => (
              <Teacherinfo
                key={teacher.id}
                id={teacher.id}
                name={teacher.name}
                email={teacher.email}
                role={teacher.role}
                roleDetails={teacher.role_details}
                image={teacher.image}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <Box padding="30px" textAlign="center" bg="#FFFFFF" borderRadius="5px">
              No teachers registered in the database yet.
            </Box>
          )}
        </VStack>
      </VStack>
    </>
  )
}

export default AdminTeacher
