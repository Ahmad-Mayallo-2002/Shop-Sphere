import { errorToaster, successToaster } from "@/assets/utils/toasters";
import {
  Button,
  Center,
  Field,
  Group,
  PinInput,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { MdError } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export default function WriteOTP() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<{ OTP: string }>();
  const digits = [0, 1, 2, 3, 4, 5];
  const cookies = new Cookies();
  const { Root, HiddenInput, Input } = PinInput;
  const navigate = useNavigate();
  const onSubmit = async (otp: { OTP: string }) => {
    const otpSented = cookies.get("otp");
    if (otp.OTP !== otpSented.toString()) {
      errorToaster("OTP is Incorrect");
      return;
    }
    successToaster("OTP is Correct");
    navigate("/update-password");
    cookies.remove("email");
    cookies.remove("otp");
  };
  return (
    <Center py={12} px={6} as="section" id="write-otp">
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        <VStack gap={6}>
          <Field.Root>
            <Field.Label>OTP</Field.Label>
            <Root {...register("OTP", { required: "OTP is Required" })}>
              <HiddenInput />
              <Group attached gap={0}>
                {digits.map((digit) => (
                  <Input key={digit} index={digit} w="100%" />
                ))}
              </Group>
              {errors.OTP && (
                <Text
                  mt={2}
                  gap={2}
                  color="red"
                  display="flex"
                  alignItems="center"
                >
                  <MdError />
                  {errors.OTP?.message}
                </Text>
              )}
            </Root>
          </Field.Root>
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
