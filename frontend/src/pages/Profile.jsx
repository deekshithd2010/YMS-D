import React, { useState, useEffect } from "react";
import TextP from "../components/TextP";
import Textbox2 from "../components/Textbox2";
import Button1 from "../components/Button1";
import Button2 from "../components/Button2";
import Check from "../components/Check";
import {
  HStack,
  Flex,
  SimpleGrid,
  VStack,
  Box,
  Spacer,
  useToast,
} from "@chakra-ui/react";
import Pic from "../components/Pic";
import Yogaprofile from "./Yogaprofile";
import TextC from "../components/TextC";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState(""); // "Male" or "Female"
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  
  // Registration lists for Yogaprofile
  const [sessions, setSessions] = useState([]);
  const [courses, setCourses] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token") || localStorage.getItem("accessToken");
  const toast = useToast();

  useEffect(() => {
    if (!token) {
      toast({
        title: "Authentication Required",
        description: "Please login to view your profile.",
        status: "warning",
        duration: 3000,
        isClosable: true
      });
      navigate("/Login");
      return;
    }
    fetchProfileData();
    fetchEnrollmentData();
  }, [token]);

  const fetchProfileData = async () => {
    try {
      const response = await axios.get("/ymsapi/profile/", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = response.data;
      setName(data.name || "");
      setEmail(data.email || "");
      setDob(data.dob || "");
      setGender(data.gender || "");
      setAddress(data.address || "");
      setPincode(data.pincode || "");
      setCity(data.city || "");
      setState(data.state || "");
    } catch (error) {
      console.error(error);
      if (error.response?.status === 401) {
        localStorage.clear();
        navigate("/Login");
      }
    }
  };

  const fetchEnrollmentData = async () => {
    try {
      const response = await axios.get("/ymsapi/yoga-profile/", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSessions(response.data.sessions || []);
      setCourses(response.data.courses || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGenderChange = (selectedGender) => {
    if (!isEditing) return;
    setGender(selectedGender);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        "/ymsapi/profile/",
        {
          name,
          email,
          dob,
          gender,
          address,
          pincode,
          city,
          state
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      toast({
        title: "Profile Updated",
        description: "Your profile details have been saved.",
        status: "success",
        duration: 3000,
        isClosable: true
      });
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      toast({
        title: "Update Failed",
        description: "Error saving profile details. Please try again.",
        status: "error",
        duration: 4000,
        isClosable: true
      });
    }
  };

  return (
    <>
      <TextC
        heading="PERSONAL PROFILE"
        fs={{ base: 24, sm: 28, lg: 48 }}
        lh="65px"
        fw={{ base: 700, lg: 500 }}
        al="center"
        pt="30px"
      />
      <Flex w="100%" h="100%" bg="#F6F6F6">
        <Box
          justifyItems="center"
          bg="#FFFFFF"
          width={{ base: "400px", sm: "1000px", lg: "1500px" }}
          border={{ base: "none", sm: "0.6px solid #000000" }}
          borderRadius="10px"
          boxSizing="border-box"
          marginBottom="80px"
          marginInline={{ base: "0px", sm: "150px", lg: "200px" }}
          padding="20px"
        >
          <SimpleGrid
            justifyItems="center"
            columns={{ base: 1, sm: 1, lg: 3 }}
            columnGap="90px"
            rowGap="30px"
            paddingBlock={{ base: "30px", sm: "50px" }}
            paddingInline={{ base: "30px", sm: "65px" }}
            width="100%"
          >
            <Pic
              w="130px"
              h="130px"
              src="\images\profile.jpg"
              br="100%"
            />

            <VStack gap="10px" width="100%">
              <div style={{ width: '100%' }}>
                <TextP heading="Name" fw="400" fs="16px" lh="24px" />
                <Textbox2
                  w="100%"
                  h="48px"
                  ty="text"
                  ph="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div style={{ width: '100%' }}>
                <TextP heading="Email" fw="400" fs="16px" lh="24px" />
                <Textbox2
                  w="100%"
                  h="48px"
                  ty="text"
                  ph="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div style={{ width: '100%' }}>
                <TextP heading="DOB" fw="400" fs="16px" lh="24px" />
                <Textbox2
                  w="100%"
                  h="48px"
                  ty="text"
                  ph="DOB"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <Box justifyContent="left" w="100%">
                <TextP
                  heading="Gender"
                  fw="400"
                  fs="16px"
                  lh="24px"
                  al="left"
                />
                <HStack align="left" gap="20px">
                  <Check
                    cs="green"
                    title="Male"
                    isChecked={gender === "Male"}
                    onChange={() => handleGenderChange("Male")}
                    disabled={!isEditing}
                  />
                  <Check
                    cs="green"
                    title="Female"
                    isChecked={gender === "Female"}
                    onChange={() => handleGenderChange("Female")}
                    disabled={!isEditing}
                  />
                </HStack>
              </Box>
              <div style={{ width: '100%' }}>
                <TextP heading="Address" fw="400" fs="16px" lh="24px" />
                <Textbox2
                  w="100%"
                  h="48px"
                  ty="text"
                  ph="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div style={{ width: '100%' }}>
                <TextP heading="Pincode" fw="400" fs="16px" lh="24px" />
                <Textbox2
                  w="100%"
                  h="48px"
                  ty="text"
                  ph="Pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </VStack>
            
            <VStack gap="10px" width="100%">
              <div style={{ width: '100%' }}>
                <TextP heading="City" fw="400" fs="16px" lh="24px" />
                <Textbox2
                  w="100%"
                  h="48px"
                  ty="text"
                  ph="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div style={{ width: '100%' }}>
                <TextP heading="State" fw="400" fs="16px" lh="24px" />
                <Textbox2
                  w="100%"
                  h="48px"
                  ty="text"
                  ph="State"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <Spacer />
            </VStack>
          </SimpleGrid>

          <HStack
            gap="30px"
            paddingBottom="30px"
            paddingInline="45px"
            justifyContent="end"
          >
            {isEditing ? (
              <>
                <Button2 name="Cancel" h="48px" w="130px" onClick={() => { setIsEditing(false); fetchProfileData(); }} />
                <Button1 name="Save" h="48px" w="130px" onClick={handleSave} />
              </>
            ) : (
              <Button1 name="Edit" h="48px" w="130px" onClick={() => setIsEditing(true)} />
            )}
          </HStack>
        </Box>
      </Flex>
      
      <TextC
        heading="YOGA PROFILE"
        fs={{ base: 24, sm: 28, lg: 48 }}
        lh="65px"
        fw={{ base: 700, lg: 500 }}
        al="center"
        pt="30px"
      />
      <Yogaprofile userName={name} sessions={sessions} courses={courses} />
    </>
  );
}

export default Profile;
