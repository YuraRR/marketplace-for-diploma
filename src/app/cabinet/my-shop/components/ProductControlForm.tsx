"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Product } from "@/types/database.types";
import { useRouter } from "next/navigation";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

const editProductSchema = z.object({
  name: z.string().min(1, { message: "Назва є обовʼязковою" }),
  description: z.string().optional(),
  price: z.number().min(0, { message: "Ціна повинна бути додатнім числом" }),
  category: z.string().min(1, { message: "Категорія є обовʼязковою" }),
  image_url: z.string().url({ message: "Має бути дійсним URL" }).or(z.literal("")),
  specs: z.string().optional(),
  availability: z.string().min(1, { message: "Наявність є обовʼязковою" }),
  colors: z.string().optional(),
  variations: z.string().optional(),
  brand: z.string().min(1, { message: "Бренд є обовʼязковим" }),
  created_at: z.string().optional(),
});

type ProductControlFormValues = z.infer<typeof editProductSchema>;

interface ProductControlFormProps {
  product?: Product;
  isEdit?: boolean;
}

const formFields = [
  { name: "name", label: "Назва", placeholder: "Введіть назву товару", type: "text" },
  { name: "price", label: "Ціна", placeholder: "Введіть ціну", type: "number", step: "0.01" },
  { name: "category", label: "Категорія", placeholder: "Введіть категорію", type: "text" },
  { name: "availability", label: "Наявність", placeholder: "Введіть статус (наприклад, in_stock)", type: "text" },
  { name: "brand", label: "Бренд", placeholder: "Введіть бренд", type: "text" },
  { name: "image_url", label: "URL зображення", placeholder: "Введіть URL зображення", type: "text" },
  { name: "description", label: "Опис", placeholder: "Введіть опис товару", type: "textarea", colSpan: 2 },
  { name: "specs", label: "Характеристики", placeholder: "Введіть характеристики", type: "textarea", colSpan: 2 },
  { name: "colors", label: "Кольори (опціонально)", placeholder: "Введіть доступні кольори", type: "text" },
  { name: "variations", label: "Варіації (опціонально)", placeholder: "Введіть варіанти", type: "text" },
];

export default function ProductControlForm({ product, isEdit = true }: ProductControlFormProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const form = useForm<ProductControlFormValues>({
    resolver: zodResolver(editProductSchema),
    defaultValues: {
      name: product?.name || "",
      description: product?.description || "",
      price: product?.price ?? 0,
      category: product?.category || "Телефони", // Устанавливаем "Телефони" по умолчанию
      image_url: product?.image_url || "",
      specs: product?.specs || "",
      availability: product?.availability || "В наявності", // Устанавливаем "В наявності" по умолчанию
      colors: product?.colors || "",
      variations: product?.variations || "",
      brand: product?.brand || "",
      created_at: product?.created_at || new Date().toISOString(),
    },
  });

  const onSubmit = async (values: ProductControlFormValues) => {
    console.log("Форма відправлена зі значеннями:", values); // Debug log
    try {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value !== undefined && value !== null ? String(value) : "");
      });

      if (isEdit && product && product.id) {
        formData.append("id", product.id.toString());
      }

      const endpoint = isEdit ? "/cabinet/my-shop/edit-product" : "/cabinet/my-shop/add-product";
      console.log("Submitting form to endpoint:", endpoint); // Debug log
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });
      console.log("Response status:", response.status); // Debug log
      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Помилка на сервері");
      }

      router.refresh();
      toast.success(isEdit ? "Товар успішно оновлено!" : "Товар успішно створено!");
      setOpen(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        isEdit
          ? "Не вдалося оновити товар: "
          : "Не вдалося створити товар: " + (error instanceof Error ? error.message : "Помилка")
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isEdit ? (
          <Button iconBefore={faEdit} variant="outline" />
        ) : (
          <Button color="green" size={"sm"} className="mb-4">
            Додати товар
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-h-[95vh] p-6 bg-white rounded-lg shadow-lg overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? `Редагувати товар: ${product?.name || "Товар"}` : "Додати новий товар"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {formFields.map((field) => (
                <FormField
                  key={field.name}
                  control={form.control}
                  name={field.name as keyof ProductControlFormValues}
                  render={({ field: formField }) => (
                    <FormItem className={field.colSpan ? "col-span-2" : ""}>
                      <FormLabel>{field.label}</FormLabel>
                      <FormControl>
                        {field.type === "textarea" ? (
                          <Textarea placeholder={field.placeholder} {...formField} />
                        ) : (
                          <Input
                            type={field.type}
                            step={field.step}
                            placeholder={field.placeholder}
                            min={field.name === "price" ? 0 : undefined}
                            {...formField}
                            onChange={(e) =>
                              formField.onChange(
                                field.type === "number" ? parseFloat(e.target.value) || 0 : e.target.value
                              )
                            }
                          />
                        )}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>
            <Button className="ml-auto" type="submit" color="green" disabled={!form.formState.isValid}>
              {isEdit ? "Зберегти зміни" : "Створити товар"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
