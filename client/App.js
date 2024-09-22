import { PaperProvider } from "react-native-paper";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import { ApolloProvider } from "@apollo/client";
import client from "./config/apolloClient";
import { LoginProvider } from "./contexts/LoginContext";
import MainStack from "./navigators/MainStack";
import { RootSiblingParent } from "react-native-root-siblings";

export default function App() {
  return (
    // halaman login
    <LoginProvider>
      <RootSiblingParent>
        <ApolloProvider client={client}>
          <SafeAreaProvider>
            <PaperProvider>
              <MainStack />
              <StatusBar backgroundColor="white" />
            </PaperProvider>
          </SafeAreaProvider>
        </ApolloProvider>
      </RootSiblingParent>
    </LoginProvider>
  );
}
