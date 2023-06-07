import dbConnection from "@/public/js/dbConnection";
import Products from "@/models/product";
import Category from "@/models/category";
import jwt from "jsonwebtoken";
import User from "@/models/user";
import { products } from "@/public/js/options";

dbConnection();

export default async (req, res) => {
  const { method, cookies } = req;
  const token = cookies.jwt;

  if (method === "GET") {
    // console.log(products);
    const categories = await Category.find({});
    if (!token) return res.status(200).end("noToken");
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
      if (err) return res.status(200).end("invalid");
      const user = await User.findById(decoded.id).exec();
      if (user) {
        products.map((product) =>
          categories.map((category) => {
            if (category.name === product.category) {
              const p = new Products({
                name: product.name,
                description: product.description,
                price: product.price,
                categoryID: category._id,
                image: product.image,
                hasImg: product.hasImg
              });
              p.save().catch((err) => console.log(err));
            }
          })
        );
        // const product = new Products({
        //   name: body.name,
        //   description: body.description,
        //   price: body.price,
        //   categoryID: body.categoryID,
        //   image: body.image
        // });
        // product.save().catch((err) => console.log(err));
        return res.status(200).end("done");
      } else {
        return res.status(200).end("invalid");
      }
    });
  } else {
    return res.status(200).end("invalid");
  }
};
