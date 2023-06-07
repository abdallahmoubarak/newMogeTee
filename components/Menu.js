import Image from "next/image";
import TopBar from "./TopBar";
import { useEffect, useState } from "react";
import axios from "axios";
import Product from "./Product";

export default function Menu() {
  const [state, setState] = useState("Fruits Tea");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [rate, setRate] = useState(46000);

  useEffect(() => {
    axios.get("/api/categories").then((res) => setCategories(res.data));
    axios.get("/api/rate").then((res) => setRate(JSON.parse(res.data)));
    axios.get("/api/products").then((res) => setProducts(res.data));
  }, []);

  return (
    <>
      <TopBar
        categories={categories}
        state={state}
        setState={setState}
        main={true}
      />
      <div>
        {categories?.map((category, i) => (
          <div key={i}>
            <div
              id={category.name}
              className="title"
              style={{
                textShadow: `0px 0px 4px ${category.titleColor}`,
                background: category.titleBackground
              }}
            >
              {category.name}
            </div>
            <div style={{ color: "#777", padding: ".6rem 1rem" }}>
              {category.description}
            </div>
            <div
              style={{
                background: category.background,
                textAlign: "center"
              }}
            >
              {category.image && (
                <Image
                  height="200"
                  width="200"
                  src={`/img/products/${category.image}.png`}
                  alt={category.name}
                />
              )}
            </div>
            <div
              className="productList"
              style={{
                background: category.background
              }}
            >
              <ProductList
                category={category}
                products={products}
                rate={rate}
              />
            </div>
          </div>
        ))}
      </div>
      {/* <Link href="https://www.za-apps.com">
        <div className="watermark">Made with ❤ by za-apps.com</div>
      </Link> */}
      <style jsx>{`
        .productList {
          width: 100vw;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
          -webkit-box-orient: horizontal;
          -webkit-box-direction: normal;
          -ms-flex-direction: row;
          flex-direction: row;
          -webkit-flex-wrap;
          flex-wrap: wrap;
          gap:1rem;
          padding:.6rem;
        }
        .title {
          color: white;
          font-size: 2.6rem;
          padding: 0.8rem ;
          
        }
        .title:target:before {
          content: "";
          display: block;
          margin-top: 3rem;
        }

      `}</style>
    </>
  );
}

const ProductList = ({ category, products, rate }) => {
  return (
    <>
      {quicksort(products)
        ?.filter((product) => product?.categoryID === category._id)
        .filter((product) => product.appear)
        .map((product, j) => (
          <div key={j} className="product">
            <Product product={product} rate={rate} />
          </div>
        ))}

      <style jsx>{`
        .product {
          padding: 0.6rem;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: justify;
          -ms-flex-pack: justify;
          justify-content: space-between;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          width: 18rem;
          -webkit-box-flex: 1;
          -ms-flex: 1 0 18rem;
          flex: 1 0 18rem;
          padding: 0 1rem;
          gap: 1rem;
          border-radius: 0.6rem;
          box-shadow: 0px 0px 6px #f6f6f6;
        }
        .addItem {
          padding: 1rem;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          flex-wrap: wrap;
          gap: 0.3rem;
        }
        input {
          font-size: 1rem;
          border: 1px solid gray;
          border-radius: 0.2rem;
          padding: 0.2rem 0.6rem;
        }
        .goldbtn {
          padding: 0.3rem 1rem;
          color: white;
          border-radius: 0.3rem;
          background: #b39d25;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

function quicksort(arr) {
  if (arr.length <= 1) return arr;

  const pivot = arr[arr.length - 1];
  const left = [];
  const right = [];

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i].usdprice < pivot.usdprice) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return [...quicksort(left), pivot, ...quicksort(right)];
}
