import EditableMenu from "@/components/EditableMenu";
import axios from "axios";
import { useEffect, useState } from "react";
import Sign from "@/components/Sign";

export default function () {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    axios
      .get("/api/auth")
      .then((res) => {
        res?.data === "done" && setAuth(true);
      })
      .catch((error) => console.error(error));
  }, [auth]);

  return <>{auth ? <EditableMenu /> : <Sign setAuth={setAuth} />}</>;
}
