import Link from "next/link";
import { PromoImagesBlock } from "@/app/home/components/PromoImagesBlock";
import { CategoriesList } from "@/app/home/components/CategoriesList";

export async function PromoBlock() {
  // Данные для категорий, брендов и товаров (заглушка)

  const brands = [
    "JAVIK",
    "Digitek",
    "tek react js",
    "Grafbase",
    "MSI",
    "ohbear",
    "OAK",
    "SYNK",
    "SONEX",
    "stropi",
  ];
  const topCategories = [
    { name: "Laptops", icon: "💻" },
    { name: "PC Gaming", icon: "🎮" },
    { name: "Headphones", icon: "🎧" },
    { name: "Monitors", icon: "🖥️" },
  ];

  return (
    <section className="grid w-full grid-cols-1 gap-4 mx-auto lg:grid-cols-4">
      <CategoriesList />
      <PromoImagesBlock />

      <div className="col-span-2 bg-white shadow-md p-7 rounded-xl">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-lg font-bold text-lightGray">FEATURED BRANDS</h2>
          <Link href="#" className="block text-lightGreen hover:underline">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-5 gap-4">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="flex items-center justify-center h-12 bg-gray-100 rounded-lg text-lightGray"
            >
              {brand}
            </div>
          ))}
        </div>
      </div>
      {/* Нижняя часть: Top Categories */}
      <div className="col-span-2 bg-white shadow-md p-7 rounded-xl">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-lg font-bold">TOP CATEGORIES</h2>
          <Link href="#" className="block text-light-gray hover:underline">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {topCategories.map((category, index) => (
            <div key={index} className="flex flex-col items-center p-4 rounded-lg">
              <div className="text-4xl">{category.icon}</div>
              <h4 className="mt-2 font-bold text-lightGray">{category.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
