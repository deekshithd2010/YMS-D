import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Flex, SimpleGrid, VStack, HStack, Select } from "@chakra-ui/react";
import Textbox2 from "./Textbox2";
import TextP from "./TextP";
import Button1 from "./Button1";
import Button2 from "./Button2";
import axios from "axios";

function AddTeacher(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [role, setRole] = useState("Session Teacher");
  const [roleDetails, setRoleDetails] = useState("");
  const [image, setImage] = useState("");

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
      role: role || null,
      role_details: roleDetails || null,
      image: image || null,
      social_links: "{}", // default empty JSON string
    };

    try {
      await axios.post("/ymsapi/teachers/", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Teacher added successfully!");
      if (props.onSuccess) {
        props.onSuccess();
      }
    } catch (error) {
      console.error(error);
      alert("Error adding teacher. Make sure email is valid and you have admin access.");
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
                <TextP heading="Role" fw="400" fs="16px" lh="24px" />
                <Select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  h="48px"
                  borderRadius="5px"
                  border="0.6px solid #000000"
                  fontFamily="Poppins"
                  fontSize="14px"
                  bg="#FFFFFF"
                >
                  <option value="Session Teacher">Session Teacher</option>
                  <option value="Course Teacher">Course Teacher</option>
                </Select>
              </div>

              <div style={{ width: '100%' }}>
                <TextP heading="Role Details" fw="400" fs="16px" lh="24px" />
                <Textbox2
                  w="100%"
                  h="48px"
                  ty="text"
                  ph="Role Details (e.g. Ashtanga Vinyasa, PGDYT)"
                  value={roleDetails}
                  onChange={(e) => setRoleDetails(e.target.value)}
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
                <TextP heading="Profile Photo URL" fw="400" fs="16px" lh="24px" />
                <Textbox2
                  w="100%"
                  h="48px"
                  ty="text"
                  ph="Photo URL (e.g. /images/Instructors/Photo.png)"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
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

AddTeacher.propTypes = {
  onSuccess: PropTypes.func,
};

export default AddTeacher;
