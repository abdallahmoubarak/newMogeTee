import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
import cookie from "cookie";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method === "POST") {
    const { password, number } = req.body;
    const user = await prisma.user.findFirst({
      where: { phone: String(number) } as any,
    });
    if (user) {
      // do something with the user
    } else {
      return res.status(400).end("invalid");
    }
  }
};
