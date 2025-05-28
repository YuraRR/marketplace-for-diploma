"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/services/authService";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setUser } from "@/store/slices/authSlice";
import Image from "next/image";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import Link from "next/link";

// Схема валидации с zod
const formSchema = z.object({
  email: z.string().email("Введіть коректний email"),
  password: z.string().min(6, "Пароль має містити щонайменше 6 символів"),
});

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const handleLogin = async (values: z.infer<typeof formSchema>) => {
    try {
      const { data, name, error: loginError } = await signIn(values.email, values.password);

      if (loginError || !data || !data.user || !data.session) {
        toast.error(loginError?.message || "Помилка авторизації");
        return;
      }
      console.log(name);
      dispatch(
        setUser({
          email: data.user.email!,
          name,
        })
      );
      toast.success("Успішний вхід!");
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (error) {
      console.error("Login error", error);
      toast.error("Не вдалося увійти. Спробуйте ще раз.");
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen mt-4 bg-white rounded-lg shadow-lg">
      {/* Иллюстрация слева */}
      <div className="flex items-center justify-center p-8 md:w-1/2">
        <Image
          src="/images/loginIlustarion.png"
          alt="Login Illustration"
          width={400}
          height={326}
          className="mx-auto"
        />
      </div>
      {/* Форма справа */}
      <div className="p-8 md:w-1/2 max-w-[507px]">
        <h2 className="mb-4 text-2xl font-bold text-green-600">Вітаємо</h2>
        <p className="mb-6 text-gray-600">Увійдіть, щоб продовжити</p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-6">
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
                  <FormMessage className="text-red-400" />
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
                  <FormMessage className="text-red-400" />
                  <FormDescription>
                    <Link
                      href="/forgot-password"
                      className="text-sm underline text-light-green hover:text-green-800"
                    >
                      Забули пароль?
                    </Link>
                  </FormDescription>
                </FormItem>
              )}
            />

            <Button
              color="green"
              type="submit"
              className="max-w-[138px] text-white"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Завантаження..." : "УВІЙТИ"}
            </Button>
            <p className="mt-4 text-sm text-center text-gray-600">
              Новий користувач?{" "}
              <Link href="/register" className="text-green-600 hover:underline">
                Зареєструватися
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
}
