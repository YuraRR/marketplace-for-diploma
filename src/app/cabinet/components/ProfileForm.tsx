"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { updateUserProfile } from "@/app/cabinet/actions";
import { DeliveryFormSection } from "@/components/forms/DeliveryFormSection";

// Схема форми
export const formSchema = z.object({
  first_name: z.string().min(1, { message: "Ім'я обов'язкове" }),
  last_name: z.string().min(1, { message: "Прізвище обов'язкове" }),
  email: z.string().email({ message: "Введіть дійсну email адресу" }).optional(),
  phone: z.string().min(10, { message: "Введіть дійсний номер телефону" }).optional(),
  city: z.string().min(1, { message: "Місто обов'язкове" }).optional(),
  address: z.string().min(1, { message: "Адреса обов'язкова" }).optional(),
  post_office: z.string().min(1, { message: "Відділення обов'язкове" }).optional(),
});

export type FormData = z.infer<typeof formSchema>;

type FormValues = FormData;

interface ProfileFormProps {
  profileData: Partial<FormValues>;
}

export default function ProfileForm({ profileData }: ProfileFormProps) {
  const sanitizedProfileData: FormValues = {
    first_name: profileData?.first_name ?? "",
    last_name: profileData?.last_name ?? "",
    email: profileData?.email ?? "",
    phone: profileData?.phone ?? "",
    city: profileData?.city ?? "",
    address: profileData?.address ?? "",
    post_office: profileData?.post_office ?? "",
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: sanitizedProfileData,
  });

  if (!profileData) {
    return <div>Не вдалося завантажити дані профілю.</div>;
  }

  const onSubmit = async (values: FormValues) => {
    try {
      await updateUserProfile({
        ...values,
        email: values.email ?? "",
        phone: values.phone ?? "",
        city: values.city ?? "",
        address: values.address ?? "",
        post_office: values.post_office ?? "",
      });
      toast.success("Профіль успішно оновлено!");
    } catch (error: unknown) {
      console.error("Помилка оновлення профілю:", error);
      if (error instanceof Error) {
        toast.error(error.message || "Не вдалося оновити профіль. Спробуйте ще раз.");
      } else {
        toast.error("Не вдалося оновити профіль. Спробуйте ще раз.");
      }
    }
  };

  return (
    <Form {...form}>
      <h1 className="mb-4 text-xl font-bold">Про акаунт</h1>

      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* First Name */}
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Ім`я <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Ім'я" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Last Name */}
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Прізвище <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Прізвище" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Email <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="swoo@gmail.com" type="email" {...field} value={field.value ?? ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Номер телефону</FormLabel>
              <FormControl>
                <Input placeholder="+38 (063) 123 45 67" {...field} value={field.value ?? ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DeliveryFormSection form={form} />
        <div className="flex justify-end">
          <Button color="green" size="sm" type="submit">
            Зберегти зміни
          </Button>
        </div>
      </form>
    </Form>
  );
}
