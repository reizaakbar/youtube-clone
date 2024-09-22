import { createContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

export const LoginContext = createContext({
  loggedIn: false,
  setLoggedIn: () => {},
});

export function LoginProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    (async () => {
      const token = await SecureStore.getItemAsync("token");
      if (token) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    })();
  }, []);

  return (
    <LoginContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </LoginContext.Provider>
  );
}
