import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Flex, SimpleGrid, VStack, HStack, Select } from "@chakra-ui/react";
import Textbox2 from "./Textbox2";
import TextP from "./TextP";
import Button1 from "./Button1";
import Button2 from "./Button2";
import axios from "axios";

function AddStud(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [feesStatus, setFeesStatus] = useState("pending");
  const [batchTiming, setBatchTiming] = useState("");
  const [course, setCourse] = useState("");
  const [subscriptionType, setSubscriptionType] = useState("Monthly");

  const token = localStorage.getItem("token") || localStorage.getItem("accessToken");

  const handleSave = async (e) => {
    e.preventDefault();
    if (!name || !email) {
      alert("Name and Email are required.");
      return;
    }
    const payload = {
      name,
      email,
      phone: phone || null,
      gender: gender || null,
      address: address || null,
      city: city || null,
      postal_code: postalCode || null,
      country: country || null,
      fees_status: feesStatus,
      batch_timing: batchTiming || null,
      course: course || null,
      subscription_type: subscriptionType || null,
    };

    try {
      await axios.post("/ymsapi/students/", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Student added successfully!");
      if (props.onSuccess) {
        props.onSuccess();
      }
    } catch (error) {
      console.error(error);
      alert("Error adding student. Make sure email is valid and you have admin access.");
    }
  };

  return (
    <>
      <form onSubmit={handleSave}>
        <Flex width="100%">
          <SimpleGrid
            justifyItems="center"
            columns={{ base: 1, lg: 2 }}
            columnGap="90px"
            rowGap="30px"
            paddingBlock="40px"
            paddingInline="20px"
            width="100%"
          >
            <VStack gap="20px" width="100%">
              <div style={{ width: '100%' }}>
                <TextP heading="Name" fw="400" fs="16px" lh="24px" />
                <Textbox2
                  w="100%"
                  h="48px"
                  ty="text"
                  ph="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div style={{ width: '100%' }}>
                <TextP heading="Email" fw="400" fs="16px" lh="24px" />
                <Textbox2
                  w="100%"
                  h="48px"
                  ty="email"
                  ph="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div style={{ width: '100%' }}>
                <TextP heading="Phone no." fw="400" fs="16px" lh="24px" />
                <Textbox2
                  w="100%"
                  h="48px"
                  ty="text"
                  ph="Phone no"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div style={{ width: '100%' }}>
                <TextP heading="Gender" fw="400" fs="16px" lh="24px" />
                <Textbox2
                  w="100%"
                  h="48px"
                  ty="text"
                  ph="Gender (e.g. Male/Female)"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                />
              </div>

              <div style={{ width: '100%' }}>
                <TextP heading="Batch Timing" fw="400" fs="16px" lh="24px" />
                <Textbox2
                  w="100%"
                  h="48px"
                  ty="text"
                  ph="Batch Timing (e.g. 6:00 AM TO 7:00 AM)"
                  value={batchTiming}
                  onChange={(e) => setBatchTiming(e.target.value)}
                />
              </div>

              <div style={{ width: '100%' }}>
                <TextP heading="Course Code" fw="400" fs="16px" lh="24px" />
                <Textbox2
                  w="100%"
                  h="48px"
                  ty="text"
                  ph="Course Code (e.g. PGDYT)"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                />
              </div>
            </VStack>

            <VStack gap="20px" width="100%">
              <div style={{ width: '100%' }}>
                <TextP heading="Address" fw="400" fs="16px" lh="24px" />
                <Textbox2
                  w="100%"
                  h="48px"
                  ty="text"
                  ph="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div style={{ width: '100%' }}>
                <TextP heading="City" fw="400" fs="16px" lh="24px" />
                <Textbox2
                  w="100%"
                  h="48px"
                  ty="text"
                  ph="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div style={{ width: '100%' }}>
                <TextP heading="Postal/Zip-Code" fw="400" fs="16px" lh="24px" />
                <Textbox2
                  w="100%"
                  h="48px"
                  ty="text"
                  ph="Postal/Zip-Code"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </div>
              <div style={{ width: '100%' }}>
                <TextP heading="Country" fw="400" fs="16px" lh="24px" />
                <Textbox2
                  w="100%"
                  h="48px"
                  ty="text"
                  ph="Country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>

              <div style={{ width: '100%' }}>
                <TextP heading="Fees Status" fw="400" fs="16px" lh="24px" />
                <Select
                  value={feesStatus}
                  onChange={(e) => setFeesStatus(e.target.value)}
                  h="48px"
                  borderRadius="5px"
                  border="0.6px solid #000000"
                  fontFamily="Poppins"
                  fontSize="14px"
                  bg="#FFFFFF"
                >
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                </Select>
              </div>

              <div style={{ width: '100%' }}>
                <TextP heading="Subscription" fw="400" fs="16px" lh="24px" />
                <Select
                  value={subscriptionType}
                  onChange={(e) => setSubscriptionType(e.target.value)}
                  h="48px"
                  borderRadius="5px"
                  border="0.6px solid #000000"
                  fontFamily="Poppins"
                  fontSize="14px"
                  bg="#FFFFFF"
                >
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Yearly">Yearly</option>
                </Select>
              </div>

              <HStack gap="20px" width="100%" justifyContent="flex-end" marginTop="10px">
                <Button2 type="button" name="Cancel" h="48px" w="130px" onClick={props.onSuccess} />
                <Button1 type="submit" name="Save" h="48px" w="130px" />
              </HStack>
            </VStack>
          </SimpleGrid>
        </Flex>
      </form>
    </>
  );
}

AddStud.propTypes = {
  onSuccess: PropTypes.func,
};

export default AddStud;
