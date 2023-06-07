import Head from "next/head";
import Main from "@/components/Main";
import dynamic from "next/dynamic";

const Menu = dynamic(() => import("../components/Menu"));

export default function Index() {
  return (
    <>
      <Head>
        <title>Moge Tee</title>
      </Head>
      <Main />
      <Menu />
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
