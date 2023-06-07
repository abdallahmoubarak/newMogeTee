import dbConnection from "@/public/js/dbConnection";
import Option from "@/models/option";
import jwt from "jsonwebtoken";
import User from "@/models/user";

dbConnection();

export default async (req, res) => {
  const { method, cookies } = req;
  const token = cookies.jwt;

  if (method === "GET") {
    const options = await Option.find({});
    return res.status(200).end(JSON.stringify(options[0].rate));
  } else if (method === "PUT") {
    if (!token) return res.status(200).end("noToken");
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
      if (err) return res.status(200).end("invalid");
      const user = await User.findById(decoded.id).exec();
      if (user) {
        await Option.findOneAndUpdate({}, { rate: req.body.rate });
        return res.status(200).end("done");
      } else {
        return res.status(200).end("invalid");
      }
    });
  } else {
    return res.status(200).end("invalid");
  }
};
