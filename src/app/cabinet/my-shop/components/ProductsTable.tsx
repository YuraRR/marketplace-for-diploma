import ProductControlForm from "@/app/cabinet/my-shop/components/ProductControlForm";
import { Product } from "@/types/database.types";
import Image from "next/image";

const ProductsTable = ({ products }: { products: Product[] }) => {
  return (
    <>
      {/* Таблица товаров */}
      <div className="mt-6">
        <h3 className="mb-2 text-lg font-semibold">Товари магазину</h3>
        <ProductControlForm isEdit={false} />
        {products.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200">
              <thead>
                <tr className="*:text-center *:px-4 *:py-2 bg-gray-100">
                  <th></th>
                  <th>Назва</th>
                  <th>Ціна</th>
                  <th>Категорія</th>
                  <th>Наявність</th>
                  <th>Дії</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product: Product) => (
                  <tr key={product.id} className="border-t *:text-center *:px-4 *:py-2">
                    <td>
                      <Image src={product.image_url} alt={product.image_url} width={32} height={32} />
                    </td>
                    <td>{product.name}</td>
                    <td>{product.price} грн</td>
                    <td>{product.category}</td>
                    <td>{product.availability}</td>
                    <td>
                      <ProductControlForm product={product} isEdit={true} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600">У вашому магазині ще немає товарів.</p>
        )}
      </div>
    </>
  );
};

export default ProductsTable;
