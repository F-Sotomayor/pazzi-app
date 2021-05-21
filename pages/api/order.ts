import {NextApiRequest, NextApiResponse} from "next";

import {CartItem} from "../../cart/types";
import serverApi from "../../order/api/server";
import {auth} from "../../firebase/admin";

interface PostRequest extends NextApiRequest {
  body: CartItem[];
  headers: {
    authorization: string;
  };
}
interface GetRequest extends NextApiRequest {
  query: {
    email: string;
  };
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
        const result = await serverApi.create(order, user.email);

        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(401).end();
      });
  }
  if (req.method === "GET") {
    const {
      query: {email},
      headers,
    } = req as GetRequest;

    return auth
      .verifyIdToken(headers.authorization)
      .then(async () => {
        const result = await serverApi.list(email);

        res.status(200).json(result);
      })
      .catch(() => {
        res.status(401).end();
      });
  }
};
