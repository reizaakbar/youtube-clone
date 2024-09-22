import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useContext, useEffect } from "react";
import LoginScreen from "../views/LoginScreen";
import RegisterScreen from "../views/RegisterScreen";
import BottomTab from "./BottomTab";
import { LoginContext } from "../contexts/LoginContext";

const Stack = createNativeStackNavigator();

export default function MainStack() {
  const { loggedIn, setLoggedIn } = useContext(LoginContext);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Login"
      >
        {loggedIn ? (
          <Stack.Screen name="Main" component={BottomTab} />
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
