import dbConnection from "@/public/js/dbConnection";
import Category from "@/models/category";
import jwt from "jsonwebtoken";
import User from "@/models/user";

dbConnection();

export default async (req, res) => {
  const { method, cookies } = req;
  const token = cookies.jwt;
  const { body } = req;

  if (method === "GET") {
    const categories = await Category.find({
      hidden: false
    });
    return res.status(200).end(JSON.stringify(categories));
  } else if (method === "POST") {
    if (!token) return res.status(200).end("noToken");
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
      if (err) return res.status(200).end("invalid");
      const user = await User.findById(decoded.id).exec();
      if (user) {
        const category = new Category({
          name: body.name,
          titleBackground: "#fed493",
          titleColor: "#F2E5DD",
          background: "#fff",
          topTitle: "#DD948E"
        });
        category.save().catch((err) => console.log(err));
      } else {
        return res.status(200).end("invalid");
      }
    });
    return res.status(200).end("done");
  } else {
    return res.status(200).end("invalid");
  }
};
