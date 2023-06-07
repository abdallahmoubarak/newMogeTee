import EditableMenu from "@/components/EditableMenu";
import axios from "axios";
import { useEffect, useState } from "react";
import Sign from "@/components/Sign";
import Main from "@/components/Main";

export default function () {
  const [auth, setAuth] = useState(false);
  const [load, setLoad] = useState(true);
  useEffect(
    () =>
      axios
        .get("/api/auth")
        .then((res) => {
          res?.data === "done" && setAuth(true);
        })
        .then(() => setLoad(false)),
    [auth]
  );

  return (
    <>
      {load ? <Main /> : auth ? <EditableMenu /> : <Sign setAuth={setAuth} />}
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          text-decoration: unset;
          outline: none;
          -webkit-tap-highlight-color: transparent;
          font-family: sans-serif;
          -ms-scroll-chaining: none;
          overscroll-behavior: contain;
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        *::-webkit-scrollbar {
          display: none;
        }
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        /* Firefox */
        input[type="number"] {
          -moz-appearance: textfield;
        }
        body {
          font-size: 18px;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
            "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
            "Helvetica Neue", sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          z-index: -10;
        }
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </>
  );
}
