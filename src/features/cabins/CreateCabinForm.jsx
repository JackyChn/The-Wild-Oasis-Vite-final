import { useForm } from "react-hook-form";
import { useInsertCabin } from "../../hooks/CRUD hooks/useInsertCabin";
import { useEditCabin } from "../../hooks/CRUD hooks/useEditCabin";
import PropTypes from "prop-types";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  // // 1. call useForm hook here
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  // useMutation here, for inserting new cabin
  // insert mutation
  const { isInserting, createCabin } = useInsertCabin();
  // edit mutation
  const { isEditing, editCabin } = useEditCabin();

  const isWorking = isInserting || isEditing;

  const submit = (cabinData) => {
    // 4. and we will get the data and do something
    const image =
      typeof cabinData.image === "string"
        ? cabinData.image
        : cabinData.image[0];
    console.log(cabinData);
    if (isEditSession)
      editCabin(
        { newCabin: { ...cabinData, image }, id: editId },
        {
          onSuccess: (cabinData) => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createCabin(
        { ...cabinData, image: image },
        {
          onSuccess: (cabinData) => {
            reset();
            onCloseModal?.();
          },
        }
      );
  };
  return (
    // 3. button click event call this onSubmit function, which calls the handleSubmt with customized submit in it, and the onError will be called if any Input is illegal
    <Form onSubmit={handleSubmit(submit)}>
      <FormRow label={"Cabin name"} error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          // 2. setup what needs to be registered
          {...register("name", { required: "Name cannot be empty!" })}
        />
      </FormRow>

      <FormRow label={"Maximum capacity"} error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
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
          disabled={isWorking}
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
          disabled={isWorking}
          defaultValue={0}
          // 2. setup what needs to be registered
          {...register("discount", {
            required: "Discount cannot be empty!",
            validate: (value) => {
              // getValues returns all date in the from, which is an object, so use regularPrice
              return (
                value <= getValues().regularPrice ||
                "Discount should be less that price!"
              );
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
          disabled={isWorking}
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
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit Cabin" : "Add Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

CreateCabinForm.propTypes = {
  cabinToEdit: PropTypes.object,
  onCloseModal: PropTypes.func,
};

export default CreateCabinForm;
