import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { FiSend } from "react-icons/fi";

export default function Sign({ setAuth }) {
  const [number, setNumber] = useState();
  const [loader, setLoader] = useState(false);
  const [OTP, setOTP] = useState();

  return (
    <>
      <div className="signpage">
        <div>
          <Image height="300" width="300" src="/img/MögeTeeLogo.png" alt="" />
        </div>
        <div className="signContainer">
          <div>
            <input
              type="number"
              placeholder="Phone number"
              disabled={loader}
              onChange={(e) => setNumber(e.target.value)}
            />
            {loader ? (
              <span className="sendicon">
                <FiSend />
              </span>
            ) : (
              <span
                className="send"
                onClick={() => {
                  setLoader(true);
                  axios.post(
                    "/api/sign",
                    { number },
                    { "content-type": "application/json" }
                  );
                }}
              >
                Send
              </span>
            )}
          </div>
          {loader && (
            <div>
              <input
                placeholder="OTP"
                onChange={(e) => setOTP(e.target.value)}
              />
              <span
                className="send"
                onClick={() => {
                  axios
                    .post(
                      "/api/login",
                      { number, OTP },
                      { "content-type": "application/json" }
                    )
                    .then((res) => res.data === "done" && setAuth(true));
                }}
              >
                Sign
              </span>
            </div>
          )}
        </div>
      </div>
      <style jsx>{`
        .signpage {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .signContainer {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          position: relative;
        }
        .send {
          position: absolute;
          right: 0;
          padding: 0.3rem 0.6rem;
          color: #b39d25;
          cursor: pointer;
        }
        .sendicon {
          position: absolute;
          right: 0;
          padding: 0.3rem 0.6rem;
          padding-top: 0.45rem;
          color: #b39d25;
        }
        input {
          width: 16rem;
          padding: 0.2rem 0.6rem;
          border: 2px solid #b39d25;
          font-size: 1.2rem;
        }
      `}</style>
    </>
  );
}
