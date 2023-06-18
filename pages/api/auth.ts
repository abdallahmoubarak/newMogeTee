import dbConnection from "@/utils/dbConnection";
import User from "@/models/user";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

dbConnection();

declare const process: {
  env: {
    TOKEN_SECRET: string;
  };
};

export default async function Auth(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  if (method === "GET") {
    try {
      const token = req.cookies.jwt;
      if (!token) return res.status(401).end("Unauthorized");

      const decoded: any = jwt.verify(token, process.env.TOKEN_SECRET);
      const user = await User.findById(decoded.id).exec();

      if (user) {
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
