import Image from "next/image";
import convertToLL from "@/utils/convertToLL";
import { useState } from "react";
import Button from "./Button";
import axios from "axios";
import { FaEyeSlash } from "react-icons/fa";

export default function EditableProduct({
  product,
  rate,
}: {
  product: Product;
  rate: number;
}) {
  const [edit, setEdit] = useState(false);
  const [description, setDescription] = useState(product?.description);
  const [name, setName] = useState(product?.name);
  const [price, setPrice] = useState(product?.usdprice);
  const [exist, setExist] = useState(product?.exist);
  const [appear, setAppear] = useState(product.appear);

  return (
    <div className="border  rounded-lg border-gray-300  flex-[1_0_20rem]">
      <div className="flex justify-between items-start gap-4 px-4 py-2">
        <div className="flex-[1_1_65%]">
          {edit ? (
            <div className="flex flex-col gap-1">
              <input
                value={name}
                className="w-full border border-gray-500 rounded-md px-1"
                onChange={(e) => setName(e.target.value)}
              />
              <textarea
                className="w-full border border-gray-500 rounded-md px-1"
                placeholder="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <div className="flex gap-1">
                <span className="absolute px-1">$</span>
                <input
                  value={price}
                  className="w-full border border-gray-500 rounded-md px-1 pl-4"
                  onChange={(e) => setPrice(Number(e.target.value))}
                />
              </div>
              <label className="flex gap-1">
                <input
                  type={"checkbox"}
                  onChange={() => setExist(!exist)}
                  checked={!exist}
                />
                Out of stock
              </label>
              <label className="flex gap-1">
                <input
                  type={"checkbox"}
                  onChange={() => setAppear(!appear)}
                  checked={!appear}
                />
                Disappear
              </label>
            </div>
          ) : (
            <>
              <div className="text-xl py-1 flex gap-2">
                {name} {!appear && <FaEyeSlash />}
              </div>
              <div className="text-gray-500 text-sm w-full pb-2">
                {description}
              </div>
              {exist ? (
                <div className="flex gap-2">
                  {"$" + price} / {convertToLL({ usd: price, rate })}
                </div>
              ) : (
                <div>Out of stock</div>
              )}
            </>
          )}
        </div>

        <div className="flex flex-col justify-between w-[100px]">
          {product.hasImg && (
            <Image
              src={`/img/products/${product.image}.png`}
              alt={product.name}
              width={260}
              height={260}
            />
          )}
          <div className="flex flex-col items-end gap-2">
            <Button
              text={edit ? "Cancel" : "Edit"}
              onClick={() => {
                setEdit(!edit);
                edit && setPrice(product.usdprice);
                edit && setDescription(product.description);
                edit && setName(product.name);
                edit && setExist(product.exist);
                edit && setAppear(product.appear);
              }}
            />
            {edit &&
              (price !== product.usdprice ||
                name !== product.name ||
                description !== product.description ||
                exist !== product.exist ||
                appear !== product.appear) && (
                <button
                  onClick={() => {
                    axios
                      .put("/api/updateProduct", {
                        id: product._id,
                        name,
                        usdprice: price,
                        description,
                        exist,
                        appear,
                      })
                      .then((res) => res.data === "done" && setEdit(!edit));
                  }}
                  className="bg-green-500 text-white px-5 w-fit select-none rounded">
                  Save
                </button>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
