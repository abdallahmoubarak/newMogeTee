import sendOrder from "@/utils/sendOrder";
import { useState } from "react";
import { BsWhatsapp } from "react-icons/bs";
import Input from "./Input";

export default function Modal({ selectedItems, rate, setModal }: ModalProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState<string>("");
  const [building, setBuilding] = useState<string>("");
  const [floor, setFloor] = useState<string>("");

  const [city, setCity] = useState<string>("");
  const Nabatiehpn = "9613085803";
  const Beirutpn = "96171446747";

  return (
    <div className=" fixed h-screen w-screen z-[100]">
      <div
        className="absolute h-full w-full backdrop-filter backdrop-blur-lg bg-opacity-60 bg-gray-300 z-[100] "
        onClick={() => setModal(false)}></div>
      <dialog
        open
        className="min-w-[22rem] mt-20 border border-title rounded-xl p-4 m-auto z-[101] ">
        <div>Select City</div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setCity("Nabatieh");
              setPhoneNumber(Nabatiehpn);
            }}
            className={`block border border-title py-1 px-2 rounded ${
              city === "Nabatieh" && "bg-title text-white"
            }`}>
            Nabatieh
          </button>
          <button
            disabled = {true}
            className={`block border border-gray-200 bg-gray-200 py-1 px-2 rounded cursor-not-allowed ${
              city === "Beirut" && "bg-title text-white"
            }`}>
            Beirut
          </button>
        </div>
        <div className="border-b border-gray-200 h-5"></div>
        <div className="py-2">
          <Input placeholder="Address" value={address} setValue={setAddress} />
          <Input
            placeholder="Building"
            value={building}
            setValue={setBuilding}
          />
          <Input placeholder="Floor" value={floor} setValue={setFloor} />
        </div>
        <div className="border-b border-gray-200 h-5 mb-6"></div>

        <button
          onClick={() =>
            !!city && !!address
              ? sendOrder({
                  selectedItems,
                  rate,
                  phoneNumber,
                  address: address + ", " + building + ", " + floor,
                })
              : confirm("Please select city / add address")
          }
          className="flex items-center justify-center gap-1 cursor-pointer text-white bg-green-500 px-4 py-1 rounded mx-auto">
          <BsWhatsapp /> Order
        </button>
      </dialog>
    </div>
  );
}
