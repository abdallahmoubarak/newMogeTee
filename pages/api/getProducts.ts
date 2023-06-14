import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method === "GET") {
    const products = await prisma.product.findMany({});
    return res.status(200).json({ products });
  }
  return res.status(400).end("invalid");
};
