import { mainEndPoint } from "@/assets/data/links";
import { errorToaster, successToaster } from "@/assets/utils/toasters";
import TextInputField from "@/components/TextInputField";
import { Button, Center, VStack } from "@chakra-ui/react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type Email = { email: string };

export default function SendOTP() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Email>();
  const navigate = useNavigate();
  const onSubmit = async (email: Email) => {
    try {
      const { data } = await axios.post(mainEndPoint + "api/send-otp", email, {
        withCredentials: true,
      });
      successToaster(data.msg);
      navigate("/write-otp");
    } catch (err: any) {
      errorToaster(err.response.data.msg);
    }
  };
  return (
    <Center as="section" id="send-otp" py={12} px={6}>
      <form
        className="auth-form"
        onSubmit={handleSubmit(onSubmit)}
        style={{ width: "100%", maxWidth: "650px" }}
      >
        <VStack gap={6}>
          {/* Email */}
          <TextInputField
            label={"Email Address"}
            name={"email"}
            type={""}
            register={register}
            errors={errors}
            placeholder={"Write Email Address"}
            validateObject={{
              required: "Email is Required",
              pattern: {
                value: /^[A-Za-z]+[0-9]+@gmail\.com$/,
                message: "Email must end with number",
              },
            }}
          />
          <Button
            loading={isSubmitting}
            loadingText="Loading..."
            w="full"
            className="main-button"
            type="submit"
          >
            Send OTP
          </Button>
        </VStack>
      </form>
    </Center>
  );
}
