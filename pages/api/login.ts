import dbConnection from "@/utils/dbConnection";
import User from "@/models/user";
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import cookie from "cookie";

dbConnection();

declare const process: {
  env: {
    TOKEN_SECRET: string;
  };
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method === "POST") {
    const { OTP, number } = req.body;
    const user = await User.findOne({ number }).exec();

    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET);

    if (user.otp === OTP) {
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("jwt", token, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          maxAge: 360000,
          path: "/",
        }),
      );
      return res.status(200).end("done");
    } else return res.status(400).end("activation code is not correct");
  }

  return res.status(400).end("system error retry");
};
