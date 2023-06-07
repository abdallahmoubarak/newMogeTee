import Image from "next/image";
export default function Main() {
  return (
    <>
      <div className="container">
        <div className="menu">
          <Image height="500" width="500" src="/img/MögeTeeLogo.png" alt="" />
        </div>
      </div>
      <style jsx>{`
        .container {
          width: 100vw;
          height: 100vh;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          position: absolute;
          top: 0;
          background: white;
          animation: fadeOut ease 3s;
          animation-iteration-count: 1;
          animation-fill-mode: forwards;
          z-index: 20;
        }
        .menu {
          width: 20rem;
          max-height: 80vh;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
          -webkit-box-align: center;
          -ms-flex-align: center;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          background: white;
          -webkit-box-shadow: 0px 10px 14.1px 0.9px rgba(0, 0, 0, 0.24),
            0px 4px 19.6px 0.4px rgba(0, 0, 0, 0.16);
          box-shadow: 0px 10px 14.1px 0.9px rgba(0, 0, 0, 0.24),
            0px 4px 19.6px 0.4px rgba(0, 0, 0, 0.16);
          animation: fadeInAnimation ease 3s;
          animation-iteration-count: 1;
          animation-fill-mode: forwards;
          z-index: 19;
        }

        .image {
          width: 100%;
          padding: 5rem 0;
        }
        @keyframes fadeInAnimation {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 1;
          }
          99% {
            z-index: 19;
          }
          100% {
            opacity: 0;
            z-index: 0;
          }
        }
        @keyframes fadeOut {
          0% {
            opacity: 1;
          }
          99% {
            opacity: 1;
            z-index: 20;
          }
          100% {
            opacity: 0;
            z-index: 0;
          }
        }
      `}</style>
    </>
  );
}
