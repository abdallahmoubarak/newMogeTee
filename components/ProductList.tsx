import { Dispatch, SetStateAction } from "react";
import Product from "./Product";

interface ProductListProps {
  products: Product[];
  rate: number;
  setSelectedItems: Dispatch<SetStateAction<SelectedItem[]>>;
}

export default function ProductList({
  products,
  rate,
  setSelectedItems,
}: ProductListProps) {
  return (
    <div className="flex flex-wrap gap-2 px-2 ">
      {products?.map((product) => (
        <Product
          product={product}
          rate={rate}
          setSelectedItems={setSelectedItems}
        />
      ))}
    </div>
  );
}
