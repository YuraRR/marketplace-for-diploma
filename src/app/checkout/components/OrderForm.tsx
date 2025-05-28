"use client";

import { useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/store";
import { handleOrderSubmission } from "@/app/checkout/components/FormHandler";
import { Profile } from "@/types/database.types";
import { FormSection } from "@/components/forms/FormSection";
import { ContactSummary } from "@/app/checkout/components/ContactSummary";
import { PaymentSection } from "@/app/checkout/components/PaymantSection";
import { OrderBlock } from "@/app/checkout/components/OrderBlock";
import { checkoutFormFields, checkoutFormSections } from "@/app/checkout/constants/formFields";
import { Button } from "@/components/ui/button";
import { SectionTitle } from "@/app/checkout/components/SectionTitle";
import { DeliveryFormSection } from "@/components/forms/DeliveryFormSection";
import { FormData, formSchema } from "@/types/userForm.types";

// Form type
export type FormType = UseFormReturn<FormData>;

interface OrderFormProps {
  userAuthId?: string;
  profile?: Partial<Profile>;
}

export default function OrderForm({ userAuthId, profile }: OrderFormProps) {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState<"directBankTransfer" | "cashOnDelivery">(
    "directBankTransfer"
  );
  const [isContactEditable, setIsContactEditable] = useState(!profile?.first_name);
  const { items: products } = useAppSelector((state) => state.cart);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: profile?.first_name || "",
      last_name: profile?.last_name || "",
      city: profile?.city || "",
      address: profile?.address || "",
      post_office: profile?.post_office || "",
      phone: profile?.phone || "",
      email: profile?.email || "",
      comment: "",
    },
    mode: "onChange",
  });

  const handleSubmit = async (values: FormData) => {
    const effectiveUserAuthId = userAuthId || "anonymous";
    const safeValues = {
      first_name: values.first_name ?? "",
      last_name: values.last_name ?? "",
      city: values.city ?? "",
      address: values.address ?? "",
      post_office: values.post_office ?? "",
      phone: values.phone ?? "",
      email: values.email ?? "",
      comment: values.comment ?? "",
    };
    await handleOrderSubmission({
      values: safeValues,
      products: products,
      userAuthId: effectiveUserAuthId,
      paymentMethod,
      router,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex justify-between w-full">
        <div className="flex flex-col w-full gap-6 max-w-[722px]">
          {checkoutFormSections.map((section) => (
            <div key={section.id} className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow">
              <SectionTitle section={section} form={form} />

              {section.id === "contact" && !isContactEditable && profile?.first_name ? (
                <ContactSummary profile={profile} onEdit={() => setIsContactEditable(true)} />
              ) : section.id === "payment" ? (
                <PaymentSection paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
              ) : section.id === "delivery" ? (
                <DeliveryFormSection form={form} />
              ) : (
                <>
                  <FormSection
                    formFields={checkoutFormFields
                      .filter((field) => field.section === section.id)
                      .map((field) => ({
                        ...field,
                        name: field.name as keyof FormData,
                      }))}
                    form={form}
                  />
                  {section.id === "contact" && isContactEditable && (
                    <div className="flex justify-end">
                      <Button onClick={() => setIsContactEditable(false)} color="green" size={"sm"} type="submit">
                        Продовжити
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
        <OrderBlock />
      </form>
    </Form>
  );
}
