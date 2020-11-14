import React from "react";
import {Stack, Text} from "@chakra-ui/core";

const ResetPasswordSuccess: React.FC = () => {
  return (
    <Stack spacing={3} width="100%">
      <Text fontSize="xl" fontWeight={500}>
        Bien!
      </Text>
      <Text color="gray.500">Te enviamos un mail con todas las instrucciones</Text>
    </Stack>
  );
};

export default ResetPasswordSuccess;
