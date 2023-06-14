import { verify, Secret, JwtPayload } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

declare module "next" {
  interface NextApiRequest {
    user?: JwtPayload;
  }
}

type Handler = (
  req: NextApiRequest & { user: JwtPayload },
  res: NextApiResponse,
  next: () => void,
) => Promise<void>;

export default function checkAuth(handler: Handler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const authorization = req?.headers?.["authorization"];
      if (!authorization) throw new Error("not authenticated");
      const token = authorization.split(" ")[1];
      verify(token, process.env.TOKEN_SECRET as Secret, (err, decoded) => {
        if (err) throw new Error("invalid token");
        req.user = decoded as JwtPayload;
        return handler(
          req as NextApiRequest & { user: JwtPayload },
          res,
          () => {},
        );
      });
    } catch (e) {
      console.log(e);
      res.status(401).send({});
    }
  };
}
