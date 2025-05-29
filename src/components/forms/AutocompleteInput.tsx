import { FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";

// Компонент для поля з автодоповненням
interface AutocompleteInputProps {
  field: {
    name: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    ref?: React.Ref<HTMLInputElement>;
  };
  form: { setValue: (name: string, value: string) => void };
  label: string;
  placeholder: string;
  suggestions: string[];
  isLoading: boolean;
  onInputChange: (value: string) => void;
  onSelect?: (value: string) => void;
}

export const AutocompleteInput = ({
  field,
  form,
  label,
  placeholder,
  suggestions,
  isLoading,
  onInputChange,
  onSelect,
}: AutocompleteInputProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <FormItem>
      <FormLabel>
        {label} <span className="text-red-500">*</span>
      </FormLabel>
      <FormControl>
        <div className="relative">
          <Input
            placeholder={placeholder}
            {...field}
            onChange={(e) => {
              field.onChange(e);
              onInputChange(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
          />
          {isLoading && <div className="absolute text-gray-500 right-2 top-2">Завантаження...</div>}
          {isOpen && suggestions.length > 0 && (
            <ul className="absolute z-10 w-full mt-1 overflow-auto bg-white border border-gray-200 rounded-md shadow-lg max-h-60">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    form.setValue(field.name, suggestion);
                    setIsOpen(false);
                    onSelect?.(suggestion);
                  }}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};
