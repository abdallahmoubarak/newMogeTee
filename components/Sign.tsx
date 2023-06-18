import axios from "axios";
import Image from "next/image";
import { useState } from "react";

interface SignProps {
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sign({ setAuth }: SignProps) {
  const [number, setNumber] = useState("");
  const [loader, setLoader] = useState(false);
  const [OTP, setOTP] = useState("");

  return (
    <div className="flex flex-col items-center">
      <div>
        <Image height={300} width={300} src="/img/MögeTeeLogo.png" alt="" />
      </div>
      <div className="flex flex-col items-center gap-2 relative">
        {loader ? (
          <div className="w-72 p-2 flex items-center gap-2 border-2 border-mogeColor rounded-lg">
            {number}
          </div>
        ) : (
          <div className="w-72 p-1 flex items-center gap-2 border-2 border-mogeColor rounded-lg">
            <input
              placeholder="Phone number"
              onChange={(e) => setNumber(e.target.value)}
              className="py-1 px-3 text-lg border-none w-full"
              onFocus={(e) => (e.target.style.outline = "none")}
              type={number}
            />
            <span
              className="py-1 px-3 text-mogeColor cursor-pointer"
              onClick={() => {
                if (!number) {
                  alert("Please enter your phone number");
                } else {
                  setLoader(true);
                }
              }}>
              Send
            </span>
          </div>
        )}
        {loader && (
          <div className="w-72 p-1 flex items-center gap-2 border-2 border-mogeColor rounded-lg">
            <input
              placeholder="OTP"
              onChange={(e) => setOTP(e.target.value)}
              className="py-1 px-3 text-lg border-none w-full"
              onFocus={(e) => (e.target.style.outline = "none")}
            />
            <span
              className="py-1 px-3 text-mogeColor cursor-pointer"
              onClick={() => {
                axios
                  .post(
                    "/api/login",
                    { number, OTP },
                    { headers: { "Content-Type": "application/json" } },
                  )
                  .then((res) => res.data === "done" && setAuth(true));
              }}>
              Sign
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
