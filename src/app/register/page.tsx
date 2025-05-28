"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@/services/authService";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setUser } from "@/store/slices/authSlice";
import Image from "next/image";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import Link from "next/link";

const formSchema = z
  .object({
    name: z.string().min(1, "Ім'я обов'язкове"),
    email: z.string().email("Введіть коректний email"),
    password: z.string().min(6, "Пароль має містити щонайменше 6 символів"),
    confirmPassword: z.string().min(6, "Пароль має містити щонайменше 6 символів"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Паролі не співпадають",
    path: ["confirmPassword"],
  });

export default function RegisterPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  // Ініціалізація форми
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Якщо користувач вже авторизований, перенаправляємо
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const handleRegister = async (values: z.infer<typeof formSchema>) => {
    try {
      const { data, error: signUpError } = await signUp(values.email, values.name, values.password);
      console.log(data);
      if (signUpError || !data.user || !data.session) {
        toast.error(signUpError?.message || "Помилка реєстрації");
        return;
      }

      // Зберігаємо користувача в Redux і localStorage
      dispatch(
        setUser({
          email: data.user.email!,
          name: values.name,
        })
      );
      router.refresh();

      toast.success("Перевірте email для підтвердження.");
    } catch (error) {
      console.error("Registration error", error);
      toast.error("Не вдалося зареєструватися. Спробуйте ще раз.");
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen mt-4 bg-white rounded-lg">
      {/* Ілюстрація зліва */}
      <div className="flex items-center justify-center p-8 md:w-1/2">
        <Image src={"/images/loginIlustarion.png"} alt="Ілюстрація входу" width={400} height={326} />
      </div>
      {/* Форма справа */}
      <div className="p-8 md:w-1/2 max-w-[507px]">
        <h2 className="mb-4 text-2xl font-bold text-green-600">Реєстрація</h2>
        <p className="mb-6 text-gray-600">Приєднуйтесь до нас</p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleRegister)} className="space-y-6">
            {/* Поле для імені */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ім`я</FormLabel>
                  <FormControl>
                    <Input placeholder="Введіть ваше ім'я" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Поле для email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Введіть ваш email" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Поле для пароля */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Пароль</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="Введіть пароль" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Поле для підтвердження пароля */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Підтвердження пароля</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="Підтвердіть пароль" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button color="green" type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Завантаження..." : "ЗАРЕЄСТРУВАТИСЯ"}
            </Button>
            <p className="mt-4 text-sm text-center text-gray-600">
              Вже маєте акаунт?{" "}
              <Link href="/login" className="text-green-600 hover:underline">
                Увійти
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
}
