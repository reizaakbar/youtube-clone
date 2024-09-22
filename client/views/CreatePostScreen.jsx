import { SafeAreaView } from "react-native-safe-area-context";
import {
  ActivityIndicator,
  Button,
  TextInput,
  View,
  StyleSheet,
} from "react-native";
import { useMutation } from "@apollo/client";
import { ADD_POST, POSTS } from "../queries/queries";
import { useState } from "react";

export default function CreatePostScreen({ navigation }) {
  const [addPost, { loading }] = useMutation(ADD_POST, {
    refetchQueries: [POSTS],
  });
  const [content, setContent] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [tags, setTags] = useState("");

  function handleAddPost() {
    addPost({
      variables: {
        input: {
          content: content,
          imgUrl: imgUrl,
          tags: tags ? tags.split(",") : [],
        },
      },
      onCompleted: () => navigation.navigate("Posts"),
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          multiline
          numberOfLines={5}
          style={styles.textArea}
          placeholder="What's on your mind?"
          onChangeText={setContent}
          value={content}
        />

        <TextInput
          style={styles.inputField}
          placeholder="Image URL (optional)"
          value={imgUrl}
          onChangeText={setImgUrl}
        />

        <TextInput
          style={styles.inputField}
          placeholder="Tags (comma separated)"
          value={tags}
          onChangeText={setTags}
        />

        {loading ? (
          <ActivityIndicator size="large" color="red" style={styles.loader} />
        ) : (
          <Button title="Post" onPress={handleAddPost} color="red" />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  formContainer: {
    flex: 1,
  },
  textArea: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
    textAlignVertical: "top",
  },
  inputField: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
  },
  loader: {
    marginVertical: 20,
  },
});
