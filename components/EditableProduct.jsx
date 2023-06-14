import { useEffect, useState } from "react";
import { FiEye, FiEyeOff, FiMinusCircle, FiShoppingCart } from "react-icons/fi";
import Image from "next/image";
import axios from "axios";
import { BsChevronLeft, BsChevronRight, BsPen } from "react-icons/bs";

export default function Product({
  product,
  rate,
  productOrders,
  handleOrdering,
  refetchData,
}) {
  const [exist, setExist] = useState(product.exist);
  const [appear, setAppear] = useState(product.appear);
  const [name, setName] = useState(product.name);
  const [nameInp, setNameInp] = useState(false);
  const [description, setDescription] = useState(product.description);
  const [desInp, setDesInp] = useState(false);
  const [usdprice, setPrice] = useState(product.usdprice);
  const [priceInp, setPriceInp] = useState(false);

  useEffect(() => {
    setExist(product.exist);
    setAppear(product.appear);
    setName(product.name);
    setDescription(product.description);
    setPrice(product.usdprice);
  }, [product]);

  const changeOrder = (direction) => {
    // The neighbor is the product that will be swapped with the current product
    let neighbour;
    const currentIndex = productOrders.findIndex(
      (productOrder) => productOrder._id === product._id
    );

    productOrders.length === 1 && alert("There is only one product");

    // Check if the index is out of bounds
    if (direction === "left" && currentIndex === 0) {
      // cannot move left
      return;
    } else if (
      direction === "right" &&
      currentIndex === productOrders.length - 1
    ) {
      // cannot move right
      return;
    }

    // Find the neighbor
    if (direction === "left") {
      neighbour = productOrders[currentIndex - 1];
    } else if (direction === "right") {
      neighbour = productOrders[currentIndex + 1];
    }

    // The product in productOrders array with _id === product._id
    const orderedProduct = productOrders.find(
      (productOrder) => productOrder._id === product._id
    );

    if (direction === "left") {
      productOrders[currentIndex - 1] = orderedProduct;
      productOrders[currentIndex] = neighbour;
    } else if (direction === "right") {
      productOrders[currentIndex + 1] = orderedProduct;
      productOrders[currentIndex] = neighbour;
    }

    const tempOrder = orderedProduct.order;
    orderedProduct.order = neighbour.order;
    neighbour.order = tempOrder;

    axios.put(
      `/api/${product._id}`,
      { update: "order", order: orderedProduct.order },
      { "content-type": "application/json" }
    );

    axios
      .put(
        `/api/${neighbour._id}`,
        { update: "order", order: neighbour.order },
        { "content-type": "application/json" }
      )
      .then(refetchData);

    // Update the state
    handleOrdering(productOrders);
  };

  return (
    <>
      <div className="flex flex-col h-full justify-between">
        <div className="flex justify-between items-center">
          <div>
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
                className="text-xl font-bold"
              />
            ) : (
              <div
                className="text-xl font-bold cursor-pointer"
                onClick={() => setNameInp(true)}
              >
                {name}
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <div
              className="eye cursor-pointer"
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
              {appear ? <FiEye /> : <FiEyeOff className="text-red-500" />}
            </div>
            <div
              className="eye cursor-pointer"
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
                <FiMinusCircle className="text-red-500" />
              )}
            </div>
          </div>
        </div>
        <div>
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
              className="text-gray-500 text-sm cursor-pointer w-full px-1"
            />
          ) : (
            <div
              className="text-gray-500 text-sm cursor-pointer"
              onClick={() => setDesInp(true)}
            >
              {description ? description : "add description"}
            </div>
          )}
        </div>
        <div
          className="cursor-pointer flex justify-between items-center text-lg"
          onClick={() => setPriceInp(true)}
        >
          <div className={`cursor-pointer flex py-1`}>
            Edit Price: &nbsp;
            {priceInp ? (
              <div
                className={`flex font-bold w-10 gap-1 ${
                  priceInp && "bg-mogeColor"
                }`}
              >
                $
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
                  className={`w-10 ${priceInp && "bg-mogeColor"}`}
                  onFocus={(e) => (e.target.style.outline = "none")}
                />
                <BsPen />
              </div>
            ) : (
              <div>${usdprice}</div>
            )}
          </div>
          <div>{Math.round((usdprice * rate) / 1000) * 1000} L.L</div>
        </div>
        <div className="h-52 flex">
          <div className="flex flex-col p-1 h-full justify-end items-start ">
            <div>Order</div>
            <div className="flex gap-2 rounded-md">
              <div
                className="cursor-pointer bg-mogeColor rounded-md"
                onClick={() => {
                  changeOrder("left");
                }}
              >
                <BsChevronLeft size={30} />
              </div>
              <div className="text-black">
                {productOrders.map((orderedProduct) => {
                  if (orderedProduct._id === product._id) {
                    return <span key={product._id}>{product.order}</span>;
                  }
                })}
              </div>
              <div
                className="cursor-pointer bg-mogeColor rounded-md"
                onClick={() => {
                  changeOrder("right");
                }}
              >
                <BsChevronRight size={30} />
              </div>
            </div>
          </div>
          {product.hasImg && (
            <Image
              height="260"
              width="260"
              src={`/img/products/${product.image}.png`}
              alt={name}
              className="z-0"
            />
          )}
        </div>
      </div>
    </>
  );
}
