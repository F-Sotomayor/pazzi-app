import {auth} from "@pency/api/firebase/admin";

import {ClientTenant} from "~/tenant/types";

export default {
  verify: (token: string) => auth.verifyIdToken(token),
  getUser: (id: ClientTenant["id"]) => auth.getUser(id),
};
