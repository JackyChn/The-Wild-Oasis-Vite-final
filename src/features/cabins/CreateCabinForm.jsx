import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";

function CreateCabinForm() {
  const queryClient = useQueryClient();
  // useMutation here, for inserting new cabin
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
  const submit = (data) => {
    // 4. and we will get the data and do something
    // console.log({ ...data, image: data.image[0] });
    mutate({ ...data, image: data.image[0] });
  };
  return (
    // 3. button click event call this onSubmit function, which calls the handleSubmt with customized submit in it, and the onError will be called if any Input is illegal
    <Form onSubmit={handleSubmit(submit)}>
      <FormRow label={"Cabin name"} error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isInserting}
          // 2. setup what needs to be registered
          {...register("name", { required: "Name cannot be empty!" })}
        />
      </FormRow>

      <FormRow label={"Maximum capacity"} error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isInserting}
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

      <FormRow label={"Regular price"} error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isInserting}
          // 2. setup what needs to be registered
          {...register("regularPrice", {
            required: "Price cannot be empty!",
            min: { value: 100, message: "Price cannot be less than 100!" },
          })}
        />
      </FormRow>

      <FormRow label={"Discount"} error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isInserting}
          defaultValue={0}
          // 2. setup what needs to be registered
          {...register("discount", {
            required: "Discount cannot be empty!",
            validate: (value) => {
              // getValues returns all date in the from, which is an object, so use regularPrice
              value <= getValues().regularPrice ||
                "Discount should be less that price!";
            },
          })}
        />
      </FormRow>

      <FormRow
        label={"Description for website"}
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          disabled={isInserting}
          defaultValue=""
          // 2. setup what needs to be registered
          {...register("description", {
            required: "Description cannot be empty!",
          })}
        />
      </FormRow>

      <FormRow label={"Cabin photo"}>
        <FileInput
          id="image"
          accept="image/*"
          type="file"
          {...register("image", {
            required: "This field is required",
          })}
        />
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
