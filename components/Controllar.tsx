export default function Controllar({
  count,
  setCount,
}: {
  count: number;
  setCount: Function;
}) {
  return (
    <>
      {count > 0 ? (
        <div className="flex h-9 items-end justify-end ">
          <div
            onClick={() => setCount(count + 1)}
            className="flex items-center justify-center border-2 border-title rounded-full select-none w-7 h-7 font-bold pb-1 text-title cursor-pointer">
            +
          </div>
          <div className="select-none text-center text-xl w-7 "> {count}</div>
          <div
            onClick={() => setCount(count - 1)}
            className=" flex items-center justify-center border-2 border-title rounded-full select-none w-7 h-7 font-bold pb-1 text-title cursor-pointer">
            -
          </div>
        </div>
      ) : (
        <button
          onClick={() => setCount(count + 1)}
          className="bg-title text-white py-1 px-4 select-none rounded">
          Order
        </button>
      )}
    </>
  );
}
