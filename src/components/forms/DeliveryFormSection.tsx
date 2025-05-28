"use client";
import { FormType } from "@/app/checkout/components/OrderForm";
import { AutocompleteInput } from "@/components/forms/AutocompleteInput";
import { FormField } from "@/components/ui/form";
import { useAutocomplete } from "@/hooks/useAutocomplete";
import { debounce } from "lodash";
import { useEffect, useMemo, useState } from "react";

export const DeliveryFormSection = ({ form }: { form: FormType }) => {
  // Получаем начальное значение city из формы
  const initialCity = form.getValues("city");
  const { cityRefs } = useAutocomplete("city");

  // Инициализируем currentCityRef значением из cityRefs, если city уже задано
  const [currentCityRef, setCurrentCityRef] = useState<string | null>(
    initialCity && cityRefs.get(initialCity) ? cityRefs.get(initialCity)! : null
  );

  const {
    suggestions: citySuggestions,
    isLoading: isLoadingCities,
    fetchSuggestions: fetchCitySuggestions,
    cityRefs: updatedCityRefs,
  } = useAutocomplete("city");
  const {
    suggestions: addressSuggestions,
    isLoading: isLoadingAddresses,
    fetchSuggestions: fetchAddressSuggestions,
  } = useAutocomplete("street", currentCityRef);
  const {
    suggestions: warehouseSuggestions,
    isLoading: isLoadingWarehouses,
    fetchSuggestions: fetchWarehouseSuggestions,
  } = useAutocomplete("warehouse", currentCityRef);

  // Дебаунс для всех автодополнений
  const debouncedFetchCity = useMemo(
    () => debounce((value: string) => fetchCitySuggestions(value), 300),
    [fetchCitySuggestions]
  );
  const debouncedFetchAddress = useMemo(
    () => debounce((value: string) => fetchAddressSuggestions(value), 300),
    [fetchAddressSuggestions]
  );
  const debouncedFetchWarehouse = useMemo(
    () => debounce((value: string) => fetchWarehouseSuggestions(value), 300),
    [fetchWarehouseSuggestions]
  );

  // Обновление предложений
  useEffect(() => {
    // Если city уже задано и currentCityRef еще не установлен, обновляем его
    if (initialCity && !currentCityRef && updatedCityRefs.get(initialCity)) {
      setCurrentCityRef(updatedCityRefs.get(initialCity)!);
    }

    const subscription = form.watch((value, { name }) => {
      if (name === "city") {
        debouncedFetchCity(value.city || "");
        const ref = updatedCityRefs.get(value.city || "");
        if (ref) {
          setCurrentCityRef(ref);
        } else {
          setCurrentCityRef(null);
        }
      }
      if (name === "address" && currentCityRef) {
        debouncedFetchAddress(value.address || "");
      }
      if (name === "post_office" && currentCityRef) {
        debouncedFetchWarehouse(value.post_office || "");
      }
    });

    return () => {
      subscription.unsubscribe();
      debouncedFetchCity.cancel();
      debouncedFetchAddress.cancel();
      debouncedFetchWarehouse.cancel();
    };
  }, [
    form,
    initialCity,
    currentCityRef,
    updatedCityRefs,
    debouncedFetchCity,
    debouncedFetchAddress,
    debouncedFetchWarehouse,
  ]);
  return (
    <>
      {/* City */}
      <FormField
        control={form.control}
        name="city"
        render={({ field }) => (
          <AutocompleteInput
            field={field}
            form={form}
            label="Місто"
            placeholder="Введіть місто"
            suggestions={citySuggestions}
            isLoading={isLoadingCities}
            onInputChange={debouncedFetchCity}
            onSelect={(value) => {
              const ref = updatedCityRefs.get(value);
              if (ref) {
                setCurrentCityRef(ref);
              }
            }}
          />
        )}
      />

      {/* Address */}
      <FormField
        control={form.control}
        name="address"
        render={({ field }) => (
          <AutocompleteInput
            field={field}
            form={form}
            label="Адреса"
            placeholder="Введіть вулицю"
            suggestions={addressSuggestions}
            isLoading={isLoadingAddresses}
            onInputChange={debouncedFetchAddress}
          />
        )}
      />

      {/* Post Office */}
      <FormField
        control={form.control}
        name="post_office"
        render={({ field }) => (
          <AutocompleteInput
            field={field}
            form={form}
            label="Відділення Нової Пошти"
            placeholder="Виберіть відділення"
            suggestions={warehouseSuggestions}
            isLoading={isLoadingWarehouses}
            onInputChange={debouncedFetchWarehouse}
          />
        )}
      />
    </>
  );
};
