import { useEffect } from "react";
import { BsWhatsapp } from "react-icons/bs";

export default function OrderBar({
  rate,
  selectedItems,
  clearSelectedItems,
  sendOrder,
  setOrderBarHeight,
}) {
  const totalUSD = selectedItems.reduce(
    (total, item) => total + item.product.usdprice * item.quantity,
    0
  );
  const totalLBP = Math.round((totalUSD * rate) / 1000) * 1000;

  useEffect(() => {
    const orderBar = document.getElementById("orderBar");
    const orderBarHeight = orderBar.offsetHeight;
    setOrderBarHeight(orderBarHeight);
  }, [selectedItems]);

  return (
    <div
      id="orderBar"
      className={`sticky bottom-0 left-0 right-0 bg-gray-900 text-white p-4 flex flex-col max-h-[30vh] gap-2 z-50`}
    >
      <div className="flex justify-between gap-2">
        <div className="overflow-y-auto border border-white w-full max-h-[20vh] rounded-sm px-1">
          {selectedItems.map((item, index) => (
            <div key={index}>{`${item.quantity} ${item.product.name}`}</div>
          ))}
        </div>
        <div className="flex flex-col items-center gap-2">
          <button
            onClick={clearSelectedItems}
            className="mr-2 w-20 bg-orange-300 p-1 rounded-sm text-white bg-red-500"
          >
            Clear
          </button>
          <button
            onClick={sendOrder}
            className="flex items-center justify-center gap-1 mr-2 w-20 text-black bg-mogeColor p-1 rounded-sm"
          >
            <BsWhatsapp /> Order
          </button>
        </div>
      </div>
      <div className="font-bold">
        Total: ${totalUSD.toFixed(2)} / LBP {totalLBP.toLocaleString()}
      </div>
    </div>
  );
}
