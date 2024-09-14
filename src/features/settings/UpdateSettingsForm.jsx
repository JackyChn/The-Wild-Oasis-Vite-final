import { useForm } from "react-hook-form";
import { useSettingsQuery } from "../../hooks/useQuery hooks/useSettingsQuery";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import Button from "../../ui/Button";
import { useEditSettings } from "../../hooks/CRUD hooks/useEditSettings";

function UpdateSettingsForm() {
  const {
    isLoading,
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
  } = useSettingsQuery();

  const { register, handleSubmit, getValues, formState } = useForm();
  const { errors } = formState;
  const submitSettings = (settingsData) => {
    // if (errors) console.log(errors);
    editSettings({ ...settingsData });
  };

  const { isEditing, editSettings } = useEditSettings();

  if (isLoading) return <Spinner />;
  return (
    <Form onSubmit={handleSubmit(submitSettings)}>
      <FormRow
        label="Minimum nights/booking"
        error={errors?.minBookingLength?.message}
      >
        <Input
          type="number"
          id="min-nights"
          disabled={isEditing}
          defaultValue={minBookingLength}
          {...register("minBookingLength", {
            required: "Minmum nights cannot be empty!",
            min: {
              value: 1,
              message: "Minmum nights cannot be less than 1!",
            },
            validate: (value) => {
              return (
                value <= getValues().maxBookingLength ||
                "Minmum nights cannot be greater than maxmum nights!"
              );
            },
          })}
        />
      </FormRow>
      <FormRow
        label="Maximum nights/booking"
        error={errors?.maxBookingLength?.message}
      >
        <Input
          type="number"
          id="max-nights"
          disabled={isEditing}
          defaultValue={maxBookingLength}
          {...register("maxBookingLength", {
            required: "Minmum nights cannot be empty!",
            min: {
              value: 2,
              message: "Maxmum nights cannot be less than 2!",
            },
            validate: (value) => {
              return (
                value >= getValues().minBookingLength ||
                "Maxmum nights cannot be less than minmim nights!"
              );
            },
          })}
        />
      </FormRow>
      <FormRow
        label="Maximum guests/booking"
        error={errors?.maxGuestsPerBooking?.message}
      >
        <Input
          type="number"
          id="max-guests"
          disabled={isEditing}
          defaultValue={maxGuestsPerBooking}
          {...register("maxGuestsPerBooking", {
            required: "Maximum guests cannot be empty!",
            min: {
              value: 1,
              message: "Min guests cannot be less than 1!",
            },
            max: {
              value: 100,
              message: "Max guests cannot be over 100!",
            },
          })}
        />
      </FormRow>
      <FormRow label="Breakfast price" error={errors?.breakfastPrice?.message}>
        <Input
          type="number"
          id="breakfast-price"
          disabled={isEditing}
          defaultValue={breakfastPrice}
          {...register("breakfastPrice", {
            required: "Minmum break price cannot be empty!",
          })}
        />
      </FormRow>
      <FormRow>
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button>Edit Settings</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
