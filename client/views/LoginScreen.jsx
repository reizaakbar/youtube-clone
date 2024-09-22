import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  Button,
  Image,
  Text,
  TextInput,
  View,
  StyleSheet,
} from "react-native";
import logo from "../assets/youtubeLogo.png";
import { useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../queries/queries";
import * as SecureStore from "expo-secure-store";
import { LoginContext } from "../contexts/LoginContext";
import client from "../config/apolloClient";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fetchLogin, { data, loading, error }] = useMutation(LOGIN);
  const { setLoggedIn } = useContext(LoginContext);

  function loginHandler() {
    fetchLogin({
      variables: {
        username: email,
        password: password,
      },
      onCompleted: async (data) => {
        await client.resetStore();
        const token = data.login.token;
        await SecureStore.setItemAsync("token", token);
        setLoggedIn(true);
      },
      onError: (error) => console.log(error.networkError),
    });
  }

  return (
    <View style={styles.container}>
      <View>
        <Image source={logo} style={styles.youtubeLogo} />
        <View style={styles.loginTextContainer}>
          <Text style={styles.h1Login}>Sign in</Text>
          <Text style={styles.subText}>
            Stay updated on your professional world
          </Text>
        </View>
        <View style={styles.formGroupLogin}>
          <TextInput
            style={styles.formInput}
            placeholder="Username"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.formInput}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
        </View>
      </View>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="red" />
        </View>
      ) : (
        <View style={styles.signInContainer}>
          <Button title="Sign in" onPress={loginHandler} color="red" />
          <Text style={styles.footerText}>
            New to Youtubers?{" "}
            <Text
              style={styles.linkText}
              onPress={() => navigation.navigate("Register")}
            >
              Join now
            </Text>
          </Text>
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  youtubeLogo: {
    width: 150,
    height: 110,
    alignSelf: "center",
    marginBottom: 20,
  },
  loginTextContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  h1Login: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  subText: {
    marginTop: 5,
    fontSize: 16,
    color: "#555",
    textAlign: "center",
  },
  formGroupLogin: {
    marginBottom: 20,
  },
  formInput: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  loaderContainer: {
    alignItems: "center",
  },
  signInContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  footerText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
  linkText: {
    color: "blue",
    fontWeight: "bold",
  },
});
