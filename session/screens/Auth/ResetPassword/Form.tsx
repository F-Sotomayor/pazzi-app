import React from "react";
import {
  Button,
  Stack,
  Text,
  FormErrorMessage,
  FormControl,
  Box,
  useToast,
  Input,
} from "@chakra-ui/core";
import {useForm} from "react-hook-form";

import api from "../../../api/client";

interface FormData {
  email: string;
}

interface Props {
  onSuccess: () => void;
  onBack: () => void;
}

const ResetPasswordForm: React.FC<Props> = ({onBack, onSuccess}) => {
  const [status, setStatus] = React.useState("resolved");
  const toast = useToast();
  const {handleSubmit, errors, register} = useForm<FormData>({
    defaultValues: {
      email: "",
    },
  });

  function onSubmit({email}: FormData) {
    setStatus("pending");

    api
      .resetPassword(email)
      .then(onSuccess)
      .catch(() => {
        toast({
          title: "Oops",
          description: "No se pudo reiniciar la contraseña",
          status: "error",
        });

        setStatus("rejected");
      });
  }

  return (
    <Box as="form" width="100%" onSubmit={handleSubmit(onSubmit)}>
      <Text fontSize="xl" fontWeight={500} marginBottom={4}>
        Reiniciar contraseña
      </Text>
      <Stack spacing={6}>
        <FormControl isInvalid={Boolean(errors.email)}>
          <Input
            ref={register({
              required: true,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Email invalido",
              },
            })}
            autoFocus
            fontSize="md"
            name="email"
            placeholder="tuemail@email.com"
            size="lg"
          />
          <FormErrorMessage>
            {(errors.email && errors.email.message) || "Este campo es requerido"}
          </FormErrorMessage>
        </FormControl>
        <Button
          fontSize="md"
          isLoading={status === "pending"}
          size="lg"
          type="submit"
          variantColor="primary"
        >
          Enviar instrucciones
        </Button>
        <Button
          _hover={{textDecoration: "none"}}
          fontSize="md"
          fontWeight={500}
          variant="link"
          variantColor="primary"
          onClick={onBack}
        >
          Volver atrás
        </Button>
      </Stack>
    </Box>
  );
};

export default ResetPasswordForm;
