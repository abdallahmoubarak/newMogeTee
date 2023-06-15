import convertToLL from "@/utils/convertToLL";
import { BsWhatsapp } from "react-icons/bs";

export default function OrderBar({
  rate,
  selectedItems,
  clearSelectedItems,
  setModal,
}: OrderBarProps) {
  const totalUSD = selectedItems.reduce(
    (total, item) => total + item.product.usdprice * item.count,
    0,
  );
  const totalLBP = convertToLL({ usd: totalUSD, rate });

  return (
    <div
      id="orderBar"
      className={`sticky bottom-0 left-0 right-0 bg-yellow-50 border-t-2 border-title text-title p-4 flex flex-col max-h-[20vh] gap-2`}>
      <div className="flex justify-between gap-2">
        <div className="overflow-y-auto border border-title  w-full max-h-[10vh] rounded-md bg-white px-1">
          {selectedItems.map((item, index) => (
            <div key={index}>{`${item.count} ${item.product.name}`}</div>
          ))}
        </div>
        <div className="flex flex-col items-center gap-2">
          <button
            onClick={clearSelectedItems}
            className="w-20 p-1 rounded-sm text-white bg-red-500">
            Clear
          </button>
          <button
            onClick={() => setModal(true)}
            className="flex items-center justify-center gap-1 w-20 text-white bg-green-500 px-2 py-1 rounded">
            <BsWhatsapp /> Order
          </button>
        </div>
      </div>
      <div className="font-bold">
        Total: ${totalUSD.toFixed(2)} / {totalLBP.toLocaleString()}
      </div>
    </div>
  );
}
