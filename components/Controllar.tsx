import Button from "./Button";

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
        <div className="flex h-8 items-end justify-end ">
          <div
            onClick={() => setCount(count + 1)}
            className="flex items-center justify-center border-2 border-title rounded-full select-none w-7 h-7 font-bold text-title cursor-pointer">
            +
          </div>
          <div className="select-none text-center text-xl w-7 "> {count}</div>
          <div
            onClick={() => setCount(count - 1)}
            className=" flex items-center justify-center border-2 border-title rounded-full select-none w-7 h-7 font-bold text-title cursor-pointer">
            -
          </div>
        </div>
      ) : (
        <Button text={"Order"} onClick={() => setCount(count + 1)} />
      )}
    </>
  );
}
