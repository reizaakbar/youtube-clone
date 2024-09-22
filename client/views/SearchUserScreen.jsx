import {
  ActivityIndicator,
  Button,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { Searchbar } from "react-native-paper";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { FIND_USER, FOLLOW_USER, PROFILE } from "../queries/queries";
import Toast from "react-native-root-toast";
import FollowButton from "../components/FollowButton";

function SearchUserScreen() {
  const [searchQuery, setSearchQuery] = useState("");

  const [fetchUser, { data, loading }] = useLazyQuery(FIND_USER);
  const profileData = useQuery(PROFILE).data;
  const [followUser] = useMutation(FOLLOW_USER, {
    refetchQueries: [PROFILE, FIND_USER],
  });

  const followed = profileData?.userProfile.followings.find(
    (e) => e._id === data?.findUser?._id
  );

  function handleFollowUser(id) {
    followUser({
      variables: { followingId: id },
      onCompleted: () => {
        Toast.show("Followed user", { duration: Toast.durations.SHORT });
      },
    });
  }

  useEffect(() => {
    const debouncer = setTimeout(() => {
      fetchUser({ variables: { name: searchQuery } });
    }, 1000);

    return () => clearTimeout(debouncer);
  }, [searchQuery]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <Searchbar
          style={styles.searchbar}
          placeholder="Search User"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="red" />
        </View>
      ) : (
        <View style={styles.resultContainer}>
          <Text style={styles.userName}>
            {data?.findUser?.name || "User not found"}
          </Text>

          {data?.findUser && (
            <FollowButton
              followed={followed}
              pressHandler={() => handleFollowUser(data?.findUser?._id)}
            />
          )}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  searchContainer: {
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  searchbar: {
    width: 250,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  resultContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 15,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SearchUserScreen;
