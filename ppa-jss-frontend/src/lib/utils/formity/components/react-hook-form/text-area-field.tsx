import { useFormContext, Controller } from "react-hook-form";

import BaseTextField from "../fields/text-field";
import BaseTextAreaField from "../fields/text-area-field";

export interface ITextFieldProps {
  name: string;
  label: string;
  description?: string;
}

export default function TextAreaField({ name, label, description }: ITextFieldProps) {
  const { control, formState } = useFormContext();
  const error = formState.errors[name] as { message: string } | undefined;
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <BaseTextAreaField type="text" label={label} value={field.value} description={description} onChange={field.onChange} error={error} />
      )}
    />
  );
}
