import {
  Box,
  Button,
  Field,
  Image,
  Input,
  SimpleGrid,
  Text,
  Textarea,
} from "@chakra-ui/react";
import TextInputField from "../TextInputField";
import { useForm } from "react-hook-form";
import { Product } from "@/assets/data/types";
import { MdError } from "react-icons/md";
import { useState } from "react";
import { errorToaster, successToaster } from "@/assets/utils/toasters";
import axios from "axios";
import { mainEndPoint } from "@/assets/data/links";
import { getToken } from "@/assets/utils/getToken";
import { FaX } from "react-icons/fa6";

type FormSettings = {
  isRequired: boolean;
  endPoint: string;
  method: string;
};

export default function ProductForm({
  isRequired,
  endPoint,
  method,
}: FormSettings) {
  const { token, _id } = getToken();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Product>();
  const [image, setImage] = useState("");

  const onSubmit = async (_productData: Product, event: any) => {
    try {
      const form = new FormData(event.target);
      let response;
      if (method === "post") {
        response = await axios.post(mainEndPoint + endPoint, form, {
          headers: {
            Authorization: `Bearer ${token}`,
            id: _id,
          },
        });
      }
      if (method === "patch") {
        response = await axios.patch(mainEndPoint + endPoint, form, {
          headers: {
            Authorization: `Bearer ${token}`,
            id: _id,
          },
        });
      }
      successToaster(response?.data.msg);
    } catch (error: any) {
      errorToaster(error.response?.data?.msg || "Something went wrong");
      console.log(error);
    }
  };

  const handleChange = (event: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => setImage(String(reader.result));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="add-product">
      <SimpleGrid gap={4} columns={{ base: 1, md: 2 }}>
        {/* Image Upload */}
        <Box className="product-image" gridColumn="1/-1">
          {image ? (
            <div style={{ position: "relative" }}>
              <Image h="250px" src={image} alt="Product Image" w="full" />
              <Button
                size="xs"
                rounded="full"
                p="0"
                w="40px"
                h="40px"
                bgColor="var(--mainColor)"
                _hover={{ bgColor: "var(--mainColorHover)" }}
                _active={{ bgColor: "var(--mainColorHoverActive)" }}
                color="#fff"
                pos="absolute"
                top={2}
                left={2}
                zIndex={500}
                onClick={() => setImage("")}
              >
                <FaX />
              </Button>
            </div>
          ) : (
            <label htmlFor="image" className="product-image-label">
              <span>Upload Image</span>
            </label>
          )}
          <Input
            id="image"
            hidden
            type="file"
            {...register("image", {
              required: {
                value: isRequired,
                message: "Product Image is required",
              },
              onChange: handleChange,
            })}
          />
        </Box>

        <TextInputField
          label="Product Name"
          name="name"
          type="text"
          register={register}
          errors={errors}
          placeholder="Enter product name"
          validateObject={{
            required: isRequired && "Product name is required",
          }}
        />

        <TextInputField
          label="Price"
          name="price"
          type="text"
          register={register}
          errors={errors}
          placeholder="Enter price"
          validateObject={{
            required: isRequired && "Price is required",
            min: { value: 0, message: "Price must be non-negative" },
          }}
        />

        <TextInputField
          label="Discount (%)"
          name="discount"
          type="text"
          register={register}
          errors={errors}
          placeholder="Enter discount (optional)"
          validateObject={{
            min: { value: 0, message: "Discount must be non-negative" },
          }}
        />

        <TextInputField
          label="Category"
          name="category"
          type="text"
          register={register}
          errors={errors}
          placeholder="Enter category"
          validateObject={{
            required: isRequired && "Category is required",
          }}
        />

        <TextInputField
          label="Stock"
          name="stock"
          type="text"
          register={register}
          errors={errors}
          placeholder="Enter available stock"
          validateObject={{
            required: isRequired && "Stock is required",
            min: { value: 0, message: "Stock must be at least 0" },
          }}
        />

        <TextInputField
          label="Brand Name"
          name="brandName"
          type="text"
          register={register}
          errors={errors}
          placeholder="Enter brand name"
          validateObject={{
            required: isRequired && "Brand name is required",
          }}
        />

        <Field.Root gridColumn={"1/-1"}>
          <Field.Label>Product Description</Field.Label>
          <Textarea
            height={150}
            resize="none"
            placeholder="Enter Product Description"
            {...register("description", {
              required: isRequired && "Product Description is required",
            })}
          />
          {errors.description && (
            <Text color="red" display="flex" alignItems="center" gapX={1}>
              <MdError />
              {errors.description.message}
            </Text>
          )}
        </Field.Root>

        <Button
          loading={isSubmitting}
          loadingText="Submitting..."
          gridColumn={"1/-1"}
          w="full"
          type="submit"
          className="main-button"
        >
          Submit
        </Button>
      </SimpleGrid>
    </form>
  );
}
