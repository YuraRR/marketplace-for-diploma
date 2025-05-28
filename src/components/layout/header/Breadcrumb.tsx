"use client";

import * as React from "react";
import {
  Breadcrumb as ShadcnBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import Link from "next/link";

const pageTranslations: Record<string, string> = {
  cabinet: "Кабінет",
  "my-shop": "Мій магазин",
  checkout: "Оформлення замовлення",
  "my-orders": "Замовлення",
  profile: "Профіль",
  cart: "Кошик",
  login: "Вхід",
  register: "Реєстрація",
  search: "Пошук",
  products: "Товари",
  sellers: "Продавці",
};

export function Breadcrumb() {
  const pathname = usePathname();

  // Розбиваємо шлях на сегменти
  const pathSegments = pathname
    .split("/")
    .filter((segment) => segment)
    .map((segment) => decodeURIComponent(segment));

  // Динамічне створення хлібних крихт
  type BreadcrumbItemType = {
    href: string;
    label: string;
    isCurrent?: boolean;
  };

  const breadcrumbItems: BreadcrumbItemType[] = React.useMemo(() => {
    const items: BreadcrumbItemType[] = [];
    let currentPath = "";

    // Додаємо головну сторінку
    items.push({ href: "/", label: "Головна" });

    // Обробка сторінки продукту
    const isProductPage = pathSegments[0] === "product";
    if (isProductPage && pathSegments[1]) {
      const productLabel = pathSegments[1]
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
        .replace("And", "&");

      items.push({
        href: `/product/${pathSegments[1]}`,
        label: productLabel,
        isCurrent: true,
      });
    } else {
      // Обробка інших сторінок
      pathSegments.forEach((segment, index) => {
        currentPath += "/" + segment;
        const label = pageTranslations[segment] || segment; // Використовуємо переклад або сегмент
        const isLast = index === pathSegments.length - 1;

        items.push({
          href: currentPath,
          label,
          isCurrent: isLast,
        });
      });
    }

    return items;
  }, [pathSegments]);

  return (
    <div className="w-full px-[30px] py-5 rounded-lg bg-white my-4">
      <ShadcnBreadcrumb>
        <BreadcrumbList>
          {breadcrumbItems.map((item, index) => (
            <React.Fragment key={item.href}>
              <BreadcrumbItem>
                {item.isCurrent ? (
                  <BreadcrumbPage className="text-gray-500">{item.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={item.href} className="text-gray-500 hover:text-gray-700">
                      {item.label}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {index < breadcrumbItems.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </ShadcnBreadcrumb>
    </div>
  );
}
