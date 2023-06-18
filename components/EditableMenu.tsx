import { useEffect, useState } from "react";
import axios from "axios";
import EditableProduct from "./EditableProduct";
import quicksort from "@/utils/quicksort";
import TopBar from "./TopBar";

export default function EditableMenu() {
  const [selected, setSelected] = useState("Fruits Tea");
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [rate, setRate] = useState(95000);

  useEffect(() => {
    axios.get("/api/getCategories").then((res) => setCategories(res.data));
    axios
      .get("/api/getProducts")
      .then((res) => setProducts(quicksort(res.data)));
    axios.get("/api/getRate").then((res) => setRate(JSON.parse(res.data)));
  }, []);

  return (
    <div>
      {categories && (
        <TopBar
          categories={categories}
          selected={selected}
          setSelected={setSelected}
        />
      )}

      {categories?.map((category) => (
        <>
          <div
            key={category.name}
            className={`text-4xl text-white font-bold py-2 px-2 bg-title`}>
            {category?.name}
          </div>
          <div className="text-gray-700 py-2 px-2">{category?.description}</div>
          <div className="flex flex-wrap justify-center gap-4 w-full">
            <div className="flex flex-wrap gap-2 px-2 pb-2">
              {products
                .filter((product) => product.categoryID === category?._id)
                .filter((product) => product.appear)
                ?.map((product) => (
                  <EditableProduct
                    key={product.name}
                    product={product}
                    rate={rate}
                  />
                ))}
            </div>
          </div>
        </>
      ))}
      <div className="sticky bottom-0 p-2 flex justify-between bg-yellow-100 border-t border-title">
        <span>Rate: </span>{" "}
        <input
          value={rate}
          className="px-2 border border-gray-500 rounded-md"
          onChange={(e) => setRate(+e.target.value)}
        />
        <button className="bg-green-500 text-white rounded-md px-4 ">
          done
        </button>
      </div>
    </div>
  );
}
