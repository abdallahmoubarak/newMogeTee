import { useEffect, useState } from "react";
import EditableProduct from "./EditableProduct";
import Product from "./Product";

const ProductList = ({
  products,
  rate,
  selectedItems,
  addToSelectedItems,
  admin,
  refetchData,
}) => {
  const [productOrders, setProductOrders] = useState([]);

  const handleOrdering = (data) => {
    setProductOrders(data);
  };

  useEffect(() => {
    // Sort the products array based on the "order" property
    const sortedProducts = products.sort((a, b) => a.order - b.order);
    setProductOrders(sortedProducts);
  }, [products]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full px-3">
      {productOrders?.map((product, j) => {
        const selectedProduct = admin
          ? []
          : selectedItems.find((item) => item.product === product);
        const selectedQuantity = selectedProduct ? selectedProduct.quantity : 0;

        return (
          <div key={j} className={`bg-white p-4 rounded`}>
            {!admin ? (
              <Product
                product={product}
                rate={rate}
                selectedQuantity={selectedQuantity}
                addToSelectedItems={addToSelectedItems}
              />
            ) : productOrders.length !== 0 ? (
              <EditableProduct
                product={productOrders.find(
                  (productOrder) => productOrder._id === product._id,
                )}
                rate={rate}
                productOrders={productOrders}
                handleOrdering={handleOrdering}
                refetchData={refetchData}
              />
            ) : (
              <div>Loading...</div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;
