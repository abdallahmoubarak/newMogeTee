import Image from "next/image";
import { useEffect, useState } from "react";
import Controllar from "./Controllar";
import convertToLL from "@/utils/convertToLL";

export default function Product({
  product,
  rate,
  setSelectedItems,
}: {
  product: Product;
  rate: number;
  setSelectedItems: React.Dispatch<React.SetStateAction<SelectedItem[]>>;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count > 0) {
      setSelectedItems((prev: SelectedItem[]) => {
        const filteredItems = prev.filter(
          (item: SelectedItem) => item.product._id !== product._id,
        );
        return [...filteredItems, { product, count }];
      });
    } else {
      setSelectedItems((prev: SelectedItem[]) => {
        return [
          ...prev.filter(
            (item: SelectedItem) => item.product._id !== product._id,
          ),
        ];
      });
    }
  }, [count]);

  return (
    <div className="border  rounded-lg border-gray-300  flex-[1_0_20rem]">
      <div className="flex justify-between items-start gap-4 px-4 py-2">
        <div className="flex-[1_1_65%]">
          <div className="text-xl py-1">{product.name}</div>
          <div className="text-gray-500 text-sm w-full pb-2">
            {product.description}
          </div>
          <div>
            {product.exist ? (
              <div className="flex gap-2">
                {"$" + product.usdprice} /{" "}
                {convertToLL({ usd: product.usdprice, rate })}
              </div>
            ) : (
              <div className="out">Out of stock</div>
            )}
          </div>
        </div>

        <div className="flex flex-col justify-between items-end w-[100px]">
          {product.hasImg && (
            <Image
              src={`/img/products/${product.image}.png`}
              alt={product.name}
              width={260}
              height={260}
            />
          )}
          <Controllar count={count} setCount={setCount} />
        </div>
      </div>
      {count > 0 && (
        <div className="bg-title text-white px-4 rounded-b-lg">
          Subtotal: ${count * product.usdprice}
        </div>
      )}
    </div>
  );
}
