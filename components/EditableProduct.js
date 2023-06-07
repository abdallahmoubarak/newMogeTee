import { useState } from "react";
import { FiEye, FiEyeOff, FiMinusCircle, FiShoppingCart } from "react-icons/fi";
import Image from "next/image";
import axios from "axios";

export default function Product({ product, rate }) {
  const [exist, setExist] = useState(product.exist);
  const [appear, setAppear] = useState(product.appear);
  const [name, setName] = useState(product.name);
  const [nameInp, setNameInp] = useState(false);
  const [description, setDescription] = useState(product.description);
  const [desInp, setDesInp] = useState(false);
  const [usdprice, setPrice] = useState(product.usdprice);
  const [priceInp, setPriceInp] = useState(false);

  return (
    <>
      <div className="productPart">
        <div className="productName">
          <div onClick={() => setNameInp(true)}>
            {nameInp ? (
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => {
                  setNameInp(false);
                  axios
                    .put(
                      `/api/${product._id}`,
                      { name, update: "name" },
                      { "content-type": "application/json" }
                    )
                    .then((res) => res.data === "done" && alert("done"));
                }}
              />
            ) : (
              name
            )}
          </div>
          <div
            className="eye"
            onClick={() => {
              setAppear(!appear);
              axios
                .put(
                  `/api/${product._id}`,
                  { update: "appear", appear },
                  { "content-type": "application/json" }
                )
                .then((res) => res.data === "done" && alert("done"));
            }}
          >
            {appear ? (
              <FiEye />
            ) : (
              <span style={{ color: "red" }}>
                <FiEyeOff />
              </span>
            )}
          </div>
          <div
            className="eye"
            onClick={() => {
              setExist(!exist);
              axios
                .put(
                  `/api/${product._id}`,
                  { update: "exist", exist },
                  { "content-type": "application/json" }
                )
                .then((res) => res.data === "done" && alert("done"));
            }}
          >
            {exist ? (
              <FiShoppingCart />
            ) : (
              <span style={{ color: "red" }}>
                <FiMinusCircle />
              </span>
            )}
          </div>
        </div>
        <div className="description" onClick={() => setDesInp(true)}>
          {desInp ? (
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onBlur={() => {
                setDesInp(false);
                axios
                  .put(
                    `/api/${product._id}`,
                    { description, update: "description" },
                    { "content-type": "application/json" }
                  )
                  .then((res) => res.data === "done" && alert("done"));
              }}
            />
          ) : description ? (
            description
          ) : (
            "add description"
          )}
        </div>
        {product.hasImg && (
          <div className="usdprice" onClick={() => setPriceInp(true)}>
            {priceInp ? (
              <input
                value={usdprice}
                onChange={(e) => setPrice(e.target.value)}
                onBlur={() => {
                  setPriceInp(false);
                  axios
                    .put(
                      `/api/${product._id}`,
                      { usdprice, update: "usdprice" },
                      { "content-type": "application/json" }
                    )
                    .then((res) => res.data === "done" && alert("done"));
                }}
              />
            ) : (
              "$" + usdprice
            )}
            <div>{Math.round((usdprice * rate) / 1000) * 1000} L.L</div>
          </div>
        )}
      </div>
      {product.hasImg ? (
        <div className="productPartImg">
          <Image
            height="260"
            width="260"
            src={`/img/products/${product.image}.png`}
            alt={name}
          />
        </div>
      ) : (
        <div className="usdprice" onClick={() => setPriceInp(true)}>
          {priceInp ? (
            <input
              value={usdprice}
              onChange={(e) => setPrice(e.target.value)}
              onBlur={() => {
                setPriceInp(false);
                axios
                  .put(
                    `/api/${product._id}`,
                    { usdprice, update: "usdprice" },
                    { "content-type": "application/json" }
                  )
                  .then((res) => res.data === "done" && alert("done"));
              }}
            />
          ) : (
            usdprice
          )}{" "}
          <div>{Math.round((usdprice * rate) / 1000) * 1000} L.L</div>
        </div>
      )}
      <style jsx>{`
        .description {
          color: grey;
          font-size: 0.8em;
          width: 100%;
        }
        .productName {
          font-size: 1.2em;
          padding: 0.3rem 0;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          gap: 0.6rem;
        }
        .usdprice {
          padding: 0.2rem 0;
        }

        .productPart {
          flex: 1 1 65%;
        }
        .productPartImg {
          flex: 1 1 35%;
        }
        .watermark {
          font-size: 0.8em;
          text-align: center;
          padding: 0.5rem;
          cursor: pointer;
        }

        .trash {
          padding-top: 0.1rem;
          font-size: 1rem;
          cursor: pointer;
        }
        .eye {
          padding-top: 0.1rem;
          font-size: 1rem;
          cursor: pointer;
        }
        input {
          font-size: 1rem;
        }
      `}</style>
    </>
  );
}
