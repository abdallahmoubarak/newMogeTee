import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method === "GET") {
    const rate = await prisma.option.findFirst({});
    return res.status(200).json({ rate });
  }
  return res.status(400).end("invalid");
};
