import dbConnection from "@/utils/dbConnection";
import Category from "@/models/category";
import type { NextApiRequest, NextApiResponse } from "next";

dbConnection();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method === "GET") {
    const categories = await Category.find({
      hidden: false,
    });
    return res.status(200).json(categories);
  }
  return res.status(400).send("invalid");
};
