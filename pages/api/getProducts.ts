import dbConnection from "@/utils/dbConnection";
import Product from "@/models/product";
import type { NextApiRequest, NextApiResponse } from "next";

dbConnection();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;

  if (method === "GET") {
    const products = await Product.find({
      hidden: false,
    });
    return res.status(200).json(products);
  }
  return res.status(400).send("invalid");
}
