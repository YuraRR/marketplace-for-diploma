import * as z from "zod";

export const formSchema = z.object({
  first_name: z.string().min(1, { message: "Ім'я обов'язкове" }),
  last_name: z.string().min(1, { message: "Прізвище обов'язкове" }),
  email: z.string().email({ message: "Введіть дійсну email адресу" }).optional(),
  phone: z.string().min(10, { message: "Введіть дійсний номер телефону" }).optional(),
  city: z.string().min(1, { message: "Місто обов'язкове" }).optional(),
  address: z.string().min(1, { message: "Адреса обов'язкова" }).optional(),
  post_office: z.string().min(1, { message: "Відділення обов'язкове" }).optional(),
  comment: z.string().optional(),
});

export type FormData = z.infer<typeof formSchema>;

export type FormFieldConfig = {
  name: keyof FormData;
  label: string;
  placeholder: string;
  type: string;
  colSpan?: number;
  options?: string[];
  description?: string;
  section?: string;
};
