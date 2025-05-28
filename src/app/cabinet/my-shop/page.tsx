import CreateShopForm from "@/app/cabinet/my-shop/components/CreateShopForm";

import { getUserShop } from "@/app/cabinet/my-shop/actions/getUserShop";
import ProductsTable from "@/app/cabinet/my-shop/components/ProductsTable";

export default async function MyShopPage() {
  const { shop, products } = await getUserShop();



  return (
    <>
      <h1 className="mb-4 text-xl font-bold">Мій магазин</h1>
      {shop ? (
        <div>
          <h2 className="text-lg font-semibold">{shop.shop_name}</h2>
          {shop.description && <p className="text-gray-600">{shop.description}</p>}
          {shop.address && <p className="text-gray-600">Адреса: {shop.address}</p>}
          <p className="text-gray-600">Створено: {new Date(shop.created_at).toLocaleDateString()}</p>
          <ProductsTable products={products} />
        </div>
      ) : (
        <div>
          <p className="mb-4">У вас ще немає магазину. Створіть його нижче!</p>
          <CreateShopForm
        
          />
        </div>
      )}
    </>
  );
}
