import sendOrder from "@/utils/sendOrder";
import { useState } from "react";
import { BsWhatsapp } from "react-icons/bs";

export default function Modal({ selectedItems, rate, setModal }: ModalProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
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
            onClick={() => {
              setCity("Beirut");
              setPhoneNumber(Beirutpn);
            }}
            className={`block border border-title py-1 px-2 rounded ${
              city === "Beirut" && "bg-title text-white"
            }`}>
            Beirut
          </button>
        </div>
        <div className="py-4">
          <div>Address</div>
          <textarea
            className="border border-title rounded-md px-4 py-1 w-full"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <button
          onClick={() =>
            !!city && !!address
              ? sendOrder({
                  selectedItems,
                  rate,
                  phoneNumber,
                  address,
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
