import {NextApiRequest, NextApiResponse} from "next";

import {CartItem} from "../../product/types";
import serverApi from "../../product/api/server";
import {auth} from "../../firebase/admin";

interface PostRequest extends NextApiRequest {
  body: CartItem[];
  headers: {
    authorization: string;
  };
}

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (req.method === "POST") {
    const {body: order, headers} = req as PostRequest;

    return auth
      .verifyIdToken(headers.authorization)
      .then(async (user) => {
        const result = await serverApi.order(order, user.email);

        res.status(200).json(result);
      })
      .catch(() => {
        res.status(401).end();
      });
  }
};
