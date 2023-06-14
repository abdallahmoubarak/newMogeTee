import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import OrderBar from "./OrderBar";
import ProductList from "./ProductList";
import TopBar from "./TopBar";

export default function Menu() {
  const [state, setState] = useState("Fruits Tea");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [rate, setRate] = useState(46000);
  const [categoriesWithProducts, setCategoriesWithProducts] = useState([]);

  const [selectedItems, setSelectedItems] = useState([]);
  const [orderBarHeight, setOrderBarHeight] = useState(0);

  useEffect(() => {
    axios.get("/api/getCategories").then((res) => console.log(res.data));
    axios.get("/api/getRate").then((res) => setRate(res.data));
    axios.get("/api/getProducts").then((res) => setProducts(res.data));
  }, []);

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
        categoryProducts.length * 160 + (categoryProducts.length - 1) * 16;

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

  const [yLocation, setYLocation] = useState(0);

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

        closestCategory && setState(closestCategory.name);
      })();
  }, [yLocation, categoriesWithProducts]);

  const phoneNumber = "+96170097533";

  const addToSelectedItems = (product, quantity) => {
    const updatedItems = selectedItems.filter(
      (item) => item.product !== product,
    );
    if (quantity > 0) {
      updatedItems.push({ product, quantity });
    }
    setSelectedItems(updatedItems);
  };

  const clearSelectedItems = () => {
    if (confirm("Are you sure you want to clear the order?")) {
      setSelectedItems([]);
    }
  };

  const sendOrder = () => {
    let message = ``;
    let totalUSD = 0;
    let totalLBP = 0;
    message += `Address: ${location} ${adress}\n`;
    selectedItems.forEach((item) => {
      const { product, quantity } = item;
      const totalPriceUSD = quantity * product.usdprice;
      const totalPriceLBP = Math.round((totalPriceUSD * rate) / 1000) * 1000;
      message += `${quantity} ${product.name}\n`;
      totalUSD += totalPriceUSD;
      totalLBP += totalPriceLBP;
    });

    message += `\n___________________________\nTotal: $${totalUSD.toFixed(
      2,
    )} / LBP ${totalLBP.toLocaleString()}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <div>
      <TopBar
        categories={categories}
        state={state}
        setState={setState}
        main={true}
      />
      <div>
        {categoriesWithProducts?.map((category, i) => (
          <div key={i} id={category.name}>
            <div
              className={`text-4xl text-white font-bold py-2 px-2 ${
                i === 0 && `pt-16`
              }`}
              style={{
                textShadow: `0px 0px 4px ${category.titleColor}`,
                background: category.titleBackground,
              }}>
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
                selectedItems={selectedItems}
                addToSelectedItems={addToSelectedItems}
              />
            </div>
          </div>
        ))}
        {selectedItems.length > 0 && (
          <OrderBar
            rate={rate}
            selectedItems={selectedItems}
            clearSelectedItems={clearSelectedItems}
            sendOrder={sendOrder}
            setOrderBarHeight={setOrderBarHeight}
          />
        )}
      </div>
    </div>
  );
}
