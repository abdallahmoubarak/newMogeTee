import dbConnection from "@/public/js/dbConnection";
import User from "@/models/user";

dbConnection();

export default async (req, res) => {
  const { method, body } = req;

  if (method === "POST") {
    const user = await User.findOne({ number: body.number }).exec();

    if (!!user) {
      return res.status(200).end("done");
    } else {
      return res.status(200).end("done");
    }
  }
};
