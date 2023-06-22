import { useEffect, useRef, useState } from "react";
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
  const [categoriesWithProducts, setCategoriesWithProducts] = useState<
    Category[]
  >([]);

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
    const categoriesWithProducts: Category[] = categories.map((category) => {
      const categoryProducts: Product[] = products
        .filter((product) => product.categoryID === category._id)
        .filter((product) => product.appear);

      const screenWidth: number = window.innerWidth;
      let numberOfColumns: number;
      if (screenWidth < 664) {
        numberOfColumns = 1;
      } else if (screenWidth < 994) {
        numberOfColumns = 2;
      } else {
        numberOfColumns = 3;
      }
      const productsHeight: number =
        categoryProducts.length * 140 + (categoryProducts.length - 1) * 16;

      const height: number = productsHeight / numberOfColumns;
      return { ...category, height };
    });

    categoriesWithProducts.forEach((category, index) => {
      if (index !== 0) {
        category.height += categoriesWithProducts[index - 1].height;
      }
    });

    setCategoriesWithProducts(categoriesWithProducts);
  }, [categories, products]);

  const [yLocation, setYLocation] = useState<number>(0);

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
    categoriesWithProducts.length > 0 &&
      (() => {
        const closestCategory = categoriesWithProducts.find(
          (category) => yLocation <= category.height,
        );

        closestCategory && setSelected(closestCategory.name);
      })();
  }, [yLocation, categoriesWithProducts]);

  //create a useEffect that scroll to selected section
  useEffect(() => {
    const selectedCategory = categoriesWithProducts.find(
      (category) => category.name === selected,
    );
    selectedCategory &&
      window.scrollTo({
        top: selectedCategory.height,
        behavior: "smooth",
      });
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
        />
      )}
      {categories?.map((category) => (
        <section
          key={category.name}
          id={category.name}
          // ref={(element) => {
          //   element && sectionRef.current.push(element);
          // }}
        >
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
