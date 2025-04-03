import { mainEndPoint } from "@/assets/data/links";
import { errorToaster } from "@/assets/utils/toasters";
import { UseLoggedContext } from "@/components/contextApi/loggedContext";
import TextInputField from "@/components/TextInputField";
import { Button, Center, Link, Text, VStack } from "@chakra-ui/react";
import axios from "axios";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type User = {
  email: string;
  password: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<User>();
  const navigate = useNavigate();
  const { setLogged } = useContext(UseLoggedContext);
  const onSubmit = async (user: User) => {
    try {
      await axios.post(mainEndPoint + "api/login", user, {
        withCredentials: true,
      });
      setLogged(true);
      navigate("/");
    } catch (err: any) {
      console.log(err);
      errorToaster(err.response.data.msg);
    }
  };
  return (
    <Center as="section" id="login" py={12} px={6}>
      <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
        <VStack gapY={6}>
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
          <Text>
            You Don't have an account?{" "}
            <Link href="/sign-up" fontWeight={700} color="var(--mainColor)">
              Sign Up
            </Link>
          </Text>
          <Text>
            You Don't Remember your password?{" "}
            <Link href="/send-otp" fontWeight={700} color="var(--mainColor)">
              Remember Password
            </Link>
          </Text>
          <Button
            loading={isSubmitting}
            loadingText="Loading..."
            w="full"
            className="main-button"
            type="submit"
          >
            Login
          </Button>
        </VStack>
      </form>
    </Center>
  );
}
