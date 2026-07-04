import React, { useState, useEffect } from "react";
import {
  VStack, HStack, Box, Flex, SimpleGrid, Text, Select, useToast, Spinner
} from "@chakra-ui/react";
import TextP from "./TextP";
import Paid from "./Paid";
import Pending1 from "./Pending1";
import axios from "axios";

function CourseBookingsView() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token") || localStorage.getItem("accessToken");
  const toast = useToast();

  useEffect(() => { fetchBookings(); }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get("/ymsapi/admin/course-bookings/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data || []);
    } catch (err) {
      toast({ title: "Error loading course bookings", status: "error", duration: 3000, isClosable: true });
    } finally { setLoading(false); }
  };

  const updatePaymentStatus = async (regId, newStatus) => {
    try {
      await axios.put(
        `/ymsapi/admin/update-payment-status/course/${regId}/`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast({ title: `Payment marked as ${newStatus}`, status: "success", duration: 2000, isClosable: true });
      fetchBookings();
    } catch (err) {
      toast({ title: "Failed to update status", status: "error", duration: 3000, isClosable: true });
    }
  };

  if (loading) {
    return <Flex justify="center" align="center" h="300px"><Spinner size="xl" color="#285430" thickness="4px" /></Flex>;
  }

  return (
    <VStack gap="20px" width="100%" align="stretch">
      <HStack justify="space-between" align="center">
        <TextP heading="Course Bookings" fw="600" fs="24px" lh="36px" />
        <Box bg="#ECFDF3" borderRadius="20px" px="16px" py="4px" fontFamily="Poppins" fontSize="14px" color="#285430" fontWeight="500">
          {bookings.length} Total
        </Box>
      </HStack>

      {bookings.length === 0 ? (
        <Box p="40px" textAlign="center" bg="white" borderRadius="10px" border="1px solid #E2E8F0">
          <TextP heading="No course bookings yet." fw="400" fs="16px" lh="24px" />
        </Box>
      ) : (
        <VStack gap="12px" width="100%">
          {/* Desktop Header */}
          <SimpleGrid columns={7} width="100%" bg="#285430" borderRadius="8px" p="12px 16px" display={{ base: "none", lg: "grid" }} gap="8px">
            {["Name", "Email", "Phone", "Course", "Code", "Payment", "Date"].map((h) => (
              <Text key={h} color="white" fontFamily="Poppins" fontSize="13px" fontWeight="600">{h}</Text>
            ))}
          </SimpleGrid>

          {bookings.map((b) => (
            <Box key={b.id} width="100%">
              {/* Desktop Row */}
              <SimpleGrid columns={7} width="100%" bg="white" borderRadius="8px" p="12px 16px"
                display={{ base: "none", lg: "grid" }} gap="8px" alignItems="center"
                border="1px solid #E2E8F0" _hover={{ boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }} transition="box-shadow 0.2s">
                <Text fontFamily="Poppins" fontSize="14px" fontWeight="500">{b.name}</Text>
                <Text fontFamily="Poppins" fontSize="13px" color="#666">{b.email}</Text>
                <Text fontFamily="Poppins" fontSize="13px">{b.phone || "—"}</Text>
                <Text fontFamily="Poppins" fontSize="13px" fontWeight="500">{b.course_name}</Text>
                <Text fontFamily="Poppins" fontSize="13px" fontWeight="600" color="#285430">{b.course_code}</Text>
                <Select size="sm" value={b.payment_status}
                  onChange={(e) => updatePaymentStatus(b.id, e.target.value)}
                  fontFamily="Poppins" fontSize="12px" borderRadius="6px"
                  bg={b.payment_status === "paid" ? "#ECFDF3" : "#FEF3F2"}
                  color={b.payment_status === "paid" ? "#285430" : "#B42318"}
                  fontWeight="500" border="none" width="100px">
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                </Select>
                <Text fontFamily="Poppins" fontSize="12px" color="#999">
                  {b.created_at ? new Date(b.created_at).toLocaleDateString() : "—"}
                </Text>
              </SimpleGrid>

              {/* Mobile Card */}
              <Box display={{ base: "block", lg: "none" }} bg="white" borderRadius="10px" p="16px" border="1px solid #E2E8F0" mb="8px">
                <VStack align="stretch" gap="8px">
                  <HStack justify="space-between">
                    <Text fontFamily="Poppins" fontSize="16px" fontWeight="600">{b.name}</Text>
                    {b.payment_status === "paid" ? <Paid /> : <Pending1 />}
                  </HStack>
                  <Text fontFamily="Poppins" fontSize="13px" color="#666">{b.email}</Text>
                  <HStack justify="space-between">
                    <Text fontFamily="Poppins" fontSize="13px">📚 {b.course_code} — {b.course_name}</Text>
                  </HStack>
                  <Select size="sm" value={b.payment_status}
                    onChange={(e) => updatePaymentStatus(b.id, e.target.value)}
                    fontFamily="Poppins" fontSize="12px" borderRadius="6px" mt="4px">
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                  </Select>
                </VStack>
              </Box>
            </Box>
          ))}
        </VStack>
      )}
    </VStack>
  );
}

export default CourseBookingsView;
