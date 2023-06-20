import dbConnection from "@/utils/dbConnection";
import User from "@/models/user";
import Option from "@/models/option";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

dbConnection();

declare const process: {
  env: {
    TOKEN_SECRET: string;
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method, body } = req;

  if (method === "PUT") {
    try {
      const token = req.cookies.jwt;
      if (!token) return res.status(401).end("Unauthorized");

      const decoded: any = jwt.verify(token, process.env.TOKEN_SECRET);
      const user = await User.findById(decoded.id).exec();

      if (user) {
        await Option.findOneAndUpdate({}, { rate: body.rate });
        return res.status(200).end("done");
      } else {
        return res.status(400).end("invalid");
      }
    } catch (error) {
      return res.status(400).end("invalid");
    }
  }
  return res.status(400).end("Unauthorized");
}
