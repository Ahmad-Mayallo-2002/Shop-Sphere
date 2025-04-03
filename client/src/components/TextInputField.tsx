import { Field, Input, Text } from "@chakra-ui/react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { MdError } from "react-icons/md";

type InputSettings = {
  label: string;
  name: string;
  type: string;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  placeholder: string;
  validateObject: Record<string, any>;
};

export default function TextInputField({
  label,
  name,
  type = "text",
  register,
  errors,
  placeholder,
  validateObject,
}: InputSettings) {
  return (
    <Field.Root>
      <Field.Label>{label}</Field.Label>
      <Input
        type={type}
        {...register(name, validateObject)}
        placeholder={placeholder}
      />
      <Field.ErrorText>Hadasd</Field.ErrorText>
      {errors[name] && (
        <Text color="red" display="flex" alignItems="center" gapX={1}>
          <MdError />
          {errors[name]?.message as string | undefined}
        </Text>
      )}
    </Field.Root>
  );
}
