import dbConnection from "@/public/js/dbConnection";
import User from "@/models/user";
import jwt from "jsonwebtoken";
import cookie from "cookie";

dbConnection();
export default async (req, res) => {
  const { method } = req;

  if (method === "POST") {
    const { OTP, number } = req.body;
    const user = await User.findOne({ number }).exec();
    const d = Date.now();

    if (Math.ceil((d - user.signDate) / 60000) > 5) {
      return res.end("activation code expired");
    }
    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET);
    await User.findByIdAndUpdate(user._id, { jwt: token }, (err) =>
      console.log(err)
    );

    if (user.otp === OTP) {
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("jwt", token, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          maxAge: "864000",
          path: "/"
        })
      );
      return res.status(200).end("done");
    } else return res.status(200).end("activation code is not correct");
  }

  return res.end("system error retry");
};
