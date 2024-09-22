import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ActivityIndicator,
  Button,
  Image,
  ScrollView,
  Text,
  TextInput,
  View,
  StyleSheet,
} from "react-native";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_COMMENT, ADD_LIKE, POST_DETAIL, POSTS } from "../queries/queries";
import { AntDesign } from "@expo/vector-icons";
import Toast from "react-native-root-toast";
import { Chip, Divider } from "react-native-paper";

export default function PostDetailScreen({ route }) {
  const { id } = route.params;
  const [comment, setComment] = useState("");

  const [addLike] = useMutation(ADD_LIKE, {
    refetchQueries: [POST_DETAIL, POSTS],
  });
  const [addComment] = useMutation(ADD_COMMENT, {
    refetchQueries: [POST_DETAIL],
  });
  const { data, loading, error } = useQuery(POST_DETAIL, {
    variables: { getPostId: id },
  });

  function handleAddComment() {
    addComment({
      variables: {
        input: { content: comment },
        postId: id,
      },
    });
    Toast.show("Comment posted", { duration: Toast.durations.SHORT });
    setComment("");
  }

  function handleLike() {
    Toast.show("Liked post", { duration: Toast.durations.SHORT });
    addLike({ variables: { postId: id } });
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.postHeader}>
          <Text style={styles.authorText}>{data?.getPost.author.name}</Text>
        </View>

        {data?.getPost.imgUrl && (
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: data?.getPost.imgUrl }}
              style={styles.postImage}
            />
          </View>
        )}

        <Text style={styles.contentText}>{data?.getPost.content}</Text>

        <View style={styles.tagsContainer}>
          {data?.getPost.tags.map((e) => (
            <Chip key={e} style={styles.tagChip}>
              {e}
            </Chip>
          ))}
        </View>

        <View style={styles.likeCommentContainer}>
          <AntDesign name="like1" size={24} color="red" onPress={handleLike} />
          <Text style={styles.likeCommentText}>
            {data?.getPost.likes.length} Likes ⸱ {data?.getPost.comments.length}{" "}
            Comments
          </Text>
        </View>

        <Text style={styles.commentsHeader}>Comments</Text>

        <TextInput
          onChangeText={setComment}
          value={comment}
          placeholder="Add a comment.."
          style={styles.commentInput}
        />

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="red" />
          </View>
        ) : (
          <View style={styles.submitButton}>
            <Button title="Submit" onPress={handleAddComment} color="red" />
          </View>
        )}

        {data?.getPost.comments.map((comment, i) => (
          <View key={i} style={styles.commentContainer}>
            <Text style={styles.commentAuthor}>{comment.name}</Text>
            <Text style={styles.commentText}>{comment.content}</Text>
            <Divider style={styles.commentDivider} />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  postHeader: {
    marginBottom: 10,
  },
  authorText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  postImage: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
    borderRadius: 10,
  },
  contentText: {
    fontSize: 18,
    marginBottom: 10,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 10,
  },
  tagChip: {
    marginHorizontal: 5,
    marginTop: 5,
  },
  likeCommentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  likeCommentText: {
    color: "gray",
    textAlign: "right",
  },
  commentsHeader: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 10,
  },
  commentInput: {
    fontSize: 16,
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
  },
  loadingContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  submitButton: {
    marginVertical: 10,
  },
  commentContainer: {
    marginTop: 10,
  },
  commentAuthor: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  commentText: {
    fontSize: 16,
    marginBottom: 5,
  },
  commentDivider: {
    marginVertical: 5,
  },
});
