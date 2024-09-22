import { Button, FlatList, View, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Searchbar, ActivityIndicator } from "react-native-paper";
import { useQuery } from "@apollo/client";
import { POSTS } from "../queries/queries";
import client from "../config/apolloClient";
import PostCard from "../components/PostCard";

export default function PostsScreen({ navigation }) {
  const { loading, data, error } = useQuery(POSTS);

  function handleDetailClick(id) {
    navigation.navigate("PostDetail", { id });
  }

  async function refresh() {
    await client.refetchQueries({
      include: [POSTS],
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Posts</Text>
        <Button
          onPress={() => navigation.navigate("AddPost")}
          title="Create Post"
          color="red"
        />
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="red" />
        </View>
      ) : (
        <FlatList
          data={data?.getPosts}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <PostCard
              postData={item}
              navFn={() => handleDetailClick(item._id)}
            />
          )}
          onRefresh={refresh}
          refreshing={loading}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  searchBar: {
    margin: 10,
    borderRadius: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
