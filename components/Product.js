import Image from "next/image";

export default function Product({ product, rate }) {
  return (
    <>
      <>
        <div className="productPart">
          <div className="productName">{product.name}</div>
          <div className="description">{product.description}</div>
          {product.hasImg && (
            <div className="price">
              {product.exist ? (
                <div className="prices">
                  <div>{"$" + product.usdprice}</div> {" / "}
                  <div>
                    {Math.round((product.usdprice * rate) / 1000) * 1000 +
                      " L.L"}
                  </div>
                </div>
              ) : (
                <div className="out">Out of stock</div>
              )}
            </div>
          )}
        </div>
        {product.hasImg ? (
          <div className="productPartImg">
            <Image
              height="260"
              width="260"
              src={`/img/products/${product.image}.png`}
              alt={product.name}
            />
          </div>
        ) : (
          <div className="price">
            {product.exist ? (
              <>
                <div>{"$" + product.usdprice}</div>
                <div>
                  {Math.round((product.usdprice * rate) / 1000) * 1000 + " L.L"}
                </div>
              </>
            ) : (
              <div className="out">Out of stock</div>
            )}
          </div>
        )}
      </>
      <style jsx>{`
        .description {
          color: grey;
          font-size: 0.8em;
          width: 100%;
        }
        .productName {
          font-size: 1.2em;
          padding: 0.3rem 0;
        }
        .price {
          padding: 0.2rem 0;
        }
        .prices {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          gap: 0.6rem;
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
        .out {
          color: red;
        }
      `}</style>
    </>
  );
}
