import React, { useState } from "react";
import PropTypes from "prop-types";
import TextP from "./TextP";
import { Box, Flex, HStack, SimpleGrid, VStack, useToast } from "@chakra-ui/react";
import TC1 from "./TC1";
import Textbox2 from "./Textbox2";
import Check from "./Check";
import Button1 from "./Button1";
import Button2 from "./Button2";
import axios from "axios";
import PaymentModal from "./PaymentModal";

function YCform(props) {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState(""); // "Male" or "Female"
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  // Payment states
  const [showPayment, setShowPayment] = useState(false);
  const [regId, setRegId] = useState(null);
  const toast = useToast();

  const handleGenderChange = (selectedGender) => {
    setGender(selectedGender);
  };

  const handleClear = () => {
    setName("");
    setDob("");
    setEmail("");
    setPhone("");
    setGender("");
    setAddress("");
    setCity("");
    setPostalCode("");
    setCountry("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !props.course || !props.coursename) {
      toast({ title: "Validation Error", description: "Name, Email, Course Code, and Course Name are required.", status: "warning", duration: 3000, isClosable: true });
      return;
    }

    const payload = {
      name,
      date_of_birth: dob || null,
      email,
      phone: phone || null,
      gender: gender || null,
      address: address || null,
      city: city || null,
      postal_zip_code: postalCode || null,
      country: country || null,
      course_code: props.course,
      course_name: props.coursename,
    };

    const headers = {};
    const token = localStorage.getItem("token") || localStorage.getItem("accessToken");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    try {
      const response = await axios.post("/ymsapi/course-registration/", payload, { headers });
      setRegId(response.data.id);
      setShowPayment(true);
    } catch (error) {
      console.error(error);
      toast({
        title: "Registration Failed",
        description: error.response?.data?.detail || "Something went wrong. Please try again.",
        status: "error",
        duration: 4000,
        isClosable: true
      });
    }
  };

  return (
    <>
      <VStack gap="35px" marginBottom="50px">
        <Flex w="100%" h="100%" bg="#285430" justifyContent="center">
          <VStack marginBlock={{ base: 100, sm: 180, lg: "105px" }} gap="5px">
            <TC1
              heading={props.coursename}
              fs={{ base: 28, sm: 32, lg: 32 }}
              lh={{ base: "32px", sm: "43px", lg: "24px" }}
              c="#FFFFFF"
              al="center"
              fw="700"
            />
            <TC1
              heading={props.course}
              fs={{ base: 28, sm: 32, lg: 32 }}
              lh="28px"
              c="#FFFFFF"
              al="center"
              fw="700"
            />
          </VStack>
        </Flex>

        <form onSubmit={handleSubmit}>
          <SimpleGrid
            justifyItems="center"
            columns={{ base: 1, sm: 2 }}
            columnGap="90px"
            rowGap="30px"
            boxShadow="0px 4px 64px rgba(0, 0, 0, 0.05)"
            border={{ base: "none", lg: "0.6px solid #000000" }}
            borderRadius="10px"
            boxSizing="border-box"
            paddingBlock={{ base: "30px", sm: "50px" }}
            paddingInline={{ base: "30px", sm: "65px" }}
          >
            <VStack gap="30px">
              <div>
                <TextP heading="Name" fw="400" fs="16px" lh="24px" />
                <Textbox2
                  w="300px"
                  h="48px"
                  ty="text"
                  ph="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <TextP heading="Date of Birth" fw="400" fs="16px" lh="24px" />
                <Textbox2
                  w="300px"
                  h="48px"
                  ty="date"
                  ph="Date of Birth"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
              </div>

              <div>
                <TextP heading="Email" fw="400" fs="16px" lh="24px" />
                <Textbox2
                  w="300px"
                  h="48px"
                  ty="email"
                  ph="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <TextP heading="Phone no." fw="400" fs="16px" lh="24px" />
                <Textbox2
                  w="300px"
                  h="48px"
                  ty="text"
                  ph="Phone no"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <Box justifyContent="left" w="100%">
                <TextP heading="Gender" fw="400" fs="16px" lh="24px" al="left" />
                <VStack align="left">
                  <Check
                    cs="green"
                    title="Male"
                    isChecked={gender === "Male"}
                    onChange={() => handleGenderChange("Male")}
                  />
                  <Check
                    cs="green"
                    title="Female"
                    isChecked={gender === "Female"}
                    onChange={() => handleGenderChange("Female")}
                  />
                </VStack>
              </Box>
            </VStack>
            <VStack gap="35px">
              <div>
                <TextP heading="Address" fw="400" fs="16px" lh="24px" />
                <Textbox2
                  w="300px"
                  h="48px"
                  ty="text"
                  ph="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div>
                <TextP heading="City" fw="400" fs="16px" lh="24px" />
                <Textbox2
                  w="300px"
                  h="48px"
                  ty="text"
                  ph="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div>
                <TextP heading="Postal/Zip-Code" fw="400" fs="16px" lh="24px" />
                <Textbox2
                  w="300px"
                  h="48px"
                  ty="text"
                  ph="Postal/Zip-Code"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </div>
              <div>
                <TextP heading="Country" fw="400" fs="16px" lh="24px" />
                <Textbox2
                  w="300px"
                  h="48px"
                  ty="text"
                  ph="Country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
              <HStack gap="40px">
                <Button1 type="submit" name="Submit" h="48px" w="130px" />
                <Button2 type="button" name="Clear" h="48px" w="130px" onClick={handleClear} />
              </HStack>
            </VStack>
          </SimpleGrid>
        </form>
      </VStack>
      {showPayment && (
        <PaymentModal
          isOpen={showPayment}
          onClose={() => setShowPayment(false)}
          registrationType="course"
          registrationId={regId}
          amount={8500} // Course registration price
          onPaymentSuccess={() => {
            handleClear();
            setShowPayment(false);
          }}
        />
      )}
    </>
  );
}

YCform.propTypes = {
  course: PropTypes.string.isRequired,
  coursename: PropTypes.string.isRequired,
};

export default YCform;
