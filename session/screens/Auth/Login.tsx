import React from "react";
import {
  Button,
  Stack,
  FormErrorMessage,
  FormControl,
  FormLabel,
  Box,
  Text,
  Flex,
  useToast,
  Input,
  Avatar,
} from "@chakra-ui/core";
import {useForm} from "react-hook-form";

import api from "../../api/client";

interface FormData {
  email: string;
  password: string;
}

interface Props {
  navigate: (route: string) => void;
}

const LoginScreen: React.FC<Props> = ({navigate}) => {
  const [isLoading, setLoading] = React.useState(false);
  const toast = useToast();
  const {handleSubmit, errors, register} = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit({email, password}: FormData) {
    setLoading(true);

    api
      .signIn(email, password)
      .catch(() =>
        toast({
          title: "oops",
          description: "No se pudo iniciar sesion",
          status: "error",
        }),
      )
      .then(() => setLoading(false));
  }

  return (
    <Flex alignItems="center" direction="column" width="100%">
      <Avatar height={24} marginBottom={6} marginTop={-16} src="./logo.jpg" width={24} />
      <Box as="form" width="100%" onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={6}>
          <FormControl isInvalid={Boolean(errors.email)}>
            <FormLabel fontSize="sm" htmlFor="email">
              Email
            </FormLabel>
            <Input
              ref={register({required: true})}
              autoFocus
              fontSize="md"
              name="email"
              placeholder="tuemail@email.com"
              size="lg"
              tabIndex={1}
            />
            <FormErrorMessage>
              {(errors.email && errors.email.message) || "Este campo es requerido"}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={Boolean(errors.password)}>
            <FormLabel
              display="flex"
              flex={1}
              htmlFor="password"
              justifyContent="space-between"
              paddingX={0}
            >
              <Text fontSize="sm">Contraseña</Text>
              <Button
                _hover={{textDecoration: "none"}}
                fontSize="sm"
                fontWeight={500}
                tabIndex={4}
                variant="link"
                variantColor="primary"
                onClick={() => navigate("reset")}
              >
                Recuperar contraseña
              </Button>
            </FormLabel>
            <Input
              ref={register({required: true})}
              fontSize="md"
              name="password"
              placeholder="********"
              size="lg"
              tabIndex={2}
              type="password"
            />
            <FormErrorMessage>
              {(errors.password && errors.password.message) || "Este campo es requerido"}
            </FormErrorMessage>
          </FormControl>
          <Button
            fontSize="md"
            isLoading={isLoading}
            size="lg"
            tabIndex={3}
            type="submit"
            variantColor="primary"
          >
            Iniciar sesión
          </Button>
        </Stack>
      </Box>
    </Flex>
  );
};

export default LoginScreen;
