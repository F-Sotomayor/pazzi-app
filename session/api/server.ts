import {auth} from "../../firebase/admin";
import {ClientTenant} from "../../product/types";

export default {
  verify: (token: string) => auth.verifyIdToken(token),
  getUser: (id: ClientTenant["id"]) => auth.getUser(id),
};
