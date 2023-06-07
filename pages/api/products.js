import dbConnection from "@/public/js/dbConnection";
import Product from "@/models/product";
import jwt from "jsonwebtoken";
import User from "@/models/user";

dbConnection();

export default async (req, res) => {
  const { method, cookies } = req;
  const token = cookies.jwt;
  const { body } = req;

  if (method === "GET") {
    const products = await Product.find({
      hidden: false
    });
    return res.status(200).end(JSON.stringify(products));
  } else if (method === "POST") {
    if (!token) return res.status(200).end("noToken");
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
      if (err) return res.status(200).end("invalid");
      const user = await User.findById(decoded.id).exec();
      if (user) {
        const product = new Product({
          name: body.name,
          description: body.description,
          price: body.price,
          categoryID: body.categoryID,
          image: body.image
        });
        product.save().catch((err) => console.log(err));
        return res.status(200).end("done");
      } else {
        return res.status(200).end("invalid");
      }
    });
  } else {
    return res.status(200).end("invalid");
  }
};
