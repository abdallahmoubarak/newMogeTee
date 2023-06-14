import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method === "GET") {
    const categories = await prisma.category.findMany({});
    return res.status(200).json({ categories });
  }
  return res.status(400).end("invalid");
};
