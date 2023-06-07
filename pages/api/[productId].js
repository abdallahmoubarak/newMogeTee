import dbConnection from "@/public/js/dbConnection";
import Product from "@/models/product";
import jwt from "jsonwebtoken";
import User from "@/models/user";

dbConnection();

export default async (req, res) => {
  const { method, cookies, body } = req;
  const token = cookies.jwt;
  const { update } = req.body;
  const {
    query: { productId }
  } = req;

  if (method === "PUT") {
    if (!token) return res.status(200).end("noToken");
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
      if (err) return res.status(200).end("invalid");
      const user = await User.findById(decoded.id).exec();
      if (user) {
        switch (update) {
          case "name":
            Product.findByIdAndUpdate(
              productId,
              {
                name: body.name
              },
              (err) => console.log(err)
            );
            return res.status(200).end("done");
          case "appear":
            Product.findByIdAndUpdate(
              productId,
              {
                appear: !body.appear
              },
              (err) => console.log(err)
            );
            return res.status(200).end("done");
          case "exist":
            Product.findByIdAndUpdate(
              productId,
              {
                exist: !body.exist
              },
              (err) => console.log(err)
            );
            return res.status(200).end("done");
          case "description":
            Product.findByIdAndUpdate(
              productId,
              {
                description: body.description
              },
              (err) => console.log(err)
            );
            return res.status(200).end("done");
          case "price":
            Product.findByIdAndUpdate(
              productId,
              {
                price: body.price
              },
              (err) => console.log(err)
            );
            return res.status(200).end("done");
          case "usdprice":
            Product.findByIdAndUpdate(
              productId,
              {
                usdprice: body.usdprice
              },
              (err) => console.log(err)
            );
            return res.status(200).end("done");
          default:
            res.status(200).end("invalid");
        }
      } else {
        return res.status(200).end("invalid");
      }
    });
  } else {
    return res.status(200).end("invalid");
  }
};
