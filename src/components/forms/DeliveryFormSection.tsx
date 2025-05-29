"use client";
import { FormType } from "@/app/checkout/components/OrderForm";
import { AutocompleteInput } from "@/components/forms/AutocompleteInput";
import { FormField } from "@/components/ui/form";
import { useAutocomplete } from "@/hooks/useAutocomplete";
import { debounce } from "lodash";
import { useEffect, useMemo, useState } from "react";

export const DeliveryFormSection = ({ form }: { form: FormType }) => {
  const initialCity = form.getValues("city");
  const [currentCityRef, setCurrentCityRef] = useState<string | null>(null);

  // Автокомплит хуки
  const cityAuto = useAutocomplete("city");
  const addressAuto = useAutocomplete("street", currentCityRef);
  const warehouseAuto = useAutocomplete("warehouse", currentCityRef);

  // Дебаунс функции
  const debouncedCity = useMemo(() => debounce(cityAuto.fetchSuggestions, 300), [cityAuto.fetchSuggestions]);
  const debouncedAddress = useMemo(
    () => debounce(addressAuto.fetchSuggestions, 300),
    [addressAuto.fetchSuggestions]
  );
  const debouncedWarehouse = useMemo(
    () => debounce(warehouseAuto.fetchSuggestions, 300),
    [warehouseAuto.fetchSuggestions]
  );

  useEffect(() => {
    if (initialCity && cityAuto.cityRefs.get(initialCity)) {
      setCurrentCityRef(cityAuto.cityRefs.get(initialCity)!);
    }
    const sub = form.watch((value, { name }) => {
      if (name === "city") {
        debouncedCity(value.city || "");
        setCurrentCityRef(cityAuto.cityRefs.get(value.city || "") || null);
      }
      if (name === "address" && currentCityRef) debouncedAddress(value.address || "");
      if (name === "post_office" && currentCityRef) debouncedWarehouse(value.post_office || "");
    });
    return () => {
      sub.unsubscribe();
      debouncedCity.cancel();
      debouncedAddress.cancel();
      debouncedWarehouse.cancel();
    };
    // eslint-disable-next-line
  }, [form, initialCity, currentCityRef, cityAuto.cityRefs]);

  // Универсальный рендер поля
  const renderField = (
    name: "city" | "address" | "post_office",
    label: string,
    placeholder: string,
    suggestions: string[],
    isLoading: boolean,
    onInputChange: (v: string) => void,
    extra?: { onSelect?: (v: string) => void }
  ) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <AutocompleteInput
          field={{ ...field, value: field.value ?? "" }}
          form={{
            setValue: (name: string, value: string) =>
              form.setValue(name as Parameters<typeof form.setValue>[0], value),
          }}
          label={label}
          placeholder={placeholder}
          suggestions={suggestions}
          isLoading={isLoading}
          onInputChange={onInputChange}
          {...extra}
        />
      )}
    />
  );

  return (
    <>
      {renderField("city", "Місто", "Введіть місто", cityAuto.suggestions, cityAuto.isLoading, debouncedCity, {
        onSelect: (value) => {
          setCurrentCityRef(cityAuto.cityRefs.get(value) || null);
        },
      })}
      {renderField(
        "address",
        "Адреса",
        "Введіть вулицю",
        addressAuto.suggestions,
        addressAuto.isLoading,
        debouncedAddress
      )}
      {renderField(
        "post_office",
        "Відділення Нової Пошти",
        "Виберіть відділення",
        warehouseAuto.suggestions,
        warehouseAuto.isLoading,
        debouncedWarehouse
      )}
    </>
  );
};
