import { fa1, fa2, fa3 } from "@fortawesome/free-solid-svg-icons";

// Конфігурація полів форми
export const checkoutFormFields = [
  {
    name: "first_name",
    label: "Ім'я",
    placeholder: "Введіть ваше ім'я",
    type: "text",
    colSpan: 1,
    section: "contact",
  },
  {
    name: "last_name",
    label: "Прізвище",
    placeholder: "Введіть ваше прізвище",
    type: "text",
    colSpan: 1,
    section: "contact",
  },
  {
    name: "phone",
    label: "Номер телефону",
    placeholder: "Введіть номер телефону",
    type: "text",
    colSpan: 2,
    section: "contact",
  },
  {
    name: "email",
    label: "Email (опціонально)",
    placeholder: "Введіть ваш email",
    type: "email",
    colSpan: 2,
    section: "contact",
  },
  {
    name: "city",
    label: "Місто",
    placeholder: "Виберіть місто",
    type: "select",
    section: "delivery",
  },
  {
    name: "address",
    label: "Адреса доставки",
    placeholder: "Введіть адресу (вулиця, будинок, квартира)",
    type: "text",
    section: "delivery",
  },
  {
    name: "comment",
    label: "Коментар до замовлення (опціонально)",
    placeholder: "Додайте коментар до замовлення",
    type: "textarea",
    description: "Додаткові побажання до замовлення.",
    section: "delivery",
  },
];

export const checkoutFormSections = [
  { id: "contact", title: "Контактні дані", icon: fa1, fields: ["first_name", "last_name", "phone"] },
  { id: "delivery", title: "Доставка", icon: fa2, fields: ["city", "address"] },
  { id: "payment", title: "Оплата", icon: fa3, fields: [] },
];
