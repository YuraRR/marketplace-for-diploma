import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FormData, FormFieldConfig } from "@/types/userForm.types";
import { ControllerRenderProps } from "react-hook-form";

export function FormFieldRenderer({
  fieldConfig,
  formField,
}: {
  fieldConfig: FormFieldConfig;
  formField: ControllerRenderProps<FormData, keyof FormData>;
}) {
  return (
    <FormItem>
      <FormLabel>{fieldConfig.label}</FormLabel>
      <FormControl>
        {fieldConfig.type === "select" ? (
          <Select onValueChange={formField.onChange} defaultValue={formField.value}>
            <SelectTrigger className="transition-shadow duration-200 border-gray-300 rounded-lg shadow-sm hover:shadow-md">
              <SelectValue placeholder={fieldConfig.placeholder} />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-300 rounded-lg shadow-lg">
              {fieldConfig.options?.map((option) => (
                <SelectItem key={option} value={option} className="hover:bg-gray-100">
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : fieldConfig.type === "textarea" ? (
          <Textarea
            placeholder={fieldConfig.placeholder}
            className="border-gray-300 rounded-lg resize-none"
            {...formField}
          />
        ) : (
          <Input
            type={fieldConfig.type}
            placeholder={fieldConfig.placeholder}
            className="border-gray-300 rounded-lg"
            {...formField}
          />
        )}
      </FormControl>
      {fieldConfig.description && <FormDescription>{fieldConfig.description}</FormDescription>}
      <FormMessage />
    </FormItem>
  );
}
