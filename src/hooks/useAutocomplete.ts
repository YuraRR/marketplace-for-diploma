import { useState } from "react";

export const useAutocomplete = (type: "city" | "street" | "warehouse", cityRef?: string | null) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cityRefs, setCityRefs] = useState<Map<string, string>>(new Map());

  const fetchSuggestions = async (input: string) => {
    if (input.length < (type === "city" ? 2 : type === "street" ? 3 : 0)) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      const apiKey = process.env.NEXT_PUBLIC_NOVA_POSHTA_API_KEY || "YOUR_NOVA_POSHTA_API_KEY";
      const baseUrl = "https://api.novaposhta.ua/v2.0/json/";

      if (type === "city") {
        const response = await fetch(baseUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            apiKey,
            modelName: "Address",
            calledMethod: "searchSettlements",
            methodProperties: {
              CityName: input,
              Limit: 10,
            },
          }),
        });
        const data = await response.json();
        console.log("City API response:", data);
        const cities = data.data?.[0]?.Addresses || [];
        setCityRefs(new Map(cities.map((addr: any) => [addr.Present, addr.Ref])));
        setSuggestions(cities.map((addr: any) => addr.Present));
      } else if (type === "street" && cityRef) {
        console.log("Fetching streets for cityRef:", cityRef);
        const response = await fetch(baseUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            apiKey,
            modelName: "Address",
            calledMethod: "searchSettlementStreets",
            methodProperties: {
              SettlementRef: cityRef,
              StreetName: input,
              Limit: 10,
            },
          }),
        });
        const data = await response.json();
        console.log("Street API response:", data);
        setSuggestions(data.data[0]?.Addresses.map((street: any) => street.Present) || []);
      } else if (type === "warehouse" && cityRef) {
        const response = await fetch(baseUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            apiKey,
            modelName: "Address",
            calledMethod: "getWarehouses",
            methodProperties: {
              SettlementRef: cityRef,
              FindByString: input,
              WarehouseId: Number(input),
              Limit: 50,
            },
          }),
        });
        const data = await response.json();
        console.log("Warehouse API response:", data);
        setSuggestions(data.data?.map((warehouse: any) => warehouse.Description) || []);
      }
    } catch (error) {
      console.error(`Error fetching ${type} suggestions:`, error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  return { suggestions, isLoading, fetchSuggestions, cityRefs };
};
