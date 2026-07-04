import React, { useState } from "react";
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton,
  Button, VStack, HStack, Text, Box, Input, SimpleGrid, useToast, Spinner, Divider
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import axios from "axios";

function PaymentModal({ isOpen, onClose, registrationType, registrationId, amount, onPaymentSuccess }) {
  const [step, setStep] = useState("method"); // method -> details -> processing -> success
  const [method, setMethod] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [upiId, setUpiId] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSelectMethod = (selected) => {
    setMethod(selected);
    setStep("details");
  };

  const handlePay = async () => {
    if (method === "card" && (!cardNumber || !cardExpiry || !cardCvv)) {
      toast({ title: "Please fill in all card details", status: "warning", duration: 3000 });
      return;
    }
    if (method === "upi" && !upiId) {
      toast({ title: "Please enter your UPI ID", status: "warning", duration: 3000 });
      return;
    }

    setStep("processing");
    setLoading(true);

    try {
      // 1. Create Order
      const orderRes = await axios.post("/ymsapi/payments/create-order/", {
        registration_type: registrationType,
        registration_id: registrationId,
        amount: amount,
        currency: "INR"
      });

      const orderId = orderRes.data.razorpay_order_id;

      // Simulate a small delay for verification
      setTimeout(async () => {
        try {
          // 2. Verify payment (mock Razorpay feedback)
          const mockPaymentId = `pay_${Math.random().toString(36).substr(2, 9)}`;
          const mockSignature = `sig_${Math.random().toString(36).substr(2, 15)}`;

          await axios.post("/ymsapi/payments/verify/", {
            razorpay_order_id: orderId,
            razorpay_payment_id: mockPaymentId,
            razorpay_signature: mockSignature
          });

          setStep("success");
          toast({
            title: "Payment Successful",
            description: "Your enrollment is now complete and confirmed.",
            status: "success",
            duration: 3000,
            isClosable: true
          });
          
          if (onPaymentSuccess) {
            onPaymentSuccess();
          }
        } catch (err) {
          toast({ title: "Verification failed", status: "error", duration: 3000 });
          setStep("method");
        } finally {
          setLoading(false);
        }
      }, 2000);

    } catch (err) {
      toast({ title: "Payment initialization failed", status: "error", duration: 3000 });
      setStep("method");
      setLoading(false);
    }
  };

  const resetAndClose = () => {
    setStep("method");
    setMethod("");
    setCardNumber("");
    setCardExpiry("");
    setCardCvv("");
    setUpiId("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={resetAndClose} isCentered closeOnOverlayClick={false}>
      <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(5px)" />
      <ModalContent borderRadius="12px" overflow="hidden" boxShadow="xl">
        <ModalHeader bg="#285430" color="white" fontFamily="Cinzel" fontSize="20px" fontWeight="700">
          YMS Payment Gateway
        </ModalHeader>
        {!loading && step !== "success" && <ModalCloseButton color="white" />}
        <ModalBody p="24px" bg="#F6F6F6">
          <VStack gap="20px" align="stretch">
            {/* Amount Banner */}
            <Box bg="#CEEDC7" p="16px" borderRadius="8px" border="1px solid #285430" textAlign="center">
              <Text fontFamily="Poppins" fontSize="14px" fontWeight="500" color="#285430">AMOUNT TO PAY</Text>
              <Text fontFamily="Poppins" fontSize="28px" fontWeight="700" color="#285430">₹{amount.toLocaleString()}</Text>
            </Box>

            {step === "method" && (
              <VStack gap="12px">
                <Text fontFamily="Poppins" fontSize="15px" fontWeight="600" color="#333" w="100%">Select Payment Method</Text>
                
                <Box w="100%" p="16px" bg="white" borderRadius="8px" border="1px solid #E2E8F0" cursor="pointer"
                  _hover={{ borderColor: "#285430", bg: "#F9F9F9" }} onClick={() => handleSelectMethod("card")}>
                  <HStack justify="space-between">
                    <Text fontFamily="Poppins" fontWeight="600" fontSize="15px">Credit / Debit Card</Text>
                    <Text fontSize="12px" color="#999">Visa, Mastercard, RuPay</Text>
                  </HStack>
                </Box>

                <Box w="100%" p="16px" bg="white" borderRadius="8px" border="1px solid #E2E8F0" cursor="pointer"
                  _hover={{ borderColor: "#285430", bg: "#F9F9F9" }} onClick={() => handleSelectMethod("upi")}>
                  <HStack justify="space-between">
                    <Text fontFamily="Poppins" fontWeight="600" fontSize="15px">UPI / GPay / PhonePe</Text>
                    <Text fontSize="12px" color="#999">Instant transfer</Text>
                  </HStack>
                </Box>

                <Box w="100%" p="16px" bg="white" borderRadius="8px" border="1px solid #E2E8F0" cursor="pointer"
                  _hover={{ borderColor: "#285430", bg: "#F9F9F9" }} onClick={() => handleSelectMethod("netbanking")}>
                  <HStack justify="space-between">
                    <Text fontFamily="Poppins" fontWeight="600" fontSize="15px">Net Banking</Text>
                    <Text fontSize="12px" color="#999">Popular Indian banks</Text>
                  </HStack>
                </Box>
              </VStack>
            )}

            {step === "details" && method === "card" && (
              <VStack gap="16px">
                <HStack justify="space-between" w="100%">
                  <Text fontFamily="Poppins" fontSize="15px" fontWeight="600">Card Details</Text>
                  <Button size="xs" variant="link" color="#285430" onClick={() => setStep("method")}>Change</Button>
                </HStack>
                
                <Box w="100%">
                  <Text fontFamily="Poppins" fontSize="13px" fontWeight="500" mb="4px">Card Number</Text>
                  <Input value={cardNumber} onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, "").slice(0, 16))}
                    placeholder="1234 5678 1234 5678" fontFamily="Poppins" bg="white" />
                </Box>

                <SimpleGrid columns={2} gap="12px" w="100%">
                  <Box>
                    <Text fontFamily="Poppins" fontSize="13px" fontWeight="500" mb="4px">Expiry Date</Text>
                    <Input value={cardExpiry} onChange={(e) => setCardExpiry(e.target.value.slice(0, 5))}
                      placeholder="MM/YY" fontFamily="Poppins" bg="white" />
                  </Box>
                  <Box>
                    <Text fontFamily="Poppins" fontSize="13px" fontWeight="500" mb="4px">CVV</Text>
                    <Input type="password" value={cardCvv} onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                      placeholder="123" fontFamily="Poppins" bg="white" />
                  </Box>
                </SimpleGrid>

                <Button w="100%" bg="#285430" color="white" _hover={{ bg: "#CEEDC7", color: "#000" }} onClick={handlePay} mt="10px">
                  Pay Now
                </Button>
              </VStack>
            )}

            {step === "details" && method === "upi" && (
              <VStack gap="16px">
                <HStack justify="space-between" w="100%">
                  <Text fontFamily="Poppins" fontSize="15px" fontWeight="600">UPI Payment</Text>
                  <Button size="xs" variant="link" color="#285430" onClick={() => setStep("method")}>Change</Button>
                </HStack>
                
                <Box w="100%">
                  <Text fontFamily="Poppins" fontSize="13px" fontWeight="500" mb="4px">Virtual Payment Address (UPI ID)</Text>
                  <Input value={upiId} onChange={(e) => setUpiId(e.target.value)}
                    placeholder="username@upi" fontFamily="Poppins" bg="white" />
                </Box>

                <Button w="100%" bg="#285430" color="white" _hover={{ bg: "#CEEDC7", color: "#000" }} onClick={handlePay} mt="10px">
                  Verify & Pay
                </Button>
              </VStack>
            )}

            {step === "details" && method === "netbanking" && (
              <VStack gap="16px">
                <HStack justify="space-between" w="100%">
                  <Text fontFamily="Poppins" fontSize="15px" fontWeight="600">Net Banking</Text>
                  <Button size="xs" variant="link" color="#285430" onClick={() => setStep("method")}>Change</Button>
                </HStack>
                <Text fontFamily="Poppins" fontSize="13px" color="#666">Simulated netbanking transfer. Click "Pay" to proceed directly to simulation.</Text>
                <Button w="100%" bg="#285430" color="white" _hover={{ bg: "#CEEDC7", color: "#000" }} onClick={handlePay} mt="10px">
                  Proceed to Bank
                </Button>
              </VStack>
            )}

            {step === "processing" && (
              <VStack gap="16px" py="30px" align="center">
                <Spinner size="xl" color="#285430" thickness="4px" />
                <Text fontFamily="Poppins" fontSize="16px" fontWeight="600">Processing Transaction...</Text>
                <Text fontFamily="Poppins" fontSize="13px" color="#999">Please do not refresh or close this window.</Text>
              </VStack>
            )}

            {step === "success" && (
              <VStack gap="16px" py="20px" align="center">
                <CheckCircleIcon color="green.500" boxSize="50px" />
                <Text fontFamily="Poppins" fontSize="18px" fontWeight="700" color="#285430">Payment Confirmed</Text>
                <Text fontFamily="Poppins" fontSize="13px" color="#666" textAlign="center">
                  Registration completed successfully. You can view your slot/course in your profile page.
                </Text>
                <Button w="100%" bg="#285430" color="white" _hover={{ bg: "#CEEDC7", color: "#000" }} onClick={resetAndClose}>
                  Done
                </Button>
              </VStack>
            )}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default PaymentModal;
