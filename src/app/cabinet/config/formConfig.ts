import * as z from "zod";

export const formSchema = z.object({
  first_name: z.string().min(1, { message: "Ім'я обов'язкове" }),
  last_name: z.string().min(1, { message: "Прізвище обов'язкове" }),
  email: z.string().email({ message: "Введіть дійсну email адресу" }),
  phone: z.string().min(10, { message: "Введіть дійсний номер телефону" }).optional(),
  city: z.string().min(1, { message: "Місто обов'язкове" }),
  address: z.string().min(1, { message: "Адреса обов'язкова" }),
  post_office: z.string().min(1, { message: "Відділення обов'язкове" }),
});

export const formFields = [
  {
    name: "first_name",
    label: "Ім'я",
    placeholder: "Ім'я",
    required: true,
    grid: true,
  },
  {
    name: "last_name",
    label: "Прізвище",
    placeholder: "Прізвище",
    required: true,
    grid: true,
  },
  {
    name: "email",
    label: "Email",
    placeholder: "swoo@gmail.com",
    required: true,
  },
  {
    name: "phone",
    label: "Номер телефону",
    placeholder: "+38 (063) 123 45 67",
  },
  {
    name: "city",
    label: "Місто",
    placeholder: "Введіть місто",
    required: true,
    autocomplete: true,
    autocompleteType: "city",
  },
  {
    name: "address",
    label: "Адреса",
    placeholder: "Введіть вулицю",
    required: true,
    autocomplete: true,
    autocompleteType: "street",
  },
  {
    name: "post_office",
    label: "Відділення Нової Пошти",
    placeholder: "Введіть номер або адресу відділення",
    required: true,
    autocomplete: true,
    autocompleteType: "warehouse",
  },
] as const;
