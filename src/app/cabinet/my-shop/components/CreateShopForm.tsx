"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { createShop } from "@/app/cabinet/my-shop/actions/createShop";

const formSchema = z.object({
  shop_name: z.string().min(1, { message: "Назва магазину обов'язкова" }),
  description: z.string().optional(),
  address: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function CreateShopForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      shop_name: "",
      description: "",
      address: "",
    },
  });

  const handleSubmit = async (values: FormValues) => {
    try {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value ?? "");
      });
      await createShop(formData);

      toast.success("Магазин успішно створено!");
      form.reset();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Не вдалося створити магазин";
      toast.error(errorMessage);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Название магазина */}
          <FormField
            control={form.control}
            name="shop_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Назва магазину</FormLabel>
                <FormControl>
                  <Input placeholder="Введіть назву магазину" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Описание магазина */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Опис (опціонально)</FormLabel>
                <FormControl>
                  <Textarea placeholder="Введіть опис магазину" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Адрес магазина */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Адреса (опціонально)</FormLabel>
                <FormControl>
                  <Input placeholder="Введіть адресу магазину" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button color="green" type="submit" className="mr-auto">
          Створити магазин
        </Button>
      </form>
    </Form>
  );
}
