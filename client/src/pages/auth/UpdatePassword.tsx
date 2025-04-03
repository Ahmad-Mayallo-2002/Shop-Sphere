import { mainEndPoint } from "@/assets/data/links";
import { errorToaster, successToaster } from "@/assets/utils/toasters";
import TextInputField from "@/components/TextInputField";
import { Button, Center, VStack } from "@chakra-ui/react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

type Password = {
  password: string;
  confirmPassword: string;
};

export default function UpdatePassword() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Password>();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const onSubmit = async (dataPassword: Password) => {
    try {
      const { data } = await axios.patch(mainEndPoint + "api/update-password", {
        password: dataPassword.password,
        email: cookies.get("email"),
      });
      successToaster(data.msg);
      navigate("/login");
    } catch (err: any) {
      errorToaster(err.response.data.msg);
    }
  };
  return (
    <Center py={12} px={6} as="section" id="update-password">
      <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
        <VStack gap={6}>
          {/* Password */}
          <TextInputField
            label={"Password"}
            name={"password"}
            type={"password"}
            register={register}
            errors={errors}
            placeholder={"Write Password"}
            validateObject={{
              required: "Password is Required",
              minLength: {
                value: 4,
                message: "Minimum Length is 4",
              },
              maxLength: {
                value: 20,
                message: "Maximum Length is 20",
              },
            }}
          />
          {/* Confirm Password */}
          <TextInputField
            label={"Confirm Password"}
            name={"confirmPassword"}
            type={"password"}
            register={register}
            errors={errors}
            placeholder={"Confirm Password"}
            validateObject={{
              required: "Confirm Password is Required",
              minLength: {
                value: 4,
                message: "Minimum Length is 4",
              },
              maxLength: {
                value: 20,
                message: "Maximum Length is 20",
              },
            }}
          />
          <Button
            w="full"
            type="submit"
            className="main-button"
            loading={isSubmitting}
            loadingText="Loading..."
          >
            Confirm
          </Button>
        </VStack>
      </form>
    </Center>
  );
}
