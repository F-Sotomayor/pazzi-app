import React from "react";

import SessionContext from "./context";

export function useSession() {
  const {
    actions: {signOut},
  } = React.useContext(SessionContext);

  return {signOut};
}

export function useUser() {
  const {
    state: {user},
  } = React.useContext(SessionContext);

  return user;
}
