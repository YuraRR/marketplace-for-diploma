import { FormField } from "@/components/ui/form";
import { FormFieldRenderer } from "@/components/forms/FormFieldRenderer";
import { UseFormReturn } from "react-hook-form";
import { FormData, FormFieldConfig } from "@/types/userForm.types";

interface FormSectionProps {
  formFields: FormFieldConfig[];
  form: UseFormReturn<FormData>;
}

export function FormSection({ formFields, form }: FormSectionProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        {formFields.map((field) => (
          <div key={field.name} className={`col-span-${field.colSpan || 2}`}>
            <FormField
              control={form.control}
              name={field.name}
              render={({ field: formField }) => <FormFieldRenderer fieldConfig={field} formField={formField} />}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
