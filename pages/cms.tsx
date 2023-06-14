import EditableMenu from "@/components/EditableMenu";
import axios from "axios";
import { useEffect, useState } from "react";
import Sign from "@/components/Sign";

export default function Index() {
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    let isMounted = true;
    axios.get("/api/auth").then((res) => {
      if (isMounted) {
        res?.data === "done" && setAuth(true);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return <>{auth ? <EditableMenu /> : <Sign setAuth={setAuth} />}</>;
}
