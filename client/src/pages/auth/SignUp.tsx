import { mainEndPoint } from "@/assets/data/links";
import { errorToaster, successToaster } from "@/assets/utils/toasters";
import TextInputField from "@/components/TextInputField";
import {
  Button,
  Center,
  Field,
  HStack,
  Link,
  RadioGroup,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdError } from "react-icons/md";
import { useNavigate } from "react-router-dom";

type User = {
  email: string;
  username: string;
  password: string;
  role: string;
  shopName?: string;
  shopDescription?: string;
  phone: string;
  country: string;
};

const items = [
  { label: "User", value: "user" },
  { label: "Vendor", value: "vendor" },
];

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<User>();
  const [role, setRole] = useState<string>("user");
  const { Root, ItemText, ItemHiddenInput, Item, ItemIndicator } = RadioGroup;
  const navigate = useNavigate();
  const onSubmit = async (user: User) => {
    try {
      const { data } = await axios.post(mainEndPoint + "api/register", user);
      successToaster(data.msg);
      navigate("/login");
    } catch (err: any) {
      errorToaster(err.response.data.msg);
    }
  };
  return (
    <Center as="section" id="sign-up" py={12} px={6}>
      <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
        <VStack gapY={6}>
          {/* Username */}
          <TextInputField
            label={"Username"}
            name={"username"}
            type={""}
            register={register}
            errors={errors}
            placeholder={"Write Your Name"}
            validateObject={{ required: "Username is Required" }}
          />

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

          {/* Phone */}
          <TextInputField
            label={"Phone Number"}
            name={"phone"}
            type={"text"}
            register={register}
            errors={errors}
            placeholder={"Write Password"}
            validateObject={{
              required: "Phone Number is Required",
            }}
          />

          {/* Country */}
          <TextInputField
            label={"Country"}
            name={"country"}
            type={"text"}
            register={register}
            errors={errors}
            placeholder={"Write Your Country"}
            validateObject={{
              required: "Country is Required",
            }}
          />

          {/* Role */}
          <Root
            onValueChange={(event) => setRole(event.value)}
            defaultValue="user"
            w="100%"
          >
            <HStack gap={4}>
              {items.map((item) => (
                <Item cursor="pointer" key={item.label} value={item.value}>
                  <ItemHiddenInput />
                  <ItemIndicator />
                  <ItemText>{item.label}</ItemText>
                </Item>
              ))}
            </HStack>
          </Root>

          {/* Shop Name */}
          {role === "vendor" && (
            <TextInputField
              label={"Shop Name"}
              name={"shopName"}
              type={"text"}
              register={register}
              errors={errors}
              placeholder={"Write Your Shop Name"}
              validateObject={{ required: "Shop Name is Required" }}
            />
          )}

          {/* Shop Description */}
          {role === "vendor" && (
            <Field.Root>
              <Field.Label>Shop Description</Field.Label>
              <Textarea
                resize="none"
                h="150px"
                {...register("shopDescription", {
                  required: "Shop Description is Required",
                })}
                placeholder={"Write Your Shop Description"}
              />
              <Field.ErrorText>Hadasd</Field.ErrorText>
              {errors.shopDescription && (
                <Text color="red" display="flex" alignItems="center" gapX={1}>
                  <MdError />
                  {errors.shopDescription?.message}
                </Text>
              )}
            </Field.Root>
          )}

          <Text>
            You Already have an account?{" "}
            <Link href="/login" fontWeight={700} color="var(--mainColor)">
              Login
            </Link>
          </Text>

          <Button
            loading={isSubmitting}
            loadingText="Loading..."
            w="full"
            className="main-button"
            type="submit"
          >
            Sign Up
          </Button>
        </VStack>
      </form>
    </Center>
  );
}
