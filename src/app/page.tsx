import Link from "next/link";
import { PromoImagesBlock } from "@/app/home/components/PromoImagesBlock";
import { CategoriesList } from "@/app/home/components/CategoriesList";
import { ProductBrandLogo } from "@/app/product/[productName]/components/ProductBrandLogo";

export default async function Main() {
  const brands = ["MSI", "Apple", "Samsung", "Xiaomi", "Huawei", "Sony", "Lenovo", "Philips", "Razer", "LG"];
  const topCategories = [
    { name: "Ноутбуки", icon: "💻" },
    { name: "Телефони", icon: "📱" },
    { name: "Навушники", icon: "🎧" },
    { name: "Телевізори", icon: "🖥️" },
  ];

  return (
    <section className="grid w-full grid-cols-1 gap-4 mx-auto lg:grid-cols-4">
      <CategoriesList />
      <PromoImagesBlock />

      <div className="col-span-2 bg-white shadow-md p-7 rounded-xl">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-lg font-bold text-lightGray">РЕКОМЕНДОВАНІ БРЕНДИ</h2>
          <Link href="/products" className="block text-light-gray hover:underline">
            Переглянути всі
          </Link>
        </div>

        <div className="grid grid-cols-5 gap-5">
          {brands.map((brand, index) => (
            <Link
              href={`/products/?brands=${brand}`}
              key={index}
              className="flex items-center justify-center rounded-lg h-14"
            >
              <ProductBrandLogo brand={brand} />
            </Link>
          ))}
        </div>
      </div>
      {/* Нижняя часть: Top Categories */}
      <div className="col-span-2 bg-white shadow-md p-7 rounded-xl">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-lg font-bold">ТОП КАТЕГОРІЇ</h2>
          <Link href="/products" className="block text-light-gray hover:underline">
            Переглянути всі
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {topCategories.map((category, index) => (
            <Link
              href={`/products/${category.name}`}
              key={index}
              className="flex flex-col items-center p-4 rounded-lg"
            >
              <div className="text-4xl transition-transform ease-in-out hover:scale-105">{category.icon}</div>
              <h4 className="mt-2 font-bold ">{category.name}</h4>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
