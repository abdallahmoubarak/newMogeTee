import { useEffect, useState } from "react";
import Image from "next/image";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";

export default function Product({
  product,
  rate,
  selectedQuantity,
  addToSelectedItems,
}) {
  const increase = () => {
    addToSelectedItems(product, selectedQuantity + 1);
  };

  const decrease = () => {
    selectedQuantity === 0 && setIsOpened(false);
    if (selectedQuantity > 0) {
      addToSelectedItems(product, selectedQuantity - 1);
    }
  };

  const lbpPrice = Math.round((product.usdprice * rate) / 1000) * 1000;
  const formattedLbpPrice = lbpPrice
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    if (selectedQuantity > 0) {
      setIsOpened(true);
    } else {
      setIsOpened(false);
    }
  }, [selectedQuantity]);

  return (
    <div className="flex h-full justify-between">
      <div className="flex flex-col justify-between">
        <div className="text-xl font-bold py-1 text-black">{product.name}</div>
        <div className="text-gray-500 text-sm py-1">{product.description}</div>
        <div className="text-black">
          {product.exist ? (
            <>
              <div>
                {"$" + product.usdprice} / {formattedLbpPrice + " L.L"}
              </div>
              {selectedQuantity > 0 && (
                <div className="font-bold">
                  Subtotal: ${selectedQuantity * product.usdprice}
                </div>
              )}
            </>
          ) : (
            <div className="out">Out of stock</div>
          )}
        </div>
      </div>
      <div className="flex flex-col justify-start items-end ">
        {product.hasImg && (
          <div className="flex items-center justify-center w-[100px]">
            <Image
              src={`/img/products/${product.image}.png`}
              alt={product.name}
              width={260}
              height={260}
            />
          </div>
        )}
        {product.exist &&
          (() => {
            return isOpened ? (
              <div className="flex flex-row items-center justify-center p-2 max-w-[100px] gap-2">
                <button
                  onClick={decrease}
                  className="bg-transparent border-none cursor-pointer">
                  <FiMinusCircle size={30} className="text-mogeColor" />
                </button>
                <span className="text-center text-black">
                  {selectedQuantity}
                </span>
                <button
                  onClick={increase}
                  className="bg-transparent border-none cursor-pointer">
                  <FiPlusCircle size={30} className="text-mogeColor" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setIsOpened(true);
                  increase();
                }}
                className="flex items-center justify-center p-1 m-1 w-[80px] text-white bg-[#fed493] rounded-sm">
                Order
              </button>
            );
          })()}
      </div>
    </div>
  );
}
