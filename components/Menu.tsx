import { useEffect, useState } from "react";
import axios from "axios";
import ProductList from "./ProductList";
import quicksort from "@/utils/quicksort";
import TopBar from "./TopBar";
import OrderBar from "./OrderBar";
import Modal from "./Modal";

export default function Menu() {
  const [selected, setSelected] = useState("Fruits Tea");
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [rate, setRate] = useState(95000);
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const [modal, setModal] = useState<boolean>(false);

  useEffect(() => {
    axios.get("/api/getCategories").then((res) => setCategories(res.data));
    axios
      .get("/api/getProducts")
      .then((res) => setProducts(quicksort(res.data)));
    axios.get("/api/getRate").then((res) => setRate(JSON.parse(res.data)));
  }, []);

  const clearSelectedItems = () => {
    if (confirm("Are you sure you want to clear the order?")) {
      setSelectedItems([]);
    }
  };

  return (
    <div>
      {modal && (
        <Modal selectedItems={selectedItems} rate={rate} setModal={setModal} />
      )}
      {categories && (
        <TopBar
          categories={categories}
          selected={selected}
          setSelected={setSelected}
        />
      )}
      {categories?.map((category, i) => (
        <>
          <div
            key={category.name}
            className={`text-4xl text-white font-bold py-2 px-2 bg-title ${
              i === 0 && "pt-16"
            }`}>
            {category?.name}
          </div>
          <div className="text-gray-700 py-2 px-2">{category?.description}</div>
          <div className="flex flex-wrap justify-center gap-4 w-full">
            <ProductList
              products={products
                .filter((product) => product.categoryID === category?._id)
                .filter((product) => product.appear)}
              rate={rate}
              setSelectedItems={setSelectedItems}
            />
          </div>
        </>
      ))}
      {selectedItems.length > 0 && (
        <OrderBar
          rate={rate}
          selectedItems={selectedItems}
          clearSelectedItems={clearSelectedItems}
          setModal={setModal}
        />
      )}
    </div>
  );
}
