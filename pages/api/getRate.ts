import dbConnection from "@/utils/dbConnection";
import Option from "@/models/option";
import type { NextApiRequest, NextApiResponse } from "next";

dbConnection();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;

  if (method === "GET") {
    const options = await Option.find({});
    return res.status(200).json(options[0].rate);
  }
  return res.status(400).send("invalid");
}
