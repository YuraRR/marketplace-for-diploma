import { Product } from "@/types/database.types";
import { ProductGridItem } from "./ProductGridItem";

export const ProductsGrid = ({ initialProducts }: { initialProducts: Product[] }) => {
  return (
    <section className="max-w-[1000px] w-full p-4 mx-auto">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {initialProducts.length > 0 ? (
          initialProducts.map((product) => <ProductGridItem key={product.id} {...product} />)
        ) : (
          <p>Немає товарів, які відповідають вашим критеріям.</p>
        )}
      </div>
    </section>
  );
};
