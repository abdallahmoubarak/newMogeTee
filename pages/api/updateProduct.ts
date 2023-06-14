import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { verify } from "jsonwebtoken";

declare const process: {
  env: {
    TOKEN_SECRET: string;
  };
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, cookies } = req;
  const token = cookies.jwt;
  const { body } = req;

  if (method === "PUT") {
    if (!token) return res.status(200).end("Unauthorized");
    verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
      if (err) return res.status(400).end("invalid");
      if (typeof decoded === "string") {
        return res.status(400).end("invalid");
      }
      const user = await prisma.user.findFirst({ where: { id: decoded?.id } });
      if (user) {
        const { name, price, description, id } = body;
        const product = await prisma.product.update({
          where: { id },
          data: {
            name,
            price,
            description,
          },
        });
        return res.status(200).json({ product });
      }
      return res.status(401).json({ message: "You are not logged in." });
    });
    return res.status(400).end("invalid");
  }
  return res.status(400).end("invalid");
};
