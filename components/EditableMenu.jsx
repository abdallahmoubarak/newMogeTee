import TopBar from "./TopBar";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductList from "./ProductList";

export default function Menu() {
  const [state, setState] = useState("Fruits Tea");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [rate, setRate] = useState();
  const [categoriesWithProducts, setCategoriesWithProducts] = useState([]);

  useEffect(() => {
    axios.get("/api/categories").then((res) => setCategories(res.data));
    axios.get("/api/rate").then((res) => setRate(JSON.parse(res.data)));
    axios.get("/api/products").then((res) => setProducts(res.data));
  }, []);

  // Create a function to refetch the data from the database
  const refetchData = () => {
    axios.get("/api/categories").then((res) => setCategories(res.data));
    axios.get("/api/rate").then((res) => setRate(JSON.parse(res.data)));
    axios.get("/api/products").then((res) => setProducts(res.data));
  };

  useEffect(() => {
    const categoriesWithProducts = categories.map((category) => {
      const categoryProducts = products
        .filter((product) => product.categoryID === category._id)
        .filter((product) => product.appear)
        .sort((a, b) => a.usdprice - b.usdprice); // Sort from lowest to highest price
      const categoryHeight = category.description ? 144 : 104;

      const screenWidth = window.innerWidth;
      let numberOfColumns;
      if (screenWidth < 768) {
        numberOfColumns = 1;
      } else if (screenWidth < 1024) {
        numberOfColumns = 2;
      } else {
        numberOfColumns = 3;
      }
      const productsHeight =
        categoryProducts.length * 170 + (categoryProducts.length - 1) * 16;

      const height = categoryHeight + productsHeight / numberOfColumns;
      return { ...category, products: categoryProducts, height };
    });

    categoriesWithProducts.forEach((category, index) => {
      if (index !== 0) {
        category.height += categoriesWithProducts[index - 1].height;
      }
    });

    setCategoriesWithProducts(categoriesWithProducts);
  }, [categories, products]);

  return (
    <>
      <TopBar categories={categories} state={state} setState={setState} />
      {/* <div onClick={() => axios.get("/api/update")}>reset</div> */}
      <div className="mt-16 md:mt-20 flex w-full flex-nowrap gap-1 px-4 items-center mb-2">
        <span>Dollar Rate: 1$ = </span>{" "}
        <input
          className="w-28 border border-mogeColor p-1"
          placeholder={"Rate"}
          type="number"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          onBlur={() => {
            axios
              .put(
                "/api/rate",
                { rate },
                { "content-type": "application/json" }
              )
              .then((res) => res.data === "done" && alert("done"));
          }}
        />
        <span> L.L </span>
      </div>
      <div>
        {categoriesWithProducts?.map((category, i) => (
          <div key={i} id={category.name}>
            <div
              className={`text-4xl text-white font-bold py-2 px-2`}
              style={{
                textShadow: `0px 0px 4px ${category.titleColor}`,
                background: category.titleBackground,
              }}
            >
              {category.name}
            </div>
            <div className="text-gray-700 py-2 px-2">
              {category.description}
            </div>
            <div className="bg-gray-100 text-center">
              {category.image && (
                <Image
                  src={`/img/products/${category.image}.png`}
                  alt={category.name}
                  width={200}
                  height={200}
                />
              )}
            </div>
            <div className="flex flex-wrap justify-center gap-4 py-2 w-full">
              <ProductList
                products={category.products}
                rate={rate}
                admin={true}
                refetchData={refetchData}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
