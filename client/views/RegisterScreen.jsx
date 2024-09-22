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
import { LOGIN, REGISTER_USER } from "../queries/queries";
import { useMutation } from "@apollo/client";
import * as SecureStore from "expo-secure-store";
import { LoginContext } from "../contexts/LoginContext";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setLoggedIn } = useContext(LoginContext);

  const [registerUser, { loading }] = useMutation(REGISTER_USER);
  const [login] = useMutation(LOGIN);

  function handleRegister() {
    registerUser({
      variables: {
        input: {
          email,
          name,
          password,
          username,
        },
      },
      onCompleted: (data) => {
        login({
          variables: {
            username,
            password,
          },
          onCompleted: async (data) => {
            const token = data.login.token;
            await SecureStore.setItemAsync("token", token);
            setLoggedIn(true);
          },
        });
      },
    });
  }

  return (
    <View style={styles.container}>
      <View>
        <Image source={logo} style={styles.youtubeLogo} />
        <View style={styles.loginTextContainer}>
          <Text style={styles.h1Login}>Join YouTube</Text>
          <Text style={styles.subText}>
            or{" "}
            <Text
              style={styles.linkText}
              onPress={() => navigation.navigate("Login")}
            >
              Sign in
            </Text>
          </Text>
        </View>
        <View style={styles.formGroup}>
          <TextInput
            style={styles.formInput}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.formInput}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.formInput}
            placeholder="Email"
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
        <View style={styles.signUpContainer}>
          <Button title="Sign Up" onPress={handleRegister} color="red" />
        </View>
      )}
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
  },
  linkText: {
    color: "blue",
    fontWeight: "bold",
  },
  formGroup: {
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
  signUpContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
});
