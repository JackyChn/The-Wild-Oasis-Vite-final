import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm() {
  const queryClient = useQueryClient();
  // useMutation here
  const { isLoading: isInserting, mutate } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("New Cabin successfully added!");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // useForm here
  const { register, handleSubmit, reset, getValues, formState } = useForm(); // 1. call useForm hook
  const { errors } = formState;
  console.log(errors);
  const submit = (data) => {
    // 4. and we will get the data and do something
    // console.log(data);
    mutate(data);
  };
  // const onError = (errors) => {
  //   // console.log(errors);
  // };
  return (
    // 3. button click event call this onSubmit function, which calls the handleSubmt with customized submit in it, and the onError will be called if any Input is illegal
    <Form onSubmit={handleSubmit(submit)}>
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input
          type="text"
          id="name"
          // 2. setup what needs to be registered
          {...register("name", { required: "Name cannot be empty!" })}
        />
        {/* handle error message if exsits and show Error */}
        {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input
          type="number"
          id="maxCapacity"
          // 2. setup what needs to be registered
          {...register("maxCapacity", {
            // setup validation in the sec position
            required: "Capacity cannot be empty!",
            min: {
              value: 1,
              message: "Capacity should be at least 1!",
            },
          })}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input
          type="number"
          id="regularPrice"
          // 2. setup what needs to be registered
          {...register("regularPrice", {
            min: { value: 100, message: "Price cannot be less than 100" },
          })}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          // 2. setup what needs to be registered
          {...register("discount", {
            required: "Discount cannot be empty!",
            validate: (value) => {
              return (
                value <= getValues().regularPrice || // getValues returns all date in the from, which is an object, so use regularPrice
                "Discount should be less that price!"
              );
            },
          })}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          // 2. setup what needs to be registered
          {...register("description", {
            required: "Description cannot be empty!",
          })}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput id="image" accept="image/*" />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isInserting}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
