import { useEffect, useRef, useState } from "react";
import axios from "axios";
import ProductList from "./ProductList";
import quicksort from "@/utils/quicksort";
import TopBar from "./TopBar";
import OrderBar from "./OrderBar";
import Modal from "./Modal";

export default function Menu() {
  const [selected, setSelected] = useState<string>("Fruits Tea");
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [rate, setRate] = useState(95000);
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const [categoriesTop, setCategoriesTop] = useState<CategoriesTop>({});
  const [yLocation, setYLocation] = useState<number>(0);
  const [scroll, setScroll] = useState<Boolean>(false);

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

  useEffect(() => {
    let a: any = {};
    document.querySelectorAll("section").forEach(
      (e) =>
        (a = {
          ...a,
          [e.id]: e.getBoundingClientRect()?.top + window.scrollY - 50,
        }),
    );
    console.log(a);
    setCategoriesTop(a);
  }, [products]);

  useEffect(() => {
    const handleScroll = () => {
      setYLocation(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const getCategoryFromScroll = () => {
      for (const [category, top] of Object.entries(categoriesTop)) {
        if (yLocation >= top) {
          setSelected(category);
        }
      }
    };
    getCategoryFromScroll();
  }, [yLocation]);

  useEffect(() => {
    scroll &&
      window.scrollTo({
        top: categoriesTop[selected],
        behavior: "smooth",
      });
    setScroll(false);
  }, [selected]);

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
          setScroll={setScroll}
        />
      )}
      {categories?.map((category) => (
        <section key={category.name} id={category.name}>
          <div className={`text-4xl text-white font-bold py-2 px-2 bg-title`}>
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
        </section>
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
